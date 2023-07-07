import  moment from 'moment';
import { db } from '../firebase';
import { Badge } from '@mui/material';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { FormEvent, useContext, useRef, useState } from 'react';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { formatDate, createXML, StateContext, showAlert } from '../pages/_app';

export enum Characters {
    Aegis = `Aegis`,
    aegis = `Aegis`,
    mythra = `Aegis`,
    pyra = `Aegis`,
    BanjoAndKazooie = `Banjo & Kazooie`,
    banjoandkazooie = `Banjo & Kazooie`,
    banjo = `Banjo & Kazooie`,
    bk = `Banjo & Kazooie`,
    bandk = `Banjo & Kazooie`,
    Bayonetta = `Bayonetta`,
    bayonetta = `Bayonetta`,
    bayo = `Bayonetta`,
    Bowser = `Bowser`,
    bowser = `Bowser`,
    bow = `Bowser`,
    BowserJr = `Bowser Jr`,
    bowserJr = `Bowser Jr`,
    bjr = `Bowser Jr`,
    bj = `Bowser Jr`,
    Byleth = `Byleth`,
    byleth = `Byleth`,
    by = `Byleth`,
    CaptainFalcon = `Captain Falcon`,
    captainfalcon = `Captain Falcon`,
    falcon = `Captain Falcon`,
    cf = `Captain Falcon`,
    Charizard = `Charizard`,
    charizard = `Charizard`,
    char = `Charizard`,
    Chrom = `Chrom`,
    chrom = `Chrom`,
    chr = `Chrom`,
    ch = `Chrom`,
    Cloud = `Cloud`,
    cloud = `Cloud`,
    cld = `Cloud`,
    cl = `Cloud`,
    Corrin = `Corrin`,
    corrin = `Corrin`,
    corr = `Corrin`,
    cor = `Corrin`,
    co = `Corrin`,
    Daisy = `Daisy`,
    daisy = `Daisy`,
    dai = `Daisy`,
    da = `Daisy`,
    DarkPit = `Dark Pit`,
    darkpit = `Dark Pit`,
    dpit = `Dark Pit`,
    dp = `Dark Pit`,
    DarkSamus = `Dark Samus`,
    darksamus = `Dark Samus`,
    dsamus = `Dark Samus`,
    ds = `Dark Samus`,
    DiddyKong = `Diddy Kong`,
    diddykong = `Diddy Kong`,
    diddy = `Diddy Kong`,
    DonkeyKong = `Donkey Kong`,
    donkeykong = `Donkey Kong`,
    donkey = `Donkey Kong`,
    dkong = `Donkey Kong`,
    kong = `Donkey Kong`,
    dk = `Donkey Kong`,
    DrMario = `Dr Mario`,
    drmario = `Dr Mario`,
    doc = `Dr Mario`,
    dm = `Dr Mario`,
    dr = `Dr Mario`,
    DuckHunt = `Duck Hunt`,
    dhunt = `Duck Hunt`,
    duck = `Duck Hunt`,
    dh = `Duck Hunt`,
    Falco = `Falco`,
    falco = `Falco`,
    fal = `Falco`,
    fa = `Falco`,
    Fox = `Fox`,
    fox = `Fox`,
    fx = `Fox`,
    Ganondorf = `Ganondorf`,
    ganondorf = `Ganondorf`,
    ganon = `Ganondorf`,
    gnn = `Ganondorf`,
    gd = `Ganondorf`,
    Greninja = `Greninja`,
    greninja = `Greninja`,
    grenin = `Greninja`,
    ninja = `Greninja`,
    gren = `Greninja`,
    Hero = `Hero`,
    hero = `Hero`,
    he = `Hero`,
    hr = `Hero`,
    IceClimbers = `Ice Climbers`,
    iceclimbers = `Ice Climbers`,
    climbers = `Ice Climbers`,
    icies = `Ice Climbers`,
    ics = `Ice Climbers`,
    ice = `Ice Climbers`,
    ic = `Ice Climbers`,
    Ike = `Ike`,
    ike = `Ike`,
    Incineroar = `Incineroar`,
    incineroar = `Incineroar`,
    incin = `Incineroar`,
    roar = `Incineroar`,
    inc = `Incineroar`,
    Inkling = `Inkling`,
    inkling = `Inkling`,
    inkl = `Inkling`,
    ink = `Inkling`,
    Isabelle = `Isabelle`,
    isabelle = `Isabelle`,
    belle = `Isabelle`,
    bitch = `Isabelle`,
    isbl = `Isabelle`,
    isa = `Isabelle`,
    dog = `Isabelle`,
    Ivysaur = `Ivysaur`,
    ivysaur = `Ivysaur`,
    saur = `Ivysaur`,
    ivy = `Ivysaur`,
    Jigglypuff = `Jigglypuff`,
    jigglypuff = `Jigglypuff`,
    jiggle = `Jigglypuff`,
    jiggly = `Jigglypuff`,
    jiggs = `Jigglypuff`,
    puff = `Jigglypuff`,
    jig = `Jigglypuff`,
    jp = `Jigglypuff`,
    Joker = `Joker`,
    joker = `Joker`,
    joke = `Joker`,
    jk = `Joker`,
    Kazuya = `Kazuya`,
    kazuya = `Kazuya`,
    kazu = `Kazuya`,
    zuya = `Kazuya`,
    kaz = `Kazuya`,
    kz = `Kazuya`,
    Ken = `Ken`,
    ken = `Ken`,
    kn = `Ken`,
    KingDedede = `King Dedede`,
    kingdedede = `King Dedede`,
    dedede = `King Dedede`,
    ddd = `King Dedede`,
    kd = `King Dedede`,
    KingKRool = `King K Rool`,
    kingkrool = `King K Rool`,
    krool = `King K Rool`,
    rool = `King K Rool`,
    kkr = `King K Rool`,
    Kirby = `Kirby`,
    kirby = `Kirby`,
    kirb = `Kirby`,
    krb = `Kirby`,
    Link = `Link`,
    link = `Link`,
    lnk = `Link`,
    LittleMac = `Little Mac`,
    littlemac = `Little Mac`,
    lilmac = `Little Mac`,
    mac = `Little Mac`,
    lm = `Little Mac`,
    Lucario = `Lucario`,
    lucario = `Lucario`,
    luca = `Lucario`,
    luc = `Lucario`,
    Lucas = `Lucas`,
    lucas = `Lucas`,
    lcs = `Lucas`,
    Lucina = `Lucina`,
    lucina = `Lucina`,
    luci = `Lucina`,
    Luigi = `Luigi`,
    luigi = `Luigi`,
    lui = `Luigi`,
    lg = `Luigi`,
    lu = `Luigi`,
    Mario = `Mario`,
    mario = `Mario`,
    mrio = `Mario`,
    rio = `Mario`,
    Marth = `Marth`,
    marth = `Marth`,
    mrth = `Marth`,
    MegaMan = `Mega Man`,
    megaman = `Mega Man`,
    mega = `Mega Man`,
    mman = `Mega Man`,
    mm = `Mega Man`,
    MetaKnight = `Meta Knight`,
    Mewtwo = `Mewtwo`,
    MiiBrawler = `Mii Brawler`,
    MiiFighter = `Mii Fighter`,
    MiiGunner = `Mii Gunner`,
    MiiSwordFighter = `Mii Sword Fighter`,
    MinMin = `MinMin`,
    MrGameAndWatch = `Mr. Game & Watch`,
    Ness = `Ness`,
    Olimar = `Olimar`,
    PacMan = `PacMan`,
    Palutena = `Palutena`,
    Peach = `Peach`,
    Pichu = `Pichu`,
    Pikachu = `Pikachu`,
    PiranhaPlant = `Piranha Plant`,
    Pit = `Pit`,
    PokemonTrainer = `Pokemon Trainer`,
    Richter = `Richter`,
    Ridley = `Ridley`,
    ROB = `ROB`,
    Robin = `Robin`,
    RosalinaAndLuma = `Rosalina & Luma`,
    Roy = `Roy`,
    Ryu = `Ryu`,
    Samus = `Samus`,
    Sephiroth = `Sephiroth`,
    Sheik = `Sheik`,
    Shulk = `Shulk`,
    Simon = `Simon`,
    Snake = `Snake`,
    Sonic = `Sonic`,
    Sora = `Sora`,
    Steve = `Steve`,
    Terry = `Terry`,
    ToonLink = `Toon Link`,
    Villager = `Villager`,
    Wario = `Wario`,
    WiiFitTrainer = `Wii Fit Trainer`,
    Wolf = `Wolf`,
    Yoshi = `Yoshi`,
    YoungLink = `Young Link`,
    Zelda = `Zelda`,
    ZeroSuitSamus = `Zero Suit Samus`,
}

export default function Smasherscape(props) {

    const commandsInput = useRef();
    const { players, setPlayers, filteredPlayers, setFilteredPlayers } = useContext<any>(StateContext);
    const [publicAssetLink, setPublicAssetLink] = useState(`https://github.com/strawhat19/Smasherscape/blob/main`);

    const calcPlayerWins = (plyr) => plyr.plays.filter(ply => ply.winner.toLowerCase() == plyr.name.toLowerCase()).length;
    const calcPlayerLosses = (plyr) => plyr.plays.filter(ply => ply.loser.toLowerCase() == plyr.name.toLowerCase()).length;
    const calcPlayerCharacterTimesPlayed = (plyr, char) => plyr.plays.map(ply => ply.character).filter(ply => ply.toLowerCase() == char || ply.toLowerCase().includes(char)).length;

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
            return `${publicAssetLink}/assets/smasherscape/Bronze_Scimmy.png?raw=true`;
        } else if (levelName == `Iron Scimitar`) {
            return `${publicAssetLink}/assets/smasherscape/Iron_Scimmy.png?raw=true`;
        } else if (levelName == `Steel Scimitar`) {
            return `${publicAssetLink}/assets/smasherscape/Steel_Scimmy.png?raw=true`;
        } else if (levelName == `Mithril Scimitar`) {
            return `${publicAssetLink}/assets/smasherscape/Mithril_Scimmy.png?raw=true`;
        } else if (levelName == `Adamantite Scimitar`) {
            return `${publicAssetLink}/assets/smasherscape/Adamant_Scimmy.png?raw=true`;
        } else if (levelName == `Rune Scimitar`) {
            return `${publicAssetLink}/assets/smasherscape/Rune_Scimmy.png?raw=true`;
        } else if (levelName == `Gilded Scimitar`) {
            return `${publicAssetLink}/assets/smasherscape/Gilded_Scimmy.png?raw=true`;
        } else {
            return `${publicAssetLink}/assets/smasherscape/Gilded_Scimmy.png?raw=true`;
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
        } else if (xp >= 101333 && xp < 111945) {
            plyr.level.num = 50;
            plyr.level.name = `Gilded Scimitar`;
            plyr.experience.nextLevelAt = 111945;
            plyr.experience.remainingXP = (111945 - xp);
        } else if (xp >= 111945 && xp < 123660) {
            plyr.level.num = 51;
            plyr.level.name = `Gilded Scimitar`;
            plyr.experience.nextLevelAt = 123660;
            plyr.experience.remainingXP = (123660 - xp);
        } else if (xp >= 123660 && xp < 136594) {
            plyr.level.num = 52;
            plyr.level.name = `Gilded Scimitar`;
            plyr.experience.nextLevelAt = 136594;
            plyr.experience.remainingXP = (136594 - xp);
        } else if (xp >= 136594 && xp < 150872) {
            plyr.level.num = 53;
            plyr.level.name = `Gilded Scimitar`;
            plyr.experience.nextLevelAt = 150872;
            plyr.experience.remainingXP = (150872 - xp);
        } else if (xp >= 150872 && xp < 166636) {
            plyr.level.num = 54;
            plyr.level.name = `Gilded Scimitar`;
            plyr.experience.nextLevelAt = 166636;
            plyr.experience.remainingXP = (166636 - xp);
        } else if (xp >= 166636 && xp < 184040) {
            plyr.level.num = 55;
            plyr.level.name = `Gilded Scimitar`;
            plyr.experience.nextLevelAt = 184040;
            plyr.experience.remainingXP = (184040 - xp);
        } else if (xp >= 184040 && xp < 203254) {
            plyr.level.num = 56;
            plyr.level.name = `Gilded Scimitar`;
            plyr.experience.nextLevelAt = 203254;
            plyr.experience.remainingXP = (203254 - xp);
        } else if (xp >= 203254 && xp < 224466) {
            plyr.level.num = 57;
            plyr.level.name = `Gilded Scimitar`;
            plyr.experience.nextLevelAt = 224466;
            plyr.experience.remainingXP = (224466 - xp);
        } else if (xp >= 224466 && xp < 247886) {
            plyr.level.num = 58;
            plyr.level.name = `Gilded Scimitar`;
            plyr.experience.nextLevelAt = 247886;
            plyr.experience.remainingXP = (247886 - xp);
        } else if (xp >= 247886 && xp < 273742) {
            plyr.level.num = 59;
            plyr.level.name = `Gilded Scimitar`;
            plyr.experience.nextLevelAt = 273742;
            plyr.experience.remainingXP = (273742 - xp);
        } else if (xp >= 273742 && xp < 302288) {
            plyr.level.num = 60;
            plyr.level.name = `Dragon Scimitar`;
            plyr.experience.nextLevelAt = 302288;
            plyr.experience.remainingXP = (302288 - xp);
        } else if (xp >= 302288 && xp < 333804) {
            plyr.level.num = 61;
            plyr.level.name = `Dragon Scimitar`;
            plyr.experience.nextLevelAt = 333804;
            plyr.experience.remainingXP = (333804 - xp);
        } else if (xp >= 333804 && xp < 368599) {
            plyr.level.num = 62;
            plyr.level.name = `Dragon Scimitar`;
            plyr.experience.nextLevelAt = 368599;
            plyr.experience.remainingXP = (368599 - xp);
        } else if (xp >= 368599 && xp < 407015) {
            plyr.level.num = 63;
            plyr.level.name = `Dragon Scimitar`;
            plyr.experience.nextLevelAt = 407015;
            plyr.experience.remainingXP = (407015 - xp);
        } else if (xp >= 407015 && xp < 449428) {
            plyr.level.num = 64;
            plyr.level.name = `Dragon Scimitar`;
            plyr.experience.nextLevelAt = 449428;
            plyr.experience.remainingXP = (449428 - xp);
        } else if (xp >= 449428 && xp < 496254) {
            plyr.level.num = 65;
            plyr.level.name = `Dragon Scimitar`;
            plyr.experience.nextLevelAt = 496254;
            plyr.experience.remainingXP = (496254 - xp);
        } else if (xp >= 496254 && xp < 547953) {
            plyr.level.num = 66;
            plyr.level.name = `Dragon Scimitar`;
            plyr.experience.nextLevelAt = 547953;
            plyr.experience.remainingXP = (547953 - xp);
        } else if (xp >= 547953 && xp < 605032) {
            plyr.level.num = 67;
            plyr.level.name = `Dragon Scimitar`;
            plyr.experience.nextLevelAt = 605032;
            plyr.experience.remainingXP = (605032 - xp);
        } else if (xp >= 605032 && xp < 668051) {
            plyr.level.num = 68;
            plyr.level.name = `Dragon Scimitar`;
            plyr.experience.nextLevelAt = 668051;
            plyr.experience.remainingXP = (668051 - xp);
        } else if (xp >= 668051 && xp < 737627) {
            plyr.level.num = 69;
            plyr.level.name = `Dragon Scimitar`;
            plyr.experience.nextLevelAt = 737627;
            plyr.experience.remainingXP = (737627 - xp);
        } else if (xp >= 737627 && xp < 814445) {
            plyr.level.num = 70;
            plyr.level.name = `Abyssal Whip`;
            plyr.experience.nextLevelAt = 814445;
            plyr.experience.remainingXP = (814445 - xp);
        }

        return plyr;
    }

    const calcCharacter = (char) => {
        if (char == `aegis` || char == `pyra` || char == `mythra` || char == Characters.Aegis.toLowerCase()) {
            return Characters.Aegis;
        } else if (char == `banjoandkazooie` || char == `banjo&kazooie` || char == `banjo` || char == `bk` || char == `bandk` || char == `b&k` || char == Characters.BanjoAndKazooie.toLowerCase()) {
            return Characters.BanjoAndKazooie;
        } else if (char == `bayonetta` || char == `bayo` || char == Characters.Bayonetta.toLowerCase()) {
            return Characters.Bayonetta;
        } else if (char == `bowser` || char == `bow` || char == Characters.Bowser.toLowerCase()) {
            return Characters.Bowser;
        } else if (char == `bowserjr` || char == `bj` || char == Characters.BowserJr.toLowerCase()) {
            return Characters.BowserJr;
        } else if (char == `byleth` || char == `by` || char == Characters.Byleth.toLowerCase()) {
            return Characters.Byleth;
        } else if (char == `captainfalcon` || char == `cf` || char == `falcon` || char == Characters.CaptainFalcon.toLowerCase()) {
            return Characters.CaptainFalcon;
        } else if (char == `charizard` || char == `char` || char == Characters.Charizard.toLowerCase()) {
            return Characters.Charizard;
        } else if (char == `chrom` || char == `ch` || char == Characters.Chrom.toLowerCase()) {
            return Characters.Chrom;
        } else if (char == `cloud` || char == `cl` || char == Characters.Cloud.toLowerCase()) {
            return Characters.Cloud;
        } else if (char == `corrin` || char == `co` || char == Characters.Corrin.toLowerCase()) {
            return Characters.Corrin;
        } else if (char == `daisy` || char == `da` || char == Characters.Daisy.toLowerCase()) {
            return Characters.Daisy;
        } else if (char == `darkpit` || char == `dp` || char == Characters.DarkPit.toLowerCase()) {
            return Characters.DarkPit;
        } else if (char == `darksamus` || char == `ds` || char == Characters.DarkSamus.toLowerCase()) {
            return Characters.DarkSamus;
        } else if (char == `diddykong` || char == `diddy` || char == Characters.DiddyKong.toLowerCase()) {
            return Characters.DiddyKong;
        } else if (char == `donkeykong` || char == `dk` || char == Characters.DonkeyKong.toLowerCase()) {
            return Characters.DonkeyKong;
        } else if (char == `drmario` || char == `doc` || char == `dm` || char == Characters.DrMario.toLowerCase()) {
            return Characters.DrMario;
        } else if (char == `duckhunt` || char == `dh` || char == Characters.DuckHunt.toLowerCase()) {
            return Characters.DuckHunt;
        } else if (char == `falco` || char == `fa` || char == Characters.Falco.toLowerCase()) {
            return Characters.Falco;
        } else if (char == `fox` || char == Characters.Fox.toLowerCase()) {
            return Characters.Fox;
        } else if (char == `ganondorf` || char == `ganon` || char == `gd` || char == `gnn` || char == Characters.Ganondorf.toLowerCase()) {
            return Characters.Ganondorf;
        } else if (char == `greninja` || char == `gren` || char == `grenin` || char == Characters.Greninja.toLowerCase()) {
            return Characters.Greninja;
        } else if (char == `hero` || char == `he` || char == `hr` || char == Characters.Hero.toLowerCase()) {
            return Characters.Hero;
        } else if (char == `iceclimbers` || char == `icies` || char == `ics` || char == `ic` || char == Characters.IceClimbers.toLowerCase()) {
            return Characters.IceClimbers;
        } else if (char == `ike` || char == Characters.Ike.toLowerCase()) {
            return Characters.Ike;
        } else if (char == `incineroar` || char == `incin` || char == `inc` || char == Characters.Incineroar.toLowerCase()) {
            return Characters.Incineroar;
        } else if (char == `inkling` || char == `inkl` || char == `ink` || char == Characters.Inkling.toLowerCase()) {
            return Characters.Inkling;
        } else if (char == `isabelle` || char == `isbl` || char == `isa` || char == Characters.Isabelle.toLowerCase()) {
            return Characters.Isabelle;
        } else if (char == `ivysaur` || char == `ivys` || char == `ivy` || char == Characters.Ivysaur.toLowerCase()) {
            return Characters.Ivysaur;
        } else if (char == `jigglypuff` || char == `jiggly` || char == `jiggs` || char == `jp` || char == Characters.Jigglypuff.toLowerCase()) {
            return Characters.Jigglypuff;
        } else if (char == `joker` || char == Characters.Joker.toLowerCase()) {
            return Characters.Joker;
        } else if (char == `kazuya` || char == `kaz` || char == `kz` || char == Characters.Kazuya.toLowerCase()) {
            return Characters.Kazuya;
        } else if (char == `ken` || char == `kn` || char == Characters.Ken.toLowerCase()) {
            return Characters.Ken;
        }  else if (char == `kingdedede` || char == `ddd` || char == `kd` || char == Characters.KingDedede.toLowerCase()) {
            return Characters.KingDedede;
        }  else if (char == `kingkrool` || char == `krool` || char == `rool` || char == `kkr` || char == Characters.KingKRool.toLowerCase()) {
            return Characters.KingKRool;
        } else if (char == `kirby` || char == `krb` || char == Characters.Kirby.toLowerCase()) {
            return Characters.Kirby;
        } else if (char == `link` || char == `lnk` || char == Characters.Link.toLowerCase()) {
            return Characters.Link;
        } else if (char == `littlemac` || char == `lm` || char == Characters.LittleMac.toLowerCase()) {
            return Characters.LittleMac;
        } else if (char == `lucario` || char == `luc` || char == Characters.Lucario.toLowerCase()) {
            return Characters.Lucario;
        } else if (char == `lucas` || char == Characters.Lucas.toLowerCase()) {
            return Characters.Lucas;
        } else if (char == `lucina` || char == Characters.Lucina.toLowerCase()) {
            return Characters.Lucina;
        } else if (char == `luigi` || char == `lg` || char == Characters.Luigi.toLowerCase()) {
            return Characters.Luigi;
        } else if (char == `mario` || char == Characters.Mario.toLowerCase()) {
            return Characters.Mario;
        } else if (char == `marth` || char == Characters.Marth.toLowerCase()) {
            return Characters.Marth;
        } else if (char == `megaman` || char == `mm` || char == `mega` || char == Characters.MegaMan.toLowerCase()) {
            return Characters.MegaMan;
        } else if (char == `metaknight` || char == `meta` || char == `mk` || char == Characters.MetaKnight.toLowerCase()) {
            return Characters.MetaKnight;
        } else if (char == `mt` || char == `mewtwo` || char == `m2` || char == Characters.Mewtwo.toLowerCase()) {
            return Characters.Mewtwo;
        } else if (char == `miibrawler` || char == `brawler` || char == `mb` || char == Characters.MiiBrawler.toLowerCase()) {
            return Characters.MiiBrawler;
        } else if (char == `miifighter` || char == `fighter` || char == `mf` || char == Characters.MiiFighter.toLowerCase()) {
            return Characters.MiiFighter;
        } else if (char == `miigunner` || char == `gunner` || char == `mg` || char == Characters.MiiGunner.toLowerCase()) {
            return Characters.MiiGunner;
        } else if (char == `miiswordfighter` || char == `swordfighter` || char == `ms` || char == Characters.MiiSwordFighter.toLowerCase()) {
            return Characters.MiiSwordFighter;
        } else if (char == `minmin` || char == `min` || char == Characters.MinMin.toLowerCase()) {
            return Characters.MinMin;
        } else if (char == `mrgame&watch` || char == `gnw` || char == `game&watch` || char == `mrgameandwatch` || char == `gameandwatch` || char == Characters.MrGameAndWatch.toLowerCase()) {
            return Characters.MrGameAndWatch;
        } else if (char == `ness` || char == Characters.Ness.toLowerCase()) {
            return Characters.Ness;
        } else if (char == `olimar` || char == `oli` || char == Characters.Olimar.toLowerCase()) {
            return Characters.Olimar;
        } else if (char == `pacman` || char == `pac` || char == `pm` || char == Characters.PacMan.toLowerCase()) {
            return Characters.PacMan;
        } else if (char == `palutena` || char == `palu` || char == Characters.Palutena.toLowerCase()) {
            return Characters.Palutena;
        } else if (char == `peach` || char == `pe` || char == Characters.Peach.toLowerCase()) {
            return Characters.Peach;
        } else if (char == `pichu` || char == `pi` || char == Characters.Pichu.toLowerCase()) {
            return Characters.Pichu;
        } else if (char == `pikachu` || char == `pika` || char == Characters.Pikachu.toLowerCase()) {
            return Characters.Pikachu;
        } else if (char == `piranhaplant` || char == `plant` || char == `pp` || char == Characters.PiranhaPlant.toLowerCase()) {
            return Characters.PiranhaPlant;
        } else if (char == `pit` || char == Characters.Pit.toLowerCase()) {
            return Characters.Pit;
        } else if (char == `pokemontrainer` || char == `pt` || char == Characters.PokemonTrainer.toLowerCase()) {
            return Characters.PokemonTrainer;
        } else if (char == `richter` || char == `ri` || char == Characters.Richter.toLowerCase()) {
            return Characters.Richter;
        } else if (char == `ridley` || char == `rid` || char == Characters.Ridley.toLowerCase()) {
            return Characters.Ridley;
        } else if (char == `rob` || char == Characters.ROB.toLowerCase()) {
            return Characters.ROB;
        } else if (char == `robin` || char == `robi` || char == Characters.Robin.toLowerCase()) {
            return Characters.Robin;
        } else if (char == `rosalina&luma` || char == `rosalinaandluma` || char == `randl` || char == `rosa` || char == `r&l` || char == Characters.RosalinaAndLuma.toLowerCase()) {
            return Characters.RosalinaAndLuma;
        } else if (char == `roy` || char == Characters.Roy.toLowerCase()) {
            return Characters.Roy;
        } else if (char == `ryu` || char == Characters.Ryu.toLowerCase()) {
            return Characters.Ryu;
        } else if (char == `samus` || char == `samu` || char == Characters.Samus.toLowerCase()) {
            return Characters.Samus;
        } else if (char == `sephiroth` || char == `sephi` || char == `seph` || char == Characters.Sephiroth.toLowerCase()) {
            return Characters.Sephiroth;
        } else if (char == `sheik` || char == `she` || char == Characters.Sheik.toLowerCase()) {
            return Characters.Sheik;
        } else if (char == `shulk` || char == `shlk` || char == Characters.Shulk.toLowerCase()) {
            return Characters.Shulk;
        } else if (char == `simon` || char == `simo` || char == Characters.Simon.toLowerCase()) {
            return Characters.Simon;
        } else if (char == `snake` || char == `snk` || char == `ak` || char == Characters.Snake.toLowerCase()) {
            return Characters.Snake;
        } else if (char == `sonic` || char == `soni` || char == `snc` || char == Characters.Sonic.toLowerCase()) {
            return Characters.Sonic;
        } else if (char == `sora` || char == `sor` || char == Characters.Sora.toLowerCase()) {
            return Characters.Sora;
        } else if (char == `steve` || char == `stev` || char == `ste` || char == `stv` || char == Characters.Steve.toLowerCase()) {
            return Characters.Steve;
        } else if (char == `terry` || char == `terr` || char == `trry` || char == `ter` || char == `try` || char == Characters.Terry.toLowerCase()) {
            return Characters.Terry;
        } else if (char == `toonlink` || char == `tlink` ||  char == `toon` || char == `tl` || char == Characters.ToonLink.toLowerCase()) {
            return Characters.ToonLink;
        } else if (char == `villager` || char == `vill` || char == Characters.Villager.toLowerCase()) {
            return Characters.Villager;
        } else if (char == `wario` || char == `war` || char == Characters.Wario.toLowerCase()) {
            return Characters.Wario;
        } else if (char == `wiifittrainer` || char == `wft` || char == `fit` || char == Characters.WiiFitTrainer.toLowerCase()) {
            return Characters.WiiFitTrainer;
        } else if (char == `wolf` || char == `wlf` || char == `wol` || char == Characters.Wolf.toLowerCase()) {
            return Characters.Wolf;
        } else if (char == `yoshi` || char == `yosh` || char == `ysh` || char == Characters.Yoshi.toLowerCase()) {
            return Characters.Yoshi;
        } else if (char == `younglink` || char == `ylink` || char == `yl` || char == Characters.YoungLink.toLowerCase()) {
            return Characters.YoungLink;
        } else if (char == `zelda` || char == `zeld` || char == `zel` || char == Characters.Zelda.toLowerCase()) {
            return Characters.Zelda;
        } else if (char == `zerosuitsamus` || char == `zerosuit` || char == `zero` || char == `zss` || char == Characters.ZeroSuitSamus.toLowerCase()) {
            return Characters.ZeroSuitSamus;
        }
    }

    const calcPlayerCharacterIcon = (char) => {
        let publicAssetImageLink = `https://raw.githubusercontent.com/strawhat19/Smasherscape/main/assets/smasherscape/characters`;
        if (char == `aegis` || char == `pyra` || char == `mythra` || char == Characters.Aegis.toLowerCase()) {
            return `${publicAssetImageLink}/PyraMythraAegis.webp`;
        } else if (char == `banjoandkazooie` || char == `banjo&kazooie` || char == `banjo` || char == `bk` || char == `bandk` || char == `b&k` || char == Characters.BanjoAndKazooie.toLowerCase()) {
            return `${publicAssetImageLink}/Banjo&Kazooie.webp`;
        } else if (char == `bayonetta` || char == `bayo` || char == Characters.Bayonetta.toLowerCase()) {
            return `${publicAssetImageLink}/Bayonetta.webp`;
        } else if (char == `bowser` || char == `bow` || char == Characters.Bowser.toLowerCase()) {
            return `${publicAssetImageLink}/Bowser.webp`;
        } else if (char == `bowserjr` || char == `bj` || char == Characters.BowserJr.toLowerCase()) {
            return `${publicAssetImageLink}/BowserJr.webp`;
        } else if (char == `byleth` || char == `by` || char == Characters.Byleth.toLowerCase()) {
            return `${publicAssetImageLink}/Byleth.webp`;
        } else if (char == `captainfalcon` || char == `cf` || char == `falcon` || char == Characters.CaptainFalcon.toLowerCase()) {
            return `${publicAssetImageLink}/CaptainFalcon.webp`;
        } else if (char == `charizard` || char == `char` || char == Characters.Charizard.toLowerCase()) {
            return `${publicAssetImageLink}/Charizard.webp`;
        } else if (char == `chrom` || char == `ch` || char == Characters.Chrom.toLowerCase()) {
            return `${publicAssetImageLink}/Chrom.webp`;
        } else if (char == `cloud` || char == `cl` || char == Characters.Cloud.toLowerCase()) {
            return `${publicAssetImageLink}/Cloud.webp`;
        } else if (char == `corrin` || char == `co` || char == Characters.Corrin.toLowerCase()) {
            return `${publicAssetImageLink}/Corrin.webp`;
        } else if (char == `daisy` || char == `da` || char == Characters.Daisy.toLowerCase()) {
            return `${publicAssetImageLink}/Daisy.webp`;
        } else if (char == `darkpit` || char == `dp` || char == Characters.DarkPit.toLowerCase()) {
            return `${publicAssetImageLink}/DarkPit.webp`;
        } else if (char == `darksamus` || char == `ds` || char == Characters.DarkSamus.toLowerCase()) {
            return `${publicAssetImageLink}/DarkSamus.webp`;
        } else if (char == `diddykong` || char == `diddy` || char == Characters.DiddyKong.toLowerCase()) {
            return `${publicAssetImageLink}/DiddyKong.webp`;
        } else if (char == `donkeykong` || char == `dk` || char == Characters.DonkeyKong.toLowerCase()) {
            return `${publicAssetImageLink}/DonkeyKong.webp`;
        } else if (char == `drmario` || char == `doc` || char == `dm` || char == Characters.DrMario.toLowerCase()) {
            return `${publicAssetImageLink}/DrMario.webp`;
        } else if (char == `duckhunt` || char == `dh` || char == Characters.DuckHunt.toLowerCase()) {
            return `${publicAssetImageLink}/DuckHunt.webp`;
        } else if (char == `falco` || char == `fa` || char == Characters.Falco.toLowerCase()) {
            return `${publicAssetImageLink}/Falco.webp`;
        } else if (char == `fox` || char == Characters.Fox.toLowerCase()) {
            return `${publicAssetImageLink}/Fox.webp`;
        } else if (char == `ganondorf` || char == `ganon` || char == `gd` || char == `gnn` || char == Characters.Ganondorf.toLowerCase()) {
            return `${publicAssetImageLink}/Ganondorf.webp`;
        } else if (char == `greninja` || char == `gren` || char == `grenin` || char == Characters.Greninja.toLowerCase()) {
            return `${publicAssetImageLink}/Greninja.webp`;
        } else if (char == `hero` || char == `he` || char == `hr` || char == Characters.Hero.toLowerCase()) {
            return `${publicAssetImageLink}/Hero.webp`;
        } else if (char == `iceclimbers` || char == `icies` || char == `ics` || char == `ic` || char == Characters.IceClimbers.toLowerCase()) {
            return `${publicAssetImageLink}/IceClimbers.webp`;
        } else if (char == `ike` || char == Characters.Ike.toLowerCase()) {
            return `${publicAssetImageLink}/Ike.webp`;
        } else if (char == `incineroar` || char == `incin` || char == `inc` || char == Characters.Incineroar.toLowerCase()) {
            return `${publicAssetImageLink}/Incineroar.webp`;
        } else if (char == `inkling` || char == `inkl` || char == `ink` || char == Characters.Inkling.toLowerCase()) {
            return `${publicAssetImageLink}/Inkling.webp`;
        } else if (char == `isabelle` || char == `isbl` || char == `isa` || char == Characters.Isabelle.toLowerCase()) {
            return `${publicAssetImageLink}/Isabelle.webp`;
        } else if (char == `ivysaur` || char == `ivys` || char == `ivy` || char == Characters.Ivysaur.toLowerCase()) {
            return `${publicAssetImageLink}/Ivysaur.webp`;
        } else if (char == `jigglypuff` || char == `jiggly` || char == `jiggs` || char == `jp` || char == Characters.Jigglypuff.toLowerCase()) {
            return `${publicAssetImageLink}/Jigglypuff.webp`;
        } else if (char == `joker` || char == Characters.Joker.toLowerCase()) {
            return `${publicAssetImageLink}/Joker.webp`;
        } else if (char == `kazuya` || char == `kaz` || char == `kz` || char == Characters.Kazuya.toLowerCase()) {
            return `${publicAssetImageLink}/Kazuya.webp`;
        } else if (char == `ken` || char == `kn` || char == Characters.Ken.toLowerCase()) {
            return `${publicAssetImageLink}/Ken.webp`;
        }  else if (char == `kingdedede` || char == `ddd` || char == `kd` || char == Characters.KingDedede.toLowerCase()) {
            return `${publicAssetImageLink}/KingDedede.webp`;
        }  else if (char == `kingkrool` || char == `krool` || char == `rool` || char == `kkr` || char == Characters.KingKRool.toLowerCase()) {
            return `${publicAssetImageLink}/KingKRool.webp`;
        } else if (char == `kirby` || char == `krb` || char == Characters.Kirby.toLowerCase()) {
            return `${publicAssetImageLink}/Kirby.webp`;
        } else if (char == `link` || char == `lnk` || char == Characters.Link.toLowerCase()) {
            return `${publicAssetImageLink}/Link.webp`;
        } else if (char == `littlemac` || char == `lm` || char == Characters.LittleMac.toLowerCase()) {
            return `${publicAssetImageLink}/LittleMac.webp`;
        } else if (char == `lucario` || char == `luc` || char == Characters.Lucario.toLowerCase()) {
            return `${publicAssetImageLink}/Lucario.webp`;
        } else if (char == `lucas` || char == Characters.Lucas.toLowerCase()) {
            return `${publicAssetImageLink}/Lucas.webp`;
        } else if (char == `lucina` || char == Characters.Lucina.toLowerCase()) {
            return `${publicAssetImageLink}/Lucina.webp`;
        } else if (char == `luigi` || char == `lg` || char == Characters.Luigi.toLowerCase()) {
            return `${publicAssetImageLink}/Luigi.webp`;
        } else if (char == `mario` || char == Characters.Mario.toLowerCase()) {
            return `${publicAssetImageLink}/Mario.webp`;
        } else if (char == `marth` || char == Characters.Marth.toLowerCase()) {
            return `${publicAssetImageLink}/Marth.webp`;
        } else if (char == `megaman` || char == `mm` || char == `mega` || char == Characters.MegaMan.toLowerCase()) {
            return `${publicAssetImageLink}/MegaMan.webp`;
        } else if (char == `metaknight` || char == `meta` || char == `mk` || char == Characters.MetaKnight.toLowerCase()) {
            return `${publicAssetImageLink}/MetaKnight.webp`;
        } else if (char == `mt` || char == `mewtwo` || char == `m2` || char == Characters.Mewtwo.toLowerCase()) {
            return `${publicAssetImageLink}/Mewtwo.webp`;
        } else if (char == `miibrawler` || char == `brawler` || char == `mb` || char == Characters.MiiBrawler.toLowerCase()) {
            return `${publicAssetImageLink}/MiiBrawler.webp`;
        } else if (char == `miifighter` || char == `fighter` || char == `mf` || char == Characters.MiiFighter.toLowerCase()) {
            return `${publicAssetImageLink}/MiiFighter.webp`;
        } else if (char == `miigunner` || char == `gunner` || char == `mg` || char == Characters.MiiGunner.toLowerCase()) {
            return `${publicAssetImageLink}/MiiGunner.webp`;
        } else if (char == `miiswordfighter` || char == `swordfighter` || char == `ms` || char == Characters.MiiSwordFighter.toLowerCase()) {
            return `${publicAssetImageLink}/MiiSwordFighter.webp`;
        } else if (char == `minmin` || char == `min` || char == Characters.MinMin.toLowerCase()) {
            return `${publicAssetImageLink}/MinMin.webp`;
        } else if (char == `mrgame&watch` || char == `gnw` || char == `game&watch` || char == `mrgameandwatch` || char == `gameandwatch` || char == Characters.MrGameAndWatch.toLowerCase()) {
            return `${publicAssetImageLink}/MrGame&Watch.webp`;
        } else if (char == `ness` || char == Characters.Ness.toLowerCase()) {
            return `${publicAssetImageLink}/Ness.webp`;
        } else if (char == `olimar` || char == `oli` || char == Characters.Olimar.toLowerCase()) {
            return `${publicAssetImageLink}/Olimar.webp`;
        } else if (char == `pacman` || char == `pac` || char == `pm` || char == Characters.PacMan.toLowerCase()) {
            return `${publicAssetImageLink}/Pac-Man.webp`;
        } else if (char == `palutena` || char == `palu` || char == Characters.Palutena.toLowerCase()) {
            return `${publicAssetImageLink}/Palutena.webp`;
        } else if (char == `peach` || char == `pe` || char == Characters.Peach.toLowerCase()) {
            return `${publicAssetImageLink}/Peach.webp`;
        } else if (char == `pichu` || char == `pi` || char == Characters.Pichu.toLowerCase()) {
            return `${publicAssetImageLink}/Pichu.webp`;
        } else if (char == `pikachu` || char == `pika` || char == Characters.Pikachu.toLowerCase()) {
            return `${publicAssetImageLink}/Pikachu.webp`;
        } else if (char == `piranhaplant` || char == `plant` || char == `pp` || char == Characters.PiranhaPlant.toLowerCase()) {
            return `${publicAssetImageLink}/PiranhaPlant.webp`;
        } else if (char == `pit` || char == Characters.Pit.toLowerCase()) {
            return `${publicAssetImageLink}/Pit.webp`;
        } else if (char == `pokemontrainer` || char == `pt` || char == Characters.PokemonTrainer.toLowerCase()) {
            return `${publicAssetImageLink}/PokemonTrainer.webp`;
        } else if (char == `richter` || char == `ri` || char == Characters.Richter.toLowerCase()) {
            return `${publicAssetImageLink}/Richter.webp`;
        } else if (char == `ridley` || char == `rid` || char == Characters.Ridley.toLowerCase()) {
            return `${publicAssetImageLink}/Ridley.webp`;
        } else if (char == `rob` || char == Characters.ROB.toLowerCase()) {
            return `${publicAssetImageLink}/ROB.webp`;
        } else if (char == `robin` || char == `robi` || char == Characters.Robin.toLowerCase()) {
            return `${publicAssetImageLink}/Robin.webp`;
        } else if (char == `rosalina&luma` || char == `rosalinaandluma` || char == `randl` || char == `rosa` || char == `r&l` || char == Characters.RosalinaAndLuma.toLowerCase()) {
            return `${publicAssetImageLink}/Rosalina.webp`;
        } else if (char == `roy` || char == Characters.Roy.toLowerCase()) {
            return `${publicAssetImageLink}/Roy.webp`;
        } else if (char == `ryu` || char == Characters.Ryu.toLowerCase()) {
            return `${publicAssetImageLink}/Ryu.webp`;
        } else if (char == `samus` || char == `samu` || char == Characters.Samus.toLowerCase()) {
            return `${publicAssetImageLink}/Samus.webp`;
        } else if (char == `sephiroth` || char == `sephi` || char == `seph` || char == Characters.Sephiroth.toLowerCase()) {
            return `${publicAssetImageLink}/Sephiroth.webp`;
        } else if (char == `sheik` || char == `she` || char == Characters.Sheik.toLowerCase()) {
            return `${publicAssetImageLink}/Sheik.webp`;
        } else if (char == `shulk` || char == `shlk` || char == Characters.Shulk.toLowerCase()) {
            return `${publicAssetImageLink}/Shulk.webp`;
        } else if (char == `simon` || char == `simo` || char == Characters.Simon.toLowerCase()) {
            return `${publicAssetImageLink}/Simon.webp`;
        } else if (char == `snake` || char == `snk` || char == `ak` || char == Characters.Snake.toLowerCase()) {
            return `${publicAssetImageLink}/Snake.webp`;
        } else if (char == `sonic` || char == `soni` || char == `snc` || char == Characters.Sonic.toLowerCase()) {
            return `${publicAssetImageLink}/Sonic.webp`;
        } else if (char == `sora` || char == Characters.Sora.toLowerCase()) {
            return `${publicAssetImageLink}/Sora.webp`;
        } else if (char == `steve` || char == `stev` || char == `ste` || char == `stv` || char == Characters.Steve.toLowerCase()) {
            return `${publicAssetImageLink}/Steve.webp`;
        } else if (char == `terry` || char == `terr` || char == `trry` || char == `ter` || char == `try` || char == Characters.Terry.toLowerCase()) {
            return `${publicAssetImageLink}/Terry.webp`;
        } else if (char == `toonlink` || char == `tlink` ||  char == `toon` || char == `tl` || char == Characters.ToonLink.toLowerCase()) {
            return `${publicAssetImageLink}/ToonLink.webp`;
        } else if (char == `villager` || char == `vill` || char == Characters.Villager.toLowerCase()) {
            return `${publicAssetImageLink}/Villager.webp`;
        } else if (char == `wario` || char == `war` || char == Characters.Wario.toLowerCase()) {
            return `${publicAssetImageLink}/Wario.webp`;
        } else if (char == `wiifittrainer` || char == `wft` || char == `fit` || char == Characters.WiiFitTrainer.toLowerCase()) {
            return `${publicAssetImageLink}/WiiFitTrainer.webp`;
        } else if (char == `wolf` || char == `wlf` || char == `wol` || char == Characters.Wolf.toLowerCase()) {
            return `${publicAssetImageLink}/Wolf.webp`;
        } else if (char == `yoshi` || char == `yosh` || char == `ysh` || char == Characters.Yoshi.toLowerCase()) {
            return `${publicAssetImageLink}/Yoshi.webp`;
        } else if (char == `younglink` || char == `ylink` || char == `yl` || char == Characters.YoungLink.toLowerCase()) {
            return `${publicAssetImageLink}/YoungLink.webp`;
        } else if (char == `zelda` || char == `zeld` || char == `zel` || char == Characters.Zelda.toLowerCase()) {
            return `${publicAssetImageLink}/Zelda.webp`;
        } else if (char == `zerosuitsamus` || char == `zerosuit` || char == `zero` || char == `zss` || char == Characters.ZeroSuitSamus.toLowerCase()) {
            return `${publicAssetImageLink}/ZeroSuitSamus.webp`;
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
                    } else if (!calcCharacter(characterOne) || !calcCharacter(characterTwo)) {
                        alert(`Cannot find characters with those names`);
                        return;
                    } else {

                        let updatedPlayers = players.map(plyr => {
                            if (plyr?.name.toLowerCase() == playerOne || plyr?.name.toLowerCase().includes(playerOne)) {
                                plyr.experience.arenaXP = plyr.experience.arenaXP + 400;
                                plyr.plays.push({
                                    character: calcCharacter(characterOne),
                                    winner: playerOneDB?.name,
                                    loser: playerTwoDB?.name,
                                    stocksTaken,
                                    date
                                });

                                calcPlayerLevelAndExperience(plyr);

                                return plyr;
                            } else if (plyr?.name.toLowerCase() == playerTwo || plyr?.name.toLowerCase().includes(playerTwo)) {
                                plyr.experience.arenaXP = plyr.experience.arenaXP + (100 * stocksTaken);
                                plyr.plays.push({
                                    character: calcCharacter(characterTwo),
                                    winner: playerOneDB?.name,
                                    loser: playerTwoDB?.name,
                                    stocksTaken,
                                    date
                                });

                                calcPlayerLevelAndExperience(plyr);

                                return plyr;
                            } else {
                                return plyr;
                            }
                        });

                        console.log(`Updated Players`, updatedPlayers);
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
                } else if (commandParams[0].includes(`!del`)) {
                    console.log(Characters);
                    console.log(Characters[`cf`]);
                    // let playerToAdd = commandParams[1].charAt(0).toUpperCase() + commandParams[1].slice(1).toLowerCase();
                    // setPlayers(prevPlayers => {
                    //     let updatedPlayers = [...prevPlayers, {
                    //         id: players.length + 1,
                    //         name: playerToAdd,
                    //         plays: [],
                    //         level: {
                    //           num: 1,
                    //           name: `Bronze Scimitar`
                    //         },
                    //         experience: {
                    //           xp: 0,
                    //           arenaXP: 0,
                    //           nextLevelAt: 83,
                    //           remainingXP: 83
                    //         },
                    //     }];
                    //     setFilteredPlayers(updatedPlayers);
                    //     return updatedPlayers;
                    // });
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
                        <LazyLoadImage effect="blur" src={`${publicAssetLink}/assets/smasherscape/OSRS_Card_Empty.png?raw=true`} className={`cardBG`} alt={`Smasherscape Player Card`} />
                        <LazyLoadImage effect="blur" src={`${publicAssetLink}/assets/smasherscape/OSRS_Card_Template_Border_Only.png?raw=true`} className={`cardBG border`} alt={`Smasherscape Player Card`} />
                        <div className="playerCardContent">
                            <div className="cardTopRow">
                                <div className="logoWithWords">
                                    <img width={70} src={`${publicAssetLink}/assets/smasherscape/OSRS_Top_Hat.png?raw=true`} alt={`Tophat Logo`} />
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
                                        <h4>{calcPlayerWins(plyr)} - {calcPlayerLosses(plyr)}</h4>
                                    </div>
                                    <div className="plays">
                                        <h3>Plays</h3>
                                        <div className={`playsContainer`}>
                                            {calcPlayerCharactersPlayed(plyr).map((char, charIndex) => {
                                                return (
                                                    <Badge key={charIndex} badgeContent={calcPlayerCharacterTimesPlayed(plyr, char)} color="primary">
                                                        <img className={`charImg`} width={35} src={calcPlayerCharacterIcon(char)} alt={calcCharacter(char)} title={`Played ${calcCharacter(char)} ${calcPlayerCharacterTimesPlayed(plyr, char)} Time(s)`} />
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