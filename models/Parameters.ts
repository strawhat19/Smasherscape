import Player from "./Player";
import User from "./User";

export default class Parameters {
    [key: string]: any;
    constructor(parameterObject: {
        user: User | Player,
        command: any, 
        players: any, 
        commands: any, 
        setPlayers: any, 
        useDatabase: any,
        commandParams: any,
        loadingPlayers?: any,
        setLoadingPlayers: any,
        updatePlayersDB?: any,
        databasePlayers?: any, 
        deleteCompletely: any, 
        setFilteredPlayers?: any, 
        sameNamePlayeredEnabled: any,
    }) {
      Object.assign(this, parameterObject);
    }
  }