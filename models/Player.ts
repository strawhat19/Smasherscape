import Play from "./Play";
import Role from "./Role";
import Level from "./Level";
import Experience from "./Experience";

export default class Player {
  [key: string]: any;

  constructor(playerObj: {
    id?: any,
    name?: string,
    level?: Level,
    plays?: Play[],
    expanded?: boolean,
    experience?: Experience,
    xpModifier?: number,
    ID?: any,
    uuid?: any,
    label?: string,
    bio?: string,
    wins?: Play[],
    created?: any,
    updated?: any,
    roles?: Role[],
    disabled?: any,
    email?: string,
    kills?: number,
    losses?: Play[],
    deaths?: number,
    kdRatio?: number,
    playerLink?: any,
    preferences?: any,
    username?: string,
    uniqueIndex?: number,
    lastUpdated?: any,
    password?: string,
    lastUpdatedBy?: any,
    displayName?: string,
    description?: string,
  }) {
    Object.assign(this, playerObj);
  }
}