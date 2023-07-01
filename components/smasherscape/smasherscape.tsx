export default function Smasherscape(props) {
    return <>
        <div id={props.id} className={`${props.className} playerGrid`}>
            <img width={500} height={300} src={`https://github.com/strawhat19/Smasherscape/blob/main/assets/smasherscape/SmasherScapePlayerCard.png?raw=true`} alt={`Smasherscape Player Card`} />
        </div>
    </>
}