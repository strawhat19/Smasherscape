import { navFaIcons } from "./NavIcons";
import Marquee from "react-fast-marquee";
import { useEffect, useState } from "react";

export const addIcon = (key, iconName, elementToInsertIcon) => {
    let icon = document.createElement(`i`);
    icon[`key`] = key;
    icon.classList.add(`fas`);
    icon.classList.add(`navLinkIcon`);
    icon.classList.add(`navIconColor`);
    icon.classList.add(iconName);
    elementToInsertIcon.prepend(icon);
}

export const addNavIcons = () => {
    let navLinks = document.querySelectorAll(`nav a.nx-text-sm`);
    if (navLinks.length > 0) {
        navLinks.forEach((navItem: any, index) => {
            let linkText = navItem.querySelector(`.nx-absolute`);
            if (linkText != null) {
                addIcon(index, navFaIcons[index].faIconName, linkText);
            }
        })
    }
}

export const detectMobileMenu = () => {
    let hamburgerButton = document.querySelector(`.nextra-hamburger`);
    if (hamburgerButton) {
        hamburgerButton.addEventListener(`click`, e => {
            let menuOpen = document.querySelector(`svg.open`);
            let mobileMenu = document.querySelector(`.nextra-menu-mobile`);
            let menuHasIcons = mobileMenu && mobileMenu?.querySelector(`.navLinkIcon`) != null;
            let menuExpanded = !menuOpen || menuOpen == null;
            menuHasIcons = menuExpanded && menuHasIcons;
            if (menuExpanded && !menuHasIcons) addMobileMenuIcons(mobileMenu);
        });
    }
}

export const addMobileMenuIcons = (mobileMenu) => {
    let mobileMenuLinks = mobileMenu ? Array.from(mobileMenu.querySelectorAll(`a`)) : [];
    if (mobileMenuLinks.length > 0) {
        mobileMenuLinks.forEach((mml, index) => {
            if (mml != null) {
                addIcon(index, navFaIcons[index].faIconName, mml);
            }
        })
    }
}

export default function TopBanner() {
    let [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!loaded) {
            addNavIcons();
            detectMobileMenu();
        }
        setLoaded(true);
    }, [])

    return <>
        <div className={`topBanner`}>
            <div className={`topNavigation`}>
                <Marquee speed={75}>
                    <div className={`marqueeContainer marqueeContent`} style={{ padding: `0 15px` }}>
                        Smasherscape | Official Website | Xuruko & Piratechs
                    </div>
                </Marquee>
            </div>
        </div>
    </>
}