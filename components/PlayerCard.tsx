import { useContext } from 'react';
import Player from '../models/Player';
import { Badge } from '@mui/material';
import PlayerRecord from './PlayerRecord';
import { StateContext } from '../pages/_app';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { calcPlayerCharacterIcon } from '../common/CharacterIcons';
import { calcPlayerCharacterTimesPlayed, calcPlayerCharactersPlayed, calcPlayerLevelImage, getCharacterTitle, publicAssetLink } from './smasherscape';

export const calcPlayerWins = (plyr: Player) => plyr.plays.filter(ply => ply.winner.toLowerCase() == plyr.name.toLowerCase()).length;
export const calcPlayerLosses = (plyr: Player) => plyr.plays.filter(ply => ply.loser.toLowerCase() == plyr.name.toLowerCase()).length;

export default function PlayerCard(props) {
    const { filteredPlayers, setFilteredPlayers } = useContext<any>(StateContext);
    let { plyr } = props;
    
    const setPlayerExpanded = (player: Player) => setFilteredPlayers(filteredPlayers.map(plyr => plyr.id == player.id ? { ...player, expanded: !player.expanded } : plyr));

    return <div id={`playerCard-${plyr.id}`} className={`playerCard ${plyr?.expanded ? `expandedPlayerCard` : `collapsedPlayerCard`}`}>
    <div className="gridCard" onClick={(e) => setPlayerExpanded(plyr)}>
        <LazyLoadImage effect="blur" src={`${publicAssetLink}/assets/smasherscape/OSRS_Card_Empty.png?raw=true`} className={`cardBG`} alt={`Smasherscape Player Card`} />
        <LazyLoadImage effect="blur" src={`${publicAssetLink}/assets/smasherscape/OSRS_Card_Template_Border_Only.png?raw=true`} className={`cardBG border`} alt={`Smasherscape Player Card`} />
        <div className="playerCardContent">
            <div className="cardTopRow">
                <div className="logoWithWords">
                    <img width={70} src={`${publicAssetLink}/assets/smasherscape/OSRS_Top_Hat.png?raw=true`} alt={`Tophat Logo`} />
                    <h3 className={`blackTextShadow slimmed`}>Xuruko's<br />SmasherScape</h3>
                </div>
                <h2 title={plyr?.name} className={`playerNameText bluePurpleTextShadow textOverflow overrideWithInlineBlock`}>{plyr?.name}</h2>
            </div>
            <div className="cardMiddleRow">
                <div className={`imgLeftCol ${plyr.level.name.split(` `)[0]}`}>
                    <img className={`cardLevelImage`} width={150} src={calcPlayerLevelImage(plyr?.level?.name)} alt={plyr?.level?.name} />
                    <h4 className={`levelName blackTextShadow slimmed ${plyr?.level?.name.split(` `)[0]}`}>{plyr?.level?.name}</h4>
                </div>
                <div className="recordPlays">
                    <div className="record">
                        <h3 className={`greenRecordText`}>Record</h3>
                        <h4>{calcPlayerWins(plyr)} - {calcPlayerLosses(plyr)}</h4>
                    </div>
                    <div className="plays">
                        <h3 className={`greenRecordText`}>Plays</h3>
                        <div className={`playsContainer ${calcPlayerCharactersPlayed(plyr)?.length > 0 ? `populatedPlays` : ``}`}>
                            {calcPlayerCharactersPlayed(plyr)?.length > 0 ? calcPlayerCharactersPlayed(plyr).map((char, charIndex) => {
                                return (
                                    <Badge title={`Played ${getCharacterTitle(char)} ${calcPlayerCharacterTimesPlayed(plyr, char)} Time(s)`} key={charIndex} badgeContent={calcPlayerCharacterTimesPlayed(plyr, char)} color="primary">
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
    <PlayerRecord plyr={plyr} />
</div>
}