import { calcPlayerCharacterIcon } from "../common/CharacterIcons";
import { calcPlayerCharactersPlayed, calcPlayerLevelImage, getCharacterTitle } from "./smasherscape";

export default function PlayerHookTag(props) {
    let { playerOption, onDelete, other } = props;
    return (
        <div className={`playerHookTag`} {...other}>
            <div className="autocompleteOption">
                <div className="levelNumColumn">{playerOption?.level?.num}</div>
                <div className="levelImageColumn"><img width={30} src={calcPlayerLevelImage(playerOption?.level?.name)} alt={playerOption?.level?.name} /></div>
                <div className="playerHookTagDetails playerDetailsColumn">
                <div className="playerName">{playerOption?.name}</div>
                <div className="playerEXP">{playerOption?.experience?.arenaXP}</div>
                <div className="plays">
                    <div className={`playsContainer`}>
                    {calcPlayerCharactersPlayed(playerOption).map((char, charIndex) => {
                        return (
                            <img title={getCharacterTitle(char)} key={charIndex} className={`charImg`} width={25} src={calcPlayerCharacterIcon(char)} alt={getCharacterTitle(char)} />
                        )
                    })}
                    </div>
                </div>
                </div>
            </div>
            <i className="fas fa-times tagCloseIcon" onClick={onDelete}></i>
        </div>
    )
}