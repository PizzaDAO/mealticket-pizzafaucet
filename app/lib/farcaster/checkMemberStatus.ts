import { farcaster } from "./client"

export const checkMemberStatus = async (channelId: string, fid?: number) => {
   return await farcaster.fetchChannelMembers({
      channelId, fid
   })
}