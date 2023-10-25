import { collection, query, orderBy, limit } from 'firebase/firestore';
import { calcPlayerCharacterIcon } from '../common/CharacterIcons';
import React, { useEffect, useState, useContext } from 'react';
import { StateContext, usePlaysDatabase } from '../pages/_app';
import { removeTrailingZeroDecimal } from './PlayerRecord';
import { getCharacterTitle } from './smasherscape';
import Player from '../models/Player';
import Play from '../models/Play';
import { db } from '../firebase';

const PlayerRecord = (props) => {
  let { plyr, plyrPlays } = props;
  const [plays, setPlays] = useState([]);
  const [lastPlay, setLastPlay] = useState(null);
  const { players, filteredPlayers, devEnv, useLazyLoad } = useContext<any>(StateContext);
  
  const getPlays = async () => {
    //   let queryToGet = plyrPlays;
    let playsCollection = collection(db, usePlaysDatabase);
    let queryToGet = query(playsCollection, orderBy(`date`), limit(35));
    if (lastPlay != null) {
      queryToGet = queryToGet.startAfter(lastPlay);
    }
    const snapshot = await queryToGet;
    const newPlays = snapshot.docs && Array.isArray(snapshot.docs) && snapshot.docs.length > 0 ? snapshot.docs.map(doc => doc.data()) : [];
    setPlays(prevPlays => [...prevPlays, ...newPlays]);
    setLastPlay(newPlays[newPlays.length - 1]);
  };
  
  useEffect(() => {
    getPlays();
  }, []);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        getPlays();
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastPlay]);

  const calcWinLoseRatio = (playerOne, playerTwo, plays: Play[]) => {
    let playerOneDB: Player = players?.find(plyr => plyr?.name.toLowerCase() == playerOne.toLowerCase() || plyr?.name.toLowerCase().includes(playerOne));
    let playerTwoDB: Player = players?.find(plyr => plyr?.name.toLowerCase() == playerTwo.toLowerCase() || plyr?.name.toLowerCase().includes(playerTwo));
    let playsToConsider: Play[] = plays.filter(ply => ply?.winnerUUID == playerTwoDB?.uuid || ply?.loserUUID == playerTwoDB?.uuid);
    let wins = playsToConsider.filter(ply => ply?.winnerUUID == playerOneDB?.uuid)?.length;
    let losses = playsToConsider.filter(ply => ply?.loserUUID == playerOneDB?.uuid)?.length;
    let winRate = (wins/(wins+losses)) * 100;
    let winPercentage = (winRate) > 100 ? 100 : removeTrailingZeroDecimal(winRate);
    return <div className={`winRateDetails`}>
        <div className={`winPercentage ${winPercentage > 50 ? winPercentage == 100 ? `perfect` : `positive` : winPercentage > 24 ? `challenger` : `negative`}`}>({winPercentage}%)</div>
        <div className="winsToLossses">{wins} Wins - {losses} Losses</div>
    </div>
  }
  
  return (
    <div className={`recordOfPlayer ${plyr?.expanded ? `expanded` : `collapsed`}`}>
        {plays?.length > 0 ? plays.map((ply, plyIndex) => {
            let isWinner = ply?.winner == plyr?.name;
            return (
                <li className={`playerPlay`} key={plyIndex}>
                    <div className="plyIndex">{plyIndex + 1}.</div>
                    <div className="recordDetails">
                    <div className={`playMessage`}>{isWinner ? <div><span className={`${isWinner ? `winner` : `loser`}`}>Win</span> over {ply?.loser}</div> : <div><span className={`${isWinner ? `winner` : `loser`}`}>Loss</span> to {ply?.winner}</div>}
                        <div className="stocksRow">
                            <div className="stocks">
                                {isWinner ? ply?.stocks?.length > 0 && ply?.stocks?.map((stok, stkIndex) => {
                                    return (
                                        <span key={stkIndex} className={stok?.dead ? `dead` : `living`}>
                                            <img className={`charImg`} width={35} src={calcPlayerCharacterIcon(stok?.character)} alt={getCharacterTitle(stok?.character)} />
                                        </span>
                                    )
                                }) : ply?.lossStocks?.map((stok, stkIndex) => {
                                    return (
                                        <span key={stkIndex} className={stok?.dead ? `dead` : `living`}>
                                            <img className={`charImg`} width={35} src={calcPlayerCharacterIcon(stok?.character)} alt={getCharacterTitle(stok?.character)} />
                                        </span>
                                    )
                                })}
                            </div>
                        vs 
                            <div className="otherStocks">
                                {!isWinner ? ply?.stocks?.length > 0 && ply?.stocks?.map((stok, stkIndex) => {
                                    return (
                                        <span key={stkIndex} className={stok?.dead ? `dead` : `living`}>
                                            <img className={`charImg`} width={35} src={calcPlayerCharacterIcon(stok?.character)} alt={getCharacterTitle(stok?.character)} />
                                        </span>
                                    )
                                }) : ply?.lossStocks?.map((stok, stkIndex) => {
                                    return (
                                        <span key={stkIndex} className={stok?.dead ? `dead` : `living`}>
                                            <img className={`charImg`} width={35} src={calcPlayerCharacterIcon(stok?.character)} alt={getCharacterTitle(stok?.character)} />
                                        </span>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="recordSubDetails">
                        <div className="charsPlayedGame">
                            {calcWinLoseRatio(isWinner ? ply?.winner : ply?.loser, isWinner ? ply?.loser : ply?.winner, plays)}
                        </div>
                        <div className="playDate">{ply?.date}</div>
                    </div>
                    </div>
                </li>
            )
        }) : <div className={`noPlaysYet`}>
            No Plays Yet
        </div>}
    </div>
  );
};

export default PlayerRecord;