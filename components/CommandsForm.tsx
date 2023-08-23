import React from 'react';
import CodeBlock from "./CodeBlock";
import Command from "../models/Command";
import { defaultCommands } from "./Commands";
import { StateContext } from "../pages/_app";
import { useContext, useState } from "react";
import CustomizedHook from './CustomizedHook';
import { Characters } from "../common/Characters";
import { calcPlayerCharacterIcon } from "../common/CharacterIcons";
import { Autocomplete, Badge, TextField, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { calcPlayerCharacterTimesPlayed, calcPlayerCharactersPlayed, calcPlayerLevelImage, getActivePlayers, getCharacterTitle } from "./smasherscape";

export const getDefaultPlayer = (number) => {return {
    id: number, name: `Player-${number}`, label: `Player-${number}`
}};

export default function CommandsForm(props) {
    let [characters, setCharacters] = useState([]);
    let [condition, setCondition] = useState(`vs`);
    let [charOne, setCharOne] = useState(`Character-One`);
    let [charTwo, setCharTwo] = useState(`Character-Two`);
    let [playerOne, setPlayerOne] = useState<any>(getDefaultPlayer(1));
    let [playerTwo, setPlayerTwo] = useState<any>(getDefaultPlayer(2));
    let [stocksTaken, setStocksTaken] = useState<any>(`Stocks-Taken-From-Winner`);
    const { players, command, setCommand, playersToSelect, commandsToNotInclude } = useContext<any>(StateContext);

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

    const adjustPlayers = (e, val, winnerOrLoser) => {
        if (val) {
            if (winnerOrLoser == `winner`) {
                if (typeof val == `string`) {
                    setPlayerOne(getActivePlayers(players).find(plyr => plyr.label.toLowerCase() == val.toLowerCase()));   
                } else {
                    setPlayerOne(val);
                }
            } else {
                if (typeof val == `string`) {
                    setPlayerTwo(getActivePlayers(players).find(plyr => plyr.label.toLowerCase() == val.toLowerCase()));
                } else {
                    setPlayerTwo(val);
                }
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
        } else {
            setPlayerOne(getDefaultPlayer(1));
            setPlayerTwo(getDefaultPlayer(2));
        }
    }

    const renderCommand = (command: Command) => {
        if (characters.length == 0) {
            setCharacters(Object.entries(Characters).filter(char => char[0] === char[0].charAt(0).toUpperCase() + char[0].slice(1)).map((char, charIndex) => {
                return {
                    id: charIndex + 1,
                    key: char[0],
                    label: char[1],
                    image: calcPlayerCharacterIcon(char[0])
                }
            }));
        }
        if (command) {
            if (command.command == `!del`) {
                return `!del ${playersToSelect.length == 0 ? `name(s) of player(s)` : playersToSelect.map(plyr => {
                    return (
                        plyr.name
                    )
                }).join(` `)}`;
            } else if (command.command == `!set`) {
                return `!set playerName (xp) amount`;
            } else if (command.command == `!giv`) {
                return `!giv playerName (xp) amount`;
            } else {
                return `!upd ${playerOne?.name} ${condition} ${playerTwo?.name} with ${charOne} vs ${charTwo} ${stocksTaken}`;
            }
        }
    }

    const submitCommandsForm = (e) => {
        e.preventDefault();
        // let playerForm: any = document.querySelector(`#playerForm`);
        // let commandsInput: any = document.querySelector(`#commandsInput input`);
        // let commandToRender = document.querySelector(`#commandToRender`);
        // if (commandsInput && playerForm) {
        //     commandsInput.value = commandToRender.innerHTML;
        //     playerForm.submit();
        // }
    }

    return (
        <>
        <div className={`toggleButtonsContainer`}>
            <h2 className={`toggleButtonsHeader`}>Commands Builder Form</h2>
            <ToggleButtonGroup
                exclusive
                color="primary"
                aria-label="Platform"
                onChange={(e, val) => val && setCommand(val)}
                value={command}
            >
                {Object.values(defaultCommands).filter(cmd => !commandsToNotInclude.includes(cmd.command)).map((comm: Command, commIndex) => {
                    return (
                        <ToggleButton key={commIndex} size={`small`} value={comm}>
                            <span className={`buttonInnerText`}>{comm?.command}</span>
                        </ToggleButton>
                    )
                })}
            </ToggleButtonGroup>
        </div>
        <section className={`formsSection`}>
            <form onSubmit={(e) => submitCommandsForm(e)} className={`commandsForm gridForm`} action="submit">
            <div className={`commandInputs ${command.command == `!upd` ? `expanded` : `collapsed`}`}>
                    <div className="updateRow updateTopRow">
                        <div className={`playerSearchAuto inputWrapper materialBGInputWrapper`}>
                            <div className="inputBG materialBG"></div>
                            <Autocomplete
                                autoHighlight
                                id="combo-box-demo"
                                sx={{ width: `100%` }}
                                getOptionLabel={(option) => option.label}
                                onChange={(e, val: any) => adjustPlayers(e, val, `winner`)}
                                onInputChange={(e, val: any) => adjustPlayers(e, val, `winner`)}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                options={getActivePlayers(players).filter(plyr => plyr?.id != playerTwo?.id)}
                                renderInput={(params) => <TextField name={`players`} {...params} label="Players..." />}
                                renderOption={(props: any, playerOption: any) => {
                                    return (
                                        <div key={playerOption.id} {...props}>
                                            <div className="autocompleteOption">
                                                <div className="levelNumColumn">Lv {playerOption?.level?.num}</div>
                                                <div className="levelImageColumn"><img width={30} src={calcPlayerLevelImage(playerOption?.level?.name)} alt={playerOption?.level?.name} /></div>
                                                <div className="playerDetailsColumn">
                                                    <div className="playerName">{playerOption?.name}</div>
                                                    <div className="playerEXP">{playerOption?.experience?.arenaXP}</div>
                                                    <div className="plays">
                                                        <div className={`playsContainer`}>
                                                            {calcPlayerCharactersPlayed(playerOption).map((char, charIndex) => {
                                                                return (
                                                                    <Badge title={`Played ${getCharacterTitle(char)} ${calcPlayerCharacterTimesPlayed(playerOption, char)} Time(s)`} key={charIndex} badgeContent={calcPlayerCharacterTimesPlayed(playerOption, char)} color="primary">
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
                        <div className={`conditionAuto smallAuto inputWrapper materialBGInputWrapper`}>
                            <div className="inputBG materialBG"></div>
                            <Autocomplete
                                autoHighlight
                                id="combo-box-demo"
                                sx={{ width: `100%` }}
                                options={[{id: 1, label: `Defeats`}, {id: 2, label: `Loses-to`}]}
                                getOptionLabel={(option) => option.label}
                                onChange={(e, val: any) => adjustCondition(e, val)}
                                onInputChange={(e, val: any) => adjustCondition(e, val)}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                renderInput={(params) => <TextField name={`condition`} {...params} label="Condition..." />}
                                renderOption={(props: any, option: any) => {
                                    return (
                                        <div key={option.id} {...props}>
                                            <div className="autocompleteOption singularLabel">
                                                {option.label}
                                            </div>
                                        </div>
                                    )
                                }}
                            />
                        </div>
                        <div className={`playerSearchAuto inputWrapper materialBGInputWrapper`}>
                            <div className="inputBG materialBG"></div>
                            <Autocomplete
                                autoHighlight
                                id="combo-box-demo"
                                sx={{ width: `100%` }}
                                getOptionLabel={(option) => option.label}
                                onChange={(e, val: any) => adjustPlayers(e, val, `loser`)}
                                onInputChange={(e, val: any) => adjustPlayers(e, val, `loser`)}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                options={getActivePlayers(players).filter(plyr => plyr.id != playerOne?.id)}
                                renderInput={(params) => <TextField name={`players`} {...params} label="Players..." />}
                                renderOption={(props: any, playerOption: any) => {
                                    return (
                                        <div key={playerOption.id} {...props}>
                                            <div className="autocompleteOption">
                                                <div className="levelNumColumn">Lv {playerOption?.level?.num}</div>
                                                <div className="levelImageColumn"><img width={30} src={calcPlayerLevelImage(playerOption?.level?.name)} alt={playerOption?.level?.name} /></div>
                                                <div className="playerDetailsColumn">
                                                    <div className="playerName">{playerOption?.name}</div>
                                                    <div className="playerEXP">{playerOption?.experience?.arenaXP}</div>
                                                    <div className="plays">
                                                        <div className={`playsContainer`}>
                                                            {calcPlayerCharactersPlayed(playerOption).map((char, charIndex) => {
                                                                return (
                                                                    <Badge title={`Played ${getCharacterTitle(char)} ${calcPlayerCharacterTimesPlayed(playerOption, char)} Time(s)`} key={charIndex} badgeContent={calcPlayerCharacterTimesPlayed(playerOption, char)} color="primary">
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
                    </div>
                    <div className={`updateRow updateBottomRow ${(playerOne != `Player-One` && playerTwo != `Player-Two` && condition != `vs`) ? `expanded` : `collapsed`}`}>
                        <div className={`characterSearchAuto inputWrapper materialBGInputWrapper`}>
                            <div className="inputBG materialBG"></div>
                            <Autocomplete
                                autoHighlight
                                id="combo-box-demo"
                                sx={{ width: `100%` }}
                                options={getCharacterObjs()}
                                getOptionLabel={(option) => option.label}
                                onChange={(e, val: any) => adjustCharacters(e, val, 1)}
                                onInputChange={(e, val: any) => adjustCharacters(e, val, 1)}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                renderInput={(params) => <TextField name={`characters`} {...params} label="Characters..." />}
                                renderOption={(props: any, option: any) => {
                                    return (
                                        <div key={option?.id} {...props}>
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
                        <div className={`conditionAuto smallAuto inputWrapper materialBGInputWrapper`}>
                            <div className="inputBG materialBG"></div>
                            <Autocomplete
                                autoHighlight
                                id="combo-box-demo"
                                sx={{ width: `100%` }}
                                options={[{id: 0, label: `0 Stock(s)`}, {id: 1, label: `1 Stock(s)`}, {id: 2, label: `2 Stock(s)`}]}
                                getOptionLabel={(option) => option.label}
                                onChange={(e, val: any) => adjustStocks(e, val)}
                                onInputChange={(e, val: any) => adjustStocks(e, val)}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                renderInput={(params) => <TextField name={`stocks`} {...params} label="Stocks..." />}
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
                            <div className="inputBG materialBG"></div>
                            <Autocomplete
                                autoHighlight
                                id="combo-box-demo"
                                sx={{ width: `100%` }}
                                options={getCharacterObjs()}
                                getOptionLabel={(option) => option.label}
                                onChange={(e, val: any) => adjustCharacters(e, val, 2)}
                                onInputChange={(e, val: any) => adjustCharacters(e, val, 2)}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                renderInput={(params) => <TextField name={`characters`} {...params} label="Characters..." />}
                                renderOption={(props: any, option: any) => {
                                    return (
                                        <div key={option?.label} {...props}>
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
                    </div>
                </div>
                <div className={`commandInputs ${command.command == `!del` ? `expanded` : `collapsed`}`}>
                    <CustomizedHook />
                </div>
                <div className={`commandInputs ${command.command == `!set` ? `expanded` : `collapsed`}`}>
                    Set Fields
                </div>
                <div className={`commandInputs ${command.command == `!giv` ? `expanded` : `collapsed`}`}>
                    Give Fields
                </div>
                <button className={`formSubmitButton`} type={`submit`}>Submit</button>
            </form>
        </section>
        <ul className="commandsList commandToCopy">
            <li className={`listedCommand`} title={renderCommand(command)}>
                <div className="commandDetails flex gap15">
                    <CodeBlock custombutton={true} border={`solid 2px white`} id={`commandToRender`} language={`js`} codeTitle={<div className={`desc`}>{command?.description}</div>}>
                        {renderCommand(command)}
                    </CodeBlock>
                </div>
            </li>
        </ul>
        </>
    )
}