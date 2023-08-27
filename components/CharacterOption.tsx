import { Badge } from "@mui/material";
export default function CharacterOption(props) {
    let { characterOption } = props;
    return (
        <div className="autocompleteOption characterOption">
            <div className="characterIndex">{characterOption?.id}</div>
            <img className={`charImg`} width={25} src={characterOption.image} alt={characterOption.label} />
            <div className="spacer"></div>
            <div className="characterName">{characterOption?.label}</div>
            {/* <Badge title={`Played ${getCharacterTitle(char)} ${calcPlayerCharacterTimesPlayed(playerOption, char)} Time(s)`} 
            key={charIndex} badgeContent={calcPlayerCharacterTimesPlayed(playerOption, char)} color="primary">
                <img className={`charImg`} width={25} src={calcPlayerCharacterIcon(char)} alt={getCharacterTitle(char)} />
            </Badge> */}
        </div>
    )
}