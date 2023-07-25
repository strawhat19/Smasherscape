export default class Level {
  [key: string]: any;
  constructor(
      public name: string,
      public num: number,
      public uuid?: any,
      public id?: any,
  ) {
    this.name = name;
    this.uuid = uuid;
    this.num = num;
    this.id = id;
  }
}