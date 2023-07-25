import Update from "./Update";

export default class Role {
  [key: string]: any;
  constructor(
    public id: any,
    public name: string,
    public lastUpdatedBy: Update,
    public description?: string,
    public dateUpdated?: string,
    public dateAdded?: string,
    public uuid?: any,
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