import { useState } from 'react';
import CodeBlock from './CodeBlock';
import Command from '../models/Command';

export function Commands(props) {
  let { commands } = props;
  let [commandsToRender, setCommandsToRender] = useState<Command[]>(Object.values(commands).map((comm: Command) => {
    return new Command(comm.id, comm.name, comm.command, comm.description);
  }));

  return (
    <ul className={`commandsList`}>
      {commandsToRender.map((comm: Command, commIndex) => {
        return (
          <li key={commIndex}>
            {commIndex + 1}.
            <CodeBlock id={`comm-${comm?.id}`} language={`js`}>
              {comm?.command}
            </CodeBlock>
            <div className={`desc`}>{comm?.description}</div>
          </li>
        )
      })}
    </ul>
  )
}