import Stock from "./Stock";

export default class Play {
  [key: string]: any;
  // constructor(
    // public date: string,
    // public loser: string,
    // public winner: string,
    // public stocks: Stock[],
    // public character: string,
    // public stocksTaken: number,
    // public lossStocks: Stock[],
    // public otherCharacter: string,
    // public uuid?: any,
    // public id?: any,
  // ) {
  //   this.id = id;
  //   this.uuid = uuid;
  //   this.date = date;
  //   this.loser = loser;
  //   this.winner = winner;
  //   this.stocks = stocks;
  //   this.character = character;
  //   this.stocksTaken = stocksTaken;
  //   this.lossStocks = lossStocks;
  //   this.otherCharacter = otherCharacter;
  // }
  constructor(playObj: {
    date: string,
    loser: string,
    winner: string,
    stocks: Stock[],
    character: string,
    stocksTaken: number,
    lossStocks: Stock[],
    otherCharacter: string,
    uuid?: any,
    id?: any,
  }) {
    Object.assign(this, playObj);
  }
}