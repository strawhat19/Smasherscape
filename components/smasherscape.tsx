import { db } from '../firebase';
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
                    <div className="gridCard">
                        <img className={`cardBG`} src={`https://github.com/strawhat19/Smasherscape/blob/main/assets/smasherscape/OSRS_Card_Empty.png?raw=true`} alt={`Smasherscape Player Card`} />
                        <h2>Grid Card</h2>
                        <h2>Grid Card</h2>
                        <h2>Grid Card</h2>
                        <h2>Grid Card</h2>
                        <h2>Grid Card</h2>
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