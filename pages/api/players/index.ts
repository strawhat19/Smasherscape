import app, { db } from '../../../firebase';
import type { NextApiRequest, NextApiResponse } from 'next';
import { doc, setDoc, collection, addDoc, getDocs, onSnapshot } from 'firebase/firestore';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === `GET`) {
    try {
      const playersSnapshot = await getDocs(collection(db, `players`));
      const players = playersSnapshot.docs.map(doc => doc.data());

      res.status(200).json(players);
    } catch (error) {
      res.status(500).json({ error: `Failed to fetch players.` });
    }
  } else {
    res.status(405).json({ error: `Method not allowed.` });
  }
}
