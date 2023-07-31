import CodeBlock from "./CodeBlock";
import Command from "../models/Command";
import { defaultCommands } from "./Commands";
import { useContext, useState } from "react";
import { StateContext } from "../pages/_app";
import { Autocomplete, Badge, TextField } from "@mui/material";
import { calcPlayerCharacterIcon } from "../common/CharacterIcons";
import { calcPlayerCharacterTimesPlayed, calcPlayerCharactersPlayed, calcPlayerLevelImage, getActivePlayers, getCharacterTitle } from "./smasherscape";

export default function CommandsForm(props) {
    let [winner, setWinner] = useState(``);
    let [loser, setLoser] = useState(``);
    const { players, command, setCommand } = useContext<any>(StateContext);

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
                    setWinner(val);   
                } else {
                    setWinner(val.name);
                }
            } else {
                if (typeof val == `string`) {
                    setLoser(val);
                } else {
                    setLoser(val.name);
                }
            }
            let updateCommand = `!upd ${winner != `` ? winner : `winner`} vs ${loser != `` ? loser : `loser`} with winChar vs loseChar stocksTakenFromWinner`;
            console.log(updateCommand);
            setCommand({
                ...command,
                example: updateCommand,
            });
        }
    }

    return (
        <section className={`formsSection`}>
            <ul className="commandsList commandToCopy">
                <li className={`listedCommand`} title={`${command?.description}: ${command?.example ? command?.example : command?.command}`}>
                    <div className="commandDetails flex gap15">
                        <CodeBlock custombutton={true} id={`comm-${command?.id}`} language={`js`}>
                            {command?.example ? command?.example : command?.command}
                        </CodeBlock>
                        <div className={`desc`}>{command?.description}</div>
                    </div>
                </li>
            </ul>
            <form className={`commandsForm gridForm`} action="submit">
                <div className={`inputWrapper materialBGInputWrapper`}>
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
                    <div className={`inputWrapper materialBGInputWrapper`}>
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
                            }).filter(plyr => plyr?.name != loser)}
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
                    <div className={`inputWrapper materialBGInputWrapper`}>
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
                            })}
                            getOptionLabel={(option) => option.label}
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
                    <div className={`inputWrapper materialBGInputWrapper`}>
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
                            }).filter(plyr => plyr.name != winner)}
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
            </form>
        </section>
    )
}