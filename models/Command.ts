export default class Command {
  id: number;
  name: string;
  command: string;
  description: string;

  constructor(
    id: number,
    name: string,
    command: string,
    description: string,
  ) {
    this.id = id;
    this.name = name;
    this.command = command;
    this.description = description;
  }
}