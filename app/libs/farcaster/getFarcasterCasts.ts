
import { unstable_cache } from "next/cache";
import { farcaster } from "./client";
import { CastWithInteractions } from "@neynar/nodejs-sdk/build/api";

export const getChannelCasts = unstable_cache(
  async (channelId: string) => {
    let i = 0;
    let cursor: undefined | string = undefined;
    let allCasts: CastWithInteractions[] = [];

    while (i < 3) {
      try {
        const feed = await farcaster.fetchFeedByChannelIds({
          channelIds: [channelId],
          limit: 100,
          cursor: cursor || undefined,
          shouldModerate: true,
          withRecasts: false,
          withReplies: false,
        });

        allCasts = allCasts.concat(feed.casts);
        cursor = feed.next.cursor || undefined;
        if (cursor === undefined) break;

        i++;
      } catch (error) {
        console.log(error)
      }
    }

    return allCasts;
  },
  undefined,
  { revalidate: 60, tags: ["feed"] },
);
