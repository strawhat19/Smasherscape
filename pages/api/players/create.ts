import app, { db } from '../../../firebase';
import type { NextApiRequest, NextApiResponse } from 'next';
import { createPlayer } from '../../../components/PlayerForm';
import { doc, setDoc, collection, addDoc, getDocs, onSnapshot } from 'firebase/firestore';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === `POST`) {
    try {
      const { playerName, databasePlayers } = req.body;

      if (!playerName) {
        return res.status(400).json({ error: `Player name is required.` });
      }

      const newPlayer: any = createPlayer(playerName, 0, databasePlayers);
      await setDoc(doc(db, `players`, newPlayer?.ID), newPlayer);

      res.status(201).json(newPlayer);
    } catch (error) {
      res.status(500).json({ error: `Failed to create player.` });
    }
  } else {
    res.status(405).json({ error: `Method not allowed.` });
  }
}
