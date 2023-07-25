import { useContext } from 'react';
import { Badge } from '@mui/material';
import { StateContext } from '../pages/_app';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { calcPlayerCharacterIcon } from '../common/CharacterIcons';
import { calcPlayerCharacterTimesPlayed, calcPlayerCharactersPlayed, calcPlayerLevelImage, getActivePlayers, getCharacterTitle, publicAssetLink, searchBlur } from './smasherscape';

function PlayerRecord(props) {
  let { plyr } = props;
  const { players, filteredPlayers, setFilteredPlayers, devEnv } = useContext<any>(StateContext);

  const search = (e: any, value?: any) => {
    console.log(`Search`, {e, value});
  }

  const parseDate = (dateStr: any) => {
    const parts = dateStr.split(", ");
    const timePart = parts[0];
    const datePart = parts[1];
    const datePartWithoutSuffix = datePart.replace(/(\d+)(st|nd|rd|th)/, "$1");
    const newDateStr = `${datePartWithoutSuffix}, ${timePart}`;
    return new Date(newDateStr) as any;
  }

  const removeTrailingZeroDecimal = (number) => {
    let num = typeof number == `string` ? parseFloat(number) : number;
    const wholeNumber = Math.trunc(num);
    const decimalPart = num - wholeNumber;
    if (decimalPart === 0) {
      return wholeNumber;
    } else {
      return num.toFixed(1);
    }
  }

  const calcPlayerKills = (player, plays) => {
    let wins = plays.filter(ply => ply?.winner == player?.name)?.length;
    let losses = plays.filter(ply => ply?.winner != player?.name);
    let lossKills = losses?.map(loss => loss?.stocksTaken)?.reduce((partialSum, a) => partialSum + a, 0);
    let winKills = wins * 3;
    return winKills + lossKills;
  }

  const calcPlayerDeaths = (player, plays) => {
    let losses = plays.filter(ply => ply?.winner != player?.name)?.length;
    let wins = plays.filter(ply => ply?.winner == player?.name);
    let winDeaths = wins?.map(win => win?.stocksTaken)?.reduce((partialSum, a) => partialSum + a, 0);
    let lossDeaths = losses * 3;
    return lossDeaths + winDeaths;
  }

  const calcPlayerKDRatio = (player, plays) => {
    let kd = calcPlayerKills(player, plays) / calcPlayerDeaths(player, plays);
    let kdRatio = removeTrailingZeroDecimal(kd);
    return kdRatio;
  }

  const calcWinLoseRatio = (playerOne, playerTwo) => {
    let playerOneDB = players.find(plyr => plyr?.name == playerOne || plyr?.name.toLowerCase().includes(playerOne));
    let playerTwoDB = players.find(plyr => plyr?.name == playerTwo || plyr?.name.toLowerCase().includes(playerTwo));
    let plays = playerOneDB.plays.filter(ply => ply?.winner == playerTwoDB.name || ply?.loser == playerTwoDB.name);
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
        <LazyLoadImage effect="blur" src={`${publicAssetLink}/assets/smasherscape/OSRS_Card_Empty.png?raw=true`} className={`cardBG`} alt={`Smasherscape Player Card`} />
        <LazyLoadImage effect="blur" src={`${publicAssetLink}/assets/smasherscape/OSRS_Card_Template_Border_Only.png?raw=true`} className={`cardBG border`} alt={`Smasherscape Player Card`} />
        <ul className="recordList">
            <h3 className={`greenRecordText`}>
                <div className={`flex playerRecordBegin`}>
                    Player Record
                    <span className="recordPlays">
                        {plyr?.plays?.length > 0 && <span className={`goldText`}>K/D: <span className="whiteText kdRatioNum">{calcPlayerKDRatio(plyr, plyr?.plays)}</span></span>}
                        <span className={`greenText`}>Kills: <span className="whiteText">{calcPlayerKills(plyr, plyr?.plays)}</span></span>
                        <span className={`redText`}>Deaths: <span className="whiteText">{calcPlayerDeaths(plyr, plyr?.plays)}</span></span>
                        <span className={`blueText`}>Plays: <span className="whiteText">{plyr?.plays?.length}</span></span>
                    </span>
                </div>
                {plyr?.plays?.length > 0 && devEnv && <div className="flex white noShadow">
                    <form action="submit" className="gridForm recordForm">
                        <div className={`inputWrapper materialBGInputWrapper`}>
                            <div className="inputBG materialBG"></div>
                            <Autocomplete
                                disablePortal
                                autoHighlight
                                id="combo-box-demo"
                                sx={{ width: `100%` }}
                                options={getActivePlayers(players).map(plyr => {
                                    return {
                                        ...plyr,
                                        label: plyr.name,
                                    }
                                })}
                                getOptionLabel={(option) => option.label}
                                onChange={(e, val: any) => search(e, val)}
                                onInputChange={(e, val: any) => search(e, val)}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                renderInput={(params) => <TextField name={`search`} onBlur={(e) => searchBlur(e, filteredPlayers)} {...params} label="Search..." />}
                                renderOption={(props: any, option: any) => {
                                    return (
                                        <div key={props?.key} {...props}>
                                            <div className="autocompleteOption">
                                                <div className="levelNumColumn">{option?.level?.num}</div>
                                                <div className="levelImageColumn"><img width={30} src={calcPlayerLevelImage(option?.level?.name)} alt={option?.level?.name} /></div>
                                                <div className="playerDetailsColumn">
                                                    <div className="playerName">{option?.label}</div>
                                                    <div className="playerEXP">{option?.experience?.arenaXP}</div>
                                                    <div className="plays">
                                                        <div className={`playsContainer`}>
                                                            {calcPlayerCharactersPlayed(option).map((char, charIndex) => {
                                                                return (
                                                                    <Badge title={`Played ${getCharacterTitle(char)} ${calcPlayerCharacterTimesPlayed(option, char)} Time(s)`} key={charIndex} badgeContent={calcPlayerCharacterTimesPlayed(option, char)} color="primary">
                                                                        <img className={`charImg`} width={25} src={calcPlayerCharacterIcon(char)} alt={getCharacterTitle(char)} />
                                                                    </Badge>
                                                                )
                                                            })}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }}
                            />
                        </div>
                        <div className={`inputWrapper materialBGInputWrapper`}>
                            <div className="inputBG materialBG"></div>
                            <Autocomplete
                                disablePortal
                                autoHighlight
                                id="combo-box-demo"
                                sx={{ width: `100%` }}
                                options={getActivePlayers(players).map(plyr => {
                                    return {
                                        ...plyr,
                                        label: plyr.name,
                                    }
                                })}
                                getOptionLabel={(option) => option.label}
                                onChange={(e, val: any) => search(e, val)}
                                onInputChange={(e, val: any) => search(e, val)}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                renderInput={(params) => <TextField name={`search`} onBlur={(e) => searchBlur(e, filteredPlayers)} {...params} label="Search..." />}
                                renderOption={(props: any, option: any) => {
                                    return (
                                        <div key={props?.key} {...props}>
                                            <div className="autocompleteOption">
                                                <div className="levelNumColumn">{option?.level?.num}</div>
                                                <div className="levelImageColumn"><img width={30} src={calcPlayerLevelImage(option?.level?.name)} alt={option?.level?.name} /></div>
                                                <div className="playerDetailsColumn">
                                                    <div className="playerName">{option?.label}</div>
                                                    <div className="playerEXP">{option?.experience?.arenaXP}</div>
                                                    <div className="plays">
                                                        <div className={`playsContainer`}>
                                                            {calcPlayerCharactersPlayed(option).map((char, charIndex) => {
                                                                return (
                                                                    <Badge title={`Played ${getCharacterTitle(char)} ${calcPlayerCharacterTimesPlayed(option, char)} Time(s)`} key={charIndex} badgeContent={calcPlayerCharacterTimesPlayed(option, char)} color="primary">
                                                                        <img className={`charImg`} width={25} src={calcPlayerCharacterIcon(char)} alt={getCharacterTitle(char)} />
                                                                    </Badge>
                                                                )
                                                            })}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }}
                            />
                        </div>
                        <button className={`formSubmitButton`} type={`submit`}>Submit</button>
                    </form>
                </div>}
            </h3>
            {plyr?.plays?.length > 0 ? plyr?.plays?.sort((a: any, b: any) => parseDate(b.date) - parseDate(a.date)).map((ply, plyIndex) => {
                let isWinner = ply?.winner == plyr?.name;
                return (
                    <li className={`playerPlay`} key={plyIndex}>
                        <div className="plyIndex">{plyIndex + 1}.</div>
                        <div className="recordDetails">
                        <div className={`playMessage`}>{isWinner ? <div><span className={`${isWinner ? `winner` : `loser`}`}>Win</span> over {ply?.loser}</div> : <div><span className={`${isWinner ? `winner` : `loser`}`}>Loss</span> to {ply?.winner}</div>}
                            <div className="stocksRow">
                                <div className="stocks">
                                    {ply?.stocks?.map(stk => stk.character)?.includes(ply?.character) ? ply?.stocks?.length > 0 && ply?.stocks?.map((stok, stkIndex) => {
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
                                    {ply?.stocks?.map(stk => stk.character)?.includes(ply?.otherCharacter) ? ply?.stocks?.length > 0 && ply?.stocks?.map((stok, stkIndex) => {
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