

import { NeynarAPIClient, Configuration } from "@neynar/nodejs-sdk";

const config = new Configuration({
   apiKey: process.env.NEYNAR_API_KEY as string,
   baseOptions: {
      headers: {
         "x-neynar-experimental": true,
      },
   },
});

export const farcaster = new NeynarAPIClient(config);
