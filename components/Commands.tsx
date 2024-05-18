import { useState } from 'react';
import CodeBlock from './CodeBlock';
import Command from '../models/Command';
import { isInvalid } from './smasherscape';

export const defaultSetParameter = `([Level_Experience_XP-Modifier])`;

export const defaultCommands = {
  List: {
    id: 1,
    name: `List`,
    command: `!com`,
    class: `listCommand`,
    triggers: [`!com`, `!commands`],
    description: `List All Commands`,
  },
  Add: {
    id: 2,
    name: `Add`,
    command: `!add`,
    class: `addCommand`,
    example: `!add name(s) of player(s)`,
    triggers: [`!add`, `!new`, `!create`, `!player`],
    description: `Add Player(s) separated by spaces`,
  },
  Delete: {
    id: 3,
    name: `Delete`,
    command: `!del`,
    class: `delCommand`,
    example: `!del name(s) of player(s)`,
    icon: <i className={`fas fa-trash-alt`}></i>,
    triggers: [`!del`, `!x`, `!delete`, `!remove`],
    shortDescription: `Delete Player(s) from Board`,
    description: `Delete Player(s) from Board separated by spaces`,
  },
  Update: {
    id: 4,
    name: `Update`,
    command: `!upd`,
    class: `updateCommand`,
    description: `Update Player(s) in Board`,
    icon: <i className={`fas fa-signal`}></i>,
    shortDescription: `Update Player(s) in Board`,
    triggers: [`!upd`, `!update`, `!game`, `!match`],
    example: `!upd winner vs loser with winChar vs loseChar stocksTakenFromWinner`,
  },
  Set: {
    id: 5,
    name: `Set`,
    command: `!set`,
    class: `setCommand`,
    triggers: [`!st`, `!set`, `!change`],
    icon: <i className={`fas fa-tools`}></i>,
    description: `Set Parameter for Player(s)`,
    shortDescription: `Set Parameter for Player(s)`,
    example: `!set name(s) of player(s) ${defaultSetParameter} amount`,
  },
  Give: {
    id: 6,
    name: `Give`,
    command: `!giv`,
    class: `giveCommand`,
    triggers: [`!giv`, `!give`],
    description: `Give Parameter to Player(s)`,
    icon: <i className={`fas fa-sliders-h`}></i>,
    shortDescription: `Give Parameter to Player(s)`,
    example: `!giv name(s) of player(s) (xp) amount`,
  },
  Undo: {
    id: 7,
    name: `Undo`,
    command: `!undo`,
    class: `undoCommand`,
    triggers: [`!und`, `!undo`],
    icon: <i className={`fas fa-undo`}></i>,
    example: `!undo previous update command(s)`,
    description: `Undo Previous Update Command(s)`,
    shortDescription: `Undo Previous Update Command(s)`,
  },
};

export function Commands(props) {
  let { id, commands, devEnv } = props;
  let [commandsToRender, setCommandsToRender] = useState<Command[]>(Object.values(commands).map((comm: Command) => {
    let commandObj = new Command(comm);
    Object.keys(commandObj).forEach(key => isInvalid(commandObj[key]) && delete commandObj[key]);
    return commandObj as Command;
  }));

  console.log(`Commands`, commandsToRender);

  return (
    <ul id={id} className={`commandsList`}>
      {commandsToRender.map((comm: Command, commIndex) => {
        let commandMessage = comm?.example ? comm?.example : comm?.command;
        return (
          <li className={`listedCommand`} key={commIndex} title={`${comm?.description}: ${commandMessage}`}>
            <span className="commandIndex">{commIndex + 1}.</span>
            <div className="commandDetails flex gap15">
              <CodeBlock custombutton={false} id={`comm-${comm?.id}`} language={`js`}>
                {commandMessage}
              </CodeBlock>
              <div className={`desc`}>{comm?.description}</div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}