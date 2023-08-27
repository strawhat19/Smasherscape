import { db } from '../../../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { databasePlayersCollectionName } from '../../_app';
import type { NextApiRequest, NextApiResponse } from 'next';
import { createPlayer } from '../../../components/PlayerForm';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === `POST`) {
    try {
      const { playerName, databasePlayers } = req.body;

      if (!playerName) {
        return res.status(400).json({ error: `Player name is required.` });
      }

      const newPlayer: any = createPlayer(playerName, 0, databasePlayers);
      await setDoc(doc(db, databasePlayersCollectionName, newPlayer?.ID), newPlayer);

      res.status(201).json(newPlayer);
    } catch (error) {
      res.status(500).json({ error: `Failed to create player.` });
    }
  } else {
    res.status(405).json({ error: `Method not allowed.` });
  }
}
