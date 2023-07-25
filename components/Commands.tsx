import { useState } from 'react';
import CodeBlock from './CodeBlock';
import Command from '../models/Command';

export function Commands(props) {
  let { commands, devEnv } = props;
  let [commandsToRender, setCommandsToRender] = useState<Command[]>(Object.values(commands).map((comm: Command) => {
    let { id, name, command, description } = comm;
    return new Command(id, name, command, description) as Command;
  }));

  devEnv && console.log(`Commands`, commandsToRender);

  return (
    <ul className={`commandsList`}>
      {commandsToRender.map((comm: Command, commIndex) => {
        return (
          <li className={`listedCommand`} key={commIndex}>
            <span className="commandIndex">{commIndex + 1}.</span>
            <div className="commandDetails flex gap15">
              <CodeBlock id={`comm-${comm?.id}`} language={`js`}>
                {comm?.command}
              </CodeBlock>
              <div className={`desc`}>{comm?.description}</div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}