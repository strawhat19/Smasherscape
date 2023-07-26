import { useState } from 'react';
import CodeBlock from './CodeBlock';
import Command from '../models/Command';
import { isInvalid } from './smasherscape';

export const defaultCommands = {
  List: {
    id: 1,
    name: `List`,
    command: `!com`,
    triggers: [`!com`, `!commands`],
    description: `List All Commands`,
  },
  Add: {
    id: 2,
    name: `Add`,
    command: `!add`,
    example: `!add name(s) of player(s)`,
    triggers: [`!add`, `!new`, `!create`, `!player`],
    description: `Add Player or Player(s) separated by spaces`,
  },
  Delete: {
    id: 3,
    name: `Delete`,
    command: `!del`,
    example: `!del name(s) of player(s)`,
    triggers: [`!del`, `!x`, `!delete`, `!remove`],
    description: `Delete Player or Player(s) separated by spaces`,
  },
  Reset: {
    id: 4,
    name: `Reset`,
    command: `!res`,
    triggers: [`!res`, `!reset`],
    description: `Reset Leaderboard`,
  },
  Update: {
    id: 5,
    name: `Update`,
    command: `!upd`,
    description: `Update Leaderboard`,
    triggers: [`!upd`, `!update`, `!game`, `!match`],
    example: `!upd winnerName 'beats' loserName loserStocksTakenFromWinner`,
  },
  Set: {
    id: 6,
    name: `Set`,
    command: `!set`,
    triggers: [`!set`, `!change`],
    example: `!set playerName (xp) amount`,
    description: `Set Parameter for Player`,
  },
  Give: {
    id: 7,
    name: `Give`,
    command: `!giv`,
    triggers: [`!giv`, `!give`],
    example: `!giv playerName (xp) amount`,
    description: `Give Parameter to Player`,
  },
};

export function Commands(props) {
  let { commands, devEnv } = props;
  let [commandsToRender, setCommandsToRender] = useState<Command[]>(Object.values(commands).map((comm: Command) => {
    let { id, name, command, description, triggers, example } = comm;
    let commandObj = new Command(id, name, command, description, triggers, example);
    Object.keys(commandObj).forEach(key => isInvalid(commandObj[key]) && delete commandObj[key]);
    return commandObj as Command;
  }));

  devEnv && console.log(`Commands`, commandsToRender);

  return (
    <ul className={`commandsList`}>
      {commandsToRender.map((comm: Command, commIndex) => {
        let commandMessage = comm?.example ? comm?.example : comm?.command;
        return (
          <li className={`listedCommand`} key={commIndex} title={`${comm?.description}: ${commandMessage}`}>
            <span className="commandIndex">{commIndex + 1}.</span>
            <div className="commandDetails flex gap15">
              <CodeBlock id={`comm-${comm?.id}`} language={`js`}>
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