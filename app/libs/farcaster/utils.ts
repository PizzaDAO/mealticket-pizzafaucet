import { CastWithInteractions } from "./client";

export function getCastUrl(cast: CastWithInteractions) {
  return `https://warpcast.com/${cast.author.username}/${cast.hash}`;
}
