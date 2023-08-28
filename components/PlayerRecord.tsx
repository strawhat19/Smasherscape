import Play from '../models/Play';
import Player from '../models/Player';
import PlayerOption from './PlayerOption';
import { StateContext } from '../pages/_app';
import TextField from '@mui/material/TextField';
import CharacterOption from './CharacterOption';
import Autocomplete from '@mui/material/Autocomplete';
import { useContext, useState, useEffect } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { calcPlayerCharacterIcon } from '../common/CharacterIcons';
import { calcPlayerCharacterTimesPlayed, calcPlayerCharactersPlayed, getCharacterTitle, publicAssetLink } from './smasherscape';
import { getAllCharacters, getCharacterObjects, getUniqueCharactersPlayed, searchBlur } from './PlayerForm';
import { Characters } from '../common/Characters';
import { Badge } from '@mui/material';

export const parseDate = (dateStr: any) => {
    const parts = dateStr.split(`, `);
    const timePart = parts[0];
    const datePart = parts[1];
    const datePartWithoutSuffix = datePart.replace(/(\d+)(st|nd|rd|th)/, `$1`);
    const newDateStr = `${datePartWithoutSuffix}, ${timePart}`;
    return new Date(newDateStr) as any;
}

export const removeTrailingZeroDecimal = (number) => {
    let num = typeof number == `string` ? parseFloat(number) : number;
    const wholeNumber = Math.trunc(num);
    const decimalPart = num - wholeNumber;
    let resultingNumber;
    if (decimalPart === 0) {
        resultingNumber = wholeNumber;
    } else {
        resultingNumber = num.toFixed(1);
    }
    return isNaN(resultingNumber) ? 0 : resultingNumber;
}

export const calcPlayerKills = (player: Player, plays: Play[]) => {
    let wins = plays.filter(ply => ply?.winner == player?.name)?.length;
    let losses = plays.filter(ply => ply?.winner != player?.name);
    let lossKills = losses?.map(loss => loss?.stocksTaken)?.reduce((partialSum, a) => partialSum + a, 0);
    let winKills = wins * 3;
    return winKills + lossKills;
}

export const calcPlayerDeaths = (player: Player, plays: Play[]) => {
    let losses = plays.filter(ply => ply?.winner != player?.name)?.length;
    let wins = plays.filter(ply => ply?.winner == player?.name);
    let winDeaths = wins?.map(win => win?.stocksTaken)?.reduce((partialSum, a) => partialSum + a, 0);
    let lossDeaths = losses * 3;
    return lossDeaths + winDeaths;
}

export const calcPlayerKDRatio = (player: Player, plays: Play[]) => {
    let kd = calcPlayerKills(player, plays) / calcPlayerDeaths(player, plays);
    let kdRatio = removeTrailingZeroDecimal(kd);
    return parseFloat(kdRatio);
}

function PlayerRecord(props) {
  let { plyr } = props;
  const { players, filteredPlayers, devEnv, useLazyLoad } = useContext<any>(StateContext);
  let [plays, setPlays] = useState(plyr?.plays?.sort((a: any, b: any) => parseDate(b.date) - parseDate(a.date)));

  useEffect(() => {
    setPlays(plyr?.plays?.sort((a: any, b: any) => parseDate(b.date) - parseDate(a.date)));
  }, [players])

  const searchRecordPlayers = (e: any, value?: any) => {
    if (value) {
        let searchTerm;
        if (typeof value == `string`) {
            searchTerm = value;
        } else {
            searchTerm = value?.name;
        }
        setPlays(plyr?.plays.filter(ply => ply?.winner == searchTerm || ply?.loser == searchTerm));
    } else {
        setPlays(plyr?.plays);
    }
    devEnv && console.log(`Search Record Players`, {e, value, plays});
  }

  const searchRecordCharacters = (e: any, value?: any) => {
    if (value) {
        let searchTerm;
        if (typeof value == `string`) {
            searchTerm = value;
        } else {
            searchTerm = value?.label;
        }
        setPlays(plyr?.plays.filter(ply => ply?.character == searchTerm || ply?.otherCharacter == searchTerm));
    } else {
        setPlays(plyr?.plays);
    }
    devEnv && console.log(`Search Record Characters`, {e, value, plays});
  }

    const getCharacterObjs = (active) => {
        if (active == true) {
            return getAllCharacters().filter(char => getUniqueCharactersPlayed(players).includes(char[1]))
            .filter(char => plyr?.plays.map(ply => ply.otherCharacter).includes(char[1])).map((char, charIndex) => {
                return {
                    id: charIndex + 1,
                    key: char[0],
                    label: char[1],
                    image: calcPlayerCharacterIcon(char[0]),
                    shortcuts: Object.entries(Characters).filter(entry => entry[1] == char[1]).map(entr => entr[0]),
                }
            })
        } else {
            return getCharacterObjects();
        }
    }

  const calcWinLoseRatio = (playerOne, playerTwo) => {
    let playerOneDB: Player = players?.find(plyr => plyr?.name.toLowerCase() == playerOne.toLowerCase() || plyr?.name.toLowerCase().includes(playerOne));
    let playerTwoDB: Player = players?.find(plyr => plyr?.name.toLowerCase() == playerTwo.toLowerCase() || plyr?.name.toLowerCase().includes(playerTwo));
    let plays: Play[] = playerOneDB?.plays.filter(ply => ply?.winner == playerTwoDB?.name || ply?.loser == playerTwoDB?.name);
    let wins = plays.filter(ply => ply?.winner == playerOneDB?.name)?.length;
    let losses = plays.filter(ply => ply?.loser == playerOneDB?.name)?.length;
    let winRate = (wins/(wins+losses)) * 100;
    let winPercentage = (winRate) > 100 ? 100 : removeTrailingZeroDecimal(winRate);
    return <div className={`winRateDetails`}>
        <div className={`winPercentage ${winPercentage > 50 ? winPercentage == 100 ? `perfect` : `positive` : winPercentage > 24 ? `challenger` : `negative`}`}>({winPercentage}%)</div>
        <div className="winsToLossses">{wins} Wins - {losses} Losses</div>
    </div>
  }

  return (
    <div className={`recordOfPlayer ${plyr?.expanded ? `expanded` : `collapsed`}`}>
        {useLazyLoad ? (
            <>
                <LazyLoadImage effect="blur" src={`${publicAssetLink}/assets/smasherscape/OSRS_Card_Empty.png?raw=true`} className={`cardBG`} alt={`Smasherscape Player Card`} />
                <LazyLoadImage effect="blur" src={`${publicAssetLink}/assets/smasherscape/OSRS_Card_Template_Border_Only.png?raw=true`} className={`cardBG border`} alt={`Smasherscape Player Card`} />
            </>
        ) : (
            <>
                <img src={`${publicAssetLink}/assets/smasherscape/OSRS_Card_Empty.png?raw=true`} className={`cardBG`} alt={`Smasherscape Player Card`} />
                <img src={`${publicAssetLink}/assets/smasherscape/OSRS_Card_Template_Border_Only.png?raw=true`} className={`cardBG border`} alt={`Smasherscape Player Card`} />
            </>
        )}
        <ul className="recordList">
            <h3 className={`greenRecordText`}>
                <div className={`flex playerRecordBegin`}>
                    {plyr?.name}'s Record
                    <span className={`recordPlays ${plyr?.plays?.length > 0 ? `populated` : `empty`}`}>
                        {plyr?.plays?.length > 0 && <span className={`goldText`}>K/D: <span className="whiteText kdRatioNum">{calcPlayerKDRatio(plyr, plays)}</span></span>}
                        <span className={`greenText`}>Kills: <span className="whiteText">{calcPlayerKills(plyr, plays)}</span></span>
                        <span className={`redText`}>Deaths: <span className="whiteText">{calcPlayerDeaths(plyr, plays)}</span></span>
                        <span className={`blueText`}>Plays: <span className="whiteText">{plays?.length}</span></span>
                    </span>
                </div>
                {plays?.length > 0 && <div className={`playsContainer playerRecordPlaysContainer ${calcPlayerCharactersPlayed(plyr, false)?.length > 0 ? (calcPlayerCharactersPlayed(plyr, false)?.length >= 5 ? `populatedPlays moreThanFive` : `populatedPlays`) : ``}`}>
                    {calcPlayerCharactersPlayed(plyr, false)?.length > 0 ? calcPlayerCharactersPlayed(plyr, false).map((char, charIndex) => {
                        return (
                            <Badge title={`Played ${getCharacterTitle(char)} ${calcPlayerCharacterTimesPlayed(plyr, char)} Time(s)`} key={charIndex} badgeContent={calcPlayerCharacterTimesPlayed(plyr, char)} color="primary">
                                <img className={`charImg`} width={35} src={calcPlayerCharacterIcon(char)} alt={getCharacterTitle(char)} />
                            </Badge>
                        )
                    }) : <div className={`flex center blackTextShadow slimmed`}>
                        No Plays Yet
                    </div>}
                </div>}
                {plyr?.plays?.length > 0 && <div className="flex white noShadow recordForms">
                    <form action="submit" className="gridForm recordForm">
                        <div className={`inputWrapper materialBGInputWrapper`}>
                            <div className="inputBG materialBG"></div>
                            <Autocomplete
                                autoHighlight
                                id={`recordPlayerSearch-${plyr.id}`}
                                sx={{ width: `100%` }}
                                options={players.filter(playr => playr.name != plyr.name && (plyr.plays.map(ply => ply.winner).includes(playr.name) || plyr.plays.map(ply => ply.loser).includes(playr.name))).sort((a, b) => {
                                    if (b.experience.arenaXP !== a.experience.arenaXP) {
                                        return b.experience.arenaXP - a.experience.arenaXP;
                                    }
                                    return b.plays.length - a.plays.length;
                                })}
                                getOptionLabel={(option) => option.label}
                                onChange={(e, val: any) => searchRecordPlayers(e, val)}
                                onInputChange={(e, val: any) => searchRecordPlayers(e, val)}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                renderInput={(params) => <TextField name={`search`} onBlur={(e) => searchBlur(e, filteredPlayers)} {...params} label="Player(s)..." />}
                                renderOption={(props: any, playerOption: any) => {
                                    return (
                                        <div key={playerOption.id} {...props}>
                                            <PlayerOption playerOption={playerOption}  />
                                        </div>
                                    )
                                }}
                            />
                        </div>
                        <div className={`characterSearchAuto inputWrapper materialBGInputWrapper`}>
                            <div className="inputBG materialBG"></div>
                            <Autocomplete
                                autoHighlight
                                id={`recordPlayerCharacterSearch-${plyr.id}`}
                                sx={{ width: `100%` }}
                                options={getCharacterObjs(true)}
                                getOptionLabel={(option) => option.label}
                                onChange={(e, val: any) => searchRecordCharacters(e, val)}
                                onInputChange={(e, val: any) => searchRecordCharacters(e, val)}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                renderInput={(params) => <TextField name={`characters`} {...params} label="Character(s)..." />}
                                renderOption={(props: any, characterOption: any) => {
                                    return (
                                        <div key={characterOption.id} {...props}>
                                            <CharacterOption plays={plyr.plays} type={`Other Player`} characterOption={characterOption} />
                                        </div>
                                    )
                                }}
                            />
                        </div>
                        <button className={`formSubmitButton recordFormSubmit`} type={`submit`}>Submit</button>
                    </form>
                </div>}
            </h3>
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
                                {calcWinLoseRatio(isWinner ? ply?.winner : ply?.loser, isWinner ? ply?.loser : ply?.winner)}
                            </div>
                            <div className="playDate">{ply?.date}</div>
                        </div>
                        </div>
                    </li>
                )
            }) : <div className={`noPlaysYet`}>
            No Plays Yet
        </div>}
        </ul>
    </div>
  )
}

export default PlayerRecord