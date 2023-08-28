import Role from "./Role";

export default class User {
  [key: string]: any;

  constructor(userObj: {
    ID: string,
    id: string,
    uid: string,
    type: string,
    uuid: string,
    created: any,
    updated: any,
    email: string,
    lastUpdated: any,
    lastSignIn: any,
    validSince: any,
    lastRefresh: any,
    playerLink: boolean,
    active?: boolean,
    name?: string,
    roles?: Role[],
    image?: string,
    source?: string,
    password?: string,
    properties?: number,
    uniqueIndex: number,
    firebaseUser?: any,
    playerUUID?: string,
    userCredential?: any,
    emailVerified: boolean,
    passwordUpdatedAt?: any,
  }) {
    Object.assign(this, userObj);
  }
}