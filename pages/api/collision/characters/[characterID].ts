import { defaultPlayers } from "../../../_app";
import { NextApiRequest, NextApiResponse } from "next";

export default function(request: NextApiRequest, response: NextApiResponse) {
  const { characterID } = request.query;
  response.json(defaultPlayers);
}