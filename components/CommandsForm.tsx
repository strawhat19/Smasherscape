import React from 'react';
import CodeBlock from "./CodeBlock";
import Command from "../models/Command";
import { defaultCommands } from "./Commands";
import { StateContext } from "../pages/_app";
import { Characters } from "../common/Characters";
import { useContext, useEffect, useState } from "react";
import { Autocomplete, Badge, TextField } from "@mui/material";
import { calcPlayerCharacterIcon } from "../common/CharacterIcons";
import { calcPlayerCharacterTimesPlayed, calcPlayerCharactersPlayed, calcPlayerLevelImage, getActivePlayers, getCharacterTitle } from "./smasherscape";

export default function CommandsForm(props) {
    let [playerTwo, setPlayerTwo] = useState(`Player-Two`);
    let [playerOne, setPlayerOne] = useState(`Player-One`);
    let [condition, setCondition] = useState(`vs`);
    let [charOne, setCharOne] = useState(`Character-One`);
    let [charTwo, setCharTwo] = useState(`Character-Two`);
    let [stocksTaken, setStocksTaken] = useState<any>(`Stocks-Taken-From-Winner`);
    let [characters, setCharacters] = useState([]);
    const { players, command, setCommand } = useContext<any>(StateContext);

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

    const setDefaultCommand = (e, val) => {
        if (val) {
            if (typeof val == `string`) {
                console.log(val);
            } else {
                setCommand(val);
            }
        }
    }

    const adjustPlayers = (e, val, winnerOrLoser) => {
        if (val) {
            if (winnerOrLoser == `winner`) {
                if (typeof val == `string`) {
                    setPlayerOne(val);   
                } else {
                    setPlayerOne(val.name);
                }
            } else {
                if (typeof val == `string`) {
                    setPlayerTwo(val);
                } else {
                    setPlayerTwo(val.name);
                }
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

    const adjustStocks = (e, val) => {
        if (val) {
            if (typeof val == `string`) {
                setStocksTaken(val.split(` `)[0]);
            } else {
                setStocksTaken(val.id);
            }
        }
    }

    const adjustCharacters = (e, val, whichPlayer) => {
        if (val) {
            if (whichPlayer == 1) {
                if (typeof val == `string`) {
                    console.log(`adjustCharacters`, val);
                    setCharOne(val);
                } else {
                    console.log(`adjustCharacters`, val);
                    setCharOne(val.key);
                }
            } else {
                if (typeof val == `string`) {
                    console.log(`adjustCharacters`, val);
                    setCharTwo(val);
                } else {
                    console.log(`adjustCharacters`, val);
                    setCharTwo(val.key);
                }
            }
        }
    }

    const renderCommand = (command: Command) => {
        console.log(`Command`, command);
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
            if (command.command == `!upd`) {
                return `!upd ${playerOne} ${condition} ${playerTwo} with ${charOne} vs ${charTwo} ${stocksTaken}`;
            }
        }
    }

    return (
        <section className={`formsSection`}>
            <ul className="commandsList commandToCopy">
                <li className={`listedCommand`} title={`${command?.description}: ${command?.example ? command?.example : command?.command}`}>
                    <div className="commandDetails flex gap15">
                        <CodeBlock custombutton={true} id={`comm-${command?.id}`} language={`js`}>
                            {renderCommand(command)}
                        </CodeBlock>
                        {/* <div className={`desc`}>{command?.description}</div> */}
                    </div>
                </li>
            </ul>
            <form className={`commandsForm gridForm`} action="submit">
                <div className={`commandsSearch inputWrapper materialBGInputWrapper`}>
                    <div className="inputBG materialBG"></div>
                    <Autocomplete
                        disablePortal
                        autoHighlight
                        id="combo-box-demo"
                        sx={{ width: `100%` }}
                        options={Object.values(defaultCommands).map((comm: Command) => {
                            return {
                                ...comm,
                                label: comm.command,
                            }
                        })}
                        onChange={(e, val: any) => setDefaultCommand(e, val)}
                        onInputChange={(e, val: any) => setDefaultCommand(e, val)}
                        getOptionLabel={(option) => option.label}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        renderInput={(params) => <TextField name={`commands`} {...params} label="Commands..." />}
                        renderOption={(props: any, option: any) => {
                            return (
                                <div key={props?.key} {...props}>
                                    <div className="autocompleteOption singularLabel">
                                        {option.label}
                                    </div>
                                </div>
                            )
                        }}
                    />
                </div>
                <div className={`commandInputs ${command.command == `!upd` ? `expanded` : `collapsed`}`}>
                    <div className="updateRow updateTopRow">
                        <div className={`playerSearchAuto inputWrapper materialBGInputWrapper`}>
                            <div className="inputBG materialBG"></div>
                            <Autocomplete
                                disablePortal
                                autoHighlight
                                id="combo-box-demo"
                                sx={{ width: `100%` }}
                                options={getActivePlayers(players).map(plyr => {
                                    return {
                                        ...plyr,
                                        label: plyr.name,
                                    }
                                }).filter(plyr => plyr?.name != playerTwo)}
                                getOptionLabel={(option) => option.label}
                                onChange={(e, val: any) => adjustPlayers(e, val, `winner`)}
                                onInputChange={(e, val: any) => adjustPlayers(e, val, `winner`)}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                renderInput={(params) => <TextField name={`players`} {...params} label="Players..." />}
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
                        <div className={`conditionAuto smallAuto inputWrapper materialBGInputWrapper`}>
                            <div className="inputBG materialBG"></div>
                            <Autocomplete
                                disablePortal
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
                                        <div key={props?.key} {...props}>
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
                                disablePortal
                                autoHighlight
                                id="combo-box-demo"
                                sx={{ width: `100%` }}
                                options={getActivePlayers(players).map(plyr => {
                                    return {
                                        ...plyr,
                                        label: plyr.name,
                                    }
                                }).filter(plyr => plyr.name != playerOne)}
                                getOptionLabel={(option) => option.label}
                                onChange={(e, val: any) => adjustPlayers(e, val, `loser`)}
                                onInputChange={(e, val: any) => adjustPlayers(e, val, `loser`)}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                renderInput={(params) => <TextField name={`players`} {...params} label="Players..." />}
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
                    </div>
                    <div className={`updateRow updateBottomRow ${(playerOne != `Player-One` && playerTwo != `Player-Two` && condition != `vs`) ? `expanded` : `collapsed`}`}>
                        <div className={`characterSearchAuto inputWrapper materialBGInputWrapper`}>
                            <div className="inputBG materialBG"></div>
                            <Autocomplete
                                autoHighlight
                                id="combo-box-demo"
                                sx={{ width: `100%` }}
                                options={getCharacterObjs().filter(cha => cha.key != charTwo)}
                                getOptionLabel={(option) => option.label}
                                onChange={(e, val: any) => adjustCharacters(e, val, 1)}
                                onInputChange={(e, val: any) => adjustCharacters(e, val, 1)}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                renderInput={(params) => <TextField name={`characters`} {...params} label="Characters..." />}
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
                        <div className={`conditionAuto smallAuto inputWrapper materialBGInputWrapper`}>
                            <div className="inputBG materialBG"></div>
                            <Autocomplete
                                disablePortal
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
                                        <div key={props?.key} {...props}>
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
                                options={getCharacterObjs().filter(cha => cha.key != charOne)}
                                getOptionLabel={(option) => option.label}
                                onChange={(e, val: any) => adjustCharacters(e, val, 2)}
                                onInputChange={(e, val: any) => adjustCharacters(e, val, 2)}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                renderInput={(params) => <TextField name={`characters`} {...params} label="Characters..." />}
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
                    </div>
                </div>
            </form>
        </section>
    )
}