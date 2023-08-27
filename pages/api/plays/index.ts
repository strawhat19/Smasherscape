import { db } from '../../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getAllPlays, productionPlayersCollectionName } from '../../_app';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === `GET`) {
    try {
      const playersSnapshot = await getDocs(collection(db, productionPlayersCollectionName));
      const players = playersSnapshot.docs.map(doc => doc.data());
      res.status(200).json(getAllPlays(players));
    } catch (error) {
      res.status(500).json({ error: `Failed to fetch plays.` });
    }
  } else {
    res.status(405).json({ error: `Method not allowed.` });
  }
}
