import type { NextApiRequest, NextApiResponse } from 'next';
import { getCharacterObjects } from '../../../components/PlayerForm';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === `GET`) {
    try {
      res.status(200).json(getCharacterObjects());
    } catch (error) {
      res.status(500).json({ error: `Failed to fetch characters.` });
    }
  } else {
    res.status(405).json({ error: `Method not allowed.` });
  }
}
