export default function AutoCompleteCharacterOption(props) {
    let { characterOption } = props;
    return (
        <div className="autocompleteOption characterOption">
            <div className="characterIndex">{characterOption?.id}</div>
            <img className={`charImg`} width={25} src={characterOption.image} alt={characterOption.label} />
            <div className="spacer"></div>
            <div className="characterName">{characterOption?.label}</div>
        </div>
    )
}