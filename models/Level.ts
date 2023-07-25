export default class Level {
    name: string;
    num: number;
    uuid?: any;
    id?: any;
    [key: string]: any;
    constructor(
        name: string,
        num: number,
        uuid?: any,
        id?: any,
    ) {
      this.name = name;
      this.uuid = uuid;
      this.num = num;
      this.id = id;
    }
}