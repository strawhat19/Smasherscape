import React from 'react';
import User from '../models/User';
import CodeBlock from "./CodeBlock";
import Player from '../models/Player';
import RangeSlider from './RangeSlider';
import Command from "../models/Command";
import PlayerOption from './PlayerOption';
import { matchSorter } from 'match-sorter';
import { useContext, useState } from "react";
import { StateContext } from "../pages/_app";
import Parameters from '../models/Parameters';
import PlayerSelector from './PlayerSelector';
import CharacterOption from './CharacterOption';
import { getActivePlayers } from "./smasherscape";
import { defaultCommands, defaultSetParameter } from "./Commands";
import { getCharacterObjects, processCommandsWithParameters } from './PlayerForm';
import { Autocomplete, TextField, ToggleButton, ToggleButtonGroup } from "@mui/material";

export const getDefaultPlayer = (number) => ({id: number, type: `Default`, name: `Player-${number}`, label: `Player-${number}`});

export default function CommandsForm(props) {
    const { user, players, command, setCommand, playersToSelect, setPlayersToSelect, commandsToNotInclude, commands, setPlayers, useDatabase, databasePlayers, updatePlayersLocalStorage, deleteCompletely, setFilteredPlayers, sameNamePlayeredEnabled, setLoadingPlayers, iPhone, plays, setPlays, amount, setAmount, setParameter, setSetParameter } = useContext<any>(StateContext);

    let [condition, setCondition] = useState(`vs`);
    let [characters, setCharacters] = useState([]);
    let [charOne, setCharOne] = useState(`Character-One`);
    let [charTwo, setCharTwo] = useState(`Character-Two`);
    let [playerOne, setPlayerOne] = useState<any>(getDefaultPlayer(1));
    let [playerTwo, setPlayerTwo] = useState<any>(getDefaultPlayer(2));
    let [stocksTaken, setStocksTaken] = useState<any>(`Stocks-Taken-From-Winner`);
    let dynamicFormCommands = [defaultCommands.Update.command, defaultCommands.Set.command, defaultCommands.Give.command];

    let [conditions, setConditions] = useState<any>([
        {
            id: 1, 
            label: `Defeats`, 
            icon: <i className={`fas fa-trophy`}></i>,
        },
        {
            id: 2, 
            label: `Loses-to`, 
            icon: <i className={`fas fa-flag`}></i>,
        },
    ]);
 
    let [setParameters, setSetParameters] = useState<any>([
        {
            id: 1, 
            label: `Level`, 
            icon: <i className={`fas fa-sort-amount-up`}></i>,
        },
        {
            id: 2, 
            label: `Experience`, 
            icon: <i className={`fas fa-signal`}></i>,
        },
        {
            id: 2, 
            label: `XP Modifier`, 
            icon: <i className={`fas fa-sort-numeric-up-alt`}></i>,
        },
    ]);

    const adjustCommand = (e, val) => {
        if (val) {
            setCommand(val);
            setAmount(`Amount`);
            setPlayersToSelect([]);
            setSetParameter(defaultSetParameter);
            document.querySelectorAll(`.clearAllTagsIcon`).forEach((clearButton: any) => clearButton.click());
        }
    }

    const adjustStocks = (e, val) => {
        if (val) {
            if (typeof val == `string`) {
                setStocksTaken(val.split(` `)[0]);
            } else {
                setStocksTaken(val.id);
            }
        }
    }

    const adjustCondition = (e, val) => {
        if (val) {
            if (typeof val == `string`) {
                setCondition(val);
            } else {
                setCondition(val.label);
            }
        }
    }
    
    const adjustSetParameter = (e, val) => {
        if (val) {
            if (typeof val == `string`) {
                setSetParameter(val);
            } else {
                setSetParameter(val.label);
            }
        }
    }

    const adjustCharacters = (e, val, whichPlayer) => {
        if (val) {
            if (whichPlayer == 1) {
                if (typeof val == `string`) {
                    setCharOne(val);
                } else {
                    setCharOne(val.key);
                }
            } else {
                if (typeof val == `string`) {
                    setCharTwo(val);
                } else {
                    setCharTwo(val.key);
                }
            }
        }
    }

    const adjustPlayers = (e, val, winnerOrLoser) => {
        if (val) {
            if (winnerOrLoser == `winner`) {
                if (typeof val == `string`) {
                    setPlayerOne(getActivePlayers(players, true, plays).find(plyr => plyr.label.toLowerCase() == val.toLowerCase()));   
                } else {
                    setPlayerOne(val);
                }
            } else {
                if (typeof val == `string`) {
                    setPlayerTwo(getActivePlayers(players, true, plays).find(plyr => plyr.label.toLowerCase() == val.toLowerCase()));
                } else {
                    setPlayerTwo(val);
                }
            }
        } else {
            if (winnerOrLoser == `winner`) {
                setPlayerOne(getDefaultPlayer(1));
            } else {
                setPlayerTwo(getDefaultPlayer(2));
            }
        }
    }

    const renderCommand = (command: Command) => {
        let commandToReturn;
        if (characters.length == 0) setCharacters(getCharacterObjects());
        let playersSelected = playersToSelect.length == 0 ? `name(s) of player(s)` : playersToSelect.map(plyr => {
            return (
                plyr.name
            )
        }).join(` `);
        if (command) {
            if (command.command == `!del`) {
                commandToReturn = `!del ${playersSelected}`;
            } else if (command.command == defaultCommands.Set.command) {
                commandToReturn = `!set ${playersSelected} ${setParameter} ${amount}`;
            } else if (command.command == `!giv`) {
                commandToReturn = `!giv ${playersSelected} ([xp, bonus]) ${amount}`;
            } else {
                commandToReturn = `!upd ${playerOne?.name || `Player-1`} ${condition} ${playerTwo?.name || `Player-2`} with ${charOne} vs ${charTwo} ${stocksTaken}`;
            }
            return commandToReturn;
        }
    }

    const submitCommandsForm = (e, user: User | Player) => {
        e.preventDefault();
        let commandParams = renderCommand(command).split(` `);
        const parameters = new Parameters({
            user,
            plays,
            players, 
            setPlays,
            commands,
            setAmount,
            setPlayers, 
            useDatabase, 
            commandParams,
            databasePlayers, 
            deleteCompletely,
            setLoadingPlayers, 
            setFilteredPlayers, 
            sameNamePlayeredEnabled,
            updatePlayersLocalStorage,
            command: renderCommand(command),
        })
        processCommandsWithParameters(parameters);
    }

    return (
        <>
        <div className={`toggleButtonsContainer commandsToggle`}>
            <ToggleButtonGroup
                exclusive
                value={command}
                color={`primary`}
                aria-label={`Platform`}
                onChange={(e, val) => val && adjustCommand(e, val)}
            >
                {Object.values(defaultCommands).filter(cmd => !commandsToNotInclude.includes(cmd.command)).map((comm: Command, commIndex) => {
                    let desc = comm?.shortDescription;
                    let trailingDesc = desc.split(` `).filter((word, wordIndex) => wordIndex != 0).join(` `);
                    return (
                        <ToggleButton key={commIndex} size={`small`} value={comm}>
                            <span className={`buttonInnerText`}>
                                {comm?.icon}
                                <div className={`buttonRowText`}>
                                    <div className={`buttonRowTextInner`}>{comm?.name}</div>
                                    <div className={`trailingDesc buttonRowTextInner`}>{trailingDesc}</div>
                                </div>
                            </span>
                        </ToggleButton>
                    )
                })}
            </ToggleButtonGroup>
        </div>
        <ul className={`commandsList commandToCopy ${command?.name}`}>
            <li className={`listedCommand`} title={renderCommand(command)}>
                <div className="commandDetails flex gap15">
                    <CodeBlock commandToCopy={true} custombutton={true} border={`solid 2px white`} id={`commandToRender`} language={`js`} codeTitle={<>
                        {command?.icon}
                        <div className={`desc`}>{command?.shortDescription}</div>
                    </>}>
                        {renderCommand(command)}
                    </CodeBlock>
                </div>
            </li>
        </ul>
        <section className={`formsSection`}>
            <form onSubmit={(e) => submitCommandsForm(e, user)} className={`commandsForm ${command.class} ${defaultCommands.Update.command == command.command ? `updateCommandForm` : `customHookInputContainer`} ${dynamicFormCommands.includes(command.command) ? `dynamicHeight` : `staticHeight`} gridForm ${iPhone ? `on_iPhoneCommandForm` : `notOn_iPhoneCommandForm`}`} action={`submit`}>
                <div className={`updateCommandsForm commandInputs ${command.command == `!upd` ? `expanded` : `collapsed`}`}>
                    <div className={`updateRow updateTopRow`}>
                        <div className={`playerSearchAuto inputWrapper materialBGInputWrapper`}>
                            <div className={`inputBG materialBG`}></div>
                            <Autocomplete
                                autoHighlight
                                sx={{ width: `100%` }}
                                id={`playerSearchAutoPlayer1`}
                                getOptionLabel={(option) => option.name}
                                onChange={(e, val: any) => adjustPlayers(e, val, `winner`)}
                                onInputChange={(e, val: any) => adjustPlayers(e, val, `winner`)}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                options={getActivePlayers(players, true, plays).filter(plyr => plyr?.id != playerTwo?.id)}
                                renderInput={(params) => <TextField name={`players`} {...params} label="Player 1..." />}
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
                        <div className={`toggleButtonsContainer conditionToggle`}>
                            <ToggleButtonGroup
                                exclusive
                                color={`primary`}
                                value={condition}
                                aria-label={`Platform`}
                                onChange={(e, val) => val && adjustCondition(e, val)}
                            >
                                {conditions.map((con, conIndex) => {
                                    return (
                                        <ToggleButton key={conIndex} size={`small`} value={con.label}>
                                            <span id={`${con.id}-${con.label}`} className={`buttonInnerText`}>
                                                {con?.icon}
                                                <div className={`buttonRowText`}>
                                                    <div className={`buttonRowTextInner`}>{con.label}</div>
                                                </div>
                                            </span>
                                        </ToggleButton>
                                    )
                                })}
                            </ToggleButtonGroup>
                        </div>
                        <div className={`playerSearchAuto inputWrapper materialBGInputWrapper`}>
                            <div className={`inputBG materialBG`}></div>
                            <Autocomplete
                                autoHighlight
                                sx={{ width: `100%` }}
                                id={`playerSearchAutoPlayer2`}
                                getOptionLabel={(option) => option.name}
                                onChange={(e, val: any) => adjustPlayers(e, val, `loser`)}
                                onInputChange={(e, val: any) => adjustPlayers(e, val, `loser`)}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                options={getActivePlayers(players, true, plays).filter(plyr => plyr.id != playerOne?.id)}
                                renderInput={(params) => <TextField name={`players`} {...params} label="Player 2..." />}
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
                    </div>
                    <div className={`updateRow updateNextRow ${playerOne && playerTwo && ((typeof playerOne == `string` ? playerOne != `Player-1` : playerOne.type != `Default`) && (typeof playerTwo == `string` ? playerTwo != `Player-2` : playerTwo.type != `Default`) && condition != `vs`) ? `expanded` : `collapsed`}`}>
                        <div className={`characterSearchAuto inputWrapper materialBGInputWrapper`}>
                            <div className={`inputBG materialBG`}></div>
                            <Autocomplete
                                autoHighlight
                                sx={{ width: `100%` }}
                                options={getCharacterObjects()}
                                id={`characterSearchAutoCommandsForm-1`}
                                getOptionLabel={(option) => option.label}
                                onChange={(e, val: any) => adjustCharacters(e, val, 1)}
                                onInputChange={(e, val: any) => adjustCharacters(e, val, 1)}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                renderInput={(params) => <TextField name={`characters`} {...params} label="Character 1..." />}
                                noOptionsText={`No Character(s) Found for Search`}
                                filterOptions={(characterOptions, state) => matchSorter(characterOptions, state.inputValue, { keys: [`label`, `shortcuts`] })}
                                renderOption={(props: any, characterOption: any) => {
                                    return (
                                        <div key={characterOption.id} {...props}>
                                            <CharacterOption plays={playerOne.type != `Default` ? plays.filter(ply => ply?.winnerUUID == playerOne?.uuid || ply?.loserUUID == playerOne?.uuid) : plays} type={playerOne.type != `Default` ? `Player` : `All`} plyr={playerTwo.type != `Default` ? playerTwo : `All`} characterOption={characterOption} />
                                        </div>
                                    )
                                }}
                            />
                        </div>
                        <div className={`conditionAuto stocksAuto smallAuto inputWrapper materialBGInputWrapper ${iPhone ? `on_iPhoneStocksAuto` : `notOn_iPhoneStocksAuto`}`}>
                            <div className={`inputBG materialBG`}></div>
                            <Autocomplete
                                autoHighlight
                                id="stocksAuto-1"
                                sx={{ width: `100%` }}
                                options={[{id: 0, label: `0 Stock(s)`}, {id: 1, label: `1 Stock(s)`}, {id: 2, label: `2 Stock(s)`}]}
                                getOptionLabel={(option) => option.label}
                                onChange={(e, val: any) => adjustStocks(e, val)}
                                onInputChange={(e, val: any) => adjustStocks(e, val)}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                renderInput={(params) => <TextField name={`stocks`} {...params} label="Stocks Taken from Winner..." />}
                                noOptionsText={`No Stock(s) Found for Search`}
                                renderOption={(props: any, option: any) => {
                                    return (
                                        <div key={option?.id} {...props}>
                                            <div className="autocompleteOption singularLabel">
                                                {option.label}
                                            </div>
                                        </div>
                                    )
                                }}
                            />
                        </div>
                        <div className={`characterSearchAuto inputWrapper materialBGInputWrapper`}>
                            <div className={`inputBG materialBG`}></div>
                            <Autocomplete
                                autoHighlight
                                sx={{ width: `100%` }}
                                options={getCharacterObjects()}
                                id={`characterSearchAutoCommandsForm-2`}
                                getOptionLabel={(option) => option.label}
                                noOptionsText={`No Character(s) Found for Search`}
                                onChange={(e, val: any) => adjustCharacters(e, val, 2)}
                                onInputChange={(e, val: any) => adjustCharacters(e, val, 2)}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                renderInput={(params) => <TextField name={`characters`} {...params} label="Character 2..." />}
                                filterOptions={(characterOptions, state) => matchSorter(characterOptions, state.inputValue, { keys: [`label`, `shortcuts`] })}
                                renderOption={(props: any, characterOption: any) => {
                                    return (
                                        <div key={characterOption.id} {...props}>
                                            <CharacterOption plays={playerTwo.type != `Default` ? plays.filter(ply => ply?.winnerUUID == playerTwo?.uuid || ply?.loserUUID == playerTwo?.uuid) : plays} type={playerTwo.type != `Default` ? `Player` : `All`} plyr={playerOne.type != `Default` ? playerOne : `All`} characterOption={characterOption} />                               
                                        </div>
                                    )
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className={`deleteCommandsForm multiSelectCommandsForm commandInputs ${command.command == `!del` ? `expanded` : `collapsed`}`}>
                    <PlayerSelector />
                </div>
                <div className={`setCommandsForm multiSelectCommandsForm commandInputs ${command.command == `!set` ? `expanded` : `collapsed`}`}>
                    <div className={`toggleButtonsContainer conditionToggle ${setParameter.toLowerCase() != defaultSetParameter.toLowerCase() ? `activated` : `notActivated`}`}>
                        <ToggleButtonGroup
                            exclusive
                            color={`primary`}
                            value={setParameter}
                            aria-label={`Platform`}
                            onChange={(e, val) => val && adjustSetParameter(e, val)}
                        >
                            {setParameters.map((setParam, setParamsIndex) => {
                                return (
                                    <ToggleButton key={setParamsIndex} size={`small`} value={setParam.label}>
                                        <span id={`setParam-${setParam.id}-${setParam.label}`} className={`buttonInnerText`}>
                                            {setParam?.icon}
                                            <div className={`buttonRowText`}>
                                                <div className={`buttonRowTextInner`}>{setParam.label}</div>
                                            </div>
                                        </span>
                                    </ToggleButton>
                                )
                            })}
                        </ToggleButtonGroup>
                    </div>
                    <div className={`updateRow nextParameterRow fixedPositioning updateNextRow ${setParameter.toLowerCase() != defaultSetParameter.toLowerCase() ? `expanded` : `collapsed`}`}>
                        <PlayerSelector />
                    </div>
                    <div className={`updateRow nextParameterRow updateNextRow setParameterBottomRow ${(playersToSelect.length > 0) && (setParameter.toLowerCase() != defaultSetParameter.toLowerCase()) ? `expanded` : `collapsed`}`}>
                        <RangeSlider name={`Set to Level`} min={0} defaultValue={50} max={99} marks={false} showMinMax={true} setAmount={setAmount} />
                    </div>
                </div>
                <div className={`giveCommandsForm multiSelectCommandsForm commandInputs ${command.command == `!giv` ? `expanded` : `collapsed`}`}>
                    <PlayerSelector />
                </div>
                <button className={`formSubmitButton commandsFormSubmit`} type={`submit`}>Submit</button>
            </form>
        </section>
        </>
    )
}