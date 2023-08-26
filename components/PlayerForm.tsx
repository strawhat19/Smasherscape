import  moment from 'moment';
import Play from '../models/Play';
import Role from '../models/Role';
import Stock from '../models/Stock';
import Level from '../models/Level';
import { Badge } from '@mui/material';
import Player from '../models/Player';
import app, { db } from '../firebase';
import Experience from '../models/Experience';
import TextField from '@mui/material/TextField';
import { Characters } from '../common/Characters';
import Autocomplete from '@mui/material/Autocomplete';
import { Commands, defaultCommands } from './Commands';
import { calcPlayerLosses, calcPlayerWins } from './PlayerCard';
import { calcPlayerLevelAndExperience } from '../common/Levels';
import { calcPlayerCharacterIcon } from '../common/CharacterIcons';
import { FormEvent, useContext, useEffect, useRef, useState } from 'react';
import { StateContext, showAlert, defaultPlayers, formatDate, generateUniqueID, dev } from '../pages/_app';
import { doc, setDoc, collection, addDoc, getDocs, onSnapshot, deleteDoc, updateDoc } from 'firebase/firestore';
import { calcPlayerDeaths, calcPlayerKDRatio, calcPlayerKills, removeTrailingZeroDecimal } from './PlayerRecord';
import { calcPlayerCharacterTimesPlayed, calcPlayerCharactersPlayed, calcPlayerLevelImage, getActivePlayers, getCharacterTitle, isInvalid, newPlayerType } from './smasherscape';
import PlayerOption from './PlayerOption';
import CharacterOption from './CharacterOption';

export const addPlayerToDB = async (playerObj: Player) => await setDoc(doc(db, `players`, playerObj?.ID), playerObj);
export const deletePlayerFromDB = async (playerObj: Player) => await deleteDoc(doc(db, `players`, playerObj?.ID));
export const updatePlayerInDB = async (playerObj: Player, parameters) => {
    await updateDoc(doc(db, `players`, playerObj?.ID), parameters);
};

export const searchBlur = (e: any, filteredPlayers: Player[]) => {
    if (filteredPlayers?.length == 0) {
        e.target.value = ``;
    }
}

export const getAllCharacters = () => {
    return Object.entries(Characters).filter(char => char[0] === char[0].charAt(0).toUpperCase() + char[0].slice(1));
}

export const getCharacterObjects = () => {
    return getAllCharacters().map((char, charIndex) => {
        return {
            id: charIndex + 1,
            key: char[0],
            label: char[1],
            image: calcPlayerCharacterIcon(char[0]),
            shortcuts: Object.entries(Characters).filter(entry => entry[1] == char[1]).map(entr => entr[0]),
        }
    })
}

export const getUniqueCharactersPlayed = (players) => {
    return [...new Set(players.flatMap((p: Player) => p.plays.flatMap((play: Play) => [play.character, play.otherCharacter]) ))].sort();
}

export const playerConverter = {
    toFirestore: (playr) => {
        return newPlayerType(playr);
    },
    fromFirestore: (snapshot, options) => {
        const playrData = snapshot.data(options);
        return newPlayerType(playrData);
    }
};

export const updatePlayerPlays = (playState) => {
    let {
        plyr, 
        date,
        stocks,
        players, 
        winChar, 
        loserDB, 
        winnerDB, 
        loseChar, 
        lossStocks, 
        stocksTaken, 
        winnerOrLoser, 
    } = playState;

    plyr.updated = formatDate(new Date());
    plyr.lastUpdated = formatDate(new Date());

    let prevExp = plyr.experience.arenaXP;
    let newExp = winnerOrLoser == `winner` ? prevExp + (400 * plyr?.xpModifier) : prevExp + ((100 * plyr?.xpModifier) * stocksTaken);
    let expGained = newExp - prevExp;
    plyr.experience.arenaXP = newExp;

    let playUIDs = plyr.plays.some(ply => ply.uuid) ? plyr.plays.map(ply => ply?.uuid) : players.map(plr => plr.uuid);
    let playUUID = playUIDs.length > 0 ? generateUniqueID(playUIDs) : generateUniqueID();
    
    plyr.plays.push({
        otherCharacter: winnerOrLoser == `winner` ? loseChar : winChar,
        character: winnerOrLoser == `winner` ? winChar : loseChar,
        id: `player-${plyr.name}-play-${playUUID}`,
        winner: winnerDB?.name,
        loser: loserDB?.name,
        uuid: playUUID,
        stocksTaken,
        lossStocks,
        expGained,
        prevExp,
        newExp,
        stocks,
        date
    });

    calcPlayerLevelAndExperience(plyr);

    let wins = calcPlayerWins(plyr);
    let losses = calcPlayerLosses(plyr);
    let ratio = (wins/(wins+losses)) * 100;

    plyr.wins = wins;
    plyr.losses = losses;
    plyr.ratio = ratio;
    plyr.percentage = (ratio) > 100 ? 100 : parseFloat(removeTrailingZeroDecimal(ratio));
    plyr.kills = calcPlayerKills(plyr, plyr.plays);
    plyr.deaths = calcPlayerDeaths(plyr, plyr.plays);
    plyr.kdRatio = calcPlayerKDRatio(plyr, plyr.plays);

    return plyr;
}

export const createPlayer = (playerName, playerIndex, databasePlayers): Player => {

    let currentDateTimeStamp = formatDate(new Date());
    let uniqueIndex = databasePlayers.length + 1 + playerIndex;
    let currentDateTimeStampNoSpaces = formatDate(new Date(), `timezoneNoSpaces`);
    let uuid = generateUniqueID(databasePlayers.map(plyr => plyr?.uuid || plyr?.id));
    let displayName = playerName.charAt(0).toUpperCase() + playerName.slice(1).toLowerCase();
    let id = `${uniqueIndex}_Player_${displayName}_${currentDateTimeStampNoSpaces}_${uuid}`;
    let ID = `${uniqueIndex} ${displayName} ${currentDateTimeStamp} ${uuid}`;

    let playerObj: Player = {
        id,
        ID,
        uuid,
        uniqueIndex,
        displayName,
        active: true,
        xpModifier: 1,
        disabled: false,
        expanded: false,
        playerLink: false,
        name: displayName,
        lastUpdatedBy: id,
        plays: [] as Play[],
        username: displayName,
        created: currentDateTimeStamp,
        updated: currentDateTimeStamp,
        lastUpdated: currentDateTimeStamp,
        label: `${uniqueIndex} ${displayName}`,
        level: {
            num: 1,
            name: `Bronze Scimitar`
        } as Level,
        roles: [
            {
                promoted: currentDateTimeStamp,
                name: `Player`,
                level: 1,
            }
        ] as Role[],
        experience: {
            xp: 0,
            arenaXP: 0,
            nextLevelAt: 83,
            remainingXP: 83
        } as Experience,
    };

    let wins = calcPlayerWins(playerObj);
    let losses = calcPlayerLosses(playerObj);
    let ratio = (wins/(wins+losses)) * 100;
    
    playerObj.wins = wins;
    playerObj.losses = losses;
    playerObj.ratio = ratio;
    playerObj.percentage = (ratio) > 100 ? 100 : parseFloat(removeTrailingZeroDecimal(ratio));
    playerObj.kills = calcPlayerKills(playerObj, []);
    playerObj.deaths = calcPlayerDeaths(playerObj, []);
    playerObj.kdRatio = calcPlayerKDRatio(playerObj, []);

    return playerObj;
}

export default function PlayerForm(props) {

    const searchInput = useRef();
    const commandsInput = useRef();
    const { players, setPlayers, filteredPlayers, setFilteredPlayers, devEnv, useDatabase, useLocalStorage, commands, databasePlayers, setDatabasePlayers, setCommand, setCommandsToNotInclude, sameNamePlayeredEnabled, deleteCompletely } = useContext<any>(StateContext);

    const searchPlayers = (e: any, value?: any, type?) => {
        let field = e.target as HTMLInputElement;
        if (field && field.name == `commands`) return;
        if (!value) value = field.value;
        if (value && value != ``) {
            if (type == `playerName`) {
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
                if (typeof value == `string`) {
                    setFilteredPlayers(players.filter((plyr: Player) => {
                        return plyr.plays.map(ply => ply.character).some(char =>
                            typeof char === `string` && char.toLowerCase().includes(value?.toLowerCase())
                        );
                    }));
                } else {
                    setFilteredPlayers(players.filter((plyr: Player) => {
                        return plyr.plays.map(ply => ply.character).some(char =>
                            typeof char === `string` && char.toLowerCase().includes(value?.label?.toLowerCase())
                        );
                    }));
                }
            }
        } else {
            setFilteredPlayers(players);
        }
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

    const getCharacterObjs = (active) => {
        if (active == true) {
            return getAllCharacters().filter(char => getUniqueCharactersPlayed(players).includes(char[1])).map((char, charIndex) => {
                return {
                    id: charIndex + 1,
                    key: char[0],
                    label: char[1],
                    image: calcPlayerCharacterIcon(char[0])
                }
            })
        } else {
            return getAllCharacters().map((char, charIndex) => {
                return {
                    id: charIndex + 1,
                    key: char[0],
                    label: char[1],
                    image: calcPlayerCharacterIcon(char[0])
                }
            })
        }
    }

    useEffect(() => {
        const unsubscribeFromSmasherScapeSnapShot = onSnapshot(collection(db, `players`), (querySnapshot) => {
            const playersFromDatabase = [];
            querySnapshot.forEach((doc) => playersFromDatabase.push(doc.data()));
            dev() && console.log(`Database Update for Players`, playersFromDatabase.map(pla => newPlayerType(pla)));
            setPlayers(playersFromDatabase);
            setDatabasePlayers(playersFromDatabase);
            setFilteredPlayers(getActivePlayers(playersFromDatabase));
            localStorage.setItem(`players`, JSON.stringify(playersFromDatabase));
            if (getActivePlayers(playersFromDatabase).length < 2) {
                setCommand(defaultCommands.Delete);
                setCommandsToNotInclude([`!com`, `!add`, `!res`, `!set`, `!giv`, `!upd`]);
            } else {
                setCommand(defaultCommands.Update);
                setCommandsToNotInclude([`!com`, `!add`, `!res`, `!set`, `!giv`]);
            }
        });

        return () => {
            unsubscribeFromSmasherScapeSnapShot();
        };
    }, [])

    const addPlayers = (commandParams) => {
        let playersToAdd = commandParams.filter((comm, commIndex) => commIndex != 0 && comm);
        [...new Set(playersToAdd)].forEach((plyr: any, plyrIndex) => {
            let playerObj: Player = createPlayer(plyr, plyrIndex, databasePlayers);
            if (useDatabase == true) {
                if (sameNamePlayeredEnabled) {
                    addPlayerToDB(playerObj);
                    return playerObj;
                } else {
                    if (!getActivePlayers(players).map(playr => playr.name.toLowerCase()).some(nam => nam == plyr.toLowerCase())) {
                        addPlayerToDB(playerObj);
                        return playerObj;
                    } else {
                        showAlert(`Player(s) Added Already`, <h1>
                            Player(s) with those name(s) already exist.
                        </h1>, `65%`, `35%`);
                        return;
                    }
                }
            } else {
                if (!getActivePlayers(players).map(playr => playr.name.toLowerCase()).some(nam => nam == plyr.toLowerCase())) {
                    setPlayers(prevPlayers => {
                        let updatedPlayers: Player[] = [...prevPlayers, playerObj];
                        setFilteredPlayers(updatedPlayers);
                        updatePlayersDB(updatedPlayers);
                        return updatedPlayers;
                    });
                } else {
                    showAlert(`Player(s) Added Already`, <h1>
                        Player(s) with those name(s) already exist.
                    </h1>, `65%`, `35%`);
                    return;
                }
            }
        })
    }

    const deletePlayers = (commandParams) => {
        let playersToDeleteFromDB: Player[] = [];
        let playersToDelete = commandParams.filter((comm, commIndex) => commIndex != 0 && comm);

        playersToDelete.forEach(player => {
            let playerDB: Player = getActivePlayers(players).find(plyr => plyr?.name.toLowerCase() == player.toLowerCase() || plyr?.name.toLowerCase().includes(player.toLowerCase()));
            if (playerDB) {
                playersToDeleteFromDB.push(playerDB);
            }
        });

        if (playersToDeleteFromDB.length > 0) {
            playersToDeleteFromDB.forEach((playerDB: Player) => {
                (document.querySelector(`.clearAllTagsIcon`) as any).click();
                if (useDatabase == true) {
                    if (deleteCompletely) {
                        return deletePlayerFromDB(playerDB);
                    } else {
                        return updatePlayerInDB(playerDB, {disabled: true, active: false})
                    }
                } else {
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
                }
            })
        } else {
            showAlert(`Can't Find Players`, <h1>
                Can't find players with those names.
            </h1>, `65%`, `35%`);
            return;
        }
    }

    const setParameter = (commandParams) => {
        let updatedPlayers: Player[] = [];
        let playerToSet = commandParams[1].toLowerCase();
        let parameter = commandParams[2].toLowerCase();
        let amount = parseFloat(commandParams[3]);
        let playerToSetDB: Player = players.find(plyr => plyr?.name.toLowerCase() == playerToSet || plyr?.name.toLowerCase().includes(playerToSet));

        if (!playerToSetDB) {
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
                        if (plyr?.name.toLowerCase() == playerToSetDB?.name?.toLowerCase() || plyr?.name.toLowerCase().includes(playerToSetDB?.name?.toLowerCase())) {
                            plyr.xpModifier = amount;
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
                            plyr.experience.arenaXP = plyr.experience.arenaXP + (plyr?.xpModifier ? (amount * plyr?.xpModifier) : amount);
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
        let date = moment().format(`h:mm:ss a, MMMM Do YYYY`);
        // let currentDateTimeStamp = formatDate(new Date());
        let playerOneName = commandParams[1].toLowerCase();
        let conditionName = commandParams[2].toLowerCase();
        let playerTwoName = commandParams[3].toLowerCase();
        // let date = currentDateTimeStamp;

        let playerOneDB = getActivePlayers(players, false).find(plyr => plyr?.name.toLowerCase() == playerOneName || plyr?.name.toLowerCase().includes(playerOneName));
        let playerTwoDB = getActivePlayers(players, false).find(plyr => plyr?.name.toLowerCase() == playerTwoName || plyr?.name.toLowerCase().includes(playerTwoName));

        let characterOne;
        let characterTwo;
        let stocksTaken;

        let winCons = [`beat`, `beats`, `has-beaten`, `destroys`, `destroyed`, `defeats`, `defeated`, `has-defeated`, `conquers`, `vanquishes`, `vanquished`, `fells`, `crushes`, `kills`, `killed`];
        let loseCons = [`loses-to`, `falls-to`, `defeated-by`, `destroyed-by`];

        if (commandParams.length >= 8) {
            characterOne = commandParams[5].toLowerCase();
            characterTwo = commandParams[7].toLowerCase();
            stocksTaken = parseInt(commandParams[8]) || 0;
        }

        if (!playerOneDB || !playerTwoDB) {
            console.log(`Can't Find Players`, {playerOneDB, playerTwoDB});
            showAlert(`Can't Find Players`, <h1>
                Can't find players with those names.
            </h1>, `65%`, `35%`);
            return;
        } else if (!winCons.includes(conditionName) && !loseCons.includes(conditionName)) {
            showAlert(`Missing Condition`, <h1>
                Did player one win or lose?
            </h1>, `65%`, `35%`);
            return;
        } else if (!characterOne || !characterTwo) {
            // console.log(`Missing Characters`, !characterOne, !characterTwo);
            showAlert(`Missing Characters`, <h1>
                Which Charcaters Did They Play?
            </h1>, `65%`, `35%`);
            return;
        } else if (!Characters[characterOne] || !Characters[characterTwo]) {
            // devEnv && console.log(`Cannot Find Characters`, {characterOne, characterTwo}, !Characters[characterOne], !Characters[characterTwo]);
            showAlert(`Cannot Find Characters`, <h1>
                Can't find characters with those names.
            </h1>, `65%`, `35%`);
            return;
        } else if (stocksTaken >= 3) {
            showAlert(`Invalid Stocks Taken`, <h1>
                Stocks taken should be less than 3.
            </h1>, `65%`, `35%`);
            return;
        } else {

            let winner = winCons.includes(conditionName) ? playerOneName : playerTwoName;
            let loser = winCons.includes(conditionName) ? playerTwoName : playerOneName;
            let winnerDB = (playerOneDB?.name?.toLowerCase() == winner || playerOneDB?.name.toLowerCase().includes(winner)) ? playerOneDB : playerTwoDB;
            let loserDB = (playerTwoDB?.name?.toLowerCase() == loser || playerTwoDB?.name.toLowerCase().includes(loser)) ? playerTwoDB : playerOneDB;
            let winChar = winCons.includes(conditionName) ? Characters[characterOne] : Characters[characterTwo];
            let loseChar = winCons.includes(conditionName) ? Characters[characterTwo] : Characters[characterOne];
            
            let stocks: Stock[] = [
                {
                    character: winChar,
                }, 
                {
                    character: winChar,
                }, 
                {
                    character: winChar,
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
                    character: loseChar,
                    dead: true
                }, 
                {
                    character: loseChar,
                    dead: true
                }, 
                {
                    character: loseChar,
                    dead: true
                }
            ];

            let playState = {
                date,
                stocks,
                players, 
                winChar, 
                loserDB, 
                winnerDB, 
                loseChar, 
                lossStocks, 
                stocksTaken,  
            }

            let updatedPlayers: any[] = getActivePlayers(players, false).map((plyr) => {
                if (plyr?.id == winnerDB?.id) {
                    updatePlayerPlays({...playState, plyr, winnerOrLoser: `winner`});
                    return plyr;
                } else if (plyr?.id == loserDB?.id) {
                    updatePlayerPlays({...playState, plyr, winnerOrLoser: `loser`});
                    return plyr;
                } else {
                    return plyr;
                }
            });

            if (useDatabase == true) {
                updatePlayerInDB(winnerDB, updatedPlayers.find(plyr => plyr.id == winnerDB.id));
                updatePlayerInDB(loserDB, updatedPlayers.find(plyr => plyr.id == loserDB.id));
            } else {
                updatePlayersDB(updatedPlayers);
                setPlayers(updatedPlayers);
            }
        }
    }

    const handleCommands = (e: FormEvent) => {
        e.preventDefault();
        let field = commandsInput.current as HTMLInputElement;
        if (field.name == `commands`) {
            let commandFromForm = field?.value.toLowerCase();
            processCommands(commandFromForm);
        } else {
            return;
        }
    }

    const processCommands = (commandFromForm) => {
        let commandParams = commandFromForm.split(` `);
        let firstCommand = commandParams[0];
        
        if (commandFromForm != ``) {
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
            } else {
                showCommands();
            }
        }
    }

    return <section className={`formsSection`}>
    <form id={`playerForm`} onSubmit={(e) => handleCommands(e)} action="submit" className="gridForm">
        <div className={`inputWrapper materialBGInputWrapper`}>
            <div className="inputBG materialBG"></div>
            <Autocomplete
                autoHighlight
                ref={searchInput}
                id="playerSearchAuto-1"
                sx={{ width: `100%` }}
                options={getActivePlayers(players)}
                getOptionLabel={(option) => option.label}
                onChange={(e, val: any) => searchPlayers(e, val, `playerName`)}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                onInputChange={(e, val: any) => searchPlayers(e, val, `playerName`)}
                renderInput={(params) => <TextField name={`search`} onBlur={(e) => searchBlur(e, filteredPlayers)} {...params} label="Search Player(s) by Name..." />}
                noOptionsText={`No Player(s) Found for Search`}
                renderOption={(props: any, playerOption: any) => {
                    return (
                        <PlayerOption key={playerOption.id} playerOption={playerOption} {...props} />
                        // <div key={playerOption.id} {...props}>
                        //     <div className="autocompleteOption">
                        //         <div className="levelNumColumn">Lv {playerOption?.level?.num}</div>
                        //         <div className="levelImageColumn"><img width={30} src={calcPlayerLevelImage(playerOption?.level?.name)} alt={playerOption?.level?.name} /></div>
                        //         <div className="playerDetailsColumn">
                        //             <div className="playerName">{playerOption?.name}</div>
                        //             <div className="playerEXP">Exp: {playerOption?.experience?.arenaXP}</div>
                        //             <div className="plays">
                        //                 <div className={`playsContainer`}>
                        //                     {calcPlayerCharactersPlayed(playerOption).map((char, charIndex) => {
                        //                         return (
                        //                             <Badge title={`Played ${getCharacterTitle(char)} ${calcPlayerCharacterTimesPlayed(playerOption, char)} Time(s)`} key={charIndex} badgeContent={calcPlayerCharacterTimesPlayed(playerOption, char)} color="primary">
                        //                                 <img className={`charImg`} width={25} src={calcPlayerCharacterIcon(char)} alt={getCharacterTitle(char)} />
                        //                             </Badge>
                        //                         )
                        //                     })}
                        //                 </div>
                        //             </div>
                        //         </div>
                        //     </div>
                        // </div>
                    )
                }}
            />
        </div>
        <div id={`commandsInput`} className={`inputWrapper`}>
            <div className="inputBG"></div>
            <input ref={commandsInput} type="text" className="commands" name={`commands`} placeholder={`Enter Commands...`} />
        </div>
        <div className={`characterSearchAuto inputWrapper materialBGInputWrapper`}>
            <div className="inputBG materialBG"></div>
            <Autocomplete
                autoHighlight
                id="characterSearchAuto-1"
                sx={{ width: `100%` }}
                options={getCharacterObjs(true)}
                getOptionLabel={(option) => option.label}
                onChange={(e, val: any) => searchPlayers(e, val, `searchCharacters`)}
                onInputChange={(e, val: any) => searchPlayers(e, val, `searchCharacters`)}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={(params) => <TextField name={`characters`} {...params} label="Search Player(s) by Character(s) Played..." />}
                noOptionsText={`No Character(s) Found for Search`}
                renderOption={(props: any, characterOption: any) => {
                    return (
                       <CharacterOption key={characterOption.id} characterOption={characterOption} {...props} />
                    )
                }}
            />
        </div>
        <button className={`formSubmitButton`} type={`submit`}>Submit</button>
    </form>
</section>
}