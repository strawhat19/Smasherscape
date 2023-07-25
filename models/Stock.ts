export default class Stock {
    character: string;
    dead?: boolean;
    uuid?: any;
    id?: any;
    [key: string]: any;
    constructor(
        character: string,
        dead?: boolean,
        uuid?: any,
        id?: any,
    ) {
      this.character = character;
      this.dead = dead;
      this.uuid = uuid;
      this.id = id;
    }
}