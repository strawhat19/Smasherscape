import  moment from 'moment';
import { db } from '../firebase';
import { FormEvent, useContext, useRef } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { defaultContent, formatDate, capitalizeAllWords, createXML, StateContext, showAlert, removeDuplicateObjectFromArray } from '../pages/_app';

export default function Smasherscape(props) {

    const commandsInput = useRef();
    const { players, setPlayers, filteredPlayers, setFilteredPlayers } = useContext<any>(StateContext);

    const formInput = (e: FormEvent) => {
        let field = e.target as HTMLInputElement;
        if (field.name == `search`) {
            if (field.value != ``) {
                setFilteredPlayers(players.filter(plyr => {
                    return Object.values(plyr).some(val =>
                        typeof val === "string" && val.toLowerCase().includes(field.value.toLowerCase())
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

    const renderLevelPic = (levelName) => {
        if (levelName == `Bronze Scimitar`) {
            return `https://github.com/strawhat19/Smasherscape/blob/main/assets/smasherscape/Bronze_Scimmy.png?raw=true`;
        } else if (levelName == `Iron Scimitar`) {
            return `https://github.com/strawhat19/Smasherscape/blob/main/assets/smasherscape/Iron_Scimmy.png?raw=true`;
        } else if (levelName == `Steel Scimitar`) {
            return `https://github.com/strawhat19/Smasherscape/blob/main/assets/smasherscape/Steel_Scimmy.png?raw=true`;
        }
    }

    const getUniquePlays = (plyr) => {
        let charsPlayed = plyr.plays.map(ply => ply.character);
        let counts = charsPlayed.reduce((acc, char) => {
            acc[char] = (acc[char] || 0) + 1;
            return acc;
        }, {});
        let sortedChars = Object.entries(counts).sort((a: any, b: any) => b[1] - a[1]).map(entry => entry[0].toLowerCase());
        return sortedChars.slice(0,3);
    }
    

    const renderCharPic = (char, pic) => {
        if (char == `fox`) {
            if (pic) {
                return `https://raw.githubusercontent.com/strawhat19/Smasherscape/main/assets/smasherscape/characters/Fox.webp`;
            } else {
                return `Fox`;
            }
        } else if (char == `falco`) {
            if (pic) {
                return `https://raw.githubusercontent.com/strawhat19/Smasherscape/main/assets/smasherscape/characters/Falco.webp`;
            } else {
                return `Falco`;
            }
        } else if (char == `bowser`) {
            if (pic) {
                return `https://raw.githubusercontent.com/strawhat19/Smasherscape/main/assets/smasherscape/characters/Bowser.webp`;
            } else {
                return `Bowser`;
            }
        } else if (char == `littlemac` || char == `lm`) {
            if (pic) {
                return `https://raw.githubusercontent.com/strawhat19/Smasherscape/main/assets/smasherscape/characters/LittleMac.webp`;
            } else {
                return `Little Mac`;
            }
        } else if (char == `bayonetta`) {
            if (pic) {
                return `https://raw.githubusercontent.com/strawhat19/Smasherscape/main/assets/smasherscape/characters/Bayonetta.webp`;
            } else {
                return `Bayonetta`;
            }
        } else if (char == `roy`) {
            if (pic) {
                return `https://raw.githubusercontent.com/strawhat19/Smasherscape/main/assets/smasherscape/characters/Roy.webp`;
            } else {
                return `Roy`;
            }
        } else if (char == `captainfalcon` || char == `cf`) {
            if (pic) {
                return `https://raw.githubusercontent.com/strawhat19/Smasherscape/main/assets/smasherscape/characters/CaptainFalcon.webp`;
            } else {
                return `CaptainFalcon`;
            }
        } else if (char == `sora`) {
            if (pic) {
                return `https://raw.githubusercontent.com/strawhat19/Smasherscape/main/assets/smasherscape/characters/Sora.webp`;
            } else {
                return `Sora`;
            }
        } else if (char == `link`) {
            if (pic) {
                return `https://raw.githubusercontent.com/strawhat19/Smasherscape/main/assets/smasherscape/characters/Link.webp`;
            } else {
                return `Link`;
            }
        } else if (char == `donkeykong` ||char == `dk`) {
            if (pic) {
                return `https://raw.githubusercontent.com/strawhat19/Smasherscape/main/assets/smasherscape/characters/DonkeyKong.webp`;
            } else {
                return `Donkey Kong`;
            }
        } else if (char == `ryu`) {
            if (pic) {
                return `https://raw.githubusercontent.com/strawhat19/Smasherscape/main/assets/smasherscape/characters/Ryu.webp`;
            } else {
                return `Ryu`;
            }
        } else if (char == `mario`) {
            if (pic) {
                return `https://raw.githubusercontent.com/strawhat19/Smasherscape/main/assets/smasherscape/characters/Mario.webp`;
            } else {
                return `Mario`;
            }
        } else if (char == `lucario`) {
            if (pic) {
                return `https://raw.githubusercontent.com/strawhat19/Smasherscape/main/assets/smasherscape/characters/Lucario.webp`;
            } else {
                return `Lucario`;
            }
        } else if (char == `minmin` || char == `mm`) {
            if (pic) {
                return `https://raw.githubusercontent.com/strawhat19/Smasherscape/main/assets/smasherscape/characters/MinMin.webp`;
            } else {
                return `MinMin`;
            }
        } else if (char == `joker`) {
            if (pic) {
                return `https://raw.githubusercontent.com/strawhat19/Smasherscape/main/assets/smasherscape/characters/Joker.webp`;
            } else {
                return `Joker`;
            }
        } else if (char == `corrin`) {
            if (pic) {
                return `https://raw.githubusercontent.com/strawhat19/Smasherscape/main/assets/smasherscape/characters/Corrin.webp`;
            } else {
                return `Corrin`;
            }
        } else if (char == `cloud`) {
            if (pic) {
                return `https://raw.githubusercontent.com/strawhat19/Smasherscape/main/assets/smasherscape/characters/Cloud.webp`;
            } else {
                return `Cloud`;
            }
        }
    }

    const calcPlayerLevel = (plyr) => {
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
        }

        return plyr;
    }

    const formSubmit = (e: FormEvent) => {
        e.preventDefault();
        let field = commandsInput.current as HTMLInputElement;
        if (field.name == `commands`) {
            let command = field?.value.toLowerCase();
            let commandParams = command.split(` `);
            
            if (command != ``) {
                if (commandParams[0] == `!upd`) {
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

                                calcPlayerLevel(plyr);

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

                                calcPlayerLevel(plyr);

                                return plyr;
                            } else {
                                return plyr;
                            }
                        });

                        setPlayers(updatedPlayers);
                    }
                }
            }
        } else {
            return;
        }
    }

    return <>
        <form onInput={(e) => formInput(e)} onSubmit={(e) => formSubmit(e)} action="submit" className="gridForm">
            <div className={`inputWrapper`}><div className="inputBG"></div><input type="search" className="search" name={`search`} placeholder={`Search...`} /></div>
            <div className={`inputWrapper`}><div className="inputBG"></div><input ref={commandsInput} type="text" className="commands" name={`commands`} placeholder={`Commands...`} /></div>
            <button style={{display: `none`}} type={`submit`}>Submit</button>
        </form>
        <div id={props.id} className={`${props.className} playerGrid ${filteredPlayers.length == 0 ? `empty` : `populated`}`}>
            {filteredPlayers.length == 0 && <>
                <div className="gridCard"><h1 className={`runescape_large noPlayersFound`}>No Players Found</h1></div>
            </>}
            {filteredPlayers.length > 0 && filteredPlayers.sort((a,b) => b.experience.arenaXP - a.experience.arenaXP).map((plyr, plyrIndex) => {
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
                                    <img width={150} src={renderLevelPic(plyr?.level?.name)} alt={plyr?.level?.name} />
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
                                            {getUniquePlays(plyr).map((char, charIndex) => {
                                                return (
                                                    <img key={charIndex} className={`charImg`} width={35} src={renderCharPic(char, true)} alt={renderCharPic(char, false)} title={renderCharPic(char, false)} />
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
            {/* <img className={`gridImage`} width={887.38} height={521.41} src={`https://github.com/strawhat19/Smasherscape/blob/main/assets/smasherscape/SmasherScapePlayerCard.png?raw=true`} alt={`Smasherscape Player Card`} />
            <img className={`gridImage`} width={887.38} height={521.41} src={`https://github.com/strawhat19/Smasherscape/blob/main/assets/smasherscape/SmasherScapePlayerCard.png?raw=true`} alt={`Smasherscape Player Card`} />
            <img className={`gridImage`} width={887.38} height={521.41} src={`https://github.com/strawhat19/Smasherscape/blob/main/assets/smasherscape/SmasherScapePlayerCard.png?raw=true`} alt={`Smasherscape Player Card`} />
            <img className={`gridImage`} width={887.38} height={521.41} src={`https://github.com/strawhat19/Smasherscape/blob/main/assets/smasherscape/SmasherScapePlayerCard.png?raw=true`} alt={`Smasherscape Player Card`} /> */}
        </div>
    </>
}