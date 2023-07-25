import Stock from "./Stock";

export default class Play {
  id?: any;
  uuid?: any;
  date: string;
  loser: string;
  winner: string;
  stocks: Stock[];
  character: string;
  stocksTaken: number;
  lossStocks: Stock[];
  otherCharacter: string;
  [key: string]: any;

  constructor(
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
  ) {
    this.id = id;
    this.uuid = uuid;
    this.date = date;
    this.loser = loser;
    this.winner = winner;
    this.stocks = stocks;
    this.character = character;
    this.stocksTaken = stocksTaken;
    this.lossStocks = lossStocks;
    this.otherCharacter = otherCharacter;
  }
}