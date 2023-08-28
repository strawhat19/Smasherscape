export default class Parameters {
    [key: string]: any;
    constructor(parameterObject: {
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