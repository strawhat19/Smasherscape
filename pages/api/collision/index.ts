import { NextApiRequest, NextApiResponse } from "next";

export default function(request: NextApiRequest, response: NextApiResponse) {
    let defaultPlayers = [
      {
        id: 1,
        name: `Xuruko`,
        plays: [],
        level: {
          num: 1,
          name: `Bronze Scimitar`
        },
        experience: {
          xp: 0,
          arenaXP: 0,
          nextLevelAt: 83,
          remainingXP: 83
        },
      },
      {
        id: 2,
        name: `Kay`,
        plays: [],
        level: {
          num: 1,
          name: `Bronze Scimitar`
        },
        experience: {
          xp: 0,
          arenaXP: 0,
          nextLevelAt: 83,
          remainingXP: 83
        },
      },
      {
        id: 3,
        name: `Strawhat19`,
        plays: [],
        level: {
          num: 1,
          name: `Bronze Scimitar`
        },
        experience: {
          xp: 0,
          arenaXP: 0,
          nextLevelAt: 83,
          remainingXP: 83
        },
      },
  ];
  response.json(defaultPlayers);
}