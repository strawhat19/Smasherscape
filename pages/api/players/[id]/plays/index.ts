import { db } from '../../../../../firebase';
import { environment } from '../../../../_app';
import { collection, getDocs } from 'firebase/firestore';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getActivePlayers, newPlayerType } from '../../../../../components/smasherscape';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (req.method === `GET`) {
    try {
        const playsSnapshot = await getDocs(collection(db, environment.playsDatabase));
        const plays = playsSnapshot.docs.map(doc => doc.data()).filter(ply => ply.id == id);
        const playersSnapshot = await getDocs(collection(db, environment.playersDatabase));
        const players = playersSnapshot.docs.map(doc => doc.data()).filter(plyr => plyr.uniqueIndex == id);
        res.status(200).json(getActivePlayers(players, true, plays).map(plyr => newPlayerType(plyr, true, plays))[0].plays);
    } catch (error) {
      res.status(500).json({ error: `Failed to fetch player.` });
    }
  } else {
    res.status(405).json({ error: `Method not allowed.` });
  }
}