
import Main from './Main';
import Play from '../models/Play';
import { useContext } from 'react';
import Level from '../models/Level';
import Player from '../models/Player';
import PlayerForm from './PlayerForm';
import CommandsForm from './CommandsForm';
import { StateContext } from '../pages/_app';
import Experience from '../models/Experience';
import { Characters } from '../common/Characters';
import PlayerCard, { calcPlayerLosses, calcPlayerWins } from './PlayerCard';
import { calcPlayerDeaths, calcPlayerKDRatio, calcPlayerKills } from './PlayerRecord';

export const publicAssetLink = `https://github.com/strawhat19/Smasherscape/blob/main`;
export const calcPlayerCharacterTimesPlayed = (plyr: Player, char) => plyr.plays.map(ply => ply.character).filter(ply => ply.toLowerCase() == char || ply.toLowerCase().includes(char)).length;

export const getCharacterTitle = (char) => {
    if (char.split(` `).length > 1) char = char.split(` `).join(``).toLowerCase();
    return Characters[char];
}

export const removeEmptyParams = (object) => {
    Object.keys(object).forEach(key => isInvalid(object[key]) && delete object[key]);
    return object;
}

export const newPlayerType = (player: Player, customObject = true) => {
    let level: Level = new Level(player.level.name, player.level.num) as Level;
    let experience: Experience = new Experience(player.experience.nextLevelAt, player.experience.remainingXP, player.experience.arenaXP, player.experience.xp) as Experience;
    let plays: Play[] = player.plays.map((play: Play) => {
        let { date, loser, winner, stocks, character, stocksTaken, lossStocks, otherCharacter } = play;
        let newPlay = new Play(date, loser, winner, stocks, character, stocksTaken, lossStocks, otherCharacter);
        return removeEmptyParams(newPlay) as Play;
    }) as Play[];
    let wins = calcPlayerWins(player);
    let losses = calcPlayerLosses(player);
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
        losses
    }) as Player;
    return new Player(removeEmptyParams(newPlayer)) as Player;
}

export const getActivePlayers = (players: Player[]) => {
    let activePlayers: Player[] = players.filter(plyr => !plyr.disabled).sort((a,b) => {
        if (b.experience.arenaXP !== a.experience.arenaXP) {
            return b.experience.arenaXP - a.experience.arenaXP;
        }
        return b.plays.length - a.plays.length;
    }).map(pla => newPlayerType(pla));
    return activePlayers;
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

export const calcPlayerCharactersPlayed = (plyr: Player) => {
    let charsPlayed = plyr?.plays?.map(ply => ply?.character);
    let counts = charsPlayed.reduce((acc, char) => {
        acc[char] = (acc[char] || 0) + 1;
        return acc;
    }, {});
    let sortedChars = Object.entries(counts).sort((a: any, b: any) => b[1] - a[1]).map(entry => entry[0].toLowerCase());
    return sortedChars.slice(0,3);
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

export default function Smasherscape(props) {
    const { filteredPlayers, devEnv } = useContext<any>(StateContext);

    return <Main className={`smasherscapeLeaderboard`}>
        <CommandsForm />
        <PlayerForm />
        <div id={props.id} className={`${props.className} playerGrid ${getActivePlayers(filteredPlayers)?.length == 0 ? `empty` : `populated`}`}>
            {getActivePlayers(filteredPlayers)?.length == 0 && <>
                <div className="gridCard">
                    <h1 className={`runescape_large noPlayersFound`}>
                        No Players Found
                    </h1>
                </div>
            </>}
            {getActivePlayers(filteredPlayers)?.length > 0 && getActivePlayers(filteredPlayers)?.map((plyr, plyrIndex) => <PlayerCard plyr={plyr} key={plyrIndex} />)}
        </div>
    </Main>
}