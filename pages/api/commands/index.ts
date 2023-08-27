import Command from '../../../models/Command';
import type { NextApiRequest, NextApiResponse } from 'next';
import { isInvalid } from '../../../components/smasherscape';
import { defaultCommands } from '../../../components/Commands';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === `GET`) {
    try {
      res.status(200).json(Object.values(defaultCommands).map((comm: Command) => {
        let commandObj = new Command(comm);
        Object.keys(commandObj).forEach(key => isInvalid(commandObj[key]) && delete commandObj[key]);
        return commandObj as Command;
      }));
    } catch (error) {
      res.status(500).json({ error: `Failed to fetch plays.` });
    }
  } else {
    res.status(405).json({ error: `Method not allowed.` });
  }
}
