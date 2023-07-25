import  moment from 'moment';
import { db } from '../firebase';
import StepForm from './StepForm';
import Play from '../models/Play';
import Stock from '../models/Stock';
import Level from '../models/Level';
import { Badge } from '@mui/material';
import Player from '../models/Player';
import { Commands } from './Commands';
import PlayerRecord from './PlayerRecord';
import Experience from '../models/Experience';
import Skeleton from '@mui/material/Skeleton';
import TextField from '@mui/material/TextField';
import { Characters } from '../common/Characters';
import Autocomplete from '@mui/material/Autocomplete';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { FormEvent, useContext, useRef, useState } from 'react';
import { calcPlayerLevelAndExperience } from '../common/Levels';
import { calcPlayerCharacterIcon } from '../common/CharacterIcons';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { formatDate, createXML, StateContext, showAlert, dev, defaultPlayers } from '../pages/_app';

export const publicAssetLink = `https://github.com/strawhat19/Smasherscape/blob/main`;
export const calcPlayerCharacterTimesPlayed = (plyr: Player, char) => plyr.plays.map(ply => ply.character).filter(ply => ply.toLowerCase() == char || ply.toLowerCase().includes(char)).length;

export const getCharacterTitle = (char) => {
    if (char.split(` `).length > 1) char = char.split(` `).join(``).toLowerCase();
    return Characters[char];
}

export const searchBlur = (e: any, filteredPlayers: Player[]) => {
    if (filteredPlayers?.length == 0) {
        e.target.value = ``;
    }
}

export const newPlayerType = (player: Player) => {
    let { id, name, expanded } = player;
    let level: Level = new Level(player.level.name, player.level.num) as Level;
    let experience: Experience = new Experience(player.experience.nextLevelAt, player.experience.remainingXP, player.experience.arenaXP, player.experience.xp) as Experience;
    let plays: Play[] = player.plays.map((play: Play) => {
        let { date, loser, winner, stocks, character, stocksTaken, lossStocks, otherCharacter } = play;
        return new Play(date, loser, winner, stocks, character, stocksTaken, lossStocks, otherCharacter);
    }) as Play[];
    let newPlayer: Player = new Player(id, name, level, plays, expanded, experience) as Player;
    Object.keys(newPlayer).forEach(key => isInvalid(newPlayer[key]) && delete newPlayer[key]);
    return newPlayer as Player;
}

export const getActivePlayers = (players: Player[]) => {
    return players
        .filter(plyr => !plyr.disabled)
        .sort((a,b) => {
            if (b.experience.arenaXP !== a.experience.arenaXP) {
                return b.experience.arenaXP - a.experience.arenaXP;
            }
            return b.plays.length - a.plays.length;
        })
        .map((player: Player) => {
            let newPlayer = newPlayerType(player);
            return newPlayer;
        });
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

    const searchInput = useRef();
    const commandsInput = useRef();
    const { players, setPlayers, filteredPlayers, setFilteredPlayers, devEnv, setDevEnv, useLocalStorage, commands } = useContext<any>(StateContext);

    const calcPlayerWins = (plyr: Player) => plyr.plays.filter(ply => ply.winner.toLowerCase() == plyr.name.toLowerCase()).length;
    const calcPlayerLosses = (plyr: Player) => plyr.plays.filter(ply => ply.loser.toLowerCase() == plyr.name.toLowerCase()).length;

    const searchPlayers = (e: any, value?: any) => {
        let field = e.target as HTMLInputElement;
        if (field && field.name == `commands`) return;
        if (!value) value = field.value;
        if (value && value != ``) {
            if (typeof value == `string`) {
                setFilteredPlayers(players.filter((plyr: Player) => {
                    return Object.values(plyr).some(val =>
                        typeof val === `string` && val.toLowerCase().includes(value?.toLowerCase())
                    );
                }));
            } else {
                setFilteredPlayers(players.filter((plyr: Player) => {
                    return Object.values(plyr).some(val =>
                        typeof val === `string` && val.toLowerCase().includes(value?.name?.toLowerCase())
                    );
                }));
            }
        } else {
            setFilteredPlayers(players);
        }
    }

    const setPlayerExpanded = (player: Player) => {
        let updatedPlayers: Player[] = players.map((plyr: Player) => {
            if (plyr?.id == player?.id) {
                if (plyr.expanded) {
                    plyr.expanded = !plyr.expanded;
                    return plyr;
                } else {
                    plyr.expanded = true;
                    return plyr;
                }
            } else {
                return plyr;
            }
        });
        setFilteredPlayers(updatedPlayers);
        return updatedPlayers;
    }

    const updatePlayersDB = (updatedPlayers: Player[]) => {
        devEnv && console.log(`Updated Players`, getActivePlayers(updatedPlayers));
        useLocalStorage && localStorage.setItem(`players`, JSON.stringify(updatedPlayers));
    }

    const resetPlayers = (commandParams) => {
        setPlayers(defaultPlayers);
        setFilteredPlayers(defaultPlayers);
        updatePlayersDB(defaultPlayers);
    }

    const showCommands = () => {
        showAlert(`Here are the RukoBot Commands so far: (Hover to Click to Copy)`, <div className={`alertInner`}>
            <Commands commands={commands} devEnv={devEnv} />
        </div>, `85%`, `auto`);
    }

    const addPlayers = (commandParams) => {
        let playersToAdd = commandParams.filter((comm, commIndex) => commIndex != 0 && comm);

        playersToAdd.forEach(plyr => {
            setPlayers(prevPlayers => {
                let updatedPlayers: Player[] = [...prevPlayers, {
                    id: players.length + 1,
                    name: plyr.charAt(0).toUpperCase() + plyr.slice(1).toLowerCase(),
                    plays: [] as Play[],
                    level: {
                        num: 1,
                        name: `Bronze Scimitar`
                    } as Level,
                    experience: {
                        xp: 0,
                        arenaXP: 0,
                        nextLevelAt: 83,
                        remainingXP: 83
                    } as Experience,
                }];
                setFilteredPlayers(updatedPlayers);
                updatePlayersDB(updatedPlayers);
                return updatedPlayers;
            });
        })
    }

    const deletePlayers = (commandParams) => {
        let playersToDeleteFromDB: Player[] = [];
        let playersToDelete = commandParams.filter((comm, commIndex) => commIndex != 0 && comm);

        playersToDelete.forEach(player => {
            let playerDB: Player = players.find(plyr => plyr?.name.toLowerCase() == player.toLowerCase() || plyr?.name.toLowerCase().includes(player.toLowerCase()));
            if (playerDB) {
                playersToDeleteFromDB.push(playerDB);
            }
        });

        if (playersToDeleteFromDB.length > 0) {
            playersToDeleteFromDB.forEach((playerDB: Player) => {
                setPlayers(prevPlayers => {
                    let updatedPlayers: Player[] = prevPlayers.map((plyr: Player) => {
                        if (plyr.name.toLowerCase() == playerDB.name.toLowerCase()) {
                            return {
                                ...plyr,
                                disabled: true
                            } as Player
                        } else {
                            return plyr as Player;
                        }
                    });
                    setFilteredPlayers(updatedPlayers);
                    updatePlayersDB(updatedPlayers);
                    return updatedPlayers;
                });
            })
        }
    }

    const setParameter = (commandParams) => {
        let updatedPlayers: Player[] = [];
        let playerToSet = commandParams[1].toLowerCase();
        let parameter = commandParams[2].toLowerCase();
        let amount = parseFloat(commandParams[3]);
        let playerToSetDB: Player = players.find(plyr => plyr?.name.toLowerCase() == playerToSet || plyr?.name.toLowerCase().includes(playerToSet));
        devEnv && console.log(`Set Parameter`, commandParams);
    }

    const giveParameter = (commandParams) => {
        let updatedPlayers: Player[] = [];
        let playerToGive = commandParams[1].toLowerCase();
        let parameter = commandParams[2].toLowerCase();
        let amount = parseFloat(commandParams[3]);
        let playerToGiveDB: Player = players.find(plyr => plyr?.name.toLowerCase() == playerToGive || plyr?.name.toLowerCase().includes(playerToGive));

        if (!playerToGiveDB) {
            showAlert(`Can't Find Players`, <h1>
                Can't find players with that name.
            </h1>, `65%`, `35%`);
            return;
        } else {
            if (isInvalid(parameter) || isInvalid(amount)) {
                showAlert(`Please Enter Parameter & Valid Amount`, <h1>
                    Please Enter Parameter such as `xp`.
                    Please Enter Valid Amount such as `100` or `-500`.
                </h1>, `65%`, `35%`);
                return;
            } else {
                if (parameter == `xp`) {
                    updatedPlayers = players.map(plyr => {
                        if (plyr?.name.toLowerCase() == playerToGiveDB?.name?.toLowerCase() || plyr?.name.toLowerCase().includes(playerToGiveDB?.name?.toLowerCase())) {
                            plyr.experience.arenaXP = plyr.experience.arenaXP + amount;
                            calcPlayerLevelAndExperience(plyr);
                            return plyr as Player;
                        } else {
                            return plyr as Player;
                        }
                    });
                }

                updatePlayersDB(updatedPlayers);
                setPlayers(updatedPlayers);
            }
        }
    }

    const updatePlayers = (commandParams) => {
        let playerOne = commandParams[1].toLowerCase();
        let playerTwo = commandParams[3].toLowerCase();
        let date = moment().format(`h:mm:ss a, MMMM Do YYYY`);

        let characterOne;
        let characterTwo;
        let stocksTaken;

        let playerOneDB: Player = players.find(plyr => plyr?.name.toLowerCase() == playerOne || plyr?.name.toLowerCase().includes(playerOne));
        let playerTwoDB: Player = players.find(plyr => plyr?.name.toLowerCase() == playerTwo || plyr?.name.toLowerCase().includes(playerTwo));

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

            let stocks: Stock[] = [
                {
                    character: Characters[characterOne],
                }, 
                {
                    character: Characters[characterOne],
                }, 
                {
                    character: Characters[characterOne],
                }
            ].map((stk: Stock, stkIndex) => {
                if (stkIndex < stocksTaken) {
                    return {
                        ...stk,
                        dead: true
                    } as Stock
                } else {
                    return {
                        ...stk,
                    } as Stock
                }
            });

            let lossStocks: Stock[] = [
                {
                    character: Characters[characterTwo],
                    dead: true
                }, 
                {
                    character: Characters[characterTwo],
                    dead: true
                }, 
                {
                    character: Characters[characterTwo],
                    dead: true
                }
            ];

            let updatedPlayers: Player[] = players.map((plyr: Player) => {
                if (plyr?.name.toLowerCase() == playerOne || plyr?.name.toLowerCase().includes(playerOne)) {
                    plyr.experience.arenaXP = plyr.experience.arenaXP + 400;
                    plyr.plays.push({
                        otherCharacter: Characters[characterTwo],
                        character: Characters[characterOne],
                        winner: playerOneDB?.name,
                        loser: playerTwoDB?.name,
                        stocksTaken,
                        lossStocks,
                        stocks,
                        date
                    });

                    calcPlayerLevelAndExperience(plyr);

                    return plyr as Player;
                } else if (plyr?.name.toLowerCase() == playerTwo || plyr?.name.toLowerCase().includes(playerTwo)) {
                    plyr.experience.arenaXP = plyr.experience.arenaXP + (100 * stocksTaken);
                    plyr.plays.push({
                        otherCharacter: Characters[characterOne],
                        character: Characters[characterTwo],
                        winner: playerOneDB?.name,
                        loser: playerTwoDB?.name,
                        stocksTaken,
                        lossStocks,
                        stocks,
                        date
                    });

                    calcPlayerLevelAndExperience(plyr);

                    return plyr as Player;
                } else {
                    return plyr as Player;
                }
            });

            updatePlayersDB(updatedPlayers);
            setPlayers(updatedPlayers);
        }
    }

    const handleCommands = (e: FormEvent) => {
        e.preventDefault();
        let field = commandsInput.current as HTMLInputElement;
        if (field.name == `commands`) {
            let command = field?.value.toLowerCase();
            let commandParams = command.split(` `);
            let firstCommand = commandParams[0];
            
            if (command != ``) {
                if (firstCommand.includes(`!upd`)) {
                    updatePlayers(commandParams);
                } else if (firstCommand.includes(`!add`)) {
                    addPlayers(commandParams);
                } else if (firstCommand.includes(`!del`)) {
                    deletePlayers(commandParams);
                } else if (firstCommand.includes(`!res`)) {
                    resetPlayers(commandParams);
                } else if (firstCommand.includes(`!giv`)) {
                    giveParameter(commandParams);
                } else if (firstCommand.includes(`!set`)) {
                    setParameter(commandParams);
                } else if (firstCommand.includes(`!com`)) {
                    showCommands();
                }
            }
        } else {
            return;
        }
    }

    return <main className={`smasherscapeLeaderboard`}>
        <section className={`formsSection`}>
            <form onSubmit={(e) => handleCommands(e)} action="submit" className="gridForm">
                <div className={`inputWrapper materialBGInputWrapper`}>
                    <div className="inputBG materialBG"></div>
                    <Autocomplete
                        ref={searchInput}
                        disablePortal
                        autoHighlight
                        id="combo-box-demo"
                        sx={{ width: `100%` }}
                        options={getActivePlayers(players).map(plyr => {
                            return {
                                ...plyr,
                                label: plyr.name,
                            }
                        })}
                        getOptionLabel={(option) => option.label}
                        onChange={(e, val: any) => searchPlayers(e, val)}
                        onInputChange={(e, val: any) => searchPlayers(e, val)}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        renderInput={(params) => <TextField name={`search`} onBlur={(e) => searchBlur(e, filteredPlayers)} {...params} label="Search..." />}
                        renderOption={(props: any, option: any) => {
                            return (
                                <div key={props?.key} {...props}>
                                    <div className="autocompleteOption">
                                        <div className="levelNumColumn">{option?.level?.num}</div>
                                        <div className="levelImageColumn"><img width={30} src={calcPlayerLevelImage(option?.level?.name)} alt={option?.level?.name} /></div>
                                        <div className="playerDetailsColumn">
                                            <div className="playerName">{option?.label}</div>
                                            <div className="playerEXP">{option?.experience?.arenaXP}</div>
                                            <div className="plays">
                                                <div className={`playsContainer`}>
                                                    {calcPlayerCharactersPlayed(option).map((char, charIndex) => {
                                                        return (
                                                            <Badge title={`Played ${getCharacterTitle(char)} ${calcPlayerCharacterTimesPlayed(option, char)} Time(s)`} key={charIndex} badgeContent={calcPlayerCharacterTimesPlayed(option, char)} color="primary">
                                                                <img className={`charImg`} width={25} src={calcPlayerCharacterIcon(char)} alt={getCharacterTitle(char)} />
                                                            </Badge>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }}
                    />
                </div>
                <div className={`inputWrapper`}><div className="inputBG"></div><input ref={commandsInput} type="text" className="commands" name={`commands`} placeholder={`Commands...`} /></div>
                <button className={`formSubmitButton`} type={`submit`}>Submit</button>
            </form>
        </section>
        <div id={props.id} className={`${props.className} playerGrid ${getActivePlayers(filteredPlayers)?.length == 0 ? `empty` : `populated`}`}>
            {getActivePlayers(filteredPlayers)?.length == 0 && <>
                <div className="gridCard"><h1 className={`runescape_large noPlayersFound`}>No Players Found</h1></div>
            </>}
            {getActivePlayers(filteredPlayers)?.length > 0 && getActivePlayers(filteredPlayers)?.map((plyr, plyrIndex) => {
                if (plyr) {
                    return (
                        <div className={`playerCard ${plyr?.expanded ? `expandedPlayerCard` : `collapsedPlayerCard`}`} key={plyrIndex}>
                            <div className="gridCard" onClick={(e) => setPlayerExpanded(plyr)}>
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
                                            <img className={`cardLevelImage`} width={150} src={calcPlayerLevelImage(plyr?.level?.name)} alt={plyr?.level?.name} />
                                            <h4 className={`levelName ${plyr?.level?.name.split(` `)[0]}`}>{plyr?.level?.name}</h4>
                                        </div>
                                        <div className="recordPlays">
                                            <div className="record">
                                                <h3 className={`greenRecordText`}>Record</h3>
                                                <h4>{calcPlayerWins(plyr)} - {calcPlayerLosses(plyr)}</h4>
                                            </div>
                                            <div className="plays">
                                                <h3 className={`greenRecordText`}>Plays</h3>
                                                <div className={`playsContainer`}>
                                                    {calcPlayerCharactersPlayed(plyr)?.length > 0 ? calcPlayerCharactersPlayed(plyr).map((char, charIndex) => {
                                                        return (
                                                            <Badge title={`Played ${getCharacterTitle(char)} ${calcPlayerCharacterTimesPlayed(plyr, char)} Time(s)`} key={charIndex} badgeContent={calcPlayerCharacterTimesPlayed(plyr, char)} color="primary">
                                                                <img className={`charImg`} width={35} src={calcPlayerCharacterIcon(char)} alt={getCharacterTitle(char)} />
                                                            </Badge>
                                                        )
                                                    }) : <div className={`flex center`}>
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
                    )
                } else {
                    <Skeleton variant="rectangular" width={210} height={118} />
                }
            })}
        </div>
    </main>
}