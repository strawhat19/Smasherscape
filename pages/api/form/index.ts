import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === `GET`) {
    try {
      const creativeWorkshopOrderTypeFormID = process.env.NEXT_PUBLIC_CREATIVEWORKSHOPUPLOADORDERFORMTYPEFORMID;
      const creativeWorkshopOrderTypeFormToken = process.env.NEXT_PUBLIC_CREATIVEWORKSHOPUPLOADORDERFORMTYPEFORMTOKEN;
      let formID = creativeWorkshopOrderTypeFormID;
      const getTypeformResponsesRes = await fetch(`https://api.typeform.com/forms/${formID}/responses?page_size=1000`, {
        headers: {
        Authorization: `Bearer ${creativeWorkshopOrderTypeFormToken}`
        }
      });
      if (!getTypeformResponsesRes.ok) console.log(`Error Getting Typeform Responses`, getTypeformResponsesRes.status);
      const typeFormResponsesData = await getTypeformResponsesRes.json();
      res.status(200).json(typeFormResponsesData);
    } catch (error) {
      res.status(500).json({ error: `Failed to fetch Form Responses.` });
    }
  } else {
    res.status(405).json({ error: `Method not allowed.` });
  }
}