export default class Command {
  id: any;
  uuid?: any;
  name: string;
  command: string;
  description: string;
  [key: string]: any;
  constructor(
    id: any,
    name: string,
    command: string,
    description: string,
    uuid?: any,
  ) {
    this.id = id;
    this.uuid = uuid;
    this.name = name;
    this.command = command;
    this.description = description;
  }
}