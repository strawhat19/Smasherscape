import type { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === `GET`) {
    try {
      const webhook = req.body;
      console.log(`Webhook received:`, webhook);
      res.status(200).json(webhook);
    } catch (error) {
      res.status(500).json({ error: `Failed to get Webhook.` });
    }
  } else {
    res.status(405).json({ error: `Webhook not allowed.` });
  }
}