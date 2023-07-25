import Player from "./Player";

export default class Update {
  [key: string]: any;
  constructor(
    public date: string,
    public lastUpdatedBy: Player,
    public id?: any,
    public uuid?: any,
    public description?: string,
  ) {
    this.id = id;
    this.uuid = uuid;
    this.date = date;
    this.description = description;
    this.lastUpdatedBy = lastUpdatedBy;
  }
}