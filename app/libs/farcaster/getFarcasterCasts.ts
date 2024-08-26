import { unstable_cache } from "next/cache";
import { CastWithInteractions, farcaster } from "./client";

export const getChannelCasts = unstable_cache(
  async (channelId: string) => {
    let i = 0;
    let cursor: undefined | string = undefined;
    let allCasts: CastWithInteractions[] = [];

    while (i < 3) {
      const feed = await farcaster.fetchFeedByChannelIds([channelId], {
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
    }

    return allCasts;
  },
  undefined,
  { revalidate: 60, tags: ["feed"] },
);
