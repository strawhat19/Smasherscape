import { db } from '../../../../firebase';
import { usePlayersDatabase } from '../../../_app';
import { collection, getDocs } from 'firebase/firestore';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (req.method === `GET`) {
    try {
        const playersSnapshot = await getDocs(collection(db, usePlayersDatabase));
        const players = playersSnapshot.docs.map(doc => doc.data()).filter(plyr => plyr.uniqueIndex == id);
        res.status(200).json(players);
    } catch (error) {
      res.status(500).json({ error: `Failed to fetch player.` });
    }
  } else {
    res.status(405).json({ error: `Method not allowed.` });
  }
}