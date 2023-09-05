import { useContext } from 'react';
import Player from '../models/Player';
import { Badge } from '@mui/material';
import PlayerRecord from './PlayerRecord';
import { updatePlayerInDB } from './PlayerForm';
import { StateContext, showAlert } from '../pages/_app';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { calcPlayerCharacterIcon } from '../common/CharacterIcons';
import { calcPlayerCharacterTimesPlayed, calcPlayerCharactersPlayed, calcPlayerLevelImage, checkUserRole, getActivePlayers, getCharacterTitle, publicAssetLink } from './smasherscape';

export const calcPlayerWinsFromPlays = (player, plays) => plays.filter(ply => ply?.winnerUUID == player?.uuid)?.length;
export const calcPlayerLossesFromPlays = (player, plays) => plays.filter(ply => ply?.loserUUID == player?.uuid)?.length;
export const calcPlayerWins = (plyr: Player) => plyr.plays.filter(ply => ply.winner.toLowerCase() == plyr.name.toLowerCase()).length;
export const calcPlayerLosses = (plyr: Player) => plyr.plays.filter(ply => ply.loser.toLowerCase() == plyr.name.toLowerCase()).length;

export default function PlayerCard(props) {
    let { plyr } = props;
    const { user, plays, useDatabase, players, filteredPlayers, setFilteredPlayers, useLazyLoad } = useContext<any>(StateContext);
    const setPlayerExpanded = (player: Player) => setFilteredPlayers(filteredPlayers.map(plyr => plyr.id == player.id ? { ...player, expanded: !player.expanded } : plyr));

    const limitInput = (event, maxLen) => {
        const allowedKeys = [`Backspace`];
        const disallowedKeys = [`Space`, `Enter`, `Return`];
        const element = event.target;
        if (element.textContent.length >= maxLen && !allowedKeys.includes(event.code) || disallowedKeys.includes(event.code)) {
            event.preventDefault();
            return; 
        }
    }

    const changePlayerNameConfirm = (e, player) => {
        let value = e.target.textContent.toLowerCase();
        let displayName = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        let playerNames = getActivePlayers(players, true, plays).map(plyr => plyr.name.toLowerCase());

        const changePlayerName = (e, player) => {
            let updatedPlayer = {
                ...player,
                displayName,
                name: displayName,
            };
            if (useDatabase == true) {
                const jsonPlayer = JSON.parse(JSON.stringify(player));
                const jsonUpdatedPlayer = JSON.parse(JSON.stringify(updatedPlayer));
                updatePlayerInDB(jsonPlayer, jsonUpdatedPlayer);
            }
        }

        if (player?.name.toLowerCase() == value) {
            return;
        } else if (playerNames.includes(value)) {
            e.target.textContent = player?.name;
            showAlert(`Player name is already taken`, <div className="alertMessage errorMessage loadingMessage">
                <i style={{color: `var(--smasherscapeYellow)`}} className="fas fa-exclamation-triangle"></i>
                <h3>Player name is already taken</h3>
                <h3>Please pick a unique name</h3>
            </div>, `50%`, `40%`);
            return;
        } else {
            changePlayerName(e, player);
            // showAlert(`Change Player Name?`, <div className="alertMessage confirmMessage loadingMessage">
            //     <i style={{color: `var(--smasherscapeYellow)`}} className="fas fa-exclamation-triangle"></i>
            //     <h3>Are you sure you want to change player name?</h3>
            //     <h3>Saving will update the name</h3>
            //     <button onClick={(e) => changePlayerName(e, player)}>Save</button>
            // </div>, `50%`, `40%`);
            // e.target.textContent = player?.name;
            // return;
        }
    }

    return <div id={`playerCard-${plyr.uuid}`} className={`playerCard ${plyr?.expanded ? `expandedPlayerCard` : `collapsedPlayerCard`} ${plyr?.uid ? `playerCardUID-${plyr?.uid} ${user && user?.uid == plyr?.uid ? `playerIsUser userIsPlayer` : ``}` : ``}`}>
    <div className="gridCard" onClick={(e) => setPlayerExpanded(plyr)}>
        {useLazyLoad ? (
            <>
                <LazyLoadImage effect="blur" src={`${publicAssetLink}/assets/smasherscape/OSRS_Card_Empty.png?raw=true`} className={`cardBG`} alt={`Smasherscape Player Card`} />
                <LazyLoadImage effect="blur" src={`${publicAssetLink}/assets/smasherscape/OSRS_Card_Template_Border_Only.png?raw=true`} className={`cardBG border`} alt={`Smasherscape Player Card`} />
            </>
        ) : (
            <>
                <img src={`${publicAssetLink}/assets/smasherscape/OSRS_Card_Empty.png?raw=true`} className={`cardBG`} alt={`Smasherscape Player Card`} />
                <img src={`${publicAssetLink}/assets/smasherscape/OSRS_Card_Template_Border_Only.png?raw=true`} className={`cardBG border`} alt={`Smasherscape Player Card`} />
            </>
        )}
        <div className="playerCardContent">
            <div className="cardTopRow">
                <div className="logoWithWords">
                    <img width={70} src={`${publicAssetLink}/assets/smasherscape/OSRS_Top_Hat.png?raw=true`} alt={`Tophat Logo`} />
                    <h3 className={`blackTextShadow slimmed`}>Xuruko's<br />SmasherScape</h3>
                </div>
                <h2 title={plyr?.name} className={`playerNameText bluePurpleTextShadow textOverflow overrideWithInlineBlock`}>
                    <span onKeyDown={(e) => limitInput(e, 10)} onBlur={(e) => changePlayerNameConfirm(e, plyr)} className={`playerNameContainer changeLabel`} contentEditable={checkUserRole(user, `Owner`) || user && user?.uid == plyr?.uid} suppressContentEditableWarning>{plyr?.name}</span>
                    {user && plyr?.uid && user?.uid == plyr?.uid && <img alt={user?.email} src={user?.image}  className={`userImage playerCardUserImage`} />}
                </h2>
            </div>
            <div className="cardMiddleRow">
                <div className={`imgLeftCol ${plyr.level.name.split(` `)[0]}`}>
                    <img className={`cardLevelImage`} width={150} src={calcPlayerLevelImage(plyr?.level?.name)} alt={plyr?.level?.name} />
                    <h4 className={`levelName blackTextShadow slimmed ${plyr?.level?.name.split(` `)[0]}`}>{plyr?.level?.name}</h4>
                </div>
                <div className="recordPlays">
                    <div className="record">
                        <h3 className={`greenRecordText`}>Record</h3>
                        {/* <h4>{calcPlayerWins(plyr)} - {calcPlayerLosses(plyr)}</h4> */}
                        <h4>{calcPlayerWinsFromPlays(plyr, plays)} - {calcPlayerLossesFromPlays(plyr, plays)}</h4>
                    </div>
                    <div className="plays">
                        <h3 className={`greenRecordText`}>Plays</h3>
                        <div className={`playsContainer ${calcPlayerCharactersPlayed(plyr, true, plays)?.length > 0 ? `populatedPlays` : ``}`}>
                            {calcPlayerCharactersPlayed(plyr, true, plays)?.length > 0 ? calcPlayerCharactersPlayed(plyr, true, plays).map((char, charIndex) => {
                                return (
                                    <Badge title={`Played ${getCharacterTitle(char)} ${calcPlayerCharacterTimesPlayed(plyr, char, plays)} Time(s)`} key={charIndex} badgeContent={calcPlayerCharacterTimesPlayed(plyr, char, plays)} color="primary">
                                        <img className={`charImg`} width={35} src={calcPlayerCharacterIcon(char)} alt={getCharacterTitle(char)} />
                                    </Badge>
                                )
                            }) : <div className={`flex center blackTextShadow slimmed`}>
                                No Plays Yet
                            </div>}
                        </div>
                    </div>
                </div>
                <div className="rightCol">
                    <div className="level">
                        <h4 className={`levelNum levelTop`}>{plyr?.level?.num}</h4>
                        <div className="borderSep"></div>
                        <h4 className={`levelNum levelBot`}>{plyr?.level?.num}</h4>
                    </div>
                    <div className="experienceDetails">
                        <div className="arenaXP xpDetail">
                            <div>Arena XP:</div>
                            <div>{plyr?.experience.arenaXP.toLocaleString(`en`)}</div>
                        </div>
                        <div className="nextLevelAt xpDetail">
                            <div>Next Level At:</div>
                            <div>{plyr?.experience.nextLevelAt.toLocaleString(`en`)}</div>
                        </div>
                        <div className="remainingXP xpDetail">
                            <div>Remaining XP:</div>
                            <div>{plyr?.experience.remainingXP.toLocaleString(`en`)}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="cardBottomRow">
                <div className="gradient" style={{clipPath: `polygon(0% 0, ${((plyr.experience.arenaXP - plyr.experience.xp) / (plyr.experience.nextLevelAt - plyr.experience.xp)) * 100}% 0%, ${((plyr.experience.arenaXP - plyr.experience.xp) / (plyr.experience.nextLevelAt - plyr.experience.xp)) * 100}% 100%, 0 100%)`}}></div>
            </div>
        </div>
    </div>
    <PlayerRecord plyr={plyr} plyrPlays={plays.filter(ply => ply?.winnerUUID == plyr?.uuid || ply?.loserUUID == plyr?.uuid)} />
</div>
}