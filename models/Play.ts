import Stock from "./Stock";

export default class Play {
  [key: string]: any;
  constructor(playObj: {
    date: string,
    loser: string,
    winner: string,
    stocks: Stock[],
    character: string,
    stocksTaken: number,
    lossStocks: Stock[],
    otherCharacter: string,
    expGained?: any,
    prevExp?: any,
    newExp?: any,
    uuid?: any,
    id?: any,
  }) {
    Object.assign(this, playObj);
  }
}