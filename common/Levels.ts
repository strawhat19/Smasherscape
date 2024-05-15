import Level from "../models/Level";
import Player from "../models/Player";
import Experience from "../models/Experience";

export const Levels: Level = {
    Default: {
        id: 0,
        minXP: 0,
        startAt: 1,
        levelUpAfter: 9,
        class: `Default`,
        color: `#d9be1a`,
        name: `Bronze Scimitar`,
        altImage: `/assets/Bronze_Scimmy.png`,
        image: `/images/Level_1_Bronze_Scimmy.png`,
        gradient: `linear-gradient(90deg, #f3ae41, #92621d)`,
    },
    Bronze: {
        id: 1,
        minXP: 0,
        startAt: 1,
        levelUpAfter: 4,
        class: `Bronze`,
        color: `#d9be1a`,
        name: `Bronze Scimitar`,
        altImage: `/assets/Bronze_Scimmy.png`,
        image: `/images/Level_1_Bronze_Scimmy.png`,
        gradient: `linear-gradient(90deg, #f3ae41, #92621d)`,
    },
    Diddys: {
        id: 2,
        minXP: 388,
        startAt: 5,
        levelUpAfter: 9,
        class: `Diddys`,
        color: `#d9be1a`,
        name: `Diddys Banana`,
        image: `/images/Level_5_Diddys_Banana.png`,
        gradient: `linear-gradient(90deg, #f3ae41, #92621d)`,
    },
    Iron: {
        id: 3,
        minXP: 1154,
        startAt: 10,
        levelUpAfter: 14,
        class: `Iron`,
        name: `Iron Scimitar`,
        altImage: `/assets/Iron_Scimmy.png`,
        image: `/images/Level_10_Iron_Scimmy.png`,
        gradient: `linear-gradient(90deg, #b1acab , #4c5153)`,
    },
    Steel: {
        id: 4,
        minXP: 2411,
        startAt: 15,
        levelUpAfter: 19,
        class: `Steel`,
        name: `Steel Scimitar`,
        altImage: `/assets/Steel_Scimmy.png`,
        image: `/images/Level_15_Steel_Scimmy.png`,
        gradient: `linear-gradient(90deg, #d3dde3, #6f7e86)`,
    },
    Mithril: {
        id: 5,
        minXP: 4470,
        startAt: 20,
        levelUpAfter: 24,
        class: `Mithril`,
        name: `Mithril Scimitar`,
        altImage: `/assets/Mithril_Scimmy.png`,
        image: `/images/Level_20_Mithril_Scimmy.png`,
        gradient: `linear-gradient(90deg, #aeb0da, #4a4aca)`,
    },
    Mushroom: {
        id: 6,
        minXP: 7842,
        startAt: 25,
        levelUpAfter: 29,
        class: `Mushroom`,
        name: `Mushroom`,
        image: `/images/Level_25_Mushroom.png`,
        gradient: `linear-gradient(90deg, #aeb0da, #4a4aca)`,
    },
    Adamantite: {
        id: 7,
        minXP: 13363,
        startAt: 30,
        levelUpAfter: 39,
        class: `Adamantite`,
        name: `Adamantite Scimitar`,
        altImage: `/assets/Adamant_Scimmy.png`,
        image: `/images/Level_30_Adamant_Scimmy.png`,
        gradient: `linear-gradient(90deg, #75e775, #055505)`,
    },
    Rune: {
        id: 8,
        minXP: 37224,
        startAt: 40,
        levelUpAfter: 49,
        class: `Rune`,
        name: `Rune Scimitar`,
        altImage: `/assets/Rune_Scimmy.png`,
        image: `/images/Level_40_Rune_Scimmy.png`,
        gradient: `linear-gradient(90deg, #4acbff, #105479)`,
    },
    Gilded: {
        id: 9,
        minXP: 101333,
        startAt: 50,
        levelUpAfter: 55,
        class: `Gilded`,
        name: `Gilded Scimitar`,
        altImage: `/assets/Gilded_Scimmy.png`,
        image: `/images/Level_50_Gilded_Scimmy.png`,
        gradient: `linear-gradient(90deg, #8b8bff, #31a8e5, #1edc78)`,
    },
    GomuGomu: {
        id: 10,
        minXP: 184040,
        startAt: 56,
        levelUpAfter: 59,
        class: `GomuGomu`,
        name: `Gomu Gomu`,
        altImage: `/assets/Gomu_Gomu.png`,
        image: `/images/Level_56_Gomu_Gomu.png`,
        gradient: `linear-gradient(90deg, #f83474, #59e035)`,
    },
    DragonScimmy: {
        id: 11,
        minXP: 273742,
        startAt: 60,
        levelUpAfter: 69,
        class: `DragonScimmy`,
        name: `Dragon Scimitar`,
        // altImage: `/assets/Dragon_Scimmy.png`,
        image: `/images/Level_60_Dragon_Scimmy.png`,
        gradient: `linear-gradient(90deg, #f22fe7, #f63460)`,
    },
    Abyssal: {
        id: 12,
        minXP: 737627,
        startAt: 70,
        levelUpAfter: 72,
        class: `Abyssal`,
        name: `Abyssal Whip`,
        // altImage: `/assets/Abyssal_Whip.png`,
        image: `/images/Level_70_Abyssal_Whip.png`,
        gradient: `linear-gradient(90deg, #2c4aff, #e72af8)`,
    },
    Monado: {
        id: 13,
        minXP: 992895,
        startAt: 73,
        levelUpAfter: 74,
        class: `Monado`,
        name: `Monado`,
        image: `/images/Level_73_Monado.png`,
        // altImage: `/assets/Level_73_Monado.png`,
        gradient: `linear-gradient(90deg, #2c4aff, #e72af8)`,
    },
    Blowpipe: {
        id: 14,
        minXP: 1210421,
        startAt: 75,
        levelUpAfter: 77,
        class: `Blowpipe`,
        name: `Blowpipe`,
        image: `/images/Level_75_Blowpipe.png`,
        gradient: `linear-gradient(90deg, #3462f8, #59e035)`,
    },
    Incineroars: {
        id: 15,
        minXP: 1629200,
        startAt: 78,
        levelUpAfter: 79,
        class: `Incineroars`,
        name: `Incineroars Belt`,
        image: `/images/Level_78_Incineroars_Belt.png`,
        gradient: `linear-gradient(90deg, #3462f8, #59e035)`,
    },
    DragonHunterCrossbow: {
        id: 16,
        minXP: 1986068,
        startAt: 80,
        levelUpAfter: 81,
        class: `DHC`,
        name: `Dragon Hunter Crossbow`,
        image: `/images/Level_80_DHC.png`,
        gradient: `linear-gradient(90deg, #aee7ef, #cde242)`,
    },
    Dharoks: {
        id: 17,
        minXP: 2421087,
        startAt: 82,
        levelUpAfter: 84,
        class: `Dharoks`,
        name: `Dharoks Greataxe`,
        image: `/images/Level_82_Dharoks_Greataxe.png`,
        gradient: `linear-gradient(90deg, #aee7ef, #cde242)`,
    },
    Kingdom: {
        id: 18,
        minXP: 3258594,
        startAt: 85,
        levelUpAfter: 85,
        class: `Kingdom`,
        name: `Kingdom Key`,
        image: `/images/Level_85_Kingdom_Key.png`,
        gradient: `linear-gradient(90deg, #303d92, #48f8a3)`,
    },
    Ghrazi: {
        id: 19,
        minXP: 3597792,
        startAt: 86,
        levelUpAfter: 86,
        class: `Ghrazi`,
        name: `Ghrazi Rapier`,
        image: `/images/Level_86_Ghrazi_Rapier.png`,
        gradient: `linear-gradient(90deg, #303d92, #48f8a3)`,
    },
    Master: {
        id: 20,
        minXP: 3972294,
        startAt: 87,
        levelUpAfter: 89,
        class: `Master`,
        name: `Master Sword`,
        image: `/images/Level_87_Master_Sword.png`,
        gradient: `linear-gradient(90deg, #303d92, #48f8a3)`,
    },
    Twisted: {
        id: 21,
        minXP: 5346332,
        startAt: 90,
        levelUpAfter: 90,
        class: `Twisted`,
        name: `Twisted Bow`,
        image: `/images/Level_90_Twisted_Bow.png`,
        gradient: `linear-gradient(90deg, #a9d73a, #60f7b9)`,
    },
    Energy: {
        id: 22,
        minXP: 5346332,
        startAt: 90,
        levelUpAfter: 91,
        class: `Energy`,
        name: `Energy Sword`,
        image: `/images/Level_91_Energy_Sword.png`,
        gradient: `linear-gradient(90deg, #a9d73a, #60f7b9)`,
    },
    DragonSlayer: {
        id: 23,
        minXP: 6517253,
        startAt: 92,
        levelUpAfter: 93,
        class: `DragonSlayer`,
        name: `Dragon Slayer`,
        image: `/images/Level_92_Dragon_Slayer.png`,
        gradient: `linear-gradient(90deg, #e44646, #4e2699)`,
    },
    Oblivion: {
        id: 24,
        minXP: 7944614,
        startAt: 94,
        levelUpAfter: 94,
        class: `Oblivion`,
        name: `Oblivion Key`,
        image: `/images/Level_94_Oblivion_Key.png`,
        gradient: `linear-gradient(90deg, #0749f3, #4f209e, #9d1ffb)`,
    },
    Blaster: {
        id: 25,
        minXP: 8771558,
        startAt: 95,
        levelUpAfter: 95,
        class: `Blaster`,
        name: `Blaster`,
        image: `/images/Level_95_Blaster.png`,
        gradient: `linear-gradient(90deg, #0749f3, #4f209e, #9d1ffb)`,
    },
    Boxing: {
        id: 26,
        minXP: 9684577,
        startAt: 96,
        levelUpAfter: 96,
        class: `Boxing`,
        name: `Boxing Gloves`,
        image: `/images/Level_96_Boxing_Gloves.png`,
        gradient: `linear-gradient(90deg, #0749f3, #4f209e, #9d1ffb)`,
    },
    Fish: {
        id: 27,
        minXP: 10692629,
        startAt: 97,
        levelUpAfter: 97,
        class: `Fish`,
        name: `Fish Sack`,
        altImage: `/assets/Fish_Sack.png`,
        image: `/images/Level_97_Fish_Sack.png`,
        gradient: `linear-gradient(90deg, #36c2ea, #4fe78f)`,
    },
    Golden: {
        id: 28,
        minXP: 11805606,
        startAt: 98,
        levelUpAfter: 98,
        class: `Golden`,
        name: `Golden Tench`,
        altImage: `/assets/Golden_Tench.png`,
        image: `/images/Level_98_Golden_Tench.png`,
        // gradient: `linear-gradient(90deg, #36c2ea, #4fe78f)`,
    },
    Top: {
        id: 29,
        minXP: 13034431,
        startAt: 99,
        levelUpAfter: 99,
        class: `Top`,
        name: `Top Hat`,
        image: `/assets/OSRS_Top_Hat.png`,
        gradient: `linear-gradient(90deg, #1edc78, #31a8e5)`,
    },
}

export const convertToCustomClasses = (customClassModelObject, CustomClassModel) => {
    let customClassModelInstances = {};
    for (const key in customClassModelObject) if (customClassModelObject.hasOwnProperty(key)) customClassModelInstances[key] = new CustomClassModel(customClassModelObject[key]);
    return customClassModelInstances;
}

export const levels = convertToCustomClasses(Levels, Level);
export const levelsArray = Object.values(levels).sort((firstLevel: Level, nextLevel: Level) => firstLevel.startAt - nextLevel.startAt).filter((lv: Level) => lv.id > 0);

export const getLevelFromNumber = (levelNumber) => {
    let levelsToSet = levelsArray.filter((level: Level) => {
        let { startAt, levelUpAfter } = level;
        return levelNumber >= startAt && levelUpAfter >= levelNumber && levelNumber <= startAt + levelUpAfter;
    })

    let levelInRange = levelsToSet && levelsToSet.length > 0 ? levelsToSet[0] : Levels.Default;

    return levelInRange;
}

export const calcPlayerLevelAndExperience = (plyr: Player) => {
    let xp = plyr.experience.arenaXP;
    if (xp < 83) {
        plyr.level.num = 1;
        plyr.experience.xp = 0;
        plyr.level.name = Levels.Bronze.name;
        plyr.experience.nextLevelAt = 83;
        plyr.experience.remainingXP = (83 - xp);
    } else if (xp >= 83 && xp < 174) {
        plyr.level.num = 2;
        plyr.experience.xp = 83;
        plyr.level.name = Levels.Bronze.name;
        plyr.experience.nextLevelAt = 174;
        plyr.experience.remainingXP = (174 - xp);
    } else if (xp >= 174 && xp < 276) {
        plyr.level.num = 3;
        plyr.experience.xp = 174;
        plyr.level.name = Levels.Bronze.name;
        plyr.experience.nextLevelAt = 276;
        plyr.experience.remainingXP = (276 - xp);
    } else if (xp >= 276 && xp < 388) {
        plyr.level.num = 4;
        plyr.experience.xp = 276;
        plyr.level.name = Levels.Bronze.name;
        plyr.experience.nextLevelAt = 388;
        plyr.experience.remainingXP = (388 - xp);
    } else if (xp >= 388 && xp < 512) {
        plyr.level.num = 5;
        plyr.experience.xp = 388;
        plyr.level.name = Levels.Diddys.name;
        plyr.experience.nextLevelAt = 512;
        plyr.experience.remainingXP = (512 - xp);
    } else if (xp >= 512 && xp < 650) {
        plyr.level.num = 6;
        plyr.experience.xp = 512;
        plyr.level.name = Levels.Diddys.name;
        plyr.experience.nextLevelAt = 650;
        plyr.experience.remainingXP = (650 - xp);
    } else if (xp >= 650 && xp < 801) {
        plyr.level.num = 7;
        plyr.experience.xp = 650;
        plyr.level.name = Levels.Diddys.name;
        plyr.experience.nextLevelAt = 801;
        plyr.experience.remainingXP = (801 - xp);
    } else if (xp >= 801 && xp < 969) {
        plyr.level.num = 8;
        plyr.experience.xp = 801;
        plyr.level.name = Levels.Diddys.name;
        plyr.experience.nextLevelAt = 969;
        plyr.experience.remainingXP = (969 - xp);
    } else if (xp >= 969 && xp < 1154) {
        plyr.level.num = 9;
        plyr.experience.xp = 969;
        plyr.level.name = Levels.Diddys.name;
        plyr.experience.nextLevelAt = 1154;
        plyr.experience.remainingXP = (1154 - xp);
    } else if (xp >= 1154 && xp < 1358) {
        plyr.level.num = 10;
        plyr.experience.xp = 1154;
        plyr.level.name = Levels.Iron.name;
        plyr.experience.nextLevelAt = 1358;
        plyr.experience.remainingXP = (1358 - xp);
    } else if (xp >= 1358 && xp < 1584) {
        plyr.level.num = 11;
        plyr.experience.xp = 1358;
        plyr.level.name = Levels.Iron.name;
        plyr.experience.nextLevelAt = 1584;
        plyr.experience.remainingXP = (1584 - xp);
    } else if (xp >= 1584 && xp < 1833) {
        plyr.level.num = 12;
        plyr.experience.xp = 1584;
        plyr.level.name = Levels.Iron.name;
        plyr.experience.nextLevelAt = 1833;
        plyr.experience.remainingXP = (1833 - xp);
    } else if (xp >= 1833 && xp < 2107) {
        plyr.level.num = 13;
        plyr.experience.xp = 1833;
        plyr.level.name = Levels.Iron.name;
        plyr.experience.nextLevelAt = 2107;
        plyr.experience.remainingXP = (2107 - xp);
    } else if (xp >= 2107 && xp < 2411) {
        plyr.level.num = 14;
        plyr.experience.xp = 2107;
        plyr.level.name = Levels.Iron.name;
        plyr.experience.nextLevelAt = 2411;
        plyr.experience.remainingXP = (2411 - xp);
    } else if (xp >= 2411 && xp < 2746) {
        plyr.level.num = 15;
        plyr.experience.xp = 2411;
        plyr.level.name = Levels.Steel.name;
        plyr.experience.nextLevelAt = 2746;
        plyr.experience.remainingXP = (2746 - xp);
    } else if (xp >= 2746 && xp < 3115) {
        plyr.level.num = 16;
        plyr.experience.xp = 2746;
        plyr.level.name = Levels.Steel.name;
        plyr.experience.nextLevelAt = 3115;
        plyr.experience.remainingXP = (3115 - xp);
    } else if (xp >= 3115 && xp < 3523) {
        plyr.level.num = 17;
        plyr.experience.xp = 3115;
        plyr.level.name = Levels.Steel.name;
        plyr.experience.nextLevelAt = 3523;
        plyr.experience.remainingXP = (3523 - xp);
    } else if (xp >= 3523 && xp < 3973) {
        plyr.level.num = 18;
        plyr.experience.xp = 3523;
        plyr.level.name = Levels.Steel.name;
        plyr.experience.nextLevelAt = 3973;
        plyr.experience.remainingXP = (3973 - xp);
    } else if (xp >= 3973 && xp < 4470) {
        plyr.level.num = 19;
        plyr.experience.xp = 3973;
        plyr.level.name = Levels.Steel.name;
        plyr.experience.nextLevelAt = 4470;
        plyr.experience.remainingXP = (4470 - xp);
    } else if (xp >= 4470 && xp < 5018) {
        plyr.level.num = 20;
        plyr.experience.xp = 4470;
        plyr.level.name = Levels.Mithril.name;
        plyr.experience.nextLevelAt = 5018;
        plyr.experience.remainingXP = (5018 - xp);
    } else if (xp >= 5018 && xp < 5624) {
        plyr.level.num = 21;
        plyr.experience.xp = 5018;
        plyr.level.name = Levels.Mithril.name;
        plyr.experience.nextLevelAt = 5624;
        plyr.experience.remainingXP = (5624 - xp);
    } else if (xp >= 5624 && xp < 6291) {
        plyr.level.num = 22;
        plyr.experience.xp = 5624;
        plyr.level.name = Levels.Mithril.name;
        plyr.experience.nextLevelAt = 6291;
        plyr.experience.remainingXP = (6291 - xp);
    } else if (xp >= 6291 && xp < 7028) {
        plyr.level.num = 23;
        plyr.experience.xp = 6291;
        plyr.level.name = Levels.Mithril.name;
        plyr.experience.nextLevelAt = 7028;
        plyr.experience.remainingXP = (7028 - xp);
    } else if (xp >= 7028 && xp < 7842) {
        plyr.level.num = 24;
        plyr.experience.xp = 7028;
        plyr.level.name = Levels.Mithril.name;
        plyr.experience.nextLevelAt = 7842;
        plyr.experience.remainingXP = (7842 - xp);
    } else if (xp >= 7842 && xp < 8740) {
        plyr.level.num = 25;
        plyr.experience.xp = 7842;
        plyr.level.name = Levels.Mushroom.name;
        plyr.experience.nextLevelAt = 8740;
        plyr.experience.remainingXP = (8740 - xp);
    } else if (xp >= 8740 && xp < 9730) {
        plyr.level.num = 26;
        plyr.experience.xp = 8740;
        plyr.level.name = Levels.Mushroom.name;
        plyr.experience.nextLevelAt = 9730;
        plyr.experience.remainingXP = (9730 - xp);
    } else if (xp >= 9730 && xp < 10824) {
        plyr.level.num = 27;
        plyr.experience.xp = 9730;
        plyr.level.name = Levels.Mushroom.name;
        plyr.experience.nextLevelAt = 10824;
        plyr.experience.remainingXP = (10824 - xp);
    } else if (xp >= 10824 && xp < 12031) {
        plyr.level.num = 28;
        plyr.experience.xp = 10824;
        plyr.level.name = Levels.Mushroom.name;
        plyr.experience.nextLevelAt = 12031;
        plyr.experience.remainingXP = (12031 - xp);
    } else if (xp >= 12031 && xp < 13363) {
        plyr.level.num = 29;
        plyr.experience.xp = 12031;
        plyr.level.name = Levels.Mushroom.name;
        plyr.experience.nextLevelAt = 13363;
        plyr.experience.remainingXP = (13363 - xp);
    } else if (xp >= 13363 && xp < 14833) {
        // Players can challenge others to a bot3
        plyr.experience.xp = 13363;
        plyr.level.num = 30;
        plyr.level.name = Levels.Adamantite.name;
        plyr.experience.nextLevelAt = 14833;
        plyr.experience.remainingXP = (14833 - xp);
    } else if (xp >= 14833 && xp < 16456) {
        plyr.level.num = 31;
        plyr.experience.xp = 14833;
        plyr.level.name = Levels.Adamantite.name;
        plyr.experience.nextLevelAt = 16456;
        plyr.experience.remainingXP = (16456 - xp);
    } else if (xp >= 16456 && xp < 18247) {
        plyr.level.num = 32;
        plyr.experience.xp = 16456;
        plyr.level.name = Levels.Adamantite.name;
        plyr.experience.nextLevelAt = 18247;
        plyr.experience.remainingXP = (18247 - xp);
    } else if (xp >= 18247 && xp < 20224) {
        plyr.level.num = 33;
        plyr.experience.xp = 18247;
        plyr.level.name = Levels.Adamantite.name;
        plyr.experience.nextLevelAt = 20224;
        plyr.experience.remainingXP = (20224 - xp);
    } else if (xp >= 20224 && xp < 22406) {
        plyr.level.num = 34;
        plyr.experience.xp = 20224;
        plyr.level.name = Levels.Adamantite.name;
        plyr.experience.nextLevelAt = 22406;
        plyr.experience.remainingXP = (22406 - xp);
    } else if (xp >= 22406 && xp < 24815) {
        // Players can choose a non-tourney legal stage to play on
        plyr.experience.xp = 22406;
        plyr.level.num = 35;
        plyr.level.name = Levels.Adamantite.name;
        plyr.experience.nextLevelAt = 24815;
        plyr.experience.remainingXP = (24815 - xp);
    } else if (xp >= 24815 && xp < 27473) {
        plyr.level.num = 36;
        plyr.experience.xp = 24815;
        plyr.level.name = Levels.Adamantite.name;
        plyr.experience.nextLevelAt = 27473;
        plyr.experience.remainingXP = (27473 - xp);
    } else if (xp >= 27473 && xp < 30408) {
        plyr.level.num = 37;
        plyr.experience.xp = 27473;
        plyr.level.name = Levels.Adamantite.name;
        plyr.experience.nextLevelAt = 30408;
        plyr.experience.remainingXP = (30408 - xp);
    } else if (xp >= 30408 && xp < 33648) {
        plyr.level.num = 38;
        plyr.experience.xp = 30408;
        plyr.level.name = Levels.Adamantite.name;
        plyr.experience.nextLevelAt = 33648;
        plyr.experience.remainingXP = (33648 - xp);
    } else if (xp >= 33648 && xp < 37224) {
        plyr.level.num = 39;
        plyr.experience.xp = 33648;
        plyr.level.name = Levels.Adamantite.name;
        plyr.experience.nextLevelAt = 37224;
        plyr.experience.remainingXP = (37224 - xp);
    } else if (xp >= 37224 && xp < 41171) {
        // Players can challenge others to a Bo5
        plyr.experience.xp = 37224;
        plyr.level.num = 40;
        plyr.level.name = Levels.Rune.name;
        plyr.experience.nextLevelAt = 41171;
        plyr.experience.remainingXP = (41171 - xp);
    } else if (xp >= 41171 && xp < 45529) {
        plyr.level.num = 41;
        plyr.experience.xp = 41171;
        plyr.level.name = Levels.Rune.name;
        plyr.experience.nextLevelAt = 45529;
        plyr.experience.remainingXP = (45529 - xp);
    } else if (xp >= 45529 && xp < 50339) {
        plyr.level.num = 42;
        plyr.experience.xp = 45529;
        plyr.level.name = Levels.Rune.name;
        plyr.experience.nextLevelAt = 50339;
        plyr.experience.remainingXP = (50339 - xp);
    } else if (xp >= 50339 && xp < 55649) {
        plyr.level.num = 43;
        plyr.experience.xp = 50339;
        plyr.level.name = Levels.Rune.name;
        plyr.experience.nextLevelAt = 55649;
        plyr.experience.remainingXP = (55649 - xp);
    } else if (xp >= 55649 && xp < 61512) {
        plyr.level.num = 44;
        plyr.experience.xp = 55649;
        plyr.level.name = Levels.Rune.name;
        plyr.experience.nextLevelAt = 61512;
        plyr.experience.remainingXP = (61512 - xp);
    } else if (xp >= 61512 && xp < 67983) {
        plyr.level.num = 45;
        plyr.experience.xp = 61512;
        plyr.level.name = Levels.Rune.name;
        plyr.experience.nextLevelAt = 67983;
        plyr.experience.remainingXP = (67983 - xp);
    } else if (xp >= 67983 && xp < 75127) {
        plyr.level.num = 46;
        plyr.experience.xp = 67983;
        plyr.level.name = Levels.Rune.name;
        plyr.experience.nextLevelAt = 75127;
        plyr.experience.remainingXP = (75127 - xp);
    } else if (xp >= 75127 && xp < 83014) {
        plyr.level.num = 47;
        plyr.experience.xp = 75127;
        plyr.level.name = Levels.Rune.name;
        plyr.experience.nextLevelAt = 83014;
        plyr.experience.remainingXP = (83014 - xp);
    } else if (xp >= 83014 && xp < 91721) {
        plyr.level.num = 48;
        plyr.experience.xp = 83014;
        plyr.level.name = Levels.Rune.name;
        plyr.experience.nextLevelAt = 91721;
        plyr.experience.remainingXP = (91721 - xp);
    } else if (xp >= 91721 && xp < 101333) {
        plyr.level.num = 49;
        plyr.experience.xp = 91721;
        plyr.level.name = Levels.Rune.name;
        plyr.experience.nextLevelAt = 101333;
        plyr.experience.remainingXP = (101333 - xp);
    } else if (xp >= 101333 && xp < 111945) {
        // Players can choose another level 50 Player and Challenge them to a Doubles match (the teammates can be lower than Level 50)
        plyr.experience.xp = 101333;
        plyr.level.num = 50;
        plyr.level.name = Levels.Gilded.name;
        plyr.experience.nextLevelAt = 111945;
        plyr.experience.remainingXP = (111945 - xp);
    } else if (xp >= 111945 && xp < 123660) {
        plyr.level.num = 51;
        plyr.experience.xp = 111945;
        plyr.level.name = Levels.Gilded.name;
        plyr.experience.nextLevelAt = 123660;
        plyr.experience.remainingXP = (123660 - xp);
    } else if (xp >= 123660 && xp < 136594) {
        plyr.level.num = 52;
        plyr.experience.xp = 123660;
        plyr.level.name = Levels.Gilded.name;
        plyr.experience.nextLevelAt = 136594;
        plyr.experience.remainingXP = (136594 - xp);
    } else if (xp >= 136594 && xp < 150872) {
        plyr.level.num = 53;
        plyr.experience.xp = 136594;
        plyr.level.name = Levels.Gilded.name;
        plyr.experience.nextLevelAt = 150872;
        plyr.experience.remainingXP = (150872 - xp);
    } else if (xp >= 150872 && xp < 166636) {
        plyr.level.num = 54;
        plyr.experience.xp = 150872;
        plyr.level.name = Levels.Gilded.name;
        plyr.experience.nextLevelAt = 166636;
        plyr.experience.remainingXP = (166636 - xp);
    } else if (xp >= 166636 && xp < 184040) {
        // Players can choose a Custom Stage to play on (MUST BE TOS LEGAL)
        plyr.experience.xp = 166636;
        plyr.level.num = 55;
        plyr.level.name = Levels.Gilded.name;
        plyr.experience.nextLevelAt = 184040;
        plyr.experience.remainingXP = (184040 - xp);
    } else if (xp >= 184040 && xp < 203254) {
        plyr.level.num = 56;
        plyr.experience.xp = 184040;
        plyr.level.name = Levels.GomuGomu.name;
        plyr.experience.nextLevelAt = 203254;
        plyr.experience.remainingXP = (203254 - xp);
    } else if (xp >= 203254 && xp < 224466) {
        plyr.level.num = 57;
        plyr.experience.xp = 203254;
        plyr.level.name = Levels.GomuGomu.name;
        plyr.experience.nextLevelAt = 224466;
        plyr.experience.remainingXP = (224466 - xp);
    } else if (xp >= 224466 && xp < 247886) {
        plyr.level.num = 58;
        plyr.experience.xp = 224466;
        plyr.level.name = Levels.GomuGomu.name;
        plyr.experience.nextLevelAt = 247886;
        plyr.experience.remainingXP = (247886 - xp);
    } else if (xp >= 247886 && xp < 273742) {
        plyr.level.num = 59;
        plyr.experience.xp = 247886;
        plyr.level.name = Levels.GomuGomu.name;
        plyr.experience.nextLevelAt = 273742;
        plyr.experience.remainingXP = (273742 - xp);
    } else if (xp >= 273742 && xp < 302288) {
        // Players can challenge others to a Ft5
        plyr.experience.xp = 273742;
        plyr.level.num = 60;
        plyr.level.name = Levels.DragonScimmy.name;
        plyr.experience.nextLevelAt = 302288;
        plyr.experience.remainingXP = (302288 - xp);
    } else if (xp >= 302288 && xp < 333804) {
        plyr.level.num = 61;
        plyr.experience.xp = 302288;
        plyr.level.name = Levels.DragonScimmy.name;
        plyr.experience.nextLevelAt = 333804;
        plyr.experience.remainingXP = (333804 - xp);
    } else if (xp >= 333804 && xp < 368599) {
        plyr.level.num = 62;
        plyr.experience.xp = 333804;
        plyr.level.name = Levels.DragonScimmy.name;
        plyr.experience.nextLevelAt = 368599;
        plyr.experience.remainingXP = (368599 - xp);
    } else if (xp >= 368599 && xp < 407015) {
        plyr.level.num = 63;
        plyr.experience.xp = 368599;
        plyr.level.name = Levels.DragonScimmy.name;
        plyr.experience.nextLevelAt = 407015;
        plyr.experience.remainingXP = (407015 - xp);
    } else if (xp >= 407015 && xp < 449428) {
        plyr.level.num = 64;
        plyr.experience.xp = 407015;
        plyr.level.name = Levels.DragonScimmy.name;
        plyr.experience.nextLevelAt = 449428;
        plyr.experience.remainingXP = (449428 - xp);
    } else if (xp >= 449428 && xp < 496254) {
        // Players no longer need to be Sub for Bo5's
        plyr.experience.xp = 449428;
        plyr.level.num = 65;
        plyr.level.name = Levels.DragonScimmy.name;
        plyr.experience.nextLevelAt = 496254;
        plyr.experience.remainingXP = (496254 - xp);
    } else if (xp >= 496254 && xp < 547953) {
        plyr.level.num = 66;
        plyr.experience.xp = 496254;
        plyr.level.name = Levels.DragonScimmy.name;
        plyr.experience.nextLevelAt = 547953;
        plyr.experience.remainingXP = (547953 - xp);
    } else if (xp >= 547953 && xp < 605032) {
        plyr.level.num = 67;
        plyr.experience.xp = 547953;
        plyr.level.name = Levels.DragonScimmy.name;
        plyr.experience.nextLevelAt = 605032;
        plyr.experience.remainingXP = (605032 - xp);
    } else if (xp >= 605032 && xp < 668051) {
        plyr.level.num = 68;
        plyr.experience.xp = 605032;
        plyr.level.name = Levels.DragonScimmy.name;
        plyr.experience.nextLevelAt = 668051;
        plyr.experience.remainingXP = (668051 - xp);
    } else if (xp >= 668051 && xp < 737627) {
        plyr.level.num = 69;
        plyr.experience.xp = 668051;
        plyr.level.name = Levels.DragonScimmy.name;
        plyr.experience.nextLevelAt = 737627;
        plyr.experience.remainingXP = (737627 - xp);
    } else if (xp >= 737627 && xp < 814445) {
        // Players name is entered into the Pot for the chance to be the Raid Boss (either yourself or an Amiibo) in a Coliseum Clash
        plyr.experience.xp = 737627;
        plyr.level.num = 70;
        plyr.level.name = Levels.Abyssal.name;
        plyr.experience.nextLevelAt = 814445;
        plyr.experience.remainingXP = (814445 - xp);
    } else if (xp >= 814445 && xp < 899257) {
        plyr.level.num = 71;
        plyr.experience.xp = 814445;
        plyr.level.name = Levels.Abyssal.name;
        plyr.experience.nextLevelAt = 899257;
        plyr.experience.remainingXP = (899257 - xp);
    } else if (xp >= 899257 && xp < 992895) {
        plyr.level.num = 72;
        plyr.experience.xp = 899257;
        plyr.level.name = Levels.Abyssal.name;
        plyr.experience.nextLevelAt = 992895;
        plyr.experience.remainingXP = (992895 - xp);
    } else if (xp >= 992895 && xp < 1096278) {
        plyr.level.num = 73;
        plyr.experience.xp = 992895;
        plyr.level.name = Levels.Monado.name;
        plyr.experience.nextLevelAt = 1096278;
        plyr.experience.remainingXP = (1096278 - xp);
    } else if (xp >= 1096278 && xp < 1210421) {
        plyr.level.num = 74;
        plyr.experience.xp = 1096278;
        plyr.level.name = Levels.Monado.name;
        plyr.experience.nextLevelAt = 1210421;
        plyr.experience.remainingXP = (1210421 - xp);
    } else if (xp >= 1210421 && xp < 1336443) {
        plyr.level.num = 75;
        plyr.experience.xp = 1210421;
        plyr.level.name = Levels.Blowpipe.name;
        plyr.experience.nextLevelAt = 1336443;
        plyr.experience.remainingXP = (1336443 - xp);
    } else if (xp >= 1336443 && xp < 1475581) {
        plyr.level.num = 76;
        plyr.experience.xp = 1336443;
        plyr.level.name = Levels.Blowpipe.name;
        plyr.experience.nextLevelAt = 1475581;
        plyr.experience.remainingXP = (1475581 - xp);
    } else if (xp >= 1475581 && xp < 1629200) {
        plyr.level.num = 77;
        plyr.experience.xp = 1475581;
        plyr.level.name = Levels.Blowpipe.name;
        plyr.experience.nextLevelAt = 1629200;
        plyr.experience.remainingXP = (1629200 - xp);
    } else if (xp >= 1629200 && xp < 1798808) {
        plyr.level.num = 78;
        plyr.experience.xp = 1629200;
        plyr.level.name = Levels.Incineroars.name;
        plyr.experience.nextLevelAt = 1798808;
        plyr.experience.remainingXP = (1798808 - xp);
    } else if (xp >= 1798808 && xp < 1986068) {
        plyr.level.num = 79;
        plyr.experience.xp = 1798808;
        plyr.level.name = Levels.Incineroars.name;
        plyr.experience.nextLevelAt = 1986068;
        plyr.experience.remainingXP = (1986068 - xp);
    } else if (xp >= 1986068 && xp < 2192818) {
        // Players can challenge others to a ft10
        plyr.experience.xp = 1986068;
        plyr.level.num = 80;
        plyr.level.name = Levels.DragonHunterCrossbow.name;
        plyr.experience.nextLevelAt = 2192818;
        plyr.experience.remainingXP = (2192818 - xp);
    } else if (xp >= 2192818 && xp < 2421087) {
        plyr.level.num = 81;
        plyr.experience.xp = 2192818;
        plyr.level.name = Levels.DragonHunterCrossbow.name;
        plyr.experience.nextLevelAt = 2421087;
        plyr.experience.remainingXP = (2421087 - xp);
    } else if (xp >= 2421087 && xp < 2673114) {
        plyr.level.num = 82;
        plyr.experience.xp = 2421087;
        plyr.level.name = Levels.Dharoks.name;
        plyr.experience.nextLevelAt = 2673114;
        plyr.experience.remainingXP = (2673114 - xp);
    } else if (xp >= 2673114 && xp < 2951373) {
        plyr.level.num = 83;
        plyr.experience.xp = 2673114;
        plyr.level.name = Levels.Dharoks.name;
        plyr.experience.nextLevelAt = 2951373;
        plyr.experience.remainingXP = (2951373 - xp);
    } else if (xp >= 2951373 && xp < 3258594) {
        plyr.level.num = 84;
        plyr.experience.xp = 2951373;
        plyr.level.name = Levels.Dharoks.name;
        plyr.experience.nextLevelAt = 3258594;
        plyr.experience.remainingXP = (3258594 - xp);
    } else if (xp >= 3258594 && xp < 3597792) {
        plyr.level.num = 85;
        plyr.experience.xp = 3258594;
        plyr.level.name = Levels.Kingdom.name;
        plyr.experience.nextLevelAt = 3597792;
        plyr.experience.remainingXP = (3597792 - xp);
    } else if (xp >= 3597792 && xp < 3972294) {
        plyr.level.num = 86;
        plyr.experience.xp = 3597792;
        plyr.level.name = Levels.Ghrazi.name;
        plyr.experience.nextLevelAt = 3972294;
        plyr.experience.remainingXP = (3972294 - xp);
    } else if (xp >= 3972294 && xp < 4385776) {
        plyr.level.num = 87;
        plyr.experience.xp = 3972294;
        plyr.level.name = Levels.Master.name;
        plyr.experience.nextLevelAt = 4385776;
        plyr.experience.remainingXP = (4385776 - xp);
    } else if (xp >= 4385776 && xp < 4842295) {
        plyr.level.num = 88;
        plyr.experience.xp = 4385776;
        plyr.level.name = Levels.Master.name;
        plyr.experience.nextLevelAt = 4842295;
        plyr.experience.remainingXP = (4842295 - xp);
    } else if (xp >= 4842295 && xp < 5346332) {
        plyr.level.num = 89;
        plyr.experience.xp = 4842295;
        plyr.level.name = Levels.Master.name;
        plyr.experience.nextLevelAt = 5346332;
        plyr.experience.remainingXP = (5346332 - xp);
    } else if (xp >= 5346332 && xp < 5902831) {
        // Players can have Kay create an emote of their design for the Discord/Twitch
        plyr.experience.xp = 5346332;
        plyr.level.num = 90;
        plyr.level.name = Levels.Twisted.name;
        plyr.experience.nextLevelAt = 5902831;
        plyr.experience.remainingXP = (5902831 - xp);
    } else if (xp >= 5902831 && xp < 6517253) {
        plyr.level.num = 91;
        plyr.experience.xp = 5902831;
        plyr.level.name = Levels.Energy.name;
        plyr.experience.nextLevelAt = 6517253;
        plyr.experience.remainingXP = (6517253 - xp);
    } else if (xp >= 6517253 && xp < 7195629) {
        // Players can choose the character and fill in the blank => '"_____" Only Hats Off!'
        plyr.experience.xp = 6517253;
        plyr.level.num = 92;
        plyr.level.name = Levels.DragonSlayer.name;
        plyr.experience.nextLevelAt = 7195629;
        plyr.experience.remainingXP = (7195629 - xp);
    } else if (xp >= 7195629 && xp < 7944614) {
        plyr.level.num = 93;
        plyr.experience.xp = 7195629;
        plyr.level.name = Levels.DragonSlayer.name;
        plyr.experience.nextLevelAt = 7944614;
        plyr.experience.remainingXP = (7944614 - xp);
    } else if (xp >= 7944614 && xp < 8771558) {
        plyr.level.num = 94;
        plyr.experience.xp = 7944614;
        plyr.level.name = Levels.Oblivion.name;
        plyr.experience.nextLevelAt = 8771558;
        plyr.experience.remainingXP = (8771558 - xp);
    } else if (xp >= 8771558 && xp < 9684577) {
        plyr.level.num = 95;
        plyr.experience.xp = 8771558;
        plyr.level.name = Levels.Blaster.name;
        plyr.experience.nextLevelAt = 9684577;
        plyr.experience.remainingXP = (9684577 - xp);
    } else if (xp >= 9684577 && xp < 10692629) {
        plyr.level.num = 96;
        plyr.experience.xp = 9684577;
        plyr.level.name = Levels.Boxing.name;
        plyr.experience.nextLevelAt = 10692629;
        plyr.experience.remainingXP = (10692629 - xp);
    } else if (xp >= 10692629 && xp < 11805606) {
        plyr.level.num = 97;
        plyr.experience.xp = 10692629;
        plyr.level.name = Levels.Fish.name;
        plyr.experience.nextLevelAt = 11805606;
        plyr.experience.remainingXP = (11805606 - xp);
    } else if (xp >= 11805606 && xp < 13034431) {
        plyr.level.num = 98;
        plyr.experience.xp = 11805606;
        plyr.level.name = Levels.Golden.name;
        plyr.experience.nextLevelAt = 13034431;
        plyr.experience.remainingXP = (13034431 - xp);
    } else if (xp >= 13034431) {
        // Players can get a t-shirt from Creative Workshop
        plyr.experience.xp = 13034431;
        plyr.level.num = 99;
        plyr.level.name = Levels.Top.name;
        plyr.experience.nextLevelAt = 999999999;
        plyr.experience.remainingXP = (999999999 - xp);
    }

    return plyr as Player;
}

export const calcLevelFromExperience = (xp) => {
    let level: Level = { num: 0, name: `` };
    let experience: Experience = { xp: 0, arenaXP: xp, nextLevelAt: 0, remainingXP: 0 };
    if (xp < 83) {
        level.num = 1;
        experience.xp = 0;
        experience.nextLevelAt = 83;
        level.name = Levels.Bronze.name;
        experience.remainingXP = 83;
    } else if (xp >= 83 && xp < 174) {
        level.num = 2;
        experience.xp = 83;
        level.name = Levels.Bronze.name;
        experience.nextLevelAt = 174;
        experience.remainingXP = (174 - xp);
    } else if (xp >= 174 && xp < 276) {
        level.num = 3;
        experience.xp = 174;
        level.name = Levels.Bronze.name;
        experience.nextLevelAt = 276;
        experience.remainingXP = (276 - xp);
    } else if (xp >= 276 && xp < 388) {
        level.num = 4;
        experience.xp = 276;
        level.name = Levels.Bronze.name;
        experience.nextLevelAt = 388;
        experience.remainingXP = (388 - xp);
    } else if (xp >= 388 && xp < 512) {
        level.num = 5;
        experience.xp = 388;
        level.name = Levels.Diddys.name;
        experience.nextLevelAt = 512;
        experience.remainingXP = (512 - xp);
    } else if (xp >= 512 && xp < 650) {
        level.num = 6;
        experience.xp = 512;
        level.name = Levels.Diddys.name;
        experience.nextLevelAt = 650;
        experience.remainingXP = (650 - xp);
    } else if (xp >= 650 && xp < 801) {
        level.num = 7;
        experience.xp = 650;
        level.name = Levels.Diddys.name;
        experience.nextLevelAt = 801;
        experience.remainingXP = (801 - xp);
    } else if (xp >= 801 && xp < 969) {
        level.num = 8;
        experience.xp = 801;
        level.name = Levels.Diddys.name;
        experience.nextLevelAt = 969;
        experience.remainingXP = (969 - xp);
    } else if (xp >= 969 && xp < 1154) {
        level.num = 9;
        experience.xp = 969;
        level.name = Levels.Diddys.name;
        experience.nextLevelAt = 1154;
        experience.remainingXP = (1154 - xp);
    } else if (xp >= 1154 && xp < 1358) {
        level.num = 10;
        experience.xp = 1154;
        level.name = Levels.Iron.name;
        experience.nextLevelAt = 1358;
        experience.remainingXP = (1358 - xp);
    } else if (xp >= 1358 && xp < 1584) {
        level.num = 11;
        experience.xp = 1358;
        level.name = Levels.Iron.name;
        experience.nextLevelAt = 1584;
        experience.remainingXP = (1584 - xp);
    } else if (xp >= 1584 && xp < 1833) {
        level.num = 12;
        experience.xp = 1584;
        level.name = Levels.Iron.name;
        experience.nextLevelAt = 1833;
        experience.remainingXP = (1833 - xp);
    } else if (xp >= 1833 && xp < 2107) {
        level.num = 13;
        experience.xp = 1833;
        level.name = Levels.Iron.name;
        experience.nextLevelAt = 2107;
        experience.remainingXP = (2107 - xp);
    } else if (xp >= 2107 && xp < 2411) {
        level.num = 14;
        experience.xp = 2107;
        level.name = Levels.Iron.name;
        experience.nextLevelAt = 2411;
        experience.remainingXP = (2411 - xp);
    } else if (xp >= 2411 && xp < 2746) {
        level.num = 15;
        experience.xp = 2411;
        level.name = Levels.Steel.name;
        experience.nextLevelAt = 2746;
        experience.remainingXP = (2746 - xp);
    } else if (xp >= 2746 && xp < 3115) {
        level.num = 16;
        experience.xp = 2746;
        level.name = Levels.Steel.name;
        experience.nextLevelAt = 3115;
        experience.remainingXP = (3115 - xp);
    } else if (xp >= 3115 && xp < 3523) {
        level.num = 17;
        experience.xp = 3115;
        level.name = Levels.Steel.name;
        experience.nextLevelAt = 3523;
        experience.remainingXP = (3523 - xp);
    } else if (xp >= 3523 && xp < 3973) {
        level.num = 18;
        experience.xp = 3523;
        level.name = Levels.Steel.name;
        experience.nextLevelAt = 3973;
        experience.remainingXP = (3973 - xp);
    } else if (xp >= 3973 && xp < 4470) {
        level.num = 19;
        experience.xp = 3973;
        level.name = Levels.Steel.name;
        experience.nextLevelAt = 4470;
        experience.remainingXP = (4470 - xp);
    } else if (xp >= 4470 && xp < 5018) {
        level.num = 20;
        experience.xp = 4470;
        level.name = Levels.Mithril.name;
        experience.nextLevelAt = 5018;
        experience.remainingXP = (5018 - xp);
    } else if (xp >= 5018 && xp < 5624) {
        level.num = 21;
        experience.xp = 5018;
        level.name = Levels.Mithril.name;
        experience.nextLevelAt = 5624;
        experience.remainingXP = (5624 - xp);
    } else if (xp >= 5624 && xp < 6291) {
        level.num = 22;
        experience.xp = 5624;
        level.name = Levels.Mithril.name;
        experience.nextLevelAt = 6291;
        experience.remainingXP = (6291 - xp);
    } else if (xp >= 6291 && xp < 7028) {
        level.num = 23;
        experience.xp = 6291;
        level.name = Levels.Mithril.name;
        experience.nextLevelAt = 7028;
        experience.remainingXP = (7028 - xp);
    } else if (xp >= 7028 && xp < 7842) {
        level.num = 24;
        experience.xp = 7028;
        level.name = Levels.Mithril.name;
        experience.nextLevelAt = 7842;
        experience.remainingXP = (7842 - xp);
    } else if (xp >= 7842 && xp < 8740) {
        level.num = 25;
        experience.xp = 7842;
        level.name = Levels.Mushroom.name;
        experience.nextLevelAt = 8740;
        experience.remainingXP = (8740 - xp);
    } else if (xp >= 8740 && xp < 9730) {
        level.num = 26;
        experience.xp = 8740;
        level.name = Levels.Mushroom.name;
        experience.nextLevelAt = 9730;
        experience.remainingXP = (9730 - xp);
    } else if (xp >= 9730 && xp < 10824) {
        level.num = 27;
        experience.xp = 9730;
        level.name = Levels.Mushroom.name;
        experience.nextLevelAt = 10824;
        experience.remainingXP = (10824 - xp);
    } else if (xp >= 10824 && xp < 12031) {
        level.num = 28;
        experience.xp = 10824;
        level.name = Levels.Mushroom.name;
        experience.nextLevelAt = 12031;
        experience.remainingXP = (12031 - xp);
    } else if (xp >= 12031 && xp < 13363) {
        level.num = 29;
        experience.xp = 12031;
        level.name = Levels.Mushroom.name;
        experience.nextLevelAt = 13363;
        experience.remainingXP = (13363 - xp);
    } else if (xp >= 13363 && xp < 14833) {
        // Players can challenge others to a bot3
        experience.xp = 13363;
        level.num = 30;
        level.name = Levels.Adamantite.name;
        experience.nextLevelAt = 14833;
        experience.remainingXP = (14833 - xp);
    } else if (xp >= 14833 && xp < 16456) {
        level.num = 31;
        experience.xp = 14833;
        level.name = Levels.Adamantite.name;
        experience.nextLevelAt = 16456;
        experience.remainingXP = (16456 - xp);
    } else if (xp >= 16456 && xp < 18247) {
        level.num = 32;
        experience.xp = 16456;
        level.name = Levels.Adamantite.name;
        experience.nextLevelAt = 18247;
        experience.remainingXP = (18247 - xp);
    } else if (xp >= 18247 && xp < 20224) {
        level.num = 33;
        experience.xp = 18247;
        level.name = Levels.Adamantite.name;
        experience.nextLevelAt = 20224;
        experience.remainingXP = (20224 - xp);
    } else if (xp >= 20224 && xp < 22406) {
        level.num = 34;
        experience.xp = 20224;
        level.name = Levels.Adamantite.name;
        experience.nextLevelAt = 22406;
        experience.remainingXP = (22406 - xp);
    } else if (xp >= 22406 && xp < 24815) {
        // Players can choose a non-tourney legal stage to play on
        experience.xp = 22406;
        level.num = 35;
        level.name = Levels.Adamantite.name;
        experience.nextLevelAt = 24815;
        experience.remainingXP = (24815 - xp);
    } else if (xp >= 24815 && xp < 27473) {
        level.num = 36;
        experience.xp = 24815;
        level.name = Levels.Adamantite.name;
        experience.nextLevelAt = 27473;
        experience.remainingXP = (27473 - xp);
    } else if (xp >= 27473 && xp < 30408) {
        level.num = 37;
        experience.xp = 27473;
        level.name = Levels.Adamantite.name;
        experience.nextLevelAt = 30408;
        experience.remainingXP = (30408 - xp);
    } else if (xp >= 30408 && xp < 33648) {
        level.num = 38;
        experience.xp = 30408;
        level.name = Levels.Adamantite.name;
        experience.nextLevelAt = 33648;
        experience.remainingXP = (33648 - xp);
    } else if (xp >= 33648 && xp < 37224) {
        level.num = 39;
        experience.xp = 33648;
        level.name = Levels.Adamantite.name;
        experience.nextLevelAt = 37224;
        experience.remainingXP = (37224 - xp);
    } else if (xp >= 37224 && xp < 41171) {
        // Players can challenge others to a Bo5
        experience.xp = 37224;
        level.num = 40;
        level.name = Levels.Rune.name;
        experience.nextLevelAt = 41171;
        experience.remainingXP = (41171 - xp);
    } else if (xp >= 41171 && xp < 45529) {
        level.num = 41;
        experience.xp = 41171;
        level.name = Levels.Rune.name;
        experience.nextLevelAt = 45529;
        experience.remainingXP = (45529 - xp);
    } else if (xp >= 45529 && xp < 50339) {
        level.num = 42;
        experience.xp = 45529;
        level.name = Levels.Rune.name;
        experience.nextLevelAt = 50339;
        experience.remainingXP = (50339 - xp);
    } else if (xp >= 50339 && xp < 55649) {
        level.num = 43;
        experience.xp = 50339;
        level.name = Levels.Rune.name;
        experience.nextLevelAt = 55649;
        experience.remainingXP = (55649 - xp);
    } else if (xp >= 55649 && xp < 61512) {
        level.num = 44;
        experience.xp = 55649;
        level.name = Levels.Rune.name;
        experience.nextLevelAt = 61512;
        experience.remainingXP = (61512 - xp);
    } else if (xp >= 61512 && xp < 67983) {
        level.num = 45;
        experience.xp = 61512;
        level.name = Levels.Rune.name;
        experience.nextLevelAt = 67983;
        experience.remainingXP = (67983 - xp);
    } else if (xp >= 67983 && xp < 75127) {
        level.num = 46;
        experience.xp = 67983;
        level.name = Levels.Rune.name;
        experience.nextLevelAt = 75127;
        experience.remainingXP = (75127 - xp);
    } else if (xp >= 75127 && xp < 83014) {
        level.num = 47;
        experience.xp = 75127;
        level.name = Levels.Rune.name;
        experience.nextLevelAt = 83014;
        experience.remainingXP = (83014 - xp);
    } else if (xp >= 83014 && xp < 91721) {
        level.num = 48;
        experience.xp = 83014;
        level.name = Levels.Rune.name;
        experience.nextLevelAt = 91721;
        experience.remainingXP = (91721 - xp);
    } else if (xp >= 91721 && xp < 101333) {
        level.num = 49;
        experience.xp = 91721;
        level.name = Levels.Rune.name;
        experience.nextLevelAt = 101333;
        experience.remainingXP = (101333 - xp);
    } else if (xp >= 101333 && xp < 111945) {
        // Players can choose another level 50 Player and Challenge them to a Doubles match (the teammates can be lower than Level 50)
        experience.xp = 101333;
        level.num = 50;
        level.name = Levels.Gilded.name;
        experience.nextLevelAt = 111945;
        experience.remainingXP = (111945 - xp);
    } else if (xp >= 111945 && xp < 123660) {
        level.num = 51;
        experience.xp = 111945;
        level.name = Levels.Gilded.name;
        experience.nextLevelAt = 123660;
        experience.remainingXP = (123660 - xp);
    } else if (xp >= 123660 && xp < 136594) {
        level.num = 52;
        experience.xp = 123660;
        level.name = Levels.Gilded.name;
        experience.nextLevelAt = 136594;
        experience.remainingXP = (136594 - xp);
    } else if (xp >= 136594 && xp < 150872) {
        level.num = 53;
        experience.xp = 136594;
        level.name = Levels.Gilded.name;
        experience.nextLevelAt = 150872;
        experience.remainingXP = (150872 - xp);
    } else if (xp >= 150872 && xp < 166636) {
        level.num = 54;
        experience.xp = 150872;
        level.name = Levels.Gilded.name;
        experience.nextLevelAt = 166636;
        experience.remainingXP = (166636 - xp);
    } else if (xp >= 166636 && xp < 184040) {
        // Players can choose a Custom Stage to play on (MUST BE TOS LEGAL)
        experience.xp = 166636;
        level.num = 55;
        level.name = Levels.Gilded.name;
        experience.nextLevelAt = 184040;
        experience.remainingXP = (184040 - xp);
    } else if (xp >= 184040 && xp < 203254) {
        level.num = 56;
        experience.xp = 184040;
        level.name = Levels.GomuGomu.name;
        experience.nextLevelAt = 203254;
        experience.remainingXP = (203254 - xp);
    } else if (xp >= 203254 && xp < 224466) {
        level.num = 57;
        experience.xp = 203254;
        level.name = Levels.GomuGomu.name;
        experience.nextLevelAt = 224466;
        experience.remainingXP = (224466 - xp);
    } else if (xp >= 224466 && xp < 247886) {
        level.num = 58;
        experience.xp = 224466;
        level.name = Levels.GomuGomu.name;
        experience.nextLevelAt = 247886;
        experience.remainingXP = (247886 - xp);
    } else if (xp >= 247886 && xp < 273742) {
        level.num = 59;
        experience.xp = 247886;
        level.name = Levels.GomuGomu.name;
        experience.nextLevelAt = 273742;
        experience.remainingXP = (273742 - xp);
    } else if (xp >= 273742 && xp < 302288) {
        // Players can challenge others to a Ft5
        experience.xp = 273742;
        level.num = 60;
        level.name = Levels.DragonScimmy.name;
        experience.nextLevelAt = 302288;
        experience.remainingXP = (302288 - xp);
    } else if (xp >= 302288 && xp < 333804) {
        level.num = 61;
        experience.xp = 302288;
        level.name = Levels.DragonScimmy.name;
        experience.nextLevelAt = 333804;
        experience.remainingXP = (333804 - xp);
    } else if (xp >= 333804 && xp < 368599) {
        level.num = 62;
        experience.xp = 333804;
        level.name = Levels.DragonScimmy.name;
        experience.nextLevelAt = 368599;
        experience.remainingXP = (368599 - xp);
    } else if (xp >= 368599 && xp < 407015) {
        level.num = 63;
        experience.xp = 368599;
        level.name = Levels.DragonScimmy.name;
        experience.nextLevelAt = 407015;
        experience.remainingXP = (407015 - xp);
    } else if (xp >= 407015 && xp < 449428) {
        level.num = 64;
        experience.xp = 407015;
        level.name = Levels.DragonScimmy.name;
        experience.nextLevelAt = 449428;
        experience.remainingXP = (449428 - xp);
    } else if (xp >= 449428 && xp < 496254) {
        // Players no longer need to be Sub for Bo5's
        experience.xp = 449428;
        level.num = 65;
        level.name = Levels.DragonScimmy.name;
        experience.nextLevelAt = 496254;
        experience.remainingXP = (496254 - xp);
    } else if (xp >= 496254 && xp < 547953) {
        level.num = 66;
        experience.xp = 496254;
        level.name = Levels.DragonScimmy.name;
        experience.nextLevelAt = 547953;
        experience.remainingXP = (547953 - xp);
    } else if (xp >= 547953 && xp < 605032) {
        level.num = 67;
        experience.xp = 547953;
        level.name = Levels.DragonScimmy.name;
        experience.nextLevelAt = 605032;
        experience.remainingXP = (605032 - xp);
    } else if (xp >= 605032 && xp < 668051) {
        level.num = 68;
        experience.xp = 605032;
        level.name = Levels.DragonScimmy.name;
        experience.nextLevelAt = 668051;
        experience.remainingXP = (668051 - xp);
    } else if (xp >= 668051 && xp < 737627) {
        level.num = 69;
        experience.xp = 668051;
        level.name = Levels.DragonScimmy.name;
        experience.nextLevelAt = 737627;
        experience.remainingXP = (737627 - xp);
    } else if (xp >= 737627 && xp < 814445) {
        // Players name is entered into the Pot for the chance to be the Raid Boss (either yourself or an Amiibo) in a Coliseum Clash
        experience.xp = 737627;
        level.num = 70;
        level.name = Levels.Abyssal.name;
        experience.nextLevelAt = 814445;
        experience.remainingXP = (814445 - xp);
    } else if (xp >= 814445 && xp < 899257) {
        level.num = 71;
        experience.xp = 814445;
        level.name = Levels.Abyssal.name;
        experience.nextLevelAt = 899257;
        experience.remainingXP = (899257 - xp);
    } else if (xp >= 899257 && xp < 992895) {
        level.num = 72;
        experience.xp = 899257;
        level.name = Levels.Abyssal.name;
        experience.nextLevelAt = 992895;
        experience.remainingXP = (992895 - xp);
    } else if (xp >= 992895 && xp < 1096278) {
        level.num = 73;
        experience.xp = 992895;
        level.name = Levels.Monado.name;
        experience.nextLevelAt = 1096278;
        experience.remainingXP = (1096278 - xp);
    } else if (xp >= 1096278 && xp < 1210421) {
        level.num = 74;
        experience.xp = 1096278;
        level.name = Levels.Monado.name;
        experience.nextLevelAt = 1210421;
        experience.remainingXP = (1210421 - xp);
    } else if (xp >= 1210421 && xp < 1336443) {
        level.num = 75;
        experience.xp = 1210421;
        level.name = Levels.Blowpipe.name;
        experience.nextLevelAt = 1336443;
        experience.remainingXP = (1336443 - xp);
    } else if (xp >= 1336443 && xp < 1475581) {
        level.num = 76;
        experience.xp = 1336443;
        level.name = Levels.Blowpipe.name;
        experience.nextLevelAt = 1475581;
        experience.remainingXP = (1475581 - xp);
    } else if (xp >= 1475581 && xp < 1629200) {
        level.num = 77;
        experience.xp = 1475581;
        level.name = Levels.Blowpipe.name;
        experience.nextLevelAt = 1629200;
        experience.remainingXP = (1629200 - xp);
    } else if (xp >= 1629200 && xp < 1798808) {
        level.num = 78;
        experience.xp = 1629200;
        level.name = Levels.Incineroars.name;
        experience.nextLevelAt = 1798808;
        experience.remainingXP = (1798808 - xp);
    } else if (xp >= 1798808 && xp < 1986068) {
        level.num = 79;
        experience.xp = 1798808;
        level.name = Levels.Incineroars.name;
        experience.nextLevelAt = 1986068;
        experience.remainingXP = (1986068 - xp);
    } else if (xp >= 1986068 && xp < 2192818) {
        // Players can challenge others to a ft10
        experience.xp = 1986068;
        level.num = 80;
        level.name = Levels.DragonHunterCrossbow.name;
        experience.nextLevelAt = 2192818;
        experience.remainingXP = (2192818 - xp);
    } else if (xp >= 2192818 && xp < 2421087) {
        level.num = 81;
        experience.xp = 2192818;
        level.name = Levels.DragonHunterCrossbow.name;
        experience.nextLevelAt = 2421087;
        experience.remainingXP = (2421087 - xp);
    } else if (xp >= 2421087 && xp < 2673114) {
        level.num = 82;
        experience.xp = 2421087;
        level.name = Levels.Dharoks.name;
        experience.nextLevelAt = 2673114;
        experience.remainingXP = (2673114 - xp);
    } else if (xp >= 2673114 && xp < 2951373) {
        level.num = 83;
        experience.xp = 2673114;
        level.name = Levels.Dharoks.name;
        experience.nextLevelAt = 2951373;
        experience.remainingXP = (2951373 - xp);
    } else if (xp >= 2951373 && xp < 3258594) {
        level.num = 84;
        experience.xp = 2951373;
        level.name = Levels.Dharoks.name;
        experience.nextLevelAt = 3258594;
        experience.remainingXP = (3258594 - xp);
    } else if (xp >= 3258594 && xp < 3597792) {
        level.num = 85;
        experience.xp = 3258594;
        level.name = Levels.Kingdom.name;
        experience.nextLevelAt = 3597792;
        experience.remainingXP = (3597792 - xp);
    } else if (xp >= 3597792 && xp < 3972294) {
        level.num = 86;
        experience.xp = 3597792;
        level.name = Levels.Ghrazi.name;
        experience.nextLevelAt = 3972294;
        experience.remainingXP = (3972294 - xp);
    } else if (xp >= 3972294 && xp < 4385776) {
        level.num = 87;
        experience.xp = 3972294;
        level.name = Levels.Master.name;
        experience.nextLevelAt = 4385776;
        experience.remainingXP = (4385776 - xp);
    } else if (xp >= 4385776 && xp < 4842295) {
        level.num = 88;
        experience.xp = 4385776;
        level.name = Levels.Master.name;
        experience.nextLevelAt = 4842295;
        experience.remainingXP = (4842295 - xp);
    } else if (xp >= 4842295 && xp < 5346332) {
        level.num = 89;
        experience.xp = 4842295;
        level.name = Levels.Master.name;
        experience.nextLevelAt = 5346332;
        experience.remainingXP = (5346332 - xp);
    } else if (xp >= 5346332 && xp < 5902831) {
        // Players can have Kay create an emote of their design for the Discord/Twitch
        experience.xp = 5346332;
        level.num = 90;
        level.name = Levels.Twisted.name;
        experience.nextLevelAt = 5902831;
        experience.remainingXP = (5902831 - xp);
    } else if (xp >= 5902831 && xp < 6517253) {
        level.num = 91;
        experience.xp = 5902831;
        level.name = Levels.Energy.name;
        experience.nextLevelAt = 6517253;
        experience.remainingXP = (6517253 - xp);
    } else if (xp >= 6517253 && xp < 7195629) {
        // Players can choose the character and fill in the blank => '"_____" Only Hats Off!'
        experience.xp = 6517253;
        level.num = 92;
        level.name = Levels.DragonSlayer.name;
        experience.nextLevelAt = 7195629;
        experience.remainingXP = (7195629 - xp);
    } else if (xp >= 7195629 && xp < 7944614) {
        level.num = 93;
        experience.xp = 7195629;
        level.name = Levels.DragonSlayer.name;
        experience.nextLevelAt = 7944614;
        experience.remainingXP = (7944614 - xp);
    } else if (xp >= 7944614 && xp < 8771558) {
        level.num = 94;
        experience.xp = 7944614;
        level.name = Levels.Oblivion.name;
        experience.nextLevelAt = 8771558;
        experience.remainingXP = (8771558 - xp);
    } else if (xp >= 8771558 && xp < 9684577) {
        level.num = 95;
        experience.xp = 8771558;
        level.name = Levels.Blaster.name;
        experience.nextLevelAt = 9684577;
        experience.remainingXP = (9684577 - xp);
    } else if (xp >= 9684577 && xp < 10692629) {
        level.num = 96;
        experience.xp = 9684577;
        level.name = Levels.Boxing.name;
        experience.nextLevelAt = 10692629;
        experience.remainingXP = (10692629 - xp);
    } else if (xp >= 10692629 && xp < 11805606) {
        level.num = 97;
        experience.xp = 10692629;
        level.name = Levels.Fish.name;
        experience.nextLevelAt = 11805606;
        experience.remainingXP = (11805606 - xp);
    } else if (xp >= 11805606 && xp < 13034431) {
        level.num = 98;
        experience.xp = 11805606;
        level.name = Levels.Golden.name;
        experience.nextLevelAt = 13034431;
        experience.remainingXP = (13034431 - xp);
    } else if (xp >= 13034431) {
        // Players can get a t-shirt from Creative Workshop
        experience.xp = 13034431;
        level.num = 99;
        level.name = Levels.Top.name;
        experience.nextLevelAt = 999999999;
        experience.remainingXP = (999999999 - xp);
    }

    return {
        xp,
        level,
        experience
    }
}

export const calcLevelFromNumber = (levelNumber) => {
    let level: Level = { num: 0, name: `` };
    let experience: Experience = { xp: 0, arenaXP: 0, nextLevelAt: 0, remainingXP: 0 };
    if (levelNumber == 1) {
        level.num = 1;
        experience.xp = 0;
        experience.arenaXP = 0;
        experience.nextLevelAt = 83;
        level.name = Levels.Bronze.name;
        experience.remainingXP = 83;
    } else if (levelNumber == 2) {
        level.num = 2;
        experience.xp = 83;
        experience.arenaXP = 83;
        level.name = Levels.Bronze.name;
        experience.nextLevelAt = 174;
        experience.remainingXP = (174 - 83);
    } else if (levelNumber == 3) {
        level.num = 3;
        experience.xp = 174;
        experience.arenaXP = 174;
        level.name = Levels.Bronze.name;
        experience.nextLevelAt = 276;
        experience.remainingXP = (276 - 174);
    } else if (levelNumber == 4) {
        level.num = 4;
        experience.xp = 276;
        experience.arenaXP = 276;
        level.name = Levels.Bronze.name;
        experience.nextLevelAt = 388;
        experience.remainingXP = (388 - 276);
    } else if (levelNumber == 5) {
        level.num = 5;
        experience.xp = 388;
        experience.arenaXP = 388;
        level.name = Levels.Diddys.name;
        experience.nextLevelAt = 512;
        experience.remainingXP = (512 - 388);
    } else if (levelNumber == 6) {
        level.num = 6;
        experience.xp = 512;
        experience.arenaXP = 512;
        level.name = Levels.Diddys.name;
        experience.nextLevelAt = 650;
        experience.remainingXP = (650 - 512);
    } else if (levelNumber == 7) {
        level.num = 7;
        experience.xp = 650;
        experience.arenaXP = 650;
        level.name = Levels.Diddys.name;
        experience.nextLevelAt = 801;
        experience.remainingXP = (801 - 650);
    } else if (levelNumber == 8) {
        level.num = 8;
        experience.xp = 801;
        experience.arenaXP = 801;
        level.name = Levels.Diddys.name;
        experience.nextLevelAt = 969;
        experience.remainingXP = (969 - 801);
    } else if (levelNumber == 9) {
        level.num = 9;
        experience.xp = 969;
        experience.arenaXP = 969;
        level.name = Levels.Diddys.name;
        experience.nextLevelAt = 1154;
        experience.remainingXP = (1154 - 969);
    } else if (levelNumber == 10) {
        level.num = 10;
        experience.xp = 1154;
        experience.arenaXP = 1154;
        level.name = Levels.Iron.name;
        experience.nextLevelAt = 1358;
        experience.remainingXP = (1358 - 1154);
    } else if (levelNumber == 11) {
        level.num = 11;
        experience.xp = 1358;
        experience.arenaXP = 1358;
        level.name = Levels.Iron.name;
        experience.nextLevelAt = 1584;
        experience.remainingXP = (1584 - 1358);
    } else if (levelNumber == 12) {
        level.num = 12;
        experience.xp = 1584;
        experience.arenaXP = 1584;
        level.name = Levels.Iron.name;
        experience.nextLevelAt = 1833;
        experience.remainingXP = (1833 - 1584);
    } else if (levelNumber == 13) {
        level.num = 13;
        experience.xp = 1833;
        experience.arenaXP = 1833;
        level.name = Levels.Iron.name;
        experience.nextLevelAt = 2107;
        experience.remainingXP = (2107 - 1833);
    } else if (levelNumber == 14) {
        level.num = 14;
        experience.xp = 2107;
        experience.arenaXP = 2107;
        level.name = Levels.Iron.name;
        experience.nextLevelAt = 2411;
        experience.remainingXP = (2411 - 2107);
    } else if (levelNumber == 15) {
        level.num = 15;
        experience.xp = 2411;
        experience.arenaXP = 2411;
        level.name = Levels.Steel.name;
        experience.nextLevelAt = 2746;
        experience.remainingXP = (2746 - 2411);
    } else if (levelNumber == 16) {
        level.num = 16;
        experience.xp = 2746;
        experience.arenaXP = 2746;
        level.name = Levels.Steel.name;
        experience.nextLevelAt = 3115;
        experience.remainingXP = (3115 - 2746);
    } else if (levelNumber == 17) {
        level.num = 17;
        experience.xp = 3115;
        experience.arenaXP = 3115;
        level.name = Levels.Steel.name;
        experience.nextLevelAt = 3523;
        experience.remainingXP = (3523 - 3115);
    } else if (levelNumber == 18) {
        level.num = 18;
        experience.xp = 3523;
        experience.arenaXP = 3523;
        level.name = Levels.Steel.name;
        experience.nextLevelAt = 3973;
        experience.remainingXP = (3973 - 3523);
    } else if (levelNumber == 19) {
        level.num = 19;
        experience.xp = 3973;
        experience.arenaXP = 3973;
        level.name = Levels.Steel.name;
        experience.nextLevelAt = 4470;
        experience.remainingXP = (4470 - 3973);
    } else if (levelNumber == 20) {
        level.num = 20;
        experience.xp = 4470;
        experience.arenaXP = 4470;
        level.name = Levels.Mithril.name;
        experience.nextLevelAt = 5018;
        experience.remainingXP = (5018 - 4470);
    } else if (levelNumber == 21) {
        level.num = 21;
        experience.xp = 5018;
        experience.arenaXP = 5018;
        level.name = Levels.Mithril.name;
        experience.nextLevelAt = 5624;
        experience.remainingXP = (5624 - 5018);
    } else if (levelNumber == 22) {
        level.num = 22;
        experience.xp = 5624;
        experience.arenaXP = 5624;
        level.name = Levels.Mithril.name;
        experience.nextLevelAt = 6291;
        experience.remainingXP = (6291 - 5624);
    } else if (levelNumber == 23) {
        level.num = 23;
        experience.xp = 6291;
        experience.arenaXP = 6291;
        level.name = Levels.Mithril.name;
        experience.nextLevelAt = 7028;
        experience.remainingXP = (7028 - 6291);
    } else if (levelNumber == 24) {
        level.num = 24;
        experience.xp = 7028;
        experience.arenaXP = 7028;
        level.name = Levels.Mithril.name;
        experience.nextLevelAt = 7842;
        experience.remainingXP = (7842 - 7028);
    } else if (levelNumber == 25) {
        level.num = 25;
        experience.xp = 7842;
        experience.arenaXP = 7842;
        level.name = Levels.Mushroom.name;
        experience.nextLevelAt = 8740;
        experience.remainingXP = (8740 - 7842);
    } else if (levelNumber == 26) {
        level.num = 26;
        experience.xp = 8740;
        experience.arenaXP = 8740;
        level.name = Levels.Mushroom.name;
        experience.nextLevelAt = 9730;
        experience.remainingXP = (9730 - 8740);
    } else if (levelNumber == 27) {
        level.num = 27;
        experience.xp = 9730;
        experience.arenaXP = 9730;
        level.name = Levels.Mushroom.name;
        experience.nextLevelAt = 10824;
        experience.remainingXP = (10824 - 9730);
    } else if (levelNumber == 28) {
        level.num = 28;
        experience.xp = 10824;
        experience.arenaXP = 10824;
        level.name = Levels.Mushroom.name;
        experience.nextLevelAt = 12031;
        experience.remainingXP = (12031 - 10824);
    } else if (levelNumber == 29) {
        level.num = 29;
        experience.xp = 12031;
        experience.arenaXP = 12031;
        level.name = Levels.Mushroom.name;
        experience.nextLevelAt = 13363;
        experience.remainingXP = (13363 - 12031);
    } else if (levelNumber == 30) {
        level.num = 30;
        experience.xp = 13363;
        experience.arenaXP = 13363;
        level.name = Levels.Adamantite.name;
        experience.nextLevelAt = 14833;
        experience.remainingXP = (14833 - 13363);
        // Players can challenge others to a bot3
    } else if (levelNumber == 31) {
        level.num = 31;
        experience.xp = 14833;
        experience.arenaXP = 14833;
        level.name = Levels.Adamantite.name;
        experience.nextLevelAt = 16456;
        experience.remainingXP = (16456 - 14833);
    } else if (levelNumber == 32) {
        level.num = 32;
        experience.xp = 16456;
        experience.arenaXP = 16456;
        level.name = Levels.Adamantite.name;
        experience.nextLevelAt = 18247;
        experience.remainingXP = (18247 - 16456);
    } else if (levelNumber == 33) {
        level.num = 33;
        experience.xp = 18247;
        experience.arenaXP = 18247;
        level.name = Levels.Adamantite.name;
        experience.nextLevelAt = 20224;
        experience.remainingXP = (20224 - 18247);
    } else if (levelNumber == 34) {
        level.num = 34;
        experience.xp = 20224;
        experience.arenaXP = 20224;
        level.name = Levels.Adamantite.name;
        experience.nextLevelAt = 22406;
        experience.remainingXP = (22406 - 20224);
    } else if (levelNumber == 35) {
        level.num = 35;
        experience.xp = 22406;
        experience.arenaXP = 22406;
        level.name = Levels.Adamantite.name;
        experience.nextLevelAt = 24815;
        experience.remainingXP = (24815 - 22406);
        // Players can choose a non-tourney legal stage to play on
    } else if (levelNumber == 36) {
        level.num = 36;
        experience.xp = 24815;
        experience.arenaXP = 24815;
        level.name = Levels.Adamantite.name;
        experience.nextLevelAt = 27473;
        experience.remainingXP = (27473 - 24815);
    } else if (levelNumber == 37) {
        level.num = 37;
        experience.xp = 27473;
        experience.arenaXP = 27473;
        level.name = Levels.Adamantite.name;
        experience.nextLevelAt = 30408;
        experience.remainingXP = (30408 - 27473);
    } else if (levelNumber == 38) {
        level.num = 38;
        experience.xp = 30408;
        experience.arenaXP = 30408;
        level.name = Levels.Adamantite.name;
        experience.nextLevelAt = 33648;
        experience.remainingXP = (33648 - 30408);
    } else if (levelNumber == 39) {
        level.num = 39;
        experience.xp = 33648;
        experience.arenaXP = 33648;
        level.name = Levels.Adamantite.name;
        experience.nextLevelAt = 37224;
        experience.remainingXP = (37224 - 33648);
    } else if (levelNumber == 40) {
        level.num = 40;
        experience.xp = 37224;
        experience.arenaXP = 37224;
        level.name = Levels.Rune.name;
        experience.nextLevelAt = 41171;
        experience.remainingXP = (41171 - 37224);
        // Players can challenge others to a Bo5
    } else if (levelNumber == 41) {
        level.num = 41;
        experience.xp = 41171;
        experience.arenaXP = 41171;
        level.name = Levels.Rune.name;
        experience.nextLevelAt = 45529;
        experience.remainingXP = (45529 - 41171);
    } else if (levelNumber == 42) {
        level.num = 42;
        experience.xp = 45529;
        experience.arenaXP = 45529;
        level.name = Levels.Rune.name;
        experience.nextLevelAt = 50339;
        experience.remainingXP = (50339 - 45529);
    } else if (levelNumber == 43) {
        level.num = 43;
        experience.xp = 50339;
        experience.arenaXP = 50339;
        level.name = Levels.Rune.name;
        experience.nextLevelAt = 55649;
        experience.remainingXP = (55649 - 50339);
    } else if (levelNumber == 44) {
        level.num = 44;
        experience.xp = 55649;
        experience.arenaXP = 55649;
        level.name = Levels.Rune.name;
        experience.nextLevelAt = 61512;
        experience.remainingXP = (61512 - 55649);
    } else if (levelNumber == 45) {
        level.num = 45;
        experience.xp = 61512;
        experience.arenaXP = 61512;
        level.name = Levels.Rune.name;
        experience.nextLevelAt = 67983;
        experience.remainingXP = (67983 - 61512);
    } else if (levelNumber == 46) {
        level.num = 46;
        experience.xp = 67983;
        experience.arenaXP = 67983;
        level.name = Levels.Rune.name;
        experience.nextLevelAt = 75127;
        experience.remainingXP = (75127 - 67983);
    } else if (levelNumber == 47) {
        level.num = 47;
        experience.xp = 75127;
        experience.arenaXP = 75127;
        level.name = Levels.Rune.name;
        experience.nextLevelAt = 83014;
        experience.remainingXP = (83014 - 75127);
    } else if (levelNumber == 48) {
        level.num = 48;
        experience.xp = 83014;
        experience.arenaXP = 83014;
        level.name = Levels.Rune.name;
        experience.nextLevelAt = 91721;
        experience.remainingXP = (91721 - 83014);
    } else if (levelNumber == 49) {
        level.num = 49;
        experience.xp = 91721;
        experience.arenaXP = 91721;
        level.name = Levels.Rune.name;
        experience.nextLevelAt = 101333;
        experience.remainingXP = (101333 - 91721);
    } else if (levelNumber == 50) {
        level.num = 50;
        experience.xp = 101333;
        experience.arenaXP = 101333;
        level.name = Levels.Gilded.name;
        experience.nextLevelAt = 111945;
        experience.remainingXP = (111945 - 101333);
        // Players can choose another level 50 Player and Challenge them to a Doubles match (the teammates can be lower than Level 50)
    } else if (levelNumber == 51) {
        level.num = 51;
        experience.xp = 111945;
        experience.arenaXP = 111945;
        level.name = Levels.Gilded.name;
        experience.nextLevelAt = 123660;
        experience.remainingXP = (123660 - 111945);
    } else if (levelNumber == 52) {
        level.num = 52;
        experience.xp = 123660;
        experience.arenaXP = 123660;
        level.name = Levels.Gilded.name;
        experience.nextLevelAt = 136594;
        experience.remainingXP = (136594 - 123660);
    } else if (levelNumber == 53) {
        level.num = 53;
        experience.xp = 136594;
        experience.arenaXP = 136594;
        level.name = Levels.Gilded.name;
        experience.nextLevelAt = 150872;
        experience.remainingXP = (150872 - 136594);
    } else if (levelNumber == 54) {
        level.num = 54;
        experience.xp = 150872;
        experience.arenaXP = 150872;
        level.name = Levels.Gilded.name;
        experience.nextLevelAt = 166636;
        experience.remainingXP = (166636 - 150872);
    } else if (levelNumber == 55) {
        level.num = 55;
        experience.xp = 166636;
        experience.arenaXP = 166636;
        level.name = Levels.Gilded.name;
        experience.nextLevelAt = 184040;
        experience.remainingXP = (184040 - 166636);
        // Players can choose a Custom Stage to play on (MUST BE TOS LEGAL)
    } else if (levelNumber == 56) {
        level.num = 56;
        experience.xp = 184040;
        experience.arenaXP = 184040;
        level.name = Levels.GomuGomu.name;
        experience.nextLevelAt = 203254;
        experience.remainingXP = (203254 - 184040);
    } else if (levelNumber == 57) {
        level.num = 57;
        experience.xp = 203254;
        experience.arenaXP = 203254;
        level.name = Levels.GomuGomu.name;
        experience.nextLevelAt = 224466;
        experience.remainingXP = (224466 - 203254);
    } else if (levelNumber == 58) {
        level.num = 58;
        experience.xp = 224466;
        experience.arenaXP = 224466;
        level.name = Levels.GomuGomu.name;
        experience.nextLevelAt = 247886;
        experience.remainingXP = (247886 - 224466);
    } else if (levelNumber == 59) {
        level.num = 59;
        experience.xp = 247886;
        experience.arenaXP = 247886;
        level.name = Levels.GomuGomu.name;
        experience.nextLevelAt = 273742;
        experience.remainingXP = (273742 - 247886);
    } else if (levelNumber == 60) {
        level.num = 60;
        experience.xp = 273742;
        experience.arenaXP = 273742;
        level.name = Levels.DragonScimmy.name;
        experience.nextLevelAt = 302288;
        experience.remainingXP = (302288 - 273742);
        // Players can challenge others to a Ft5
    } else if (levelNumber == 61) {
        level.num = 61;
        experience.xp = 302288;
        experience.arenaXP = 302288;
        level.name = Levels.DragonScimmy.name;
        experience.nextLevelAt = 333804;
        experience.remainingXP = (333804 - 302288);
    } else if (levelNumber == 62) {
        level.num = 62;
        experience.xp = 333804;
        experience.arenaXP = 333804;
        level.name = Levels.DragonScimmy.name;
        experience.nextLevelAt = 368599;
        experience.remainingXP = (368599 - 333804);
    } else if (levelNumber == 63) {
        level.num = 63;
        experience.xp = 368599;
        experience.arenaXP = 368599;
        level.name = Levels.DragonScimmy.name;
        experience.nextLevelAt = 407015;
        experience.remainingXP = (407015 - 368599);
    } else if (levelNumber == 64) {
        level.num = 64;
        experience.xp = 407015;
        experience.arenaXP = 407015;
        level.name = Levels.DragonScimmy.name;
        experience.nextLevelAt = 449428;
        experience.remainingXP = (449428 - 407015);
    } else if (levelNumber == 65) {
        level.num = 65;
        experience.xp = 449428;
        experience.arenaXP = 449428;
        level.name = Levels.DragonScimmy.name;
        experience.nextLevelAt = 496254;
        experience.remainingXP = (496254 - 449428);
        // Players no longer need to be Sub for Bo5's
    } else if (levelNumber == 66) {
        level.num = 66;
        experience.xp = 496254;
        experience.arenaXP = 496254;
        level.name = Levels.DragonScimmy.name;
        experience.nextLevelAt = 547953;
        experience.remainingXP = (547953 - 496254);
    } else if (levelNumber == 67) {
        level.num = 67;
        experience.xp = 547953;
        experience.arenaXP = 547953;
        level.name = Levels.DragonScimmy.name;
        experience.nextLevelAt = 605032;
        experience.remainingXP = (605032 - 547953);
    } else if (levelNumber == 68) {
        level.num = 68;
        experience.xp = 605032;
        experience.arenaXP = 605032;
        level.name = Levels.DragonScimmy.name;
        experience.nextLevelAt = 668051;
        experience.remainingXP = (668051 - 605032);
    } else if (levelNumber == 69) {
        level.num = 69;
        experience.xp = 668051;
        experience.arenaXP = 668051;
        level.name = Levels.DragonScimmy.name;
        experience.nextLevelAt = 737627;
        experience.remainingXP = (737627 - 668051);
    } else if (levelNumber == 70) {
        level.num = 70;
        experience.xp = 737627;
        experience.arenaXP = 737627;
        level.name = Levels.Abyssal.name;
        experience.nextLevelAt = 814445;
        experience.remainingXP = (814445 - 737627);
        // Players name is entered into the Pot for the chance to be the Raid Boss (either yourself or an Amiibo) in a Coliseum Clash
    } else if (levelNumber == 71) {
        level.num = 71;
        experience.xp = 814445;
        experience.arenaXP = 814445;
        level.name = Levels.Abyssal.name;
        experience.nextLevelAt = 899257;
        experience.remainingXP = (899257 - 814445);
    } else if (levelNumber == 72) {
        level.num = 72;
        experience.xp = 899257;
        experience.arenaXP = 899257;
        level.name = Levels.Abyssal.name;
        experience.nextLevelAt = 992895;
        experience.remainingXP = (992895 - 899257);
    } else if (levelNumber == 73) {
        level.num = 73;
        experience.xp = 992895;
        experience.arenaXP = 992895;
        level.name = Levels.Monado.name;
        experience.nextLevelAt = 1096278;
        experience.remainingXP = (1096278 - 992895);
    } else if (levelNumber == 74) {
        level.num = 74;
        experience.xp = 1096278;
        experience.arenaXP = 1096278;
        level.name = Levels.Monado.name;
        experience.nextLevelAt = 1210421;
        experience.remainingXP = (1210421 - 1096278);
    } else if (levelNumber == 75) {
        level.num = 75;
        experience.xp = 1210421;
        experience.arenaXP = 1210421;
        level.name = Levels.Blowpipe.name;
        experience.nextLevelAt = 1336443;
        experience.remainingXP = (1336443 - 1210421);
    } else if (levelNumber == 76) {
        level.num = 76;
        experience.xp = 1336443;
        experience.arenaXP = 1336443;
        level.name = Levels.Blowpipe.name;
        experience.nextLevelAt = 1475581;
        experience.remainingXP = (1475581 - 1336443);
    } else if (levelNumber == 77) {
        level.num = 77;
        experience.xp = 1475581;
        experience.arenaXP = 1475581;
        level.name = Levels.Blowpipe.name;
        experience.nextLevelAt = 1629200;
        experience.remainingXP = (1629200 - 1475581);
    } else if (levelNumber == 78) {
        level.num = 78;
        experience.xp = 1629200;
        experience.arenaXP = 1629200;
        level.name = Levels.Incineroars.name;
        experience.nextLevelAt = 1798808;
        experience.remainingXP = (1798808 - 1629200);
    } else if (levelNumber == 79) {
        level.num = 79;
        experience.xp = 1798808;
        experience.arenaXP = 1798808;
        level.name = Levels.Incineroars.name;
        experience.nextLevelAt = 1986068;
        experience.remainingXP = (1986068 - 1798808);
    } else if (levelNumber == 80) {
        level.num = 80;
        experience.xp = 1986068;
        experience.arenaXP = 1986068;
        level.name = Levels.DragonHunterCrossbow.name;
        experience.nextLevelAt = 2192818;
        experience.remainingXP = (2192818 - 1986068);
        // Players can challenge others to a ft10
    } else if (levelNumber == 81) {
        level.num = 81;
        experience.xp = 2192818;
        experience.arenaXP = 2192818;
        level.name = Levels.DragonHunterCrossbow.name;
        experience.nextLevelAt = 2421087;
        experience.remainingXP = (2421087 - 2192818);
    } else if (levelNumber == 82) {
        level.num = 82;
        experience.xp = 2421087;
        experience.arenaXP = 2421087;
        level.name = Levels.Dharoks.name;
        experience.nextLevelAt = 2673114;
        experience.remainingXP = (2673114 - 2421087);
    } else if (levelNumber == 83) {
        level.num = 83;
        experience.xp = 2673114;
        experience.arenaXP = 2673114;
        level.name = Levels.Dharoks.name;
        experience.nextLevelAt = 2951373;
        experience.remainingXP = (2951373 - 2673114);
    } else if (levelNumber == 84) {
        level.num = 84;
        experience.xp = 2951373;
        experience.arenaXP = 2951373;
        level.name = Levels.Dharoks.name;
        experience.nextLevelAt = 3258594;
        experience.remainingXP = (3258594 - 2951373);
    } else if (levelNumber == 85) {
        level.num = 85;
        experience.xp = 3258594;
        experience.arenaXP = 3258594;
        level.name = Levels.Kingdom.name;
        experience.nextLevelAt = 3597792;
        experience.remainingXP = (3597792 - 3258594);
    } else if (levelNumber == 86) {
        level.num = 86;
        experience.xp = 3597792;
        experience.arenaXP = 3597792;
        level.name = Levels.Ghrazi.name;
        experience.nextLevelAt = 3972294;
        experience.remainingXP = (3972294 - 3597792);
    } else if (levelNumber == 87) {
        level.num = 87;
        experience.xp = 3972294;
        experience.arenaXP = 3972294;
        level.name = Levels.Master.name;
        experience.nextLevelAt = 4385776;
        experience.remainingXP = (4385776 - 3972294);
    } else if (levelNumber == 88) {
        level.num = 88;
        experience.xp = 4385776;
        experience.arenaXP = 4385776;
        level.name = Levels.Master.name;
        experience.nextLevelAt = 4842295;
        experience.remainingXP = (4842295 - 4385776);
    } else if (levelNumber == 89) {
        level.num = 89;
        experience.xp = 4842295;
        experience.arenaXP = 4842295;
        level.name = Levels.Master.name;
        experience.nextLevelAt = 5346332;
        experience.remainingXP = (5346332 - 4842295);
    } else if (levelNumber == 90) {
        level.num = 90;
        experience.xp = 5346332;
        experience.arenaXP = 5346332;
        level.name = Levels.Twisted.name;
        experience.nextLevelAt = 5902831;
        experience.remainingXP = (5902831 - 5346332);
        // Players can have Kay create an emote of their design for the Discord/Twitch
    } else if (levelNumber == 91) {
        level.num = 91;
        experience.xp = 5902831;
        experience.arenaXP = 5902831;
        level.name = Levels.Energy.name;
        experience.nextLevelAt = 6517253;
        experience.remainingXP = (6517253 - 5902831);
    } else if (levelNumber == 92) {
        level.num = 92;
        experience.xp = 6517253;
        experience.arenaXP = 6517253;
        level.name = Levels.DragonSlayer.name;
        experience.nextLevelAt = 7195629;
        experience.remainingXP = (7195629 - 6517253);
        // Players can choose the character and fill in the blank => '"_____" Only Hats Off!'
    } else if (levelNumber == 93) {
        level.num = 93;
        experience.xp = 7195629;
        experience.arenaXP = 7195629;
        level.name = Levels.DragonSlayer.name;
        experience.nextLevelAt = 7944614;
        experience.remainingXP = (7944614 - 7195629);
    } else if (levelNumber == 94) {
        level.num = 94;
        experience.xp = 7944614;
        experience.arenaXP = 7944614;
        level.name = Levels.Oblivion.name;
        experience.nextLevelAt = 8771558;
        experience.remainingXP = (8771558 - 7944614);
    } else if (levelNumber == 95) {
        level.num = 95;
        experience.xp = 8771558;
        experience.arenaXP = 8771558;
        level.name = Levels.Blaster.name;
        experience.nextLevelAt = 9684577;
        experience.remainingXP = (9684577 - 8771558);
    } else if (levelNumber == 96) {
        level.num = 96;
        experience.xp = 9684577;
        experience.arenaXP = 9684577;
        level.name = Levels.Boxing.name;
        experience.nextLevelAt = 10692629;
        experience.remainingXP = (10692629 - 9684577);
    } else if (levelNumber == 97) {
        level.num = 97;
        experience.xp = 10692629;
        experience.arenaXP = 10692629;
        level.name = Levels.Fish.name;
        experience.nextLevelAt = 11805606;
        experience.remainingXP = (11805606 - 10692629);
    } else if (levelNumber == 98) {
        level.num = 98;
        experience.xp = 11805606;
        experience.arenaXP = 11805606;
        level.name = Levels.Golden.name;
        experience.nextLevelAt = 13034431;
        experience.remainingXP = (13034431 - 11805606);
    } else if (levelNumber == 99) {
        level.num = 99;
        experience.xp = 13034431;
        experience.arenaXP = 13034431;
        level.name = Levels.Top.name;
        experience.nextLevelAt = 999999999;
        experience.remainingXP = (999999999 - 13034431);
        // Players can get a t-shirt from Creative Workshop
    }

    return {
        level,
        experience
    }
}