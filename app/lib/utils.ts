import { CastWithInteractions } from "@neynar/nodejs-sdk/build/api";
import { mnemonicToAccount } from 'viem/accounts';

import {
  APP_BUTTON_TEXT,
  APP_DESCRIPTION,
  APP_ICON_URL,
  APP_NAME,
  APP_OG_IMAGE_URL,
  APP_PRIMARY_CATEGORY,
  APP_SPLASH_BACKGROUND_COLOR,
  APP_TAGS, APP_URL,
  APP_SPLASH_URL,
  APP_WEBHOOK_URL
} from './constants';

interface FrameMetadata {
  version: string;
  name: string;
  iconUrl: string;
  homeUrl: string;
  imageUrl?: string;
  buttonTitle?: string;
  splashImageUrl?: string;
  splashBackgroundColor?: string;
  webhookUrl?: string;
  description?: string;
  primaryCategory?: string;
  tags?: string[];
};

interface FrameManifest {
  accountAssociation?: {
    header: string;
    payload: string;
    signature: string;
  };
  frame: FrameMetadata;
}

export function getCastUrl(cast: CastWithInteractions) {
  return `https://warpcast.com/${cast.author.username}/${cast.hash}`;
}

export function getSecretEnvVars() {
  const seedPhrase = process.env.SEED_PHRASE;
  const fid = process.env.FID;

  if (!seedPhrase || !fid) {
    return null;
  }

  return { seedPhrase, fid };
}

export function getFrameEmbedMetadata(ogImageUrl?: string) {
  return {
    version: "next",
    imageUrl: ogImageUrl ?? APP_OG_IMAGE_URL,
    button: {
      title: APP_BUTTON_TEXT ?? "The Pizza Faucet",
      action: {
        type: "launch_frame",
        name: APP_NAME ?? "PizzaFaucet",
        url: APP_URL,
        splashImageUrl: APP_SPLASH_URL,
        iconUrl: APP_ICON_URL,
        splashBackgroundColor: APP_SPLASH_BACKGROUND_COLOR,
      description: APP_DESCRIPTION ?? "The pizzaDAO pizza faucet",
      primaryCategory: APP_PRIMARY_CATEGORY ?? "social",
      tags: APP_TAGS ?? ["pizza"],
      },
    },
  };
}

export async function getFarcasterMetadata(): Promise<FrameManifest> {
  // First check for FRAME_METADATA in .env and use that if it exists;

  const accountAssociation = {
    header: "eyJmaWQiOjQzMTMwNywidHlwZSI6ImN1c3RvZHkiLCJrZXkiOiIweDQ3NDVjMDY3NWI1QjZBMTY0REUzNDAxY2M5NzhGZjVkYjZFQ2ExREUifQ",
    payload: "eyJkb21haW4iOiJwaXp6YWZhdWNldC54eXoifQ",
    signature: "MHg0NzUxNzViM2NkNDk1MmZiZWM4MWQyYzhjODMyNWJkMjBkNjFkMTZkYmRlYmRiYjY3YzA0Mzc0YzU0YWJkNzA0MDUxOGQzZGRkYzdmMmQ4Njc0ZjI4MTJiYTc1MTI0ZjEwMTUxNDViNzYyMTAyNGEzYzYxNmY4MjUyMDM4MjliMjFj"
  }

  return {
    accountAssociation,
    frame: {
      version: "1",
      name: APP_NAME ?? "PizzaFaucet",
      iconUrl: APP_ICON_URL,
      homeUrl: APP_URL,
      imageUrl: APP_OG_IMAGE_URL,
      buttonTitle: APP_BUTTON_TEXT ?? "Launch Frame",
      splashImageUrl: APP_SPLASH_URL,
      splashBackgroundColor: APP_SPLASH_BACKGROUND_COLOR,
      webhookUrl: APP_WEBHOOK_URL,
      description: APP_DESCRIPTION ?? "The pizzaDAO pizza faucet",
      primaryCategory: APP_PRIMARY_CATEGORY ?? "social",
      tags: APP_TAGS ?? ["pizza"],
    },
  };
}
