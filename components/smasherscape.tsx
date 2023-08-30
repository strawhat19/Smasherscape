import Main from './Main';
import Play from '../models/Play';
import User from '../models/User';
import { useContext } from 'react';
import Level from '../models/Level';
import Player from '../models/Player';
import PlayerForm from './PlayerForm';
import CommandsForm from './CommandsForm';
import LoadingSpinner from './LoadingSpinner';
import Experience from '../models/Experience';
import { Characters } from '../common/Characters';
import { StateContext, defaultPlayerRoles, getActivePlayersJSON } from '../pages/_app';
import PlayerCard, { calcPlayerLosses, calcPlayerWins } from './PlayerCard';
import { calcPlayerDeaths, calcPlayerKDRatio, calcPlayerKills, parseDate, removeTrailingZeroDecimal } from './PlayerRecord';

export const publicAssetLink = `https://github.com/strawhat19/Smasherscape/blob/main`;
export const calcPlayerCharacterTimesPlayed = (plyr: Player, char) => plyr.plays.map(ply => ply.character).filter(charPlayed => charPlayed.toLowerCase() == char || charPlayed.toLowerCase().includes(char)).length;

export const calcPlaysCharacterTimesPlayed = (plys: Play[], type, characterOption) => {
    let playChars = type == `All` ? plys.map(ply => ply.character || ply.otherCharacter) : plys.map(ply => type == `Player` ? ply.character : ply.otherCharacter);
    return playChars.filter(charPlayed =>  characterOption.label.toLowerCase().includes(charPlayed.toLowerCase())).length;
};

export const getCharacterTitle = (char) => {
    if (char.split(` `).length > 1) char = char.split(` `).join(``).toLowerCase();
    return Characters[char];
}

export const removeEmptyParams = (object) => {
    Object.keys(object).forEach(key => isInvalid(object[key]) && delete object[key]);
    return object;
}

export const checkUserRole = (user: any, role) => {
    if (user && user?.roles && user?.roles?.length > 0) {
        let userRoleNames = user?.roles?.map(rol => rol?.name);
        let userRoleLevels = user?.roles?.map(rol => rol?.level);
        let maxUserRole = Math.max(...userRoleLevels);
        if (typeof role == `string`) {
            let thisRole = defaultPlayerRoles.find(rol => rol?.name == role);
            let userHasRole = userRoleNames.includes(role) || maxUserRole >= thisRole?.level;
            return userHasRole;
        } else {
            let thisRole = defaultPlayerRoles.find(rol => rol?.level == role);
            let userHasRole = userRoleLevels.includes(role) || maxUserRole >= thisRole?.level;
            return userHasRole;
        }
    } else {
        return user && user?.roles && user?.roles?.length > 0;
    }
}

export const getActivePlayers = (players: any[], customObject = true) => {
   if (customObject == true) {
    let activePlayers: Player[] = players.filter(plyr => (plyr.active || !plyr.disabled)).sort((a, b) => {
        if (b.experience.arenaXP !== a.experience.arenaXP) {
            return b.experience.arenaXP - a.experience.arenaXP;
        }
        return b.plays.length - a.plays.length;
    }).map(pla => newPlayerType(pla));
    return activePlayers;
   } else {
    getActivePlayersJSON(players);
   }
}

export const calcPlayerLevelImage = (levelName) => {
    if (levelName == `Bronze Scimitar`) return `${publicAssetLink}/assets/smasherscape/Bronze_Scimmy.png?raw=true`; 
    else if (levelName == `Iron Scimitar`) return `${publicAssetLink}/assets/smasherscape/Iron_Scimmy.png?raw=true`; 
    else if (levelName == `Steel Scimitar`) return `${publicAssetLink}/assets/smasherscape/Steel_Scimmy.png?raw=true`; 
    else if (levelName == `Mithril Scimitar`) return `${publicAssetLink}/assets/smasherscape/Mithril_Scimmy.png?raw=true`; 
    else if (levelName == `Adamantite Scimitar`) return `${publicAssetLink}/assets/smasherscape/Adamant_Scimmy.png?raw=true`; 
    else if (levelName == `Rune Scimitar`) return `${publicAssetLink}/assets/smasherscape/Rune_Scimmy.png?raw=true`; 
    else if (levelName == `Gilded Scimitar`) return `${publicAssetLink}/assets/smasherscape/Gilded_Scimmy.png?raw=true`; 
    else return `${publicAssetLink}/assets/smasherscape/OSRS_Top_Hat.png?raw=true`;
}

export const calcPlayerCharactersPlayed = (plyr: Player, cutOff = true) => {
    let charsPlayed = plyr?.plays?.map(ply => ply?.character);
    let counts = charsPlayed.reduce((acc, char) => {
        acc[char] = (acc[char] || 0) + 1;
        return acc;
    }, {});
    let sortedCharactersByMostTimesPlayed = Object.entries(counts).sort((a, b) => {
        const aRecent = plyr.plays.find(p => p.character === a[0])?.date;
        const bRecent = plyr.plays.find(p => p.character === b[0])?.date;
        // return (new Date(bRecent) as any) - (new Date(aRecent) as any); 
        return parseDate(bRecent) - parseDate(aRecent); 
    }).sort((a: any, b: any) => b[1] - a[1]).map(entry => entry[0].toLowerCase());
    return cutOff == true ? sortedCharactersByMostTimesPlayed.slice(0,3) : sortedCharactersByMostTimesPlayed;
}

export const isInvalid = (item) => {
    if (typeof item == `string`) {
        if (!item || item == `` || item == undefined || item == null) {
            return true;
        } else {
            return false;
        }
    } else if (typeof item == `number`) {
        if (isNaN(item) || item == undefined || item == null) {
            return true;
        } else {
            return false;
        }
    } else {
        if (item == undefined || item == null) {
            return true;
        } else {
            return false;
        }
    }
}

export const newPlayerType = (player: Player, customObject = true) => {

    let level: Level = new Level(player.level.name, player.level.num) as Level;
    let experience: Experience = new Experience(player.experience.nextLevelAt, player.experience.remainingXP, player.experience.arenaXP, player.experience.xp) as Experience;
    let plays: Play[] = player.plays.map((play: Play) => {
        let newPlay = new Play(removeEmptyParams(play));
        return newPlay as Play;
    }) as Play[];

    let wins = calcPlayerWins(player);
    let losses = calcPlayerLosses(player);
    let ratio = (wins/(wins+losses)) * 100;
    let kills = calcPlayerKills(player, plays);
    let deaths = calcPlayerDeaths(player, plays);
    let kdRatio = calcPlayerKDRatio(player, plays);
    experience = removeEmptyParams(experience) as Experience;

    let newPlayer: Player = new Player({
        ...player,
        level,
        plays,
        experience,
        kills,
        deaths,
        kdRatio,
        wins,
        losses,
        ratio,
        percentage: (ratio) > 100 ? 100 : parseFloat(removeTrailingZeroDecimal(ratio)),
    }) as Player;

    return new Player(removeEmptyParams(newPlayer)) as Player;
}

export default function Smasherscape(props) {
    const { user, useDatabase, filteredPlayers, players, noPlayersFoundMessage, devEnv, playersLoading, command } = useContext<any>(StateContext);

    return <Main className={`smasherscapeLeaderboard`} style={playersLoading ? {paddingTop: 10} : null}>
        <div className={`AdminArea ${command?.name}`}>
            {getActivePlayers(players).length > 0 && (useDatabase == false || (user && checkUserRole(user, `Admin`))) && <>
                <h2 className={`centerPageHeader toggleButtonsHeader`}>Commands Builder Form</h2>
                <CommandsForm />
            </>}
            <PlayerForm />
        </div>
        <div id={props.id} className={`${props.className} playerGrid ${getActivePlayers(filteredPlayers)?.length == 0 ? `empty` : `populated`}`}>
            {getActivePlayers(filteredPlayers)?.length == 0 && <>
                <div className="gridCard">
                    <h1 className={`runescape_large noPlayersFound`}>
                        {playersLoading ? <LoadingSpinner size={42} /> : noPlayersFoundMessage}
                    </h1>
                </div>
            </>}
            {!playersLoading ? getActivePlayers(filteredPlayers)?.length > 0 && getActivePlayers(filteredPlayers)?.map((plyr, plyrIndex) => {
                return playersLoading ? <LoadingSpinner size={30} override={true} /> : <PlayerCard plyr={plyr} key={plyrIndex} />
            }) : <LoadingSpinner size={30} override={true} />}
        </div>
    </Main>
}