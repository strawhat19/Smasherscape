import { db } from '../../../firebase';
import { usePlaysDatabase } from '../../_app';
import { collection, getDocs } from 'firebase/firestore';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === `GET`) {
    try {
      const playsSnapshot = await getDocs(collection(db, usePlaysDatabase));
      const plays = playsSnapshot.docs.map(doc => doc.data());
      res.status(200).json(plays);
    } catch (error) {
      res.status(500).json({ error: `Failed to fetch plays.` });
    }
  } else {
    res.status(405).json({ error: `Method not allowed.` });
  }
}