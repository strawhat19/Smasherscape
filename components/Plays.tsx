// import PlayerRecord from "./PlayerRecord";
// import { StateContext } from "../pages/_app";
// import { useContext, useState } from "react";

export default function Plays() {
    // let { plays, players } = useContext<any>(StateContext);
    
    // let [loadedInterval, ] = useState(20);
    // let [initialInterval, ] = useState(5);
    // let [paginationAmount, ] = useState(initialInterval);
    // let [paginationEnd, setPaginationEnd] = useState(paginationAmount);

    return <>
        <div className={`allPlaysContainer flex alignItemsCenter justifyContentCenter`}>
            Plays
            {/* {plays.length > 0 ? (
                plays.map((pl, index) => {
                    return (
                        <PlayerRecord 
                            key={index} 
                            plyr={players.find(p => p.uuid == pl.winnerUUID)} 
                            paginationEnd={paginationEnd} 
                            setPaginationEnd={setPaginationEnd} 
                            loadedInterval={loadedInterval} 
                            plyrPlays={plays} 
                        />
                    )
                })
            ) : <>No Plays</>} */}
        </div>
    </>
}