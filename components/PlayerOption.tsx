
import AutoCompletePlayerOption from "./AutoCompletePlayerOption";

export default function PlayerOption(props) {
    let { playerOption } = props;
    return (
        <div key={playerOption.id} {...props}>
            <AutoCompletePlayerOption playerOption={playerOption} />
        </div>
    )
}