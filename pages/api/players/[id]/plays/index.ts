import { db } from '../../../../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import type { NextApiRequest, NextApiResponse } from 'next';
import { productionPlayersCollectionName } from '../../../../_app';
import { getActivePlayers, newPlayerType } from '../../../../../components/smasherscape';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (req.method === `GET`) {
    try {
        const playersSnapshot = await getDocs(collection(db, productionPlayersCollectionName));
        const players = playersSnapshot.docs.map(doc => doc.data()).filter(plyr => plyr.uniqueIndex == id);
        res.status(200).json(getActivePlayers(players).map(plyr => newPlayerType(plyr))[0].plays);
    } catch (error) {
      res.status(500).json({ error: `Failed to fetch player.` });
    }
  } else {
    res.status(405).json({ error: `Method not allowed.` });
  }
}