import { Badge } from "@mui/material";
import { calcPlayerCharacterIcon } from "../common/CharacterIcons";
import { calcPlayerCharactersPlayed, calcPlayerCharacterTimesPlayed, calcPlayerLevelImage, getCharacterTitle } from "./smasherscape";

export default function AutoCompletePlayerOption(props) {
    let { playerOption, className } = props;
    return (
        <div className={`autocompleteOption ${className ? className : ``}`}>
            <div className="levelNumColumn">Lv {playerOption?.level?.num}</div>
            <div className="levelImageColumn">
                <img width={30} src={calcPlayerLevelImage(playerOption?.level?.name)} alt={playerOption?.level?.name} />
            </div>
            <div className="playerDetailsColumn">
                <div className="playerName">{playerOption?.name}</div>
                <div className="playerEXP">Exp: {playerOption?.experience?.arenaXP}</div>
                <div className="plays">
                    <div className={`playsContainer`}>
                        {calcPlayerCharactersPlayed(playerOption).map((char, charIndex) => {
                            return (
                                <Badge title={`Played ${getCharacterTitle(char)} ${calcPlayerCharacterTimesPlayed(playerOption, char)} Time(s)`} 
                                key={charIndex} badgeContent={calcPlayerCharacterTimesPlayed(playerOption, char)} color="primary">
                                    <img className={`charImg`} width={25} src={calcPlayerCharacterIcon(char)} alt={getCharacterTitle(char)} />
                                </Badge>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}