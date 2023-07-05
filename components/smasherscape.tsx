import  moment from 'moment';
import { db } from '../firebase';
import { Badge } from '@mui/material';
import { FormEvent, useContext, useRef } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { defaultContent, formatDate, capitalizeAllWords, createXML, StateContext, showAlert, removeDuplicateObjectFromArray } from '../pages/_app';

export default function Smasherscape(props) {

    const commandsInput = useRef();
    const { players, setPlayers, filteredPlayers, setFilteredPlayers } = useContext<any>(StateContext);

    const searchPlayers = (e: FormEvent) => {
        let field = e.target as HTMLInputElement;
        if (field.name == `search`) {
            if (field.value != ``) {
                setFilteredPlayers(players.filter(plyr => {
                    return Object.values(plyr).some(val =>
                        typeof val === `string` && val.toLowerCase().includes(field.value.toLowerCase())
                    );
                }));
            } else {
                setFilteredPlayers(players);
            }
        } else {
            return;
        }
    }

    const calcPlyrWins = (plyr) => {
        return plyr.plays.filter(ply => ply.winner.toLowerCase() == plyr.name.toLowerCase()).length;
    }
   
    const calcPlyrLosses = (plyr) => {
        return plyr.plays.filter(ply => ply.loser.toLowerCase() == plyr.name.toLowerCase()).length;
    }

    const calcPlayerCharacterTimesPlayed = (plyr, char) => {
        let charsPlayed = plyr.plays.map(ply => ply.character);
        return charsPlayed.filter(ply => ply.toLowerCase() == char || ply.toLowerCase().includes(char)).length;
    }

    const calcPlayerCharactersPlayed = (plyr) => {
        let charsPlayed = plyr.plays.map(ply => ply.character);
        let counts = charsPlayed.reduce((acc, char) => {
            acc[char] = (acc[char] || 0) + 1;
            return acc;
        }, {});
        let sortedChars = Object.entries(counts).sort((a: any, b: any) => b[1] - a[1]).map(entry => entry[0].toLowerCase());
        return sortedChars.slice(0,3);
    }

    const calcPlayerLevelImage = (levelName) => {
        if (levelName == `Bronze Scimitar`) {
            return `https://github.com/strawhat19/Smasherscape/blob/main/assets/smasherscape/Bronze_Scimmy.png?raw=true`;
        } else if (levelName == `Iron Scimitar`) {
            return `https://github.com/strawhat19/Smasherscape/blob/main/assets/smasherscape/Iron_Scimmy.png?raw=true`;
        } else if (levelName == `Steel Scimitar`) {
            return `https://github.com/strawhat19/Smasherscape/blob/main/assets/smasherscape/Steel_Scimmy.png?raw=true`;
        } else if (levelName == `Mithril Scimitar`) {
            return `https://github.com/strawhat19/Smasherscape/blob/main/assets/smasherscape/Mithril_Scimmy.png?raw=true`;
        } else if (levelName == `Adamantite Scimitar`) {
            return `https://github.com/strawhat19/Smasherscape/blob/main/assets/smasherscape/Adamant_Scimmy.png?raw=true`;
        } else if (levelName == `Rune Scimitar`) {
            return `https://github.com/strawhat19/Smasherscape/blob/main/assets/smasherscape/Rune_Scimmy.png?raw=true`;
        }
    }

    const calcPlayerLevelAndExperience = (plyr) => {
        let xp = plyr.experience.arenaXP;

        if (xp >= 83 && xp < 174) {
            plyr.level.num = 2;
            plyr.experience.nextLevelAt = 174;
            plyr.experience.remainingXP = (174 - xp);
        } else if (xp >= 174 && xp < 276) {
            plyr.level.num = 3;
            plyr.experience.nextLevelAt = 276;
            plyr.experience.remainingXP = (276 - xp);
        } else if (xp >= 276 && xp < 388) {
            plyr.level.num = 4;
            plyr.experience.nextLevelAt = 388;
            plyr.experience.remainingXP = (388 - xp);
        } else if (xp >= 388 && xp < 512) {
            plyr.level.num = 5;
            plyr.experience.nextLevelAt = 512;
            plyr.experience.remainingXP = (512 - xp);
        } else if (xp >= 512 && xp < 650) {
            plyr.level.num = 6;
            plyr.experience.nextLevelAt = 650;
            plyr.experience.remainingXP = (650 - xp);
        } else if (xp >= 650 && xp < 801) {
            plyr.level.num = 7;
            plyr.experience.nextLevelAt = 801;
            plyr.experience.remainingXP = (801 - xp);
        } else if (xp >= 801 && xp < 969) {
            plyr.level.num = 8;
            plyr.experience.nextLevelAt = 969;
            plyr.experience.remainingXP = (969 - xp);
        } else if (xp >= 969 && xp < 1154) {
            plyr.level.num = 9;
            plyr.experience.nextLevelAt = 1154;
            plyr.experience.remainingXP = (1154 - xp);
        } else if (xp >= 1154 && xp < 1358) {
            plyr.level.num = 10;
            plyr.level.name = `Iron Scimitar`;
            plyr.experience.nextLevelAt = 1358;
            plyr.experience.remainingXP = (1358 - xp);
        } else if (xp >= 1358 && xp < 1584) {
            plyr.level.num = 11;
            plyr.level.name = `Iron Scimitar`;
            plyr.experience.nextLevelAt = 1584;
            plyr.experience.remainingXP = (1584 - xp);
        } else if (xp >= 1584 && xp < 1833) {
            plyr.level.num = 12;
            plyr.level.name = `Iron Scimitar`;
            plyr.experience.nextLevelAt = 1833;
            plyr.experience.remainingXP = (1833 - xp);
        } else if (xp >= 1833 && xp < 2107) {
            plyr.level.num = 13;
            plyr.level.name = `Iron Scimitar`;
            plyr.experience.nextLevelAt = 2107;
            plyr.experience.remainingXP = (2107 - xp);
        } else if (xp >= 2107 && xp < 2411) {
            plyr.level.num = 14;
            plyr.level.name = `Iron Scimitar`;
            plyr.experience.nextLevelAt = 2411;
            plyr.experience.remainingXP = (2411 - xp);
        } else if (xp >= 2411 && xp < 2746) {
            plyr.level.num = 15;
            plyr.level.name = `Steel Scimitar`;
            plyr.experience.nextLevelAt = 2746;
            plyr.experience.remainingXP = (2746 - xp);
        } else if (xp >= 2746 && xp < 3115) {
            plyr.level.num = 16;
            plyr.level.name = `Steel Scimitar`;
            plyr.experience.nextLevelAt = 3115;
            plyr.experience.remainingXP = (3115 - xp);
        } else if (xp >= 3115 && xp < 3523) {
            plyr.level.num = 17;
            plyr.level.name = `Steel Scimitar`;
            plyr.experience.nextLevelAt = 3523;
            plyr.experience.remainingXP = (3523 - xp);
        } else if (xp >= 3523 && xp < 3973) {
            plyr.level.num = 18;
            plyr.level.name = `Steel Scimitar`;
            plyr.experience.nextLevelAt = 3973;
            plyr.experience.remainingXP = (3973 - xp);
        } else if (xp >= 3973 && xp < 4470) {
            plyr.level.num = 19;
            plyr.level.name = `Steel Scimitar`;
            plyr.experience.nextLevelAt = 4470;
            plyr.experience.remainingXP = (4470 - xp);
        } else if (xp >= 4470 && xp < 5018) {
            plyr.level.num = 20;
            plyr.level.name = `Mithril Scimitar`;
            plyr.experience.nextLevelAt = 5018;
            plyr.experience.remainingXP = (5018 - xp);
        } else if (xp >= 5018 && xp < 5624) {
            plyr.level.num = 21;
            plyr.level.name = `Mithril Scimitar`;
            plyr.experience.nextLevelAt = 5624;
            plyr.experience.remainingXP = (5624 - xp);
        } else if (xp >= 5624 && xp < 6291) {
            plyr.level.num = 22;
            plyr.level.name = `Mithril Scimitar`;
            plyr.experience.nextLevelAt = 6291;
            plyr.experience.remainingXP = (6291 - xp);
        } else if (xp >= 6291 && xp < 7028) {
            plyr.level.num = 23;
            plyr.level.name = `Mithril Scimitar`;
            plyr.experience.nextLevelAt = 7028;
            plyr.experience.remainingXP = (7028 - xp);
        } else if (xp >= 7028 && xp < 7842) {
            plyr.level.num = 24;
            plyr.level.name = `Mithril Scimitar`;
            plyr.experience.nextLevelAt = 7842;
            plyr.experience.remainingXP = (7842 - xp);
        } else if (xp >= 7842 && xp < 8740) {
            plyr.level.num = 25;
            plyr.level.name = `Mithril Scimitar`;
            plyr.experience.nextLevelAt = 8740;
            plyr.experience.remainingXP = (8740 - xp);
        } else if (xp >= 8740 && xp < 9730) {
            plyr.level.num = 26;
            plyr.level.name = `Mithril Scimitar`;
            plyr.experience.nextLevelAt = 9730;
            plyr.experience.remainingXP = (9730 - xp);
        } else if (xp >= 9730 && xp < 10824) {
            plyr.level.num = 27;
            plyr.level.name = `Mithril Scimitar`;
            plyr.experience.nextLevelAt = 10824;
            plyr.experience.remainingXP = (10824 - xp);
        } else if (xp >= 10824 && xp < 12031) {
            plyr.level.num = 28;
            plyr.level.name = `Mithril Scimitar`;
            plyr.experience.nextLevelAt = 12031;
            plyr.experience.remainingXP = (12031 - xp);
        } else if (xp >= 12031 && xp < 13363) {
            plyr.level.num = 29;
            plyr.level.name = `Mithril Scimitar`;
            plyr.experience.nextLevelAt = 13363;
            plyr.experience.remainingXP = (13363 - xp);
        } else if (xp >= 13363 && xp < 14833) {
            plyr.level.num = 30;
            plyr.level.name = `Adamantite Scimitar`;
            plyr.experience.nextLevelAt = 14833;
            plyr.experience.remainingXP = (14833 - xp);
        } else if (xp >= 14833 && xp < 16456) {
            plyr.level.num = 31;
            plyr.level.name = `Adamantite Scimitar`;
            plyr.experience.nextLevelAt = 16456;
            plyr.experience.remainingXP = (16456 - xp);
        } else if (xp >= 16456 && xp < 18247) {
            plyr.level.num = 32;
            plyr.level.name = `Adamantite Scimitar`;
            plyr.experience.nextLevelAt = 18247;
            plyr.experience.remainingXP = (18247 - xp);
        } else if (xp >= 18247 && xp < 20224) {
            plyr.level.num = 33;
            plyr.level.name = `Adamantite Scimitar`;
            plyr.experience.nextLevelAt = 20224;
            plyr.experience.remainingXP = (20224 - xp);
        } else if (xp >= 20224 && xp < 22406) {
            plyr.level.num = 34;
            plyr.level.name = `Adamantite Scimitar`;
            plyr.experience.nextLevelAt = 22406;
            plyr.experience.remainingXP = (22406 - xp);
        } else if (xp >= 22406 && xp < 24815) {
            plyr.level.num = 35;
            plyr.level.name = `Adamantite Scimitar`;
            plyr.experience.nextLevelAt = 24815;
            plyr.experience.remainingXP = (24815 - xp);
        } else if (xp >= 24815 && xp < 27473) {
            plyr.level.num = 36;
            plyr.level.name = `Adamantite Scimitar`;
            plyr.experience.nextLevelAt = 27473;
            plyr.experience.remainingXP = (27473 - xp);
        } else if (xp >= 27473 && xp < 30408) {
            plyr.level.num = 37;
            plyr.level.name = `Adamantite Scimitar`;
            plyr.experience.nextLevelAt = 30408;
            plyr.experience.remainingXP = (30408 - xp);
        } else if (xp >= 30408 && xp < 33648) {
            plyr.level.num = 38;
            plyr.level.name = `Adamantite Scimitar`;
            plyr.experience.nextLevelAt = 33648;
            plyr.experience.remainingXP = (33648 - xp);
        } else if (xp >= 33648 && xp < 37224) {
            plyr.level.num = 39;
            plyr.level.name = `Adamantite Scimitar`;
            plyr.experience.nextLevelAt = 37224;
            plyr.experience.remainingXP = (37224 - xp);
        } else if (xp >= 37224 && xp < 41171) {
            plyr.level.num = 40;
            plyr.level.name = `Rune Scimitar`;
            plyr.experience.nextLevelAt = 41171;
            plyr.experience.remainingXP = (41171 - xp);
        } else if (xp >= 41171 && xp < 45529) {
            plyr.level.num = 41;
            plyr.level.name = `Rune Scimitar`;
            plyr.experience.nextLevelAt = 45529;
            plyr.experience.remainingXP = (45529 - xp);
        } else if (xp >= 45529 && xp < 50339) {
            plyr.level.num = 42;
            plyr.level.name = `Rune Scimitar`;
            plyr.experience.nextLevelAt = 50339;
            plyr.experience.remainingXP = (50339 - xp);
        } else if (xp >= 50339 && xp < 55649) {
            plyr.level.num = 43;
            plyr.level.name = `Rune Scimitar`;
            plyr.experience.nextLevelAt = 55649;
            plyr.experience.remainingXP = (55649 - xp);
        } else if (xp >= 55649 && xp < 61512) {
            plyr.level.num = 44;
            plyr.level.name = `Rune Scimitar`;
            plyr.experience.nextLevelAt = 61512;
            plyr.experience.remainingXP = (61512 - xp);
        } else if (xp >= 61512 && xp < 67983) {
            plyr.level.num = 45;
            plyr.level.name = `Rune Scimitar`;
            plyr.experience.nextLevelAt = 67983;
            plyr.experience.remainingXP = (67983 - xp);
        } else if (xp >= 67983 && xp < 75127) {
            plyr.level.num = 46;
            plyr.level.name = `Rune Scimitar`;
            plyr.experience.nextLevelAt = 75127;
            plyr.experience.remainingXP = (75127 - xp);
        } else if (xp >= 75127 && xp < 83014) {
            plyr.level.num = 47;
            plyr.level.name = `Rune Scimitar`;
            plyr.experience.nextLevelAt = 83014;
            plyr.experience.remainingXP = (83014 - xp);
        } else if (xp >= 83014 && xp < 91721) {
            plyr.level.num = 48;
            plyr.level.name = `Rune Scimitar`;
            plyr.experience.nextLevelAt = 91721;
            plyr.experience.remainingXP = (91721 - xp);
        } else if (xp >= 91721 && xp < 101333) {
            plyr.level.num = 49;
            plyr.level.name = `Rune Scimitar`;
            plyr.experience.nextLevelAt = 101333;
            plyr.experience.remainingXP = (101333 - xp);
        }

        return plyr;
    }

    const calcPlayerCharacterIcon = (char, pic) => {
        if (char == `aegis` || char == `pyra` || char == `mythra`) {
            if (pic) {
                return `https://raw.githubusercontent.com/strawhat19/Smasherscape/main/assets/smasherscape/characters/PyraMythraAegis.webp`;
            } else {
                return `Aegis`;
            }
        } else if (char == `banjoandkazooie` || char == `banjo&kazooie` || char == `banjo` || char == `bk` || char == `bandk` || char == `b&k`) {
            if (pic) {
                return `https://raw.githubusercontent.com/strawhat19/Smasherscape/main/assets/smasherscape/characters/Banjo&Kazooie.webp`;
            } else {
                return `Banjo & Kazooie`;
            }
        } else if (char == `bayonetta` || char == `bayo`) {
            if (pic) {
                return `https://raw.githubusercontent.com/strawhat19/Smasherscape/main/assets/smasherscape/characters/Bayonetta.webp`;
            } else {
                return `Bayonetta`;
            }
        } else if (char == `bowser` || char == `bow`) {
            if (pic) {
                return `https://raw.githubusercontent.com/strawhat19/Smasherscape/main/assets/smasherscape/characters/Bowser.webp`;
            } else {
                return `Bowser`;
            }
        } else if (char == `bowserjr` || char == `bj`) {
            if (pic) {
                return `https://raw.githubusercontent.com/strawhat19/Smasherscape/main/assets/smasherscape/characters/BowserJr.webp`;
            } else {
                return `Bowser Jr`;
            }
        } else if (char == `byleth` || char == `by`) {
            if (pic) {
                return `https://raw.githubusercontent.com/strawhat19/Smasherscape/main/assets/smasherscape/characters/Byleth.webp`;
            } else {
                return `Byleth`;
            }
        } else if (char == `captainfalcon` || char == `cf` || char == `falcon`) {
            if (pic) {
                return `https://raw.githubusercontent.com/strawhat19/Smasherscape/main/assets/smasherscape/characters/CaptainFalcon.webp`;
            } else {
                return `Captain Falcon`;
            }
        } else if (char == `charizard` || char == `char`) {
            if (pic) {
                return `https://raw.githubusercontent.com/strawhat19/Smasherscape/main/assets/smasherscape/characters/Charizard.webp`;
            } else {
                return `Charizard`;
            }
        } else if (char == `chrom` || char == `ch`) {
            if (pic) {
                return `https://raw.githubusercontent.com/strawhat19/Smasherscape/main/assets/smasherscape/characters/Chrom.webp`;
            } else {
                return `Chrom`;
            }
        } else if (char == `cloud` || char == `cl`) {
            if (pic) {
                return `https://raw.githubusercontent.com/strawhat19/Smasherscape/main/assets/smasherscape/characters/Cloud.webp`;
            } else {
                return `Cloud`;
            }
        } else if (char == `corrin` || char == `co`) {
            if (pic) {
                return `https://raw.githubusercontent.com/strawhat19/Smasherscape/main/assets/smasherscape/characters/Corrin.webp`;
            } else {
                return `Corrin`;
            }
        } else if (char == `daisy` || char == `da`) {
            if (pic) {
                return `https://raw.githubusercontent.com/strawhat19/Smasherscape/main/assets/smasherscape/characters/Daisy.webp`;
            } else {
                return `Daisy`;
            }
        } else if (char == `darkpit` || char == `dp`) {
            if (pic) {
                return `https://raw.githubusercontent.com/strawhat19/Smasherscape/main/assets/smasherscape/characters/DarkPit.webp`;
            } else {
                return `Dark Pit`;
            }
        } else if (char == `darksamus` || char == `ds`) {
            if (pic) {
                return `https://raw.githubusercontent.com/strawhat19/Smasherscape/main/assets/smasherscape/characters/DarkSamus.webp`;
            } else {
                return `Dark Samus`;
            }
        } else if (char == `diddykong` || char == `diddy`) {
            if (pic) {
                return `https://raw.githubusercontent.com/strawhat19/Smasherscape/main/assets/smasherscape/characters/DiddyKong.webp`;
            } else {
                return `Diddy Kong`;
            }
        } else if (char == `donkeykong` || char == `dk`) {
            if (pic) {
                return `https://raw.githubusercontent.com/strawhat19/Smasherscape/main/assets/smasherscape/characters/DonkeyKong.webp`;
            } else {
                return `Donkey Kong`;
            }
        } else if (char == `drmario` || char == `doc` || char == `dm`) {
            if (pic) {
                return `https://raw.githubusercontent.com/strawhat19/Smasherscape/main/assets/smasherscape/characters/DrMario.webp`;
            } else {
                return `Dr Mario`;
            }
        } else if (char == `duckhunt` || char == `dh`) {
            if (pic) {
                return `https://raw.githubusercontent.com/strawhat19/Smasherscape/main/assets/smasherscape/characters/DuckHunt.webp`;
            } else {
                return `Duck Hunt`;
            }
        } else if (char == `falco` || char == `fa`) {
            if (pic) {
                return `https://raw.githubusercontent.com/strawhat19/Smasherscape/main/assets/smasherscape/characters/Falco.webp`;
            } else {
                return `Falco`;
            }
        } else if (char == `fox`) {
            if (pic) {
                return `https://raw.githubusercontent.com/strawhat19/Smasherscape/main/assets/smasherscape/characters/Fox.webp`;
            } else {
                return `Fox`;
            }
        } else if (char == `ganondorf` || char == `ganon` || char == `gd` || char == `gnn`) {
            if (pic) {
                return `https://raw.githubusercontent.com/strawhat19/Smasherscape/main/assets/smasherscape/characters/Ganondorf.webp`;
            } else {
                return `Ganondorf`;
            }
        } else if (char == `greninja` || char == `gren` || char == `grenin`) {
            if (pic) {
                return `https://raw.githubusercontent.com/strawhat19/Smasherscape/main/assets/smasherscape/characters/Greninja.webp`;
            } else {
                return `Greninja`;
            }
        } else if (char == `hero` || char == `he` || char == `hr`) {
            if (pic) {
                return `https://raw.githubusercontent.com/strawhat19/Smasherscape/main/assets/smasherscape/characters/Hero.webp`;
            } else {
                return `Hero`;
            }
        } else if (char == `iceclimbers` || char == `icies` || char == `ics` || char == `ic`) {
            if (pic) {
                return `https://raw.githubusercontent.com/strawhat19/Smasherscape/main/assets/smasherscape/characters/IceClimbers.webp`;
            } else {
                return `Ice Climbers`;
            }
        } else if (char == `ike`) {
            if (pic) {
                return `https://raw.githubusercontent.com/strawhat19/Smasherscape/main/assets/smasherscape/characters/Ike.webp`;
            } else {
                return `Ike`;
            }
        } else if (char == `incineroar` || char == `incin` || char == `inc`) {
            if (pic) {
                return `https://raw.githubusercontent.com/strawhat19/Smasherscape/main/assets/smasherscape/characters/Incineroar.webp`;
            } else {
                return `Incineroar`;
            }
        } else if (char == `inkling` || char == `inkl` || char == `ink`) {
            if (pic) {
                return `https://raw.githubusercontent.com/strawhat19/Smasherscape/main/assets/smasherscape/characters/Inkling.webp`;
            } else {
                return `Inkling`;
            }
        } else if (char == `isabelle` || char == `isbl` || char == `isa`) {
            if (pic) {
                return `https://raw.githubusercontent.com/strawhat19/Smasherscape/main/assets/smasherscape/characters/Isabelle.webp`;
            } else {
                return `Isabelle`;
            }
        } else if (char == `ivysaur` || char == `ivys` || char == `ivy`) {
            if (pic) {
                return `https://raw.githubusercontent.com/strawhat19/Smasherscape/main/assets/smasherscape/characters/Ivysaur.webp`;
            } else {
                return `Ivysaur`;
            }
        } else if (char == `jigglypuff` || char == `jiggly` || char == `jiggs` || char == `jp`) {
            if (pic) {
                return `https://raw.githubusercontent.com/strawhat19/Smasherscape/main/assets/smasherscape/characters/Jigglypuff.webp`;
            } else {
                return `Jigglypuff`;
            }
        } else if (char == `joker`) {
            if (pic) {
                return `https://raw.githubusercontent.com/strawhat19/Smasherscape/main/assets/smasherscape/characters/Joker.webp`;
            } else {
                return `Joker`;
            }
        } else if (char == `kazuya` || char == `kaz` || char == `kz`) {
            if (pic) {
                return `https://raw.githubusercontent.com/strawhat19/Smasherscape/main/assets/smasherscape/characters/Kazuya.webp`;
            } else {
                return `Kazuya`;
            }
        } else if (char == `ken` || char == `kn`) {
            if (pic) {
                return `https://raw.githubusercontent.com/strawhat19/Smasherscape/main/assets/smasherscape/characters/Ken.webp`;
            } else {
                return `Ken`;
            }
        }  else if (char == `kingdedede` || char == `ddd` || char == `kd`) {
            if (pic) {
                return `https://raw.githubusercontent.com/strawhat19/Smasherscape/main/assets/smasherscape/characters/KingDedede.webp`;
            } else {
                return `King Dedede`;
            }
        }  else if (char == `kingkrool` || char == `krool` || char == `rool` || char == `kkr`) {
            if (pic) {
                return `https://raw.githubusercontent.com/strawhat19/Smasherscape/main/assets/smasherscape/characters/KingKRool.webp`;
            } else {
                return `King K Rool`;
            }
        } else if (char == `kirby` || char == `krb`) {
            if (pic) {
                return `https://raw.githubusercontent.com/strawhat19/Smasherscape/main/assets/smasherscape/characters/Kirby.webp`;
            } else {
                return `Kirby`;
            }
        } else if (char == `link` || char == `lnk`) {
            if (pic) {
                return `https://raw.githubusercontent.com/strawhat19/Smasherscape/main/assets/smasherscape/characters/Link.webp`;
            } else {
                return `Link`;
            }
        } else if (char == `littlemac` || char == `lm`) {
            if (pic) {
                return `https://raw.githubusercontent.com/strawhat19/Smasherscape/main/assets/smasherscape/characters/LittleMac.webp`;
            } else {
                return `Little Mac`;
            }
        } else if (char == `lucario` || char == `luc`) {
            if (pic) {
                return `https://raw.githubusercontent.com/strawhat19/Smasherscape/main/assets/smasherscape/characters/Lucario.webp`;
            } else {
                return `Lucario`;
            }
        } else if (char == `lucas`) {
            if (pic) {
                return `https://raw.githubusercontent.com/strawhat19/Smasherscape/main/assets/smasherscape/characters/Lucas.webp`;
            } else {
                return `Lucas`;
            }
        } else if (char == `lucina`) {
            if (pic) {
                return `https://raw.githubusercontent.com/strawhat19/Smasherscape/main/assets/smasherscape/characters/Lucina.webp`;
            } else {
                return `Lucina`;
            }
        } else if (char == `luigi` || char == `lg`) {
            if (pic) {
                return `https://raw.githubusercontent.com/strawhat19/Smasherscape/main/assets/smasherscape/characters/Luigi.webp`;
            } else {
                return `Luigi`;
            }
        } else if (char == `mario`) {
            if (pic) {
                return `https://raw.githubusercontent.com/strawhat19/Smasherscape/main/assets/smasherscape/characters/Mario.webp`;
            } else {
                return `Mario`;
            }
        } else if (char == `marth`) {
            if (pic) {
                return `https://raw.githubusercontent.com/strawhat19/Smasherscape/main/assets/smasherscape/characters/Marth.webp`;
            } else {
                return `Marth`;
            }
        } else if (char == `megaman` || char == `mm` || char == `mega`) {
            if (pic) {
                return `https://raw.githubusercontent.com/strawhat19/Smasherscape/main/assets/smasherscape/characters/MegaMan.webp`;
            } else {
                return `Mega Man`;
            }
        } else if (char == `metaknight` || char == `meta` || char == `mk`) {
            if (pic) {
                return `https://raw.githubusercontent.com/strawhat19/Smasherscape/main/assets/smasherscape/characters/MetaKnight.webp`;
            } else {
                return `Meta Knight`;
            }
        } else if (char == `mt` || char == `mewtwo` || char == `m2`) {
            if (pic) {
                return `https://raw.githubusercontent.com/strawhat19/Smasherscape/main/assets/smasherscape/characters/Mewtwo.webp`;
            } else {
                return `Mewtwo`;
            }
        } else if (char == `miibrawler` || char == `brawler` || char == `mb`) {
            if (pic) {
                return `https://raw.githubusercontent.com/strawhat19/Smasherscape/main/assets/smasherscape/characters/MiiBrawler.webp`;
            } else {
                return `Mii Brawler`;
            }
        } else if (char == `miifighter` || char == `fighter` || char == `mf`) {
            if (pic) {
                return `https://raw.githubusercontent.com/strawhat19/Smasherscape/main/assets/smasherscape/characters/MiiFighter.webp`;
            } else {
                return `Mii Fighter`;
            }
        } else if (char == `miigunner` || char == `gunner` || char == `mg`) {
            if (pic) {
                return `https://raw.githubusercontent.com/strawhat19/Smasherscape/main/assets/smasherscape/characters/MiiGunner.webp`;
            } else {
                return `Mii Gunner`;
            }
        } else if (char == `miiswordfighter` || char == `swordfighter` || char == `ms`) {
            if (pic) {
                return `https://raw.githubusercontent.com/strawhat19/Smasherscape/main/assets/smasherscape/characters/MiiSwordFighter.webp`;
            } else {
                return `Mii Sword Fighter`;
            }
        } else if (char == `minmin` || char == `min`) {
            if (pic) {
                return `https://raw.githubusercontent.com/strawhat19/Smasherscape/main/assets/smasherscape/characters/MinMin.webp`;
            } else {
                return `MinMin`;
            }
        } else if (char == `mrgame&watch` || char == `gnw` || char == `game&watch` || char == `mrgameandwatch` || char == `gameandwatch`) {
            if (pic) {
                return `https://raw.githubusercontent.com/strawhat19/Smasherscape/main/assets/smasherscape/characters/MrGame&Watch.webp`;
            } else {
                return `Mr. Game & Watch`;
            }
        } else if (char == `Ness`) {
            if (pic) {
                return `https://raw.githubusercontent.com/strawhat19/Smasherscape/main/assets/smasherscape/characters/Ness.webp`;
            } else {
                return `Ness`;
            }
        } else if (char == `palutena` || char == `palu`) {
            if (pic) {
                return `https://raw.githubusercontent.com/strawhat19/Smasherscape/main/assets/smasherscape/characters/Palutena.webp`;
            } else {
                return `Palutena`;
            }
        } else if (char == `peach` || char == `pe`) {
            if (pic) {
                return `https://raw.githubusercontent.com/strawhat19/Smasherscape/main/assets/smasherscape/characters/Peach.webp`;
            } else {
                return `Peach`;
            }
        } else if (char == `pt` || char == `pokemontrainer`) {
            if (pic) {
                return `https://raw.githubusercontent.com/strawhat19/Smasherscape/main/assets/smasherscape/characters/PokemonTrainer.webp`;
            } else {
                return `Pokemon Trainer`;
            }
        } else if (char == `roy`) {
            if (pic) {
                return `https://raw.githubusercontent.com/strawhat19/Smasherscape/main/assets/smasherscape/characters/Roy.webp`;
            } else {
                return `Roy`;
            }
        } else if (char == `ryu`) {
            if (pic) {
                return `https://raw.githubusercontent.com/strawhat19/Smasherscape/main/assets/smasherscape/characters/Ryu.webp`;
            } else {
                return `Ryu`;
            }
        } else if (char == `sora`) {
            if (pic) {
                return `https://raw.githubusercontent.com/strawhat19/Smasherscape/main/assets/smasherscape/characters/Sora.webp`;
            } else {
                return `Sora`;
            }
        }
    }

    const handleCommands = (e: FormEvent) => {
        e.preventDefault();
        let field = commandsInput.current as HTMLInputElement;
        if (field.name == `commands`) {
            let command = field?.value.toLowerCase();
            let commandParams = command.split(` `);
            
            if (command != ``) {
                if (commandParams[0].includes(`!upd`)) {
                    let playerOne = commandParams[1];
                    let playerTwo = commandParams[3];
                    let characterOne = commandParams[5];
                    let characterTwo = commandParams[7];
                    let stocksTaken = parseInt(commandParams[8]) || 0;
                    let date = moment().format(`MMMM Do YYYY, h:mm:ss a`);

                    let playerOneDB = players.find(plyr => plyr?.name.toLowerCase() == playerOne || plyr?.name.toLowerCase().includes(playerOne));
                    let playerTwoDB = players.find(plyr => plyr?.name.toLowerCase() == playerTwo || plyr?.name.toLowerCase().includes(playerTwo));

                    if (!playerOneDB || !playerTwoDB) {
                        alert(`Can't find players with those names.`);
                        return;
                    } else if (!characterOne || !characterTwo) {
                        alert(`Which characters did they play?`);
                        return;
                    } else {

                        let updatedPlayers = players.map(plyr => {
                            if (plyr?.name.toLowerCase() == playerOne || plyr?.name.toLowerCase().includes(playerOne)) {
                                plyr.experience.arenaXP = plyr.experience.arenaXP + 400;
                                plyr.plays.push({
                                    winner: playerOneDB?.name,
                                    loser: playerTwoDB?.name,
                                    character: characterOne,
                                    stocksTaken,
                                    date
                                });

                                calcPlayerLevelAndExperience(plyr);

                                return plyr;
                            } else if (plyr?.name.toLowerCase() == playerTwo || plyr?.name.toLowerCase().includes(playerTwo)) {
                                plyr.experience.arenaXP = plyr.experience.arenaXP + (100 * stocksTaken);
                                plyr.plays.push({
                                    winner: playerOneDB?.name,
                                    loser: playerTwoDB?.name,
                                    character: characterTwo,
                                    stocksTaken,
                                    date
                                });

                                calcPlayerLevelAndExperience(plyr);

                                return plyr;
                            } else {
                                return plyr;
                            }
                        });

                        setPlayers(updatedPlayers);
                    }
                } else if (commandParams[0].includes(`!add`)) {
                    let playerToAdd = commandParams[1].charAt(0).toUpperCase() + commandParams[1].slice(1).toLowerCase();
                    setPlayers(prevPlayers => {
                        let updatedPlayers = [...prevPlayers, {
                            id: players.length + 1,
                            name: playerToAdd,
                            plays: [],
                            level: {
                              num: 1,
                              name: `Bronze Scimitar`
                            },
                            experience: {
                              xp: 0,
                              arenaXP: 0,
                              nextLevelAt: 83,
                              remainingXP: 83
                            },
                        }];
                        setFilteredPlayers(updatedPlayers);
                        return updatedPlayers;
                    });
                }
            }
        } else {
            return;
        }
    }

    return <>
        <form onInput={(e) => searchPlayers(e)} onSubmit={(e) => handleCommands(e)} action="submit" className="gridForm">
            <div className={`inputWrapper`}><div className="inputBG"></div><input type="search" className="search" name={`search`} placeholder={`Search...`} /></div>
            <div className={`inputWrapper`}><div className="inputBG"></div><input ref={commandsInput} type="text" className="commands" name={`commands`} placeholder={`Commands...`} /></div>
            <button className={`formSubmitButton`} type={`submit`}>Submit</button>
        </form>
        <div id={props.id} className={`${props.className} playerGrid ${filteredPlayers.length == 0 ? `empty` : `populated`}`}>
            {filteredPlayers.length == 0 && <>
                <div className="gridCard"><h1 className={`runescape_large noPlayersFound`}>No Players Found</h1></div>
            </>}
            {filteredPlayers.length > 0 && filteredPlayers.sort((a,b) => {
                if (b.experience.arenaXP !== a.experience.arenaXP) {
                    return b.experience.arenaXP - a.experience.arenaXP;
                }
            
                return b.plays.length - a.plays.length;
            }).map((plyr, plyrIndex) => {
                return (
                    <div className="gridCard" key={plyrIndex}>
                        <LazyLoadImage effect="blur" src={`https://github.com/strawhat19/Smasherscape/blob/main/assets/smasherscape/OSRS_Card_Empty.png?raw=true`} className={`cardBG`} alt={`Smasherscape Player Card`} />
                        <LazyLoadImage effect="blur" src={`https://github.com/strawhat19/Smasherscape/blob/main/assets/smasherscape/OSRS_Card_Template_Border_Only.png?raw=true`} className={`cardBG border`} alt={`Smasherscape Player Card`} />
                        <div className="playerCardContent">
                            <div className="cardTopRow">
                                <div className="logoWithWords">
                                    <img width={70} src={`https://github.com/strawhat19/Smasherscape/blob/main/assets/smasherscape/OSRS_Top_Hat.png?raw=true`} alt={`Tophat Logo`} />
                                    <h3>Xuruko's<br />SmasherScape</h3>
                                </div>
                                <h2>{plyr?.name}</h2>
                            </div>
                            <div className="cardMiddleRow">
                                <div className="imgLeftCol">
                                    <img width={150} src={calcPlayerLevelImage(plyr?.level?.name)} alt={plyr?.level?.name} />
                                    <h4 className={`levelName ${plyr?.level?.name.split(` `)[0]}`}>{plyr?.level?.name}</h4>
                                </div>
                                <div className="recordPlays">
                                    <div className="record">
                                        <h3>Record</h3>
                                        <h4>{calcPlyrWins(plyr)} - {calcPlyrLosses(plyr)}</h4>
                                    </div>
                                    <div className="plays">
                                        <h3>Plays</h3>
                                        <div className={`playsContainer`}>
                                            {calcPlayerCharactersPlayed(plyr).map((char, charIndex) => {
                                                return (
                                                    <Badge key={charIndex} badgeContent={calcPlayerCharacterTimesPlayed(plyr, char)} color="primary">
                                                        <img className={`charImg`} width={35} src={calcPlayerCharacterIcon(char, true)} alt={calcPlayerCharacterIcon(char, false)} title={`Played ${calcPlayerCharacterIcon(char, false)} ${calcPlayerCharacterTimesPlayed(plyr, char)} Time(s)`} />
                                                    </Badge>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                                <div className="rightCol">
                                    <div className="level">
                                        <h4 className={`levelNum levelTop`}>{plyr?.level?.num}</h4>
                                        <div className="borderSep"></div>
                                        <h4 className={`levelNum levelBot`}>{plyr?.level?.num}</h4>
                                    </div>
                                    <div className="experienceDetails">
                                        <div className="arenaXP xpDetail">
                                            <div>Arena XP:</div>
                                            <div>{plyr?.experience.arenaXP.toLocaleString(`en`)}</div>
                                        </div>
                                        <div className="nextLevelAt xpDetail">
                                            <div>Next Level At:</div>
                                            <div>{plyr?.experience.nextLevelAt.toLocaleString(`en`)}</div>
                                        </div>
                                        <div className="remainingXP xpDetail">
                                            <div>Remaining XP:</div>
                                            <div>{plyr?.experience.remainingXP.toLocaleString(`en`)}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="cardBottomRow">
                                <div className="gradient" style={{clipPath: `polygon(0% 0, ${(plyr.experience.arenaXP / plyr.experience.nextLevelAt) * 100}% 0%, ${(plyr.experience.arenaXP / plyr.experience.nextLevelAt) * 100}% 100%, 0 100%)`}}></div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    </>
}