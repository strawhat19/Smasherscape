import Image from "./Image";

export default function BadgesContainer(props) {
    return <div className="playerBadgesContainer">
        {/* <Image src={`/assets/RS_Badge_Empty.png`} alt={`Empty Badge`} className={`emptyBadge recordBadge`} /> */}
        <Image src={`/assets/RS_Warrior_Badge.webp`} alt={`Warrior Badge`} className={`warriorBadge recordBadge`} />
    </div>
}