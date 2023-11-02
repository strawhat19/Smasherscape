import Image from "./Image";
// import { publicAssetLink } from "./smasherscape";

export default function BadgesContainer(props) {
    return <div className="playerBadgesContainer">
        <Image src={`/assets/RS_Badge_Empty.png`} alt={`Badge`} className={`recordBadge`} />
    </div>
}