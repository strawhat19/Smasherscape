export default class Command {
  [key: string]: any;
  constructor(
    public id: any,
    public name: string,
    public command: string,
    public description: string,
    public triggers?: string[],
    public example?: string,
    public uuid?: any,
  ) {
    this.id = id;
    this.uuid = uuid;
    this.name = name;
    this.command = command;
    this.example = example;
    this.triggers = triggers;
    this.description = description;
  }
}