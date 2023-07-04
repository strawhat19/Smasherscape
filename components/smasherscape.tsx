import { db } from '../firebase';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useContext, useEffect, useRef, useState } from 'react';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { defaultContent, formatDate, capitalizeAllWords, createXML, StateContext, showAlert } from '../pages/_app';

export default function Smasherscape(props) {

    const prevPlayersRef = useRef();
    const loadedRef = useRef(false);
    const [loaded, setLoaded] = useState(false);
    const { players, setPlayers } = useContext<any>(StateContext);

    useEffect(() => {
        if (loadedRef.current) return;
        loadedRef.current = true;
        setLoaded(true);
    
        console.log(`Players`, players);
    }, [players])    

    return <>
        <div id={props.id} className={`${props.className} playerGrid`}>
            {players.length > 0 && players.map((plyr, plyrIndex) => {
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
                                    <img width={150} src={`https://github.com/strawhat19/Smasherscape/blob/main/assets/smasherscape/OSRS_Top_Hat.png?raw=true`} alt={`Tophat Logo`} />
                                    <h4 className={`levelName`}>{plyr?.levelName}</h4>
                                </div>
                                <div className="recordPlays">
                                    <div className="record">
                                        <h3>Record</h3>
                                        <h4>0 - 0</h4>
                                    </div>
                                    <div className="plays">
                                        <h3>Plays</h3>
                                        <h4>0 - 0</h4>
                                    </div>
                                </div>
                                <div className="rightCol">
                                    <div className="level">
                                        <h4 className={`levelNum levelTop`}>99</h4>
                                        <div className="borderSep"></div>
                                        <h4 className={`levelNum levelBot`}>99</h4>
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
                                <div className="gradient"></div>
                            </div>
                        </div>
                    </div>
                )
            })}
            <img className={`gridImage`} width={887.38} height={521.41} src={`https://github.com/strawhat19/Smasherscape/blob/main/assets/smasherscape/SmasherScapePlayerCard.png?raw=true`} alt={`Smasherscape Player Card`} />
            <img className={`gridImage`} width={887.38} height={521.41} src={`https://github.com/strawhat19/Smasherscape/blob/main/assets/smasherscape/SmasherScapePlayerCard.png?raw=true`} alt={`Smasherscape Player Card`} />
            <img className={`gridImage`} width={887.38} height={521.41} src={`https://github.com/strawhat19/Smasherscape/blob/main/assets/smasherscape/SmasherScapePlayerCard.png?raw=true`} alt={`Smasherscape Player Card`} />
            <img className={`gridImage`} width={887.38} height={521.41} src={`https://github.com/strawhat19/Smasherscape/blob/main/assets/smasherscape/SmasherScapePlayerCard.png?raw=true`} alt={`Smasherscape Player Card`} />
        </div>
    </>
}