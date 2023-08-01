import  moment from 'moment';
import Play from '../models/Play';
import Stock from '../models/Stock';
import Level from '../models/Level';
import { Badge } from '@mui/material';
import Player from '../models/Player';
import { Commands } from './Commands';
import Experience from '../models/Experience';
import TextField from '@mui/material/TextField';
import { Characters } from '../common/Characters';
import { FormEvent, useContext, useRef } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import { calcPlayerLevelAndExperience } from '../common/Levels';
import { calcPlayerCharacterIcon } from '../common/CharacterIcons';
import { StateContext, showAlert, defaultPlayers } from '../pages/_app';
import { calcPlayerCharacterTimesPlayed, calcPlayerCharactersPlayed, calcPlayerLevelImage, getActivePlayers, getCharacterTitle, isInvalid } from './smasherscape';

export const searchBlur = (e: any, filteredPlayers: Player[]) => {
    if (filteredPlayers?.length == 0) {
        e.target.value = ``;
    }
}

export default function PlayerForm(props) {

    const searchInput = useRef();
    const commandsInput = useRef();
    const { players, setPlayers, filteredPlayers, setFilteredPlayers, devEnv, useLocalStorage, commands } = useContext<any>(StateContext);

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

    const getCharacterObjs = () => {
        return Object.entries(Characters).filter(char => char[0] === char[0].charAt(0).toUpperCase() + char[0].slice(1)).map((char, charIndex) => {
            return {
                id: charIndex + 1,
                key: char[0],
                label: char[1],
                image: calcPlayerCharacterIcon(char[0])
            }
        })
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
        let playerOne = commandParams[1].toLowerCase();
        let condition = commandParams[2].toLowerCase();
        let playerTwo = commandParams[3].toLowerCase();
        let date = moment().format(`h:mm:ss a, MMMM Do YYYY`);

        let playerOneDB: Player = players.find(plyr => plyr?.name.toLowerCase() == playerOne || plyr?.name.toLowerCase().includes(playerOne));
        let playerTwoDB: Player = players.find(plyr => plyr?.name.toLowerCase() == playerTwo || plyr?.name.toLowerCase().includes(playerTwo));

        let characterOne;
        let characterTwo;
        let stocksTaken;

        let winCons = [`beats`, `defeats`, `conquers`, `vanquishes`, `fells`, `kills`];
        let loseCons = [`loses-to`, `falls-to`, `defeated-by`];

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
        } else if (!winCons.includes(condition) && !loseCons.includes(condition)) {
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
        } else if (stocksTaken >= 3) {
            showAlert(`Invalid Stocks Taken`, <h1>
                Stocks taken should be less than 3.
            </h1>, `65%`, `35%`);
            return;
        } else {

            let winner = winCons.includes(condition) ? playerOne : playerTwo;
            let loser = winCons.includes(condition) ? playerTwo : playerOne;
            let winnerDB: Player = players.find(plyr => plyr?.name.toLowerCase() == winner || plyr?.name.toLowerCase().includes(winner));
            let loserDB: Player = players.find(plyr => plyr?.name.toLowerCase() == loser || plyr?.name.toLowerCase().includes(loser));
            let winChar = winCons.includes(condition) ? Characters[characterOne] : Characters[characterTwo];
            let loseChar = winCons.includes(condition) ? Characters[characterTwo] : Characters[characterOne];
            
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

            let updatedPlayers: Player[] = players.map((plyr: Player) => {
                if (plyr?.name.toLowerCase() == winner || plyr?.name.toLowerCase().includes(winner)) {
                    plyr.experience.arenaXP = (plyr?.xpModifier ? (plyr.experience.arenaXP * plyr?.xpModifier) : plyr.experience.arenaXP) + 400;
                    plyr.plays.push({
                        otherCharacter: loseChar,
                        winner: winnerDB?.name,
                        loser: loserDB?.name,
                        character: winChar,
                        stocksTaken,
                        lossStocks,
                        stocks,
                        date
                    });

                    calcPlayerLevelAndExperience(plyr);

                    return plyr as Player;
                } else if (plyr?.name.toLowerCase() == loser || plyr?.name.toLowerCase().includes(loser)) {
                    plyr.experience.arenaXP = (plyr?.xpModifier ? (plyr.experience.arenaXP * plyr?.xpModifier) : plyr.experience.arenaXP) + (100 * stocksTaken);
                    plyr.plays.push({
                        otherCharacter: winChar,
                        winner: winnerDB?.name,
                        loser: loserDB?.name,
                        character: loseChar,
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
                } else {
                    showCommands();
                }
            }
        } else {
            return;
        }
    }

    return <section className={`formsSection`}>
    <form id={`playerForm`} onSubmit={(e) => handleCommands(e)} action="submit" className="gridForm">
        <div className={`inputWrapper materialBGInputWrapper`}>
            <div className="inputBG materialBG"></div>
            <Autocomplete
                autoHighlight
                ref={searchInput}
                id="combo-box-demo"
                sx={{ width: `100%` }}
                options={getActivePlayers(players).map(plyr => {
                    return {
                        ...plyr,
                        label: plyr.name,
                    }
                })}
                getOptionLabel={(option) => option.label}
                onChange={(e, val: any) => searchPlayers(e, val, `playerName`)}
                onInputChange={(e, val: any) => searchPlayers(e, val, `playerName`)}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={(params) => <TextField name={`search`} onBlur={(e) => searchBlur(e, filteredPlayers)} {...params} label="Search Player(s) by Name..." />}
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
        {/* <div className={`inputWrapper materialBGInputWrapper`}>
            <div className="inputBG materialBG"></div>
            <Autocomplete
                autoHighlight
                ref={commandsInput}
                id="combo-box-demo"
                sx={{ width: `100%` }}
                options={Object.values(defaultCommands).map((comm: Command) => {
                    return {
                        ...comm,
                        label: comm.example ? comm.example : comm.command,
                    }
                })}
                getOptionLabel={(option) => option.label}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={(params) => <TextField name={`commands`} {...params} label="Commands..." />}
                renderOption={(props: any, option: any) => {
                    return (
                        <div key={props?.key} {...props}>
                            <div className="autocompleteOption">
                                {option.label}
                            </div>
                        </div>
                    )
                }}
            />
        </div> */}
        <div id={`commandsInput`} className={`inputWrapper`}><div className="inputBG"></div><input ref={commandsInput} type="text" className="commands" name={`commands`} placeholder={`Commands...`} /></div>
        <div className={`characterSearchAuto inputWrapper materialBGInputWrapper`}>
            <div className="inputBG materialBG"></div>
            <Autocomplete
                autoHighlight
                id="combo-box-demo"
                sx={{ width: `100%` }}
                options={getCharacterObjs()}
                getOptionLabel={(option) => option.label}
                onChange={(e, val: any) => searchPlayers(e, val, `searchCharacters`)}
                onInputChange={(e, val: any) => searchPlayers(e, val, `searchCharacters`)}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={(params) => <TextField name={`characters`} {...params} label="Search Player(s) by Character..." />}
                renderOption={(props: any, option: any) => {
                    return (
                        <div key={props?.key} {...props}>
                            <div className="autocompleteOption characterOption">
                                <div className="characterIndex">{option?.id}</div>
                                <img className={`charImg`} width={25} src={option.image} alt={option.label} />
                                <div className="spacer"></div>
                                <div className="characterName">{option?.label}</div>
                            </div>
                        </div>
                    )
                }}
            />
        </div>
        <button className={`formSubmitButton`} type={`submit`}>Submit</button>
    </form>
</section>
}