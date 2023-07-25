export default class Experience {
    nextLevelAt: number;
    remainingXP: number;
    arenaXP: number;
    xp: number;
    uuid?: any;
    id?: any;
    [key: string]: any;
    constructor(
        nextLevelAt: number,
        remainingXP: number,
        arenaXP: number,
        xp: number,
        uuid?: any,
        id?: any,
    ) {
      this.nextLevelAt = nextLevelAt;
      this.remainingXP = remainingXP;
      this.arenaXP = arenaXP;
      this.uuid = uuid;
      this.xp = xp;
      this.id = id;
    }
}