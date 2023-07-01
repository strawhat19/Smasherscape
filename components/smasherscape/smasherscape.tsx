export default function Smasherscape(props) {
    return <>
        <h1 className="runescape_chat">RuneScape Chat</h1>
        <h1 className="runescape_chat_bold">RuneScape Chat Bold</h1>
        <div id={props.id} className={`${props.className} playerGrid`}>
            <img width={500} height={300} src={`https://ssb.wiki.gallery/images/6/63/JokerHeadSSBUWebsite.png`} alt={`Smasherscape Player Card`} />
            <img width={500} height={300} src={`https://github.com/strawhat19/Smasherscape/blob/main/assets/smasherscape/SmasherScapePlayerCard.png?raw=true`} alt={`Smasherscape Player Card`} />
            <img width={500} height={300} src={`https://github.com/strawhat19/Smasherscape/blob/main/assets/smasherscape/SmasherScapePlayerCard.png?raw=true`} alt={`Smasherscape Player Card`} />
            <img width={500} height={300} src={`https://github.com/strawhat19/Smasherscape/blob/main/assets/smasherscape/SmasherScapePlayerCard.png?raw=true`} alt={`Smasherscape Player Card`} />
            <img width={500} height={300} src={`https://github.com/strawhat19/Smasherscape/blob/main/assets/smasherscape/SmasherScapePlayerCard.png?raw=true`} alt={`Smasherscape Player Card`} />
        </div>
    </>
}