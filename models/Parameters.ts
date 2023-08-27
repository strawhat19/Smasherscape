export default class Parameters {
    [key: string]: any;
    constructor(parameterObject: {
        command: any, 
        players: any, 
        setPlayers: any, 
        useDatabase: any,
        commandParams: any, 
        deleteCompletely: any, 
        databasePlayers?: any, 
        updatePlayersDB?: any,
        setFilteredPlayers?: any, 
        sameNamePlayeredEnabled?: any,
    }) {
      Object.assign(this, parameterObject);
    }
  }