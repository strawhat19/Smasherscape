import  moment from 'moment';
import { db } from '../firebase';
import Play from '../models/Play';
import Role from '../models/Role';
import Stock from '../models/Stock';
import Level from '../models/Level';
import Player from '../models/Player';
import { Commands } from './Commands';
import PlayerOption from './PlayerOption';
import { matchSorter } from 'match-sorter';
import Experience from '../models/Experience';
import Parameters from '../models/Parameters';
import TextField from '@mui/material/TextField';
import CharacterOption from './CharacterOption';
import { Characters } from '../common/Characters';
import Autocomplete from '@mui/material/Autocomplete';
import { calcPlayerLosses, calcPlayerWins } from './PlayerCard';
import { calcPlayerLevelAndExperience } from '../common/Levels';
import { FormEvent, useContext, useRef } from 'react';
import { calcPlayerCharacterIcon } from '../common/CharacterIcons';
import { doc, setDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { checkUserRole, getActivePlayers, isInvalid, newPlayerType } from './smasherscape';
import { calcPlayerDeaths, calcPlayerKDRatio, calcPlayerKills, removeTrailingZeroDecimal } from './PlayerRecord';
import { StateContext, showAlert, formatDate, generateUniqueID, countPropertiesInObject, getActivePlayersJSON, useDatabaseName, getAllPlays, getAllPlaysJSON, defaultXPMultiplier, XPGainOnWin, XPGainOnLoserXPForEachStockTaken, winCons, loseCons, dev, useDB } from '../pages/_app';
import User from '../models/User';

export const testUsersDatabaseName = `testUsers`;
export const productionUsersDatabaseName = `users`;
export const developmentUsersDatabaseName = `devUsers`;
export const usersDatabaseName = developmentUsersDatabaseName;
export const addUserToDB = async (userObj: any) => await setDoc(doc(db, usersDatabaseName, userObj?.ID), userObj);
export const deletePlayerFromDB = async (playerObj: Player) => await deleteDoc(doc(db, useDatabaseName, playerObj?.ID));
export const addPlayerToDB = async (playerObj: Player) => await setDoc(doc(db, useDatabaseName, playerObj?.ID), playerObj);
export const updatePlayerInDB = async (playerObj: Player, parameters) => await updateDoc(doc(db, useDatabaseName, playerObj?.ID), parameters);
export const getAllCharacters = () => Object.entries(Characters).filter(char => char[0] === char[0].charAt(0).toUpperCase() + char[0].slice(1));

export const getUniqueCharactersPlayed = (players) => {
    return [...new Set(players.flatMap((p: Player) => p.plays.flatMap((play: Play) => [play.character, play.otherCharacter]) ))].sort();
}

export const updatePlayersLocalStorage = (updatedPlayers: Player[]) => {
    console.log(`Updated Players`, getActivePlayers(updatedPlayers));
    localStorage.setItem(`players`, JSON.stringify(updatedPlayers));
}

export const searchBlur = (e: any, filteredPlayers: Player[]) => {
    if (filteredPlayers?.length == 0) {
        e.target.value = ``;
    }
}

export const showCommandsWithParameters = (parameters) => {
    let { commands, devEnv } = parameters
    showAlert(`Smasherscape Commands`, <div className={`alertInner`}>
        <Commands id={`commandsList`} commands={commands} devEnv={devEnv} />
    </div>, `85%`, `auto`);
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

export const showPropertiesWarning = (type, winner: Player, loser: Player) => {
    showAlert(`${type == `Critical` ? `Critical! ` : ``}Player is Approaching 20,000 Properties`, <div>
        <h1>One of the players is approaching 20,000 properties.</h1>
        <h1>{winner.name}: {winner.properties}, {loser.name}: {loser.properties}</h1>
        {type == `Critical` ? <h1>This change did not go through, please ask Rakib if he has implemented dynamic scaling yet.</h1> : (
            <h1>For now the update will go through, but make sure you implement scaling.</h1>
        )}
        <h1>For this player, create a new document with the same id as them.</h1>
        <h1>Then we can continue to update the plays on that new document.</h1>
    </div>, `65%`, `35%`);
}

export const getCharacterObjects = () => {
    let characterObjects = getAllCharacters().map((char, charIndex) => {
        return {
            id: charIndex + 1,
            key: char[0],
            label: char[1],
            image: calcPlayerCharacterIcon(char[0]),
            shortcuts: Object.entries(Characters).filter(entry => entry[1] == char[1]).map(entr => entr[0]),
        }
    });
    // if (active == true) {
        // return characterObjects.filter((charObj, charIndex) => filterFunction(charObj, charIndex));
    // } else {
        return characterObjects;
    // }
}

export const updatePlayerStats = (plyr, plays) => {
    let wins = calcPlayerWins(plyr);
    let losses = calcPlayerLosses(plyr);
    let ratio = (wins/(wins+losses)) * 100;
    plyr.wins = wins;
    plyr.losses = losses;
    plyr.ratio = ratio;
    plyr.percentage = (ratio) > 100 ? 100 : parseFloat(removeTrailingZeroDecimal(ratio));
    plyr.kills = calcPlayerKills(plyr, plays);
    plyr.deaths = calcPlayerDeaths(plyr, plays);
    plyr.kdRatio = calcPlayerKDRatio(plyr, plays);
    return plyr;
}

export const createPlayer = (playerName, playerIndex, databasePlayers, user?: User | Player): Player => {

    let currentDateTimeStamp = formatDate(new Date());
    let uniqueIndex = databasePlayers.length + 1 + playerIndex;
    let currentDateTimeStampNoSpaces = formatDate(new Date(), `timezoneNoSpaces`);
    let uuid = generateUniqueID(databasePlayers.map(plyr => plyr?.uuid || plyr?.id));
    let displayName = playerName.charAt(0).toUpperCase() + playerName.slice(1).toLowerCase();
    let id = `${uniqueIndex}_Player_${displayName}_${currentDateTimeStampNoSpaces}_${uuid}`;
    let ID = `${uniqueIndex} ${displayName} ${currentDateTimeStamp} ${uuid}`;

    let plyr: Player = {
        id,
        ID,
        uuid,
        uniqueIndex,
        displayName,
        active: true,
        disabled: false,
        expanded: false,
        playerLink: false,
        name: displayName,
        plays: [] as Play[],
        type: `Smasherscape`,
        username: displayName,
        created: currentDateTimeStamp,
        updated: currentDateTimeStamp,
        xpModifier: defaultXPMultiplier,
        lastUpdated: currentDateTimeStamp,
        lastUpdatedBy: user ? user.email : id,
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
            },
            {
                promoted: currentDateTimeStamp,
                name: `User`,
                level: 2,
            },
            // {
            //     promoted: currentDateTimeStamp,
            //     name: `Admin`,
            //     level: 3,
            // },
            // {
            //     promoted: currentDateTimeStamp,
            //     name: `Owner`,
            //     level: 3,
            // },
        ] as Role[],
        experience: {
            xp: 0,
            arenaXP: 0,
            nextLevelAt: 83,
            remainingXP: 83
        } as Experience,
    };

    updatePlayerStats(plyr, []);
    plyr.properties = countPropertiesInObject(plyr);

    return plyr;
}

export const addPlayersWithParameters = (parameters: Parameters) => {
    let {
        user,
        players,
        setPlayers,
        useDatabase,
        commandParams,
        databasePlayers,
        setLoadingPlayers,
        setFilteredPlayers,
        sameNamePlayeredEnabled,
    } = parameters;

    let playersToAdd = commandParams.filter((comm, commIndex) => commIndex != 0 && comm);
    [...new Set(playersToAdd)].forEach((plyr: any, plyrIndex) => {
        let playerObj: Player = createPlayer(plyr, plyrIndex, databasePlayers, user);
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
                    updatePlayersLocalStorage(updatedPlayers);
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

export const deletePlayersWithParameters = (parameters: Parameters) => {
    let {
        players,
        setPlayers,
        useDatabase,
        commandParams,
        deleteCompletely,
        setLoadingPlayers,
        setFilteredPlayers,
    } = parameters;

    let playersToDeleteFromDB: Player[] = [];
    let playersToDelete = commandParams.filter((comm, commIndex) => commIndex != 0 && comm);

    playersToDelete.forEach(player => {
        let playerDB: Player = getActivePlayers(players).find(plyr => plyr?.name.toLowerCase() == player.toLowerCase() || plyr?.name.toLowerCase().includes(player.toLowerCase()));
        if (playerDB) {
            playersToDeleteFromDB.push(playerDB);
        }
    });

    if (playersToDeleteFromDB.length > 0) {
        let currentDateTimeStamp = formatDate(new Date());
        playersToDeleteFromDB.forEach((playerDB: Player) => {
            (document.querySelector(`.clearAllTagsIcon`) as any).click();
            if (useDatabase == true) {
                if (deleteCompletely && playerDB?.plays?.length == 0) {
                    return deletePlayerFromDB(playerDB);
                } else {
                    return updatePlayerInDB(playerDB, {
                        active: false, 
                        disabled: true, 
                        updated: currentDateTimeStamp, 
                        lastUpdated: currentDateTimeStamp 
                    })
                }
            } else {
                setPlayers(prevPlayers => {
                    let updatedPlayers: Player[] = prevPlayers.map((plyr: Player) => {
                        if (plyr.name.toLowerCase() == playerDB.name.toLowerCase()) {
                            return {
                                ...plyr,
                                active: false,
                                disabled: true,
                                updated: currentDateTimeStamp, 
                                lastUpdated: currentDateTimeStamp 
                            } as Player
                        } else {
                            return plyr as Player;
                        }
                    });
                    setFilteredPlayers(updatedPlayers);
                    updatePlayersLocalStorage(updatedPlayers);
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

export const setParametersWithParameters = (parameters: Parameters) => {
    let {
        players,
        setPlayers,
        commandParams,
        setLoadingPlayers
    } = parameters;

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

            updatePlayersLocalStorage(updatedPlayers);
            setPlayers(updatedPlayers);
        }
    }
}

export const giveParameterWithParameters = (parameters: Parameters) => {
    let {
        players,
        setPlayers,
        commandParams,
        setLoadingPlayers
    } = parameters;

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

            updatePlayersLocalStorage(updatedPlayers);
            setPlayers(updatedPlayers);
        }
    }
}

export const updatePlayerPlays = (playState) => {
    let currentDateTimeStamp = formatDate(new Date());
    let {
        user,
        plyr, 
        date,
        stocks,
        winChar, 
        loserDB, 
        winnerDB, 
        loseChar, 
        playUUID,
        lossStocks, 
        stocksTaken, 
        winnerOrLoser, 
    } = playState;

    let prevExp = plyr?.experience?.arenaXP;
    let loserPrevExp = loserDB?.experience?.arenaXP;
    let winnerPrevExp = winnerDB?.experience?.arenaXP;
    let winnerNewExp = prevExp + (XPGainOnWin * plyr?.xpModifier);
    let loserNewExp = prevExp + ((XPGainOnLoserXPForEachStockTaken * plyr?.xpModifier) * stocksTaken);
    let winnerExpGained = winnerNewExp - winnerPrevExp;
    let loserExpGained = loserNewExp - loserPrevExp;
    let newExp = winnerOrLoser == `winner` ? winnerNewExp : loserNewExp;
    let expGained = newExp - prevExp;
    plyr.experience.arenaXP = newExp;
    
    plyr.plays.push({
        otherCharacter: winnerOrLoser == `winner` ? loseChar : winChar,
        character: winnerOrLoser == `winner` ? winChar : loseChar,
        id: `player-${plyr.name}-play-${playUUID}`,
        winnerUUID: winnerDB?.uuid,
        loserUUID: loserDB?.uuid,
        winner: winnerDB?.name,
        winnerID: winnerDB?.id,
        loser: loserDB?.name,
        loserID: loserDB?.id,
        uuid: playUUID,
        winnerExpGained,
        loserExpGained,
        winnerPrevExp,
        loserPrevExp,
        winnerNewExp,
        loserNewExp,
        stocksTaken,
        lossStocks,
        expGained,
        prevExp,
        newExp,
        stocks,
        date
    });

    calcPlayerLevelAndExperience(plyr);

    updatePlayerStats(plyr, plyr.plays);

    plyr.updated = currentDateTimeStamp;
    plyr.lastUpdated = currentDateTimeStamp;
    plyr.properties = countPropertiesInObject(plyr);
    plyr.lastUpdatedBy = user ? user?.email : plyr.lastUpdatedBy || plyr?.id;

    return plyr;
}

export const updatePlayersWithParameters = (parameters: Parameters) => {
    let {
        user,
        players,
        setPlayers,
        useDatabase,
        commandParams,
        setLoadingPlayers,
        setFilteredPlayers,
    } = parameters;

    let date = moment().format(`h:mm:ss a, MMMM Do YYYY`);
    let playerOneName = commandParams[1].toLowerCase();
    let conditionName = commandParams[2].toLowerCase();
    let playerTwoName = commandParams[3].toLowerCase();

    let playerOneDB = getActivePlayersJSON(players).find(plyr => plyr?.name.toLowerCase() == playerOneName || plyr?.name.toLowerCase().includes(playerOneName));
    let playerTwoDB = getActivePlayersJSON(players).find(plyr => plyr?.name.toLowerCase() == playerTwoName || plyr?.name.toLowerCase().includes(playerTwoName));

    let characterOne;
    let characterTwo;
    let stocksTaken;

    if (commandParams.length >= 8) {
        characterOne = commandParams[5].toLowerCase();
        characterTwo = commandParams[7].toLowerCase();
        stocksTaken = commandParams[8] != `Stocks-Taken-From-Winner` ? parseInt(commandParams[8]) || 0 : `Stocks-Taken-From-Winner`;
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
        console.log(`Missing Characters`, !characterOne, !characterTwo);
        showAlert(`Missing Characters`, <h1>
            Which Charcaters Did They Play?
        </h1>, `65%`, `35%`);
        return;
    } else if (!Characters[characterOne] || !Characters[characterTwo]) {
        console.log(`Cannot Find Characters`, !Characters[characterOne], !Characters[characterTwo]);
        showAlert(`Cannot Find Characters`, <h1>
            Can't find characters with those names.
        </h1>, `65%`, `35%`);
        return;
    } else if (stocksTaken == `Stocks-Taken-From-Winner` || stocksTaken < 0 || stocksTaken >= 3) {
        console.log(`Invalid Stocks Taken`, stocksTaken);
        showAlert(`Invalid Stocks Taken`, <div>
            <h1>How many stocks were taken from the winner?</h1>
            <h1>Should be between 0 and 3 Stock(s)</h1>
        </div>, `65%`, `35%`);
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

        let playUIDs = getAllPlays(players).some(ply => ply.uuid) ? getAllPlays(players).map(ply => ply?.uuid) : players.map(plr => plr.uuid);
        let playUUID = playUIDs.length > 0 ? generateUniqueID(playUIDs) : generateUniqueID();

        let playState = {
            user,
            date,
            stocks,
            players, 
            winChar, 
            loserDB, 
            winnerDB, 
            loseChar,
            playUUID,
            lossStocks, 
            stocksTaken,  
        }

        dev() && console.log(`Update Players Play State`, playState);
        let updatedPlayers: any[] = getActivePlayersJSON(players).map((plyr) => {
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

        dev() && console.log(`Updated Players from Command`, updatedPlayers);
        if (useDatabase == true) {
            let updatedWinner = updatedPlayers.find(plyr => plyr.id == winnerDB.id);
            let updatedloser = updatedPlayers.find(plyr => plyr.id == loserDB.id);
            if (winnerDB.properties >= 19900 || loserDB.properties >= 19900) {
                showPropertiesWarning(`Critical`, winnerDB, loserDB);
                return;
            } else {
                updatePlayerInDB(winnerDB, updatedWinner);
                updatePlayerInDB(loserDB, updatedloser);
                if (winnerDB.properties >= 19000 || loserDB.properties >= 19000) {
                    showPropertiesWarning(`Warning`, winnerDB, loserDB);
                }
            }
        } else {
            updatePlayersLocalStorage(updatedPlayers);
            setPlayers(updatedPlayers);
            setFilteredPlayers(updatedPlayers);
        }
    }
}

export const processCommandsWithParameters = (parameters: Parameters) => {
    let {
        command,
        setLoadingPlayers
    } = parameters as Parameters;

    // setLoadingPlayers(true);

    let commandParams = command.split(` `);
    let firstCommand = commandParams[0];
    
    if (command != ``) {
        dev() && console.log(`Command sent to ${useDB() ? `Database` : `Leaderboard`}`, parameters);
        if (firstCommand.includes(`!upd`)) {
            updatePlayersWithParameters(parameters);
        } else if (firstCommand.includes(`!add`)) {
            addPlayersWithParameters(parameters);
        } else if (firstCommand.includes(`!del`)) {
            deletePlayersWithParameters(parameters);
        } else if (firstCommand.includes(`!giv`)) {
            giveParameterWithParameters(parameters);
        } else if (firstCommand.includes(`!set`)) {
            setParametersWithParameters(parameters);
        } else {
            showCommandsWithParameters(parameters);
        }
    }
}

export default function PlayerForm(props) {

    const searchInput = useRef();
    const commandsInput = useRef();
    const { user, players, setPlayers, filteredPlayers, setFilteredPlayers, mobile, useDatabase, commands, databasePlayers, sameNamePlayeredEnabled, deleteCompletely, setLoadingPlayers, command } = useContext<any>(StateContext);

    const handleCommands = (e?: FormEvent, user?: User | Player) => {
        e.preventDefault();
        let field = commandsInput.current as HTMLInputElement;
        if (field.name == `commands`) {
            let command = field?.value.toLowerCase();
            let commandParams = command.split(` `);
            const parameters = new Parameters({
                user,
                command,
                players, 
                commands,
                setPlayers, 
                useDatabase, 
                commandParams, 
                databasePlayers, 
                updatePlayersDB: updatePlayersLocalStorage,
                deleteCompletely,
                setLoadingPlayers,
                setFilteredPlayers, 
                sameNamePlayeredEnabled,
            });
            processCommandsWithParameters(parameters);
        } else {
            return;
        }
    }

    const getCharacterObjs = (active) => {
        if (active == true) {
            return getAllCharacters().filter(char => getUniqueCharactersPlayed(players).includes(char[1])).map((char, charIndex) => {
                return {
                    id: charIndex + 1,
                    key: char[0],
                    label: char[1],
                    image: calcPlayerCharacterIcon(char[0]),
                    shortcuts: Object.entries(Characters).filter(entry => entry[1] == char[1]).map(entr => entr[0]),
                }
            })
        } else {
            return getCharacterObjects();
        }
    }

    const searchPlayers = (e: any, itemsToSearch?: any, type?) => {
        let field = e.target as HTMLInputElement;
        if (field && field.name == `commands`) return;
        if (!itemsToSearch) itemsToSearch = field.value;
        if (itemsToSearch && itemsToSearch != ``) {
            if (type == `playerName`) {
                if (Array.isArray(itemsToSearch) && itemsToSearch.length > 0) {
                    setFilteredPlayers(getActivePlayers(players).filter((plyr: Player) => {
                        return itemsToSearch.map(playr => playr.name.toLowerCase()).includes(plyr.name.toLowerCase());
                    }));
                } else if (typeof itemsToSearch == `string`) {
                    setFilteredPlayers(getActivePlayers(players).filter((plyr: Player) => {
                        return Object.values(plyr).some(val =>
                            typeof val === `string` && val.toLowerCase().includes(itemsToSearch?.toLowerCase())
                        );
                    }));
                } else {
                    setFilteredPlayers(getActivePlayers(players).filter((plyr: Player) => {
                        return Object.values(plyr).some(val =>
                            typeof val === `string` && val.toLowerCase().includes(itemsToSearch?.name?.toLowerCase())
                        );
                    }));
                }
            } else {
                if (Array.isArray(itemsToSearch) && itemsToSearch.length > 0) {
                    setFilteredPlayers(getActivePlayers(players).filter((plyr: Player) => {
                        return itemsToSearch.map(playr => playr.name.toLowerCase()).includes(plyr.name.toLowerCase());
                    }));
                } else if (typeof itemsToSearch == `string`) {
                    setFilteredPlayers(getActivePlayers(players).filter((plyr: Player) => {
                        return plyr.plays.map(ply => ply.character).some(char =>
                            typeof char === `string` && char.toLowerCase().includes(itemsToSearch?.toLowerCase())
                        );
                    }));
                } else {
                    setFilteredPlayers(getActivePlayers(players).filter((plyr: Player) => {
                        return plyr.plays.map(ply => ply.character).some(char =>
                            typeof char === `string` && char.toLowerCase().includes(itemsToSearch?.label?.toLowerCase())
                        );
                    }));
                }
            }
        } else {
            setFilteredPlayers(getActivePlayers(players));
        }
    }

    return <section className={`formsSection`}>
    <form id={`playerForm`} onSubmit={(e) => handleCommands(e, user)} action="submit" className={`gridForm ${getActivePlayers(players).length > 0 ? `populated ${getActivePlayers(players).length} ${getAllPlays(getActivePlayers(players)).length > 0 ? `hasPlays` : `noPlays`}` : `empty`} ${(useDatabase == false || (user && checkUserRole(user, `Admin`))) ? `hasCommandsPerm` : `noCommandsPerm`} ${command?.name}`}>
        {getActivePlayers(players).length > 0 && <>
            <div className={`playerSearchAuto inputWrapper materialBGInputWrapper`}>
                <div className="inputBG materialBG"></div>
                <Autocomplete
                    autoHighlight
                    ref={searchInput}
                    id="playerSearchAuto-1"
                    sx={{ width: `100%` }}
                    options={getActivePlayers(players)}
                    getOptionLabel={(option) => option.name}
                    onChange={(e, val: any) => searchPlayers(e, val, `playerName`)}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    onInputChange={(e, val: any) => searchPlayers(e, val, `playerName`)}
                    renderInput={(params) => <TextField name={`search`} onBlur={(e) => searchBlur(e, filteredPlayers)} {...params} label={`Search Player(s)${(!mobile || window.innerWidth > 768) ? ` by Name` : ``}...`} />}
                    noOptionsText={`No Player(s) Found for Search`}
                    renderOption={(props: any, playerOption: any) => {
                        return (
                            <div key={playerOption.id} {...props}>
                                <PlayerOption playerOption={playerOption} />
                            </div>
                        )
                    }}
                />
            </div>
        </>}
        {(useDatabase == false || (user && checkUserRole(user, `Admin`))) && <div id={`commandsInput`} className={`inputWrapper ${command?.name}`}>
            <div className="inputBG"></div>
            <input ref={commandsInput} type="text" className="commands" id="enterCommandsInput" name={`commands`} placeholder={getActivePlayers(players).length > 0 ? `Enter Commands...` : `!add name to add players or sign up`} />
        </div>}
        {(getActivePlayers(players).length > 0 && getAllPlays(getActivePlayers(players)).length > 0) && <>
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
                    renderInput={(params) => <TextField name={`characters`} onBlur={(e) => searchBlur(e, filteredPlayers)} {...params} label={`${(!mobile || window.innerWidth > 768) ? `Search Player(s) by Character(s) Played...` : `Search Character(s) Played...`}`} />}
                    noOptionsText={`No Character(s) Found for Search`}
                    filterOptions={(characterOptions, state) => matchSorter(characterOptions, state.inputValue, { keys: [`label`, `shortcuts`] })}
                    renderOption={(props: any, characterOption: any) => {
                        return (
                            <div key={characterOption.id} {...props}>
                                <CharacterOption plays={getAllPlaysJSON(getActivePlayers(players))} type={`All`} characterOption={characterOption} />
                            </div>
                        )
                    }}
                />
            </div>
        </>}
        <button className={`formSubmitButton playerFormSubmit`} type={`submit`}>Submit</button>
    </form>
</section>
}