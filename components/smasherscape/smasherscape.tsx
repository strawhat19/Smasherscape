import Image from "next/image";

export default function Smasherscape(props) {
    return <>
        <div id={props.id} className={`${props.className} titleRow flex row`}>
            Smasher Scape
        </div>
        <div className="playerGrid">
            <Image width={500} height={300} src={`/assets/smasherscape/SmasherScapePlayerCard.png`} alt={`Smasherscape Player Card`} />
            <img width={500} height={300} src={`https://next-13-vite-comparison.vercel.app/piratechs.svg`} alt={`Smasherscape Player Card`} />
        </div>
    </>
}