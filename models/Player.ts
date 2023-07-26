import Play from "./Play";
import Role from "./Role";
import Level from "./Level";
import Update from "./Update";
import Experience from "./Experience";

export default class Player {
  [key: string]: any;

  constructor(
    public id: any,
    public name: string,
    public level: Level,
    public plays: Play[],
    public expanded: boolean,
    public experience: Experience,
    public xpModifier?: number,
    public uuid?: any,
    public bio?: string,
    public wins?: Play[],
    public roles?: Role[],
    public email?: string,
    public kills?: number,
    public losses?: Play[],
    public deaths?: number,
    public kdRatio?: number,
    public username?: string,
    private password?: string,
    public lastUpdated?: Update,
    public description?: string,
  ) {
    this.id = id;
    this.bio = bio;
    this.uuid = uuid;
    this.name = name;
    this.wins = wins;
    this.email = email;
    this.kills = kills;
    this.level = level;
    this.plays = plays;
    this.roles = roles;
    this.deaths = deaths;
    this.losses = losses;
    this.kdRatio = kdRatio;
    this.username = username;
    this.password = password;
    this.expanded = expanded;
    this.xpModifier = xpModifier;
    this.experience = experience;
    this.description = description;
  }
}