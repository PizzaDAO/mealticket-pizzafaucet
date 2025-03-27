import { CastWithInteractions } from "@neynar/nodejs-sdk/build/api";

export function getCastUrl(cast: CastWithInteractions) {
  return `https://warpcast.com/${cast.author.username}/${cast.hash}`;
}
