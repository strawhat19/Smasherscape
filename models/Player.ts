import Play from "./Play";
import Role from "./Role";
import Level from "./Level";
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
    public ID?: any,
    public uuid?: any,
    public bio?: string,
    public wins?: Play[],
    public created?: any,
    public updated?: any,
    public roles?: Role[],
    public disabled?: any,
    public email?: string,
    public kills?: number,
    public losses?: Play[],
    public deaths?: number,
    public kdRatio?: number,
    public playerLink?: any,
    public preferences?: any,
    public username?: string,
    public lastUpdated?: any,
    private password?: string,
    public lastUpdatedBy?: any,
    public displayName?: string,
    public description?: string,
  ) {
    this.id = id;
    this.ID = ID;
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
    this.created = created;
    this.updated = updated;
    this.disabled = disabled;
    this.username = username;
    this.password = password;
    this.expanded = expanded;
    this.xpModifier = xpModifier;
    this.playerLink = playerLink;
    this.experience = experience;
    this.preferences = preferences;
    this.displayName = displayName;
    this.lastUpdated = lastUpdated;
    this.description = description;
    this.lastUpdatedBy = lastUpdatedBy;
  }
}