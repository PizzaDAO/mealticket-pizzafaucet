
import { unstable_cache } from "next/cache";
import { farcaster } from "./client";
import { CastWithInteractions } from "@neynar/nodejs-sdk/build/api";

interface ModeratedCast {
  castHash: string;
  channelId: string;
  action: string;
  moderatedAt: number;
}

export const getChannelCasts = async (channelId: string) => {
  const data = await Promise.all([getChannelFeed(channelId), getModeratedCast(channelId)]);

  const casts = data[0];
  const moderated = data[1]

  return casts.filter(cast => !moderated.includes(cast.hash))
}

export const getChannelFeed = async (channelId: string) => {
  let cursor: undefined | string = undefined;
  let allCasts: CastWithInteractions[] = [];

  do {
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
    } catch (error) {
      console.log(error)
    }
  } while (cursor)

  return allCasts;
}

export const getModeratedCast = async (channelId: string) => {
  let allCasts: ModeratedCast[] = [];

  try {
    let cursor: undefined | string = undefined;
    do {
      const res = await fetch("https://api.warpcast.com/fc/moderated-casts?channelId=" + channelId);
      const { result: { moderationActions }, next } = await res.json();
      cursor = next?.cursor || undefined;
      allCasts = allCasts.concat(moderationActions);
    } while (cursor)

  } catch (error) {
    console.log(error);
  }

  return allCasts
    .filter(cast => cast.action === 'hide')
    .map(cast => cast.castHash);
}