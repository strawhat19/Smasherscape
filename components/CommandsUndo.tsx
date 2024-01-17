import { getCharacterTitle } from "./smasherscape";
import { calcLevelFromExperience } from "../common/Levels";
import { deletePlayFromDB, updatePlayerInDB } from "./PlayerForm";
import { calcPlayerCharacterIcon } from "../common/CharacterIcons";

export default function CommandsUndo(props) {
    let { playsToConsider, parameters } = props;

    const undoPlay = (e, playToUndo, params) => {
        if (e.target.innerHTML == `Confirm Undo`) {
            let overlay: any = document.querySelector(`.overlay`);
            let alert: any = document.querySelector(`.alert`);

            if (overlay && alert) {
                alert.style.opacity = 0;
                alert.style.transform = `translateY(-50px)`;
                overlay.style.opacity = 0;
          
                setTimeout(() => {
                  document.body.removeChild(overlay);
                  localStorage.setItem(`alertOpen`, `false`);

                  updatePlayerInDB(params.winner.player, params.winner.newPlayer);
                  updatePlayerInDB(params.loser.player, params.loser.newPlayer);
                  deletePlayFromDB(playToUndo?.ID);

                  let playerForm = document.querySelector(`#playerForm`);

                  if (playerForm) (playerForm as any).reset();
                }, 240);
            }
        } else {
            e.target.innerHTML = `Confirm Undo`;
        }
    }

    return (
        <div className={`commandsToUndo recordOfPlayer`}>
            <ul className="recordList">
                {playsToConsider?.length > 0 ? playsToConsider.slice(0, 7).map((ply, plyIndex) => {

                    let isWinner = true;
                    let winnerPlayer = parameters.players.find(plyr => plyr?.uuid == ply?.winnerUUID);
                    let loserPlayer = parameters.players.find(plyr => plyr?.uuid == ply?.loserUUID);
                    let winnerXP = winnerPlayer?.experience?.arenaXP;
                    let loserXP = loserPlayer?.experience?.arenaXP;
                    let winnerLevel = calcLevelFromExperience(winnerXP)?.level?.num;
                    let loserLevel = calcLevelFromExperience(loserXP)?.level?.num;
                    let winnerNewExperience = winnerXP - ply?.winnerExpGained;
                    let loserNewExperience = loserXP - ply?.loserExpGained;

                    winnerNewExperience = winnerNewExperience < 0 ? 0 : winnerNewExperience;
                    loserNewExperience = loserNewExperience < 0 ? 0 : loserNewExperience;

                    let winnerNewLevel = calcLevelFromExperience(winnerNewExperience)?.level?.num;
                    let loserNewLevel = calcLevelFromExperience(loserNewExperience)?.level?.num;

                    let updateParams = {
                        winner: {
                            player: winnerPlayer,
                            newPlayer: {
                                uuid: winnerPlayer?.uuid,
                                experience: calcLevelFromExperience(winnerNewExperience).experience,
                                level: calcLevelFromExperience(winnerNewExperience).level,
                            }
                        },
                        loser: {
                            player: loserPlayer,
                            newPlayer: {
                                uuid: loserPlayer?.uuid,
                                experience: calcLevelFromExperience(loserNewExperience).experience,
                                level: calcLevelFromExperience(loserNewExperience).level,
                            }
                        },
                    };

                    return (
                        <li className={`playerPlay commandToUndo`} key={plyIndex}>
                            <div className="plyIndex">{plyIndex + 1}.</div>
                            <div className="recordDetails">
                                <div className={`playMessage`}>{isWinner ? <div>{ply?.winner} <span className={`${isWinner ? `winner` : `loser`}`}>Win</span> over <span className={`loser`}>{ply?.loser}</span></div> : <div><span className={`${isWinner ? `winner` : `loser`}`}>Loss</span> to {ply?.winner}</div>}
                                    <div className="stocksRow">
                                        <div className="stocks">
                                            {isWinner ? ply?.stocks?.length > 0 && ply?.stocks?.map((stok, stkIndex) => {
                                                return (
                                                    <span key={stkIndex} className={stok?.dead ? `dead x` : `living`}>
                                                        <img className={`charImg`} width={35} src={calcPlayerCharacterIcon(stok?.character)} alt={getCharacterTitle(stok?.character)} />
                                                    </span>
                                                )
                                            }) : ply?.lossStocks?.map((stok, stkIndex) => {
                                                return (
                                                    <span key={stkIndex} className={stok?.dead ? `dead x` : `living`}>
                                                        <img className={`charImg`} width={35} src={calcPlayerCharacterIcon(stok?.character)} alt={getCharacterTitle(stok?.character)} />
                                                    </span>
                                                )
                                            })}
                                        </div>
                                    vs 
                                        <div className="otherStocks">
                                            {!isWinner ? ply?.stocks?.length > 0 && ply?.stocks?.map((stok, stkIndex) => {
                                                return (
                                                    <span key={stkIndex} className={stok?.dead ? `dead x` : `living`}>
                                                        <img className={`charImg`} width={35} src={calcPlayerCharacterIcon(stok?.character)} alt={getCharacterTitle(stok?.character)} />
                                                    </span>
                                                )
                                            }) : ply?.lossStocks?.map((stok, stkIndex) => {
                                                return (
                                                    <span key={stkIndex} className={stok?.dead ? `dead x` : `living`}>
                                                        <img className={`charImg`} width={35} src={calcPlayerCharacterIcon(stok?.character)} alt={getCharacterTitle(stok?.character)} />
                                                    </span>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                                <div className="recordSubDetails">
                                    <div className="playDate expChanges preChanges">
                                        <span className={`winner`}>{ply.winner}</span> Lvl: <span className={`preChange`}>{winnerLevel}</span> & XP: <span className={`preChange`}>{winnerXP}</span>, <span>{ply.loser}</span> Lvl: <span className={`preChange`}>{loserLevel}</span> & XP: <span className={`preChange`}>{loserXP}</span>
                                    </div>
                                    <div className="playDate expChanges">{`>>>`}</div>
                                    <div className="playDate expChanges postChanges">
                                        New <span className={`winner`}>{ply.winner}</span> Lvl: <span className={`postChange`}>{winnerNewLevel}</span> & XP: <span className={`postChange`}>{winnerNewExperience}</span>, 
                                        New <span>{ply.loser}</span> Lvl: <span className={`postChange`}>{loserNewLevel}</span> & XP: <span className={`postChange`}>{loserNewExperience}</span>
                                    </div>
                                </div>
                                <div className="bottomButtonRow recordSubDetails">
                                    <div className="playDate commandDate">{ply?.date}</div>
                                    <button disabled={false} type={`button`} onClick={(e) => undoPlay(e, ply, updateParams)} className={`buttonLike commandUndoSubmit textShadowThis`}>Undo this Play</button>
                                </div>
                            </div>
                        </li>
                    )}) : <div className={`noPlaysYet`}>
                        No Plays Yet
                </div>}
            </ul>
        </div>
    )
}