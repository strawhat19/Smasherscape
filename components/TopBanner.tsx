import { navFaIcons } from "./NavIcons";
import Marquee from "react-fast-marquee";
import { useEffect, useState } from "react";

export default function TopBanner() {
    let [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!loaded) {
            let navLinks = document.querySelectorAll(`nav a.nx-text-sm`);
            navLinks.forEach((navItem: any, index) => {
                let linkText = navItem.querySelector(`.nx-absolute`);
                if (linkText != null) {
                    let icon = document.createElement(`i`);
                    icon[`key`] = index;
                    icon.classList.add(`fas`);
                    icon.classList.add(`navIconColor`);
                    icon.classList.add(navFaIcons[index].faIconName);
                    linkText.prepend(icon);
                }
            })
        }

        setLoaded(true);
    }, [])

    return <>
        <div className={`topBanner`}>
            <div className={`topNavigation`}>
                <Marquee speed={75}>Smasherscape | Official Website | Xuruko & Piratechs</Marquee>
            </div>
        </div>
    </>
}