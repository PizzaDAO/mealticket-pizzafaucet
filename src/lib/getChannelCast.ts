
import { CastWithInteractions } from "@neynar/nodejs-sdk/build/api";
import { Cast, checkMemberStatus } from "./neynar";

interface ModeratedCast {
  castHash: string;
  channelId: string;
  action: string;
  moderatedAt: number;
}


export const getChannelCasts = async (channelId: string): Promise<Cast[]> => {

  const data = await Promise.all([getChannelFeed(channelId), getModeratedCast(channelId)]);

  if (data[0].length == 0) {
    return []
  }

  const moderated = data[1]
  const { members } = await checkMemberStatus('pizzafaucet');

  const casts = data[0]
    .filter(cast => !moderated.includes(cast.hash))
    .map(cast => ({
      ...cast,
      isMember:  members.find(m => m.user.fid == cast.author.fid) !== undefined
    }))

  return casts
    .filter(cast => cast.isMember)
}

const getChannelFeed = async (channelId: string) => {
  let cursor: undefined | string = undefined;
  let allCasts: CastWithInteractions[] = [];

  const headers: HeadersInit = [
    ["Content-Type", "application/json"],
    ["x-api-key", process.env.NEYNAR_API_KEY || ""],
    ['x-neynar-experimental', 'true']
  ];
  do {
    try {
      const feed: any = await fetch(
        `https://api.neynar.com/v2/farcaster/feed/channels/?with_recasts=false&limit=100&cursor=${cursor}&channel_ids=${channelId}`, 
        { cache: "no-store", headers });
      const result = await feed.json();
      allCasts = allCasts.concat(result?.casts || []);
      cursor = result.next?.cursor || undefined;
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
      const res = await fetch("https://api.warpcast.com/fc/moderated-casts?channelId=" + channelId, { cache: "no-store" });
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