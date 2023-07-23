import  moment from 'moment';
import { db } from '../firebase';
import StepForm from './StepForm';
import { Badge } from '@mui/material';
import { Characters } from './Characters';
import Skeleton from '@mui/material/Skeleton';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { calcPlayerLevelAndExperience } from './Levels';
import { calcPlayerCharacterIcon } from './CharacterIcons';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { FormEvent, useContext, useRef, useState } from 'react';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { formatDate, createXML, StateContext, showAlert, dev, defaultPlayers } from '../pages/_app';

export default function Smasherscape(props) {

    const searchInput = useRef();
    const commandsInput = useRef();
    const { players, setPlayers, filteredPlayers, setFilteredPlayers, devEnv, setDevEnv, useLocalStorage } = useContext<any>(StateContext);
    const [publicAssetLink, setPublicAssetLink] = useState(`https://github.com/strawhat19/Smasherscape/blob/main`);

    const calcPlayerWins = (plyr) => plyr.plays.filter(ply => ply.winner.toLowerCase() == plyr.name.toLowerCase()).length;
    const calcPlayerLosses = (plyr) => plyr.plays.filter(ply => ply.loser.toLowerCase() == plyr.name.toLowerCase()).length;
    const calcPlayerCharacterTimesPlayed = (plyr, char) => plyr.plays.map(ply => ply.character).filter(ply => ply.toLowerCase() == char || ply.toLowerCase().includes(char)).length;

    const getCharacterTitle = (char) => {
        if (char.split(` `).length > 1) char = char.split(` `).join(``).toLowerCase();
        return Characters[char];
    }

    const setCommandPlayers = (e: any, value?: any) => {
        console.log(`Command Players`, value);
    }

    const searchBlur = (e: any) => {
        if (filteredPlayers?.length == 0) {
            e.target.value = ``;
        }
    }

    const commandsForm = (e: FormEvent) => {
        e.preventDefault();
        console.log(`Commands Form`, e);
    }

    const searchPlayers = (e: any, value?: any) => {
        let field = e.target as HTMLInputElement;
        if (field && field.name == `commands`) return;
        if (!value) value = field.value;
        if (value && value != ``) {
            if (typeof value == `string`) {
                setFilteredPlayers(players.filter(plyr => {
                    return Object.values(plyr).some(val =>
                        typeof val === `string` && val.toLowerCase().includes(value?.toLowerCase())
                    );
                }));
            } else {
                setFilteredPlayers(players.filter(plyr => {
                    return Object.values(plyr).some(val =>
                        typeof val === `string` && val.toLowerCase().includes(value?.name?.toLowerCase())
                    );
                }));
            }
        } else {
            setFilteredPlayers(players);
        }
    }

    const removeTrailingZeroDecimal = (number) => {
        let num = typeof number == `string` ? parseFloat(number) : number;
        const wholeNumber = Math.trunc(num);
        const decimalPart = num - wholeNumber;
        if (decimalPart === 0) {
          return wholeNumber;
        } else {
          return num.toFixed(1);
        }
    }

    const parseDate = (dateStr: any) => {
        const parts = dateStr.split(", ");
        const timePart = parts[0];
        const datePart = parts[1];
        const datePartWithoutSuffix = datePart.replace(/(\d+)(st|nd|rd|th)/, "$1");
        const newDateStr = `${datePartWithoutSuffix}, ${timePart}`;
        return new Date(newDateStr) as any;
    }

    const calcWinLoseRatio = (playerOne, playerTwo) => {
        let playerOneDB = players.find(plyr => plyr?.name == playerOne || plyr?.name.toLowerCase().includes(playerOne));
        let playerTwoDB = players.find(plyr => plyr?.name == playerTwo || plyr?.name.toLowerCase().includes(playerTwo));
        let plays = playerOneDB.plays.filter(ply => ply?.winner == playerTwoDB.name || ply?.loser == playerTwoDB.name);
        let wins = plays.filter(ply => ply?.winner == playerOneDB?.name)?.length;
        let losses = plays.filter(ply => ply?.loser == playerOneDB?.name)?.length;
        let winRate = (wins/(wins+losses)) * 100;
        let winPercentage = (winRate) > 100 ? 100 : removeTrailingZeroDecimal(winRate);
        return <div className={`winRateDetails`}>
            {/* <div className="winsToLossses">Total Wins: {wins} - Total Losses: {losses}</div> */}
            <div className="winsToLossses">{wins} Wins - {losses} Losses</div>
            <div className={`winPercentage ${winPercentage > 50 ? winPercentage == 100 ? `perfect` : `positive` : winPercentage > 24 ? `challenger` : `negative`}`}>({winPercentage}%)</div>
        </div>
    }

    const calcPlayerCharactersPlayed = (plyr) => {
        let charsPlayed = plyr?.plays?.map(ply => ply?.character);
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

    const setPlayerExpanded = (player) => {
        let updatedPlayers = players.map(plyr => {
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
                devEnv && console.log(`Updated Players`, updatedPlayers);
                useLocalStorage && localStorage.setItem(`players`, JSON.stringify(updatedPlayers));
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
                    let updatedPlayers = prevPlayers.map(plyr => {
                        if (plyr.name.toLowerCase() == playerDB.name.toLowerCase()) {
                            return {
                                ...plyr,
                                disabled: true
                            }
                        } else {
                            return plyr;
                        }
                    });
                    setFilteredPlayers(updatedPlayers);
                    devEnv && console.log(`Updated Players`, updatedPlayers);
                    useLocalStorage && localStorage.setItem(`players`, JSON.stringify(updatedPlayers));
                    return updatedPlayers;
                });
            })
        }
    }

    const resetPlayers = (commandParams) => {
        setPlayers(defaultPlayers);
        setFilteredPlayers(defaultPlayers);
        useLocalStorage && localStorage.setItem(`players`, JSON.stringify(defaultPlayers));
    }

    const getActivePlayers = (players) => {
        return players.sort((a,b) => {
            if (b.experience.arenaXP !== a.experience.arenaXP) {
                return b.experience.arenaXP - a.experience.arenaXP;
            }
            return b.plays.length - a.plays.length;
        }).filter(plyr => !plyr.disabled);
    }

    const updatePlayers = (commandParams) => {
        let playerOne = commandParams[1].toLowerCase();
        let playerTwo = commandParams[3].toLowerCase();
        let date = moment().format(`h:mm:ss a, MMMM Do YYYY`);

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

            let stocks = [
                {
                    character: Characters[characterOne],
                }, 
                {
                    character: Characters[characterOne],
                }, 
                {
                    character: Characters[characterOne],
                }
            ].map((stk, stkIndex) => {
                if (stkIndex < stocksTaken) {
                    return {
                        ...stk,
                        dead: true
                    }
                } else {
                    return {
                        ...stk,
                    }
                }
            });

            let lossStocks = [
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

            let updatedPlayers = players.map(plyr => {
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

                    return plyr;
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

                    return plyr;
                } else {
                    return plyr;
                }
            });

            devEnv && console.log(`Updated Players`, updatedPlayers);
            useLocalStorage && localStorage.setItem(`players`, JSON.stringify(updatedPlayers));
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
                }
            }
        } else {
            return;
        }
    }

    return <main>
        <section className={`formsSection`}>
            {/* <h5 className={`heading`}>Forms</h5> */}
            {/* {devEnv && <form onSubmit={(e) => commandsForm(e)} action="submit" className={`gridForm commandsForm ${devEnv ? `dev` : ``}`}>
                <div className={`inputWrapper materialBGInputWrapper`}>
                    <div className="inputBG materialBG"></div>
                    <Autocomplete
                        disablePortal
                        autoHighlight
                        id="combo-box-demo"
                        sx={{ width: `100%` }}
                        options={players.map(plyr => plyr.name)}
                        onChange={(e, val) => setCommandPlayers(e, val)}
                        // onInputChange={(e, val) => searchPlayers(e, val)}
                        renderInput={(params) => <TextField name={`search`} {...params} label="Player" />}
                    />
                </div>
                <div className={`inputWrapper materialBGInputWrapper`}>
                    <div className="inputBG materialBG"></div>
                    <Autocomplete
                        disablePortal
                        autoHighlight
                        id="combo-box-demo"
                        sx={{ width: `100%` }}
                        options={players.map(plyr => plyr.name)}
                        onChange={(e, val) => setCommandPlayers(e, val)}
                        // onInputChange={(e, val) => searchPlayers(e, val)}
                        renderInput={(params) => <TextField name={`search`} {...params} label="Player" />}
                    />
                </div>
                <button className={`formSubmitButton commandsFormSubmit`} type={`submit`}>Submit</button>
            </form>} */}
            {/* <StepForm /> */}
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
                        renderInput={(params) => <TextField name={`search`} onBlur={(e) => searchBlur(e)} {...params} label="Search..." />}
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
                        <div className="playerCard" key={plyrIndex}>
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
                                            <img width={150} src={calcPlayerLevelImage(plyr?.level?.name)} alt={plyr?.level?.name} />
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
                            <div className={`recordOfPlayer ${plyr?.expanded ? `expanded` : `collapsed`}`}>
                                <LazyLoadImage effect="blur" src={`${publicAssetLink}/assets/smasherscape/OSRS_Card_Empty.png?raw=true`} className={`cardBG`} alt={`Smasherscape Player Card`} />
                                <LazyLoadImage effect="blur" src={`${publicAssetLink}/assets/smasherscape/OSRS_Card_Template_Border_Only.png?raw=true`} className={`cardBG border`} alt={`Smasherscape Player Card`} />
                                <ul className="recordList">
                                    <h3 className={`greenRecordText`}>Player Record</h3>
                                    {plyr?.plays?.length > 0 && plyr?.plays?.sort((a: any, b: any) => parseDate(b.date) - parseDate(a.date)).map((ply, plyIndex) => {
                                        let isWinner = ply?.winner == plyr?.name;
                                        return (
                                            <li className={`playerPlay`} key={plyIndex}>
                                               <div className="plyIndex">{plyIndex + 1}.</div>
                                               <div className="recordDetails">
                                                <div className={`playMessage`}>{isWinner ? <div><span className={`${isWinner ? `winner` : `loser`}`}>Win</span> over {ply?.loser}</div> : <div><span className={`${isWinner ? `winner` : `loser`}`}>Loss</span> to {ply?.winner}</div>}
                                                    <div className="stocksRow">
                                                        <div className="stocks">
                                                            {ply?.stocks?.map(stk => stk.character)?.includes(ply?.character) ? ply?.stocks?.length > 0 && ply?.stocks?.map((stok, stkIndex) => {
                                                                return (
                                                                    <span key={stkIndex} className={stok?.dead ? `dead` : `living`}>
                                                                        <img className={`charImg`} width={35} src={calcPlayerCharacterIcon(stok?.character)} alt={getCharacterTitle(stok?.character)} />
                                                                    </span>
                                                                )
                                                            }) : ply?.lossStocks?.map((stok, stkIndex) => {
                                                                return (
                                                                    <span key={stkIndex} className={stok?.dead ? `dead` : `living`}>
                                                                        <img className={`charImg`} width={35} src={calcPlayerCharacterIcon(stok?.character)} alt={getCharacterTitle(stok?.character)} />
                                                                    </span>
                                                                )
                                                            })}
                                                        </div>
                                                    vs 
                                                        <div className="otherStocks">
                                                            {ply?.stocks?.map(stk => stk.character)?.includes(ply?.otherCharacter) ? ply?.stocks?.length > 0 && ply?.stocks?.map((stok, stkIndex) => {
                                                                return (
                                                                    <span key={stkIndex} className={stok?.dead ? `dead` : `living`}>
                                                                        <img className={`charImg`} width={35} src={calcPlayerCharacterIcon(stok?.character)} alt={getCharacterTitle(stok?.character)} />
                                                                    </span>
                                                                )
                                                            }) : ply?.lossStocks?.map((stok, stkIndex) => {
                                                                return (
                                                                    <span key={stkIndex} className={stok?.dead ? `dead` : `living`}>
                                                                        <img className={`charImg`} width={35} src={calcPlayerCharacterIcon(stok?.character)} alt={getCharacterTitle(stok?.character)} />
                                                                    </span>
                                                                )
                                                            })}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="recordSubDetails">
                                                    <div className="charsPlayedGame">
                                                        {/* {ply?.stocks?.map(stk => stk.character)?.includes(ply?.character) ? ply?.stocks[0].character : ply?.lossStocks[0].character} vs {ply?.stocks?.map(stk => stk.character)?.includes(ply?.otherCharacter) ? ply?.stocks[0].character : ply?.lossStocks[0].character} */}
                                                        {/* {isWinner ? ply?.loser : ply?.winner} */}
                                                        {/* W - L:  */}
                                                        {calcWinLoseRatio(isWinner ? ply?.winner : ply?.loser, isWinner ? ply?.loser : ply?.winner)}
                                                    </div>
                                                    <div className="playDate">{ply?.date}</div>
                                                </div>
                                               </div>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>
                    )
                } else {
                    <Skeleton variant="rectangular" width={210} height={118} />
                }
            })}
        </div>
    </main>
}