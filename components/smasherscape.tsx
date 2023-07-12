import  moment from 'moment';
import { db } from '../firebase';
import { Badge } from '@mui/material';
import { Characters } from './Characters';
import { calcPlayerLevelAndExperience } from './Levels';
import { calcPlayerCharacterIcon } from './CharacterIcons';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { FormEvent, useContext, useRef, useState } from 'react';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { formatDate, createXML, StateContext, showAlert } from '../pages/_app';

export default function Smasherscape(props) {

    const commandsInput = useRef();
    const { players, setPlayers, filteredPlayers, setFilteredPlayers } = useContext<any>(StateContext);
    const [publicAssetLink, setPublicAssetLink] = useState(`https://github.com/strawhat19/Smasherscape/blob/main`);

    const calcPlayerWins = (plyr) => plyr.plays.filter(ply => ply.winner.toLowerCase() == plyr.name.toLowerCase()).length;
    const calcPlayerLosses = (plyr) => plyr.plays.filter(ply => ply.loser.toLowerCase() == plyr.name.toLowerCase()).length;
    const calcPlayerCharacterTimesPlayed = (plyr, char) => plyr.plays.map(ply => ply.character).filter(ply => ply.toLowerCase() == char || ply.toLowerCase().includes(char)).length;

    const getCharacterTitle = (char) => {
        if (char.split(` `).length > 1) char = char.split(` `).join(``).toLowerCase();
        return Characters[char];
    }

    const searchPlayers = (e: FormEvent) => {
        let field = e.target as HTMLInputElement;
        if (field.name == `search`) {
            if (field.value != ``) {
                setFilteredPlayers(players.filter(plyr => {
                    return Object.values(plyr).some(val =>
                        typeof val === `string` && val.toLowerCase().includes(field.value.toLowerCase())
                    );
                }));
            } else {
                setFilteredPlayers(players);
            }
        } else {
            return;
        }
    }

    const calcPlayerCharactersPlayed = (plyr) => {
        let charsPlayed = plyr.plays.map(ply => ply.character);
        let counts = charsPlayed.reduce((acc, char) => {
            acc[char] = (acc[char] || 0) + 1;
            return acc;
        }, {});
        let sortedChars = Object.entries(counts).sort((a: any, b: any) => b[1] - a[1]).map(entry => entry[0].toLowerCase());
        return sortedChars.slice(0,3);
    }

    const calcPlayerLevelImage = (levelName) => {
        if (levelName == `Bronze Scimitar`) return `${publicAssetLink}/assets/smasherscape/Bronze_Scimmy.png?raw=true`; 
        else if (levelName == `Iron Scimitar`) return `${publicAssetLink}/assets/smasherscape/Iron_Scimmy.png?raw=true`; 
        else if (levelName == `Steel Scimitar`) return `${publicAssetLink}/assets/smasherscape/Steel_Scimmy.png?raw=true`; 
        else if (levelName == `Mithril Scimitar`) return `${publicAssetLink}/assets/smasherscape/Mithril_Scimmy.png?raw=true`; 
        else if (levelName == `Adamantite Scimitar`) return `${publicAssetLink}/assets/smasherscape/Adamant_Scimmy.png?raw=true`; 
        else if (levelName == `Rune Scimitar`) return `${publicAssetLink}/assets/smasherscape/Rune_Scimmy.png?raw=true`; 
        else if (levelName == `Gilded Scimitar`) return `${publicAssetLink}/assets/smasherscape/Gilded_Scimmy.png?raw=true`; 
        else return `${publicAssetLink}/assets/smasherscape/OSRS_Top_Hat.png?raw=true`;
    }

    const addPlayers = (commandParams) => {
        let playersToAdd = commandParams.filter((comm, commIndex) => commIndex != 0 && comm);

        playersToAdd.forEach(plyr => {
            setPlayers(prevPlayers => {
                let updatedPlayers = [...prevPlayers, {
                    id: players.length + 1,
                    name: plyr.charAt(0).toUpperCase() + plyr.slice(1).toLowerCase(),
                    plays: [],
                    level: {
                        num: 1,
                        name: `Bronze Scimitar`
                    },
                    experience: {
                        xp: 0,
                        arenaXP: 0,
                        nextLevelAt: 83,
                        remainingXP: 83
                    },
                }];
                setFilteredPlayers(updatedPlayers);
                return updatedPlayers;
            });
        })
    }

    const deletePlayers = (commandParams) => {
        let playersToDeleteFromDB = [];
        let playersToDelete = commandParams.filter((comm, commIndex) => commIndex != 0 && comm);

        playersToDelete.forEach(player => {
            let playerDB = players.find(plyr => plyr?.name.toLowerCase() == player.toLowerCase() || plyr?.name.toLowerCase().includes(player.toLowerCase()));
            if (playerDB) {
                playersToDeleteFromDB.push(playerDB);
            }
        });

        if (playersToDeleteFromDB.length > 0) {
            playersToDeleteFromDB.forEach(playerDB => {
                setPlayers(prevPlayers => {
                    let updatedPlayers = prevPlayers.filter(plyr => plyr.name.toLowerCase() != playerDB.name.toLowerCase());
                    setFilteredPlayers(updatedPlayers);
                    return updatedPlayers;
                });
            })
        }
    }

    const updatePlayers = (commandParams) => {
        let playerOne = commandParams[1].toLowerCase();
        let playerTwo = commandParams[3].toLowerCase();
        let date = moment().format(`MMMM Do YYYY, h:mm:ss a`);

        let characterOne;
        let characterTwo;
        let stocksTaken;

        let playerOneDB = players.find(plyr => plyr?.name.toLowerCase() == playerOne || plyr?.name.toLowerCase().includes(playerOne));
        let playerTwoDB = players.find(plyr => plyr?.name.toLowerCase() == playerTwo || plyr?.name.toLowerCase().includes(playerTwo));

        if (commandParams.length >= 8) {
            characterOne = commandParams[5].toLowerCase();
            characterTwo = commandParams[7].toLowerCase();
            stocksTaken = parseInt(commandParams[8]) || 0;
        }

        if (!playerOneDB || !playerTwoDB) {
            showAlert(`Can't Find Players`, <h1>
                Can't find players with those names.
            </h1>, `65%`, `35%`);
            return;
        } else if (!characterOne || !characterTwo) {
            showAlert(`Missing Characters`, <h1>
                Which Charcaters Did They Play?
            </h1>, `65%`, `35%`);
            return;
        } else if (!Characters[characterOne] || !Characters[characterTwo]) {
            showAlert(`Cannot Find Characters`, <h1>
                Can't find characters with those names.
            </h1>, `65%`, `35%`);
            return;
        } else {

            let updatedPlayers = players.map(plyr => {
                if (plyr?.name.toLowerCase() == playerOne || plyr?.name.toLowerCase().includes(playerOne)) {
                    plyr.experience.arenaXP = plyr.experience.arenaXP + 400;
                    plyr.plays.push({
                        character: Characters[characterOne],
                        winner: playerOneDB?.name,
                        loser: playerTwoDB?.name,
                        stocksTaken,
                        date
                    });

                    calcPlayerLevelAndExperience(plyr);

                    return plyr;
                } else if (plyr?.name.toLowerCase() == playerTwo || plyr?.name.toLowerCase().includes(playerTwo)) {
                    plyr.experience.arenaXP = plyr.experience.arenaXP + (100 * stocksTaken);
                    plyr.plays.push({
                        character: Characters[characterTwo],
                        winner: playerOneDB?.name,
                        loser: playerTwoDB?.name,
                        stocksTaken,
                        date
                    });

                    calcPlayerLevelAndExperience(plyr);

                    return plyr;
                } else {
                    return plyr;
                }
            });

            console.log(`Updated Players`, updatedPlayers);
            setPlayers(updatedPlayers);
        }
    }

    const handleCommands = (e: FormEvent) => {
        e.preventDefault();
        let field = commandsInput.current as HTMLInputElement;
        if (field.name == `commands`) {
            let command = field?.value.toLowerCase();
            let commandParams = command.split(` `);
            
            if (command != ``) {
                if (commandParams[0].includes(`!upd`)) {
                    updatePlayers(commandParams);
                } else if (commandParams[0].includes(`!add`)) {
                    addPlayers(commandParams);
                } else if (commandParams[0].includes(`!del`)) {
                    deletePlayers(commandParams);
                }
            }
        } else {
            return;
        }
    }

    return <>
        <form onInput={(e) => searchPlayers(e)} onSubmit={(e) => handleCommands(e)} action="submit" className="gridForm">
            <div className={`inputWrapper`}><div className="inputBG"></div><input type="search" className="search" name={`search`} placeholder={`Search...`} /></div>
            <div className={`inputWrapper`}><div className="inputBG"></div><input ref={commandsInput} type="text" className="commands" name={`commands`} placeholder={`Commands...`} /></div>
            <button className={`formSubmitButton`} type={`submit`}>Submit</button>
        </form>
        <div id={props.id} className={`${props.className} playerGrid ${filteredPlayers.length == 0 ? `empty` : `populated`}`}>
            {filteredPlayers.length == 0 && <>
                <div className="gridCard"><h1 className={`runescape_large noPlayersFound`}>No Players Found</h1></div>
            </>}
            {filteredPlayers.length > 0 && filteredPlayers.sort((a,b) => {
                if (b.experience.arenaXP !== a.experience.arenaXP) {
                    return b.experience.arenaXP - a.experience.arenaXP;
                }
            
                return b.plays.length - a.plays.length;
            }).map((plyr, plyrIndex) => {
                return (
                    <div className="gridCard" key={plyrIndex}>
                        <LazyLoadImage effect="blur" src={`${publicAssetLink}/assets/smasherscape/OSRS_Card_Empty.png?raw=true`} className={`cardBG`} alt={`Smasherscape Player Card`} />
                        <LazyLoadImage effect="blur" src={`${publicAssetLink}/assets/smasherscape/OSRS_Card_Template_Border_Only.png?raw=true`} className={`cardBG border`} alt={`Smasherscape Player Card`} />
                        <div className="playerCardContent">
                            <div className="cardTopRow">
                                <div className="logoWithWords">
                                    <img width={70} src={`${publicAssetLink}/assets/smasherscape/OSRS_Top_Hat.png?raw=true`} alt={`Tophat Logo`} />
                                    <h3>Xuruko's<br />SmasherScape</h3>
                                </div>
                                <h2>{plyr?.name}</h2>
                            </div>
                            <div className="cardMiddleRow">
                                <div className="imgLeftCol">
                                    <img width={150} src={calcPlayerLevelImage(plyr?.level?.name)} alt={plyr?.level?.name} />
                                    <h4 className={`levelName ${plyr?.level?.name.split(` `)[0]}`}>{plyr?.level?.name}</h4>
                                </div>
                                <div className="recordPlays">
                                    <div className="record">
                                        <h3>Record</h3>
                                        <h4>{calcPlayerWins(plyr)} - {calcPlayerLosses(plyr)}</h4>
                                    </div>
                                    <div className="plays">
                                        <h3>Plays</h3>
                                        <div className={`playsContainer`}>
                                            {calcPlayerCharactersPlayed(plyr).map((char, charIndex) => {
                                                return (
                                                    <Badge title={`Played ${getCharacterTitle(char)} ${calcPlayerCharacterTimesPlayed(plyr, char)} Time(s)`} key={charIndex} badgeContent={calcPlayerCharacterTimesPlayed(plyr, char)} color="primary">
                                                        <img className={`charImg`} width={35} src={calcPlayerCharacterIcon(char)} alt={getCharacterTitle(char)} />
                                                    </Badge>
                                                )
                                            })}
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
                )
            })}
        </div>
    </>
}