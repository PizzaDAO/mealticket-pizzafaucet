import { NeynarAPIClient, Configuration, WebhookUserCreated } from '@neynar/nodejs-sdk';
import { APP_URL } from './constants';
import { CastWithInteractions } from '@neynar/nodejs-sdk/build/api';

let neynarClient: NeynarAPIClient | null = null;

// Example usage:
// const client = getNeynarClient();
// const user = await client.lookupUserByFid(fid); 
export function getNeynarClient() {
  if (!neynarClient) {
    const apiKey = process.env.NEYNAR_API_KEY;
    if (!apiKey) {
      throw new Error('NEYNAR_API_KEY not configured');
    }
    const config = new Configuration({ apiKey });
    neynarClient = new NeynarAPIClient(config);
  }
  return neynarClient;
}

export type Cast = { isMember: boolean } & CastWithInteractions;

type User = WebhookUserCreated['data'];

export async function getNeynarUser(fid: number): Promise<User | null> {
  try {
    const client = getNeynarClient();
    const usersResponse = await client.fetchBulkUsers({ fids: [fid] });
    return usersResponse.users[0];
  } catch (error) {
    console.error('Error getting Neynar user:', error);
    return null;
  }
}

export const checkMemberStatus = async (channelId: string, fid?: number) => {
  const client = getNeynarClient() 
   return await client.fetchChannelMembers({
      channelId, fid
   })
}

export const getChannelFeed = async (channelId: string) => {
  const client = getNeynarClient();
  let cursor: undefined | string = undefined;
  let allCasts: CastWithInteractions[] = [];

  do {
    try {
      const feed = await client.fetchFeedByChannelIds({
        channelIds: [channelId],
        limit: 100,
        cursor: cursor || undefined,
        shouldModerate: false,
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

type SendMiniAppNotificationResult =
  | {
      state: "error";
      error: unknown;
    }
  | { state: "no_token" }
  | { state: "rate_limit" }
  | { state: "success" };

export async function sendNeynarMiniAppNotification({
  fid,
  title,
  body,
}: {
  fid: number;
  title: string;
  body: string;
}): Promise<SendMiniAppNotificationResult> {
  try {
    const client = getNeynarClient();
    const targetFids = [fid];
    const notification = {
      title,
      body,
      target_url: APP_URL,
    };

    const result = await client.publishFrameNotifications({ 
      targetFids, 
      notification 
    });

    if (result.notification_deliveries.length > 0) {
      return { state: "success" };
    } else if (result.notification_deliveries.length === 0) {
      return { state: "no_token" };
    } else {
      return { state: "error", error: result || "Unknown error" };
    }
  } catch (error) {
    return { state: "error", error };
  }
} 