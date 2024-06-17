import { unstable_cache } from "next/cache";
import { farcaster } from "./client";

export const getChannelCasts = unstable_cache(
  async (channelId: string) => {
    const feed = await farcaster.fetchFeed("filter", {
      filterType: "channel_id",
      limit: 100,
      channelId,
    });

    return feed.casts;
  },
  undefined,
  { revalidate: 60, tags: ["feed"] }
);
