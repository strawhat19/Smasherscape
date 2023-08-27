import { useContext } from "react";
import { Badge } from "@mui/material";
import { StateContext, getAllPlays, getAllPlaysJSON } from "../pages/_app";
import { calcPlaysCharacterTimesPlayed, getActivePlayers } from "./smasherscape";
export default function CharacterOption(props) {
    let { characterOption } = props;
    const { players } = useContext<any>(StateContext);
    // console.log(`Char Times Played`, calcPlaysCharacterTimesPlayed(getAllPlays(getActivePlayers(players)), characterOption));
    return (
        <div className="autocompleteOption characterOption">
            <div className="characterIndex">{characterOption?.id}</div>
            {/* <Badge title={`Played 2 Time(s)`} badgeContent={2} color="primary">     */}
                <img className={`charImg`} width={25} src={characterOption.image} alt={characterOption.label} />
            {/* </Badge> */}
            <div className="spacer"></div>
            <div className="characterName">{characterOption?.label}</div>
            {/* <Badge title={`Played 2 Time(s)`} badgeContent={calcPlaysCharacterTimesPlayed(getAllPlays(getActivePlayers(players)), characterOption.key)} color="primary" /> */}
        </div>
    )
}