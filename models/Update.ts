import Player from "./Player";

export default class Update {
    id?: any;
    uuid?: any;
    date: string;
    description?: string;
    lastUpdatedBy: Player;
    [key: string]: any;
    constructor(
        date: string,
        lastUpdatedBy: Player,
        id?: any,
        uuid?: any,
        description?: string,
    ) {
      this.id = id;
      this.uuid = uuid;
      this.date = date;
      this.description = description;
      this.lastUpdatedBy = lastUpdatedBy;
    }
  }