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
                <div className="playerStats justifyContentCenter">
                    <span>{playerOption?.name}</span>
                    {/* <div className="playerStatDetails subtleTextInLabel">
                        <div className={`statDetailLabelSmall`}><span className={`subtleTextInLabel`}>K:</span> {playerOption?.kills}</div>
                        <div className={`statDetailLabelSmall`}><span className={`subtleTextInLabel`}>D:</span> {playerOption?.deaths}</div>
                    </div> */}
                </div>
                <div className="playerEXP subtleTextInLabel">
                    <div className="playerStats">
                        <span>Exp: {playerOption?.experience?.arenaXP?.toLocaleString(`en`)}</span>
                        <div className="playerStatDetails subtleTextInLabel">
                            <div className={`statDetailLabelSmall`}><span className={`subtleTextInLabel`}>Wins:</span> {playerOption?.wins}</div>
                            <div className={`statDetailLabelSmall`}><span className={`subtleTextInLabel`}>Losses:</span> {playerOption?.losses}</div>
                        </div>
                    </div>
                </div>
                <div className="plays">
                    <div className={`playsContainer`}>
                        {calcPlayerCharactersPlayed(playerOption).length > 0 ? (
                            calcPlayerCharactersPlayed(playerOption).map((char, charIndex) => {
                                return (
                                    <Badge title={`Played ${getCharacterTitle(char)} ${calcPlayerCharacterTimesPlayed(playerOption, char)} Time(s)`} 
                                    key={charIndex} badgeContent={calcPlayerCharacterTimesPlayed(playerOption, char)} color="primary">
                                        <img className={`charImg`} width={25} src={calcPlayerCharacterIcon(char)} alt={getCharacterTitle(char)} />
                                    </Badge>
                                )
                            })
                        ) : (
                            <span className={`subtleTextInLabel`}>0 Plays</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}