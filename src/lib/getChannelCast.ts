
import { checkMemberStatus, getChannelFeed } from "./neynar";

interface ModeratedCast {
  castHash: string;
  channelId: string;
  action: string;
  moderatedAt: number;
}


export const getChannelCasts = async (channelId: string) => {

  const data = await Promise.all([getChannelFeed(channelId), getModeratedCast(channelId)]);

  const moderated = data[1]
  const { members } = await checkMemberStatus('pizzafaucet');
  
  const casts = await Promise.all(data[0]
    .filter(cast => !moderated.includes(cast.hash))
    .map(cast =>( {
      ...cast,
      isMember: members.find(m => m.user.fid == cast.author.fid) !== undefined
    })))

  return casts
    .filter(cast => cast.isMember)
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