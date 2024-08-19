import { navFaIcons } from "./NavIcons";
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
                Smasherscape
                {/* <a href={`/arenas`} className={`hoverLink`}>
                    <i className={`fas fa-trophy navIcon black`} />
                    Arenas
                </a>
                <a href={`/plays`} className={`hoverLink`}>
                    <i className={`fas fa-gamepad navIcon black`} />
                    Plays
                </a> */}
            </div>
        </div>
    </>
}