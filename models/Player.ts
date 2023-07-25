import Experience from "./Experience";
import Level from "./Level";
import Play from "./Play";
import Role from "./Role";

export default class Player {
  id: any;
  uuid?: any;
  bio?: string;
  name: string;
  level: Level;
  plays: Play[];
  roles?: Role[];
  wins?: Play[];
  losses?: Play[];
  kills?: number;
  deaths?: number;
  kdRatio?: number;
  expanded: boolean;
  description?: string;
  experience: Experience;
  [key: string]: any;

  constructor(
    id: any,
    name: string,
    level: Level,
    plays: Play[],
    expanded: boolean,
    experience: Experience,
    description?: string,
    wins?: Play[],
    losses?: Play[],
    kills?: number,
    deaths?: number,
    kdRatio?: number,
    roles?: Role[],
    bio?: string,
    uuid?: any,
  ) {
    this.id = id;
    this.bio = bio;
    this.uuid = uuid;
    this.name = name;
    this.wins = wins;
    this.kills = kills;
    this.level = level;
    this.plays = plays;
    this.roles = roles;
    this.deaths = deaths;
    this.losses = losses;
    this.kdRatio = kdRatio;
    this.expanded = expanded;
    this.experience = experience;
    this.description = description;
  }
}