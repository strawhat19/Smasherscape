import Update from "./Update";

export default class Role {
    id?: any;
    uuid?: any;
    name: string;
    dateAdded?: string;
    description?: string;
    dateUpdated?: string;
    lastUpdatedBy: Update;
    [key: string]: any;
    constructor(
      id: any,
      name: string,
      lastUpdatedBy: Update,
      description?: string,
      dateUpdated?: string,
      dateAdded?: string,
      uuid?: any,
    ) {
      this.id = id;
      this.uuid = uuid;
      this.name = name;
      this.dateAdded = dateAdded;
      this.dateUpdated = dateUpdated;
      this.description = description;
      this.lastUpdatedBy = lastUpdatedBy;
    }
  }