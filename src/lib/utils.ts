import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import {
  APP_BUTTON_TEXT,
  APP_DESCRIPTION,
  APP_ICON_URL,
  APP_NAME,
  APP_OG_IMAGE_URL,
  APP_PRIMARY_CATEGORY,
  APP_SPLASH_BACKGROUND_COLOR,
  APP_SPLASH_URL,
  APP_TAGS,
  APP_URL,
  APP_WEBHOOK_URL,
} from './constants';
import { CastWithInteractions } from '@neynar/nodejs-sdk/build/api';

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
};

interface Manifest {
  accountAssociation?: {
    header: string;
    payload: string;
    signature: string;
  };
  baseBuilder: {
    allowedAddresses: string[]
  }
  frame: FrameMetadata;
}


export function getCastUrl(cast: CastWithInteractions) {
  return `https://warpcast.com/${cast.author.username}/${cast.hash}`;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getMiniAppEmbedMetadata(ogImageUrl?: string) {
  return {
    version: 'next',
    imageUrl: ogImageUrl ?? APP_OG_IMAGE_URL,
    ogTitle: APP_NAME,
    ogDescription: APP_DESCRIPTION,
    ogImageUrl: ogImageUrl ?? APP_OG_IMAGE_URL,
    button: {
      title: APP_BUTTON_TEXT,
      action: {
        type: 'launch_frame',
        name: APP_NAME,
        url: APP_URL,
        splashImageUrl: APP_SPLASH_URL,
        iconUrl: APP_ICON_URL,
        splashBackgroundColor: APP_SPLASH_BACKGROUND_COLOR,
        description: APP_DESCRIPTION,
        primaryCategory: APP_PRIMARY_CATEGORY,
        tags: APP_TAGS,
      },
    },
  };
}

export async function getFarcasterDomainManifest(): Promise<Manifest> {
  const accountAssociation = {
    header: "eyJmaWQiOjQzMTMwNywidHlwZSI6ImN1c3RvZHkiLCJrZXkiOiIweDQ3NDVjMDY3NWI1QjZBMTY0REUzNDAxY2M5NzhGZjVkYjZFQ2ExREUifQ",
    payload: "eyJkb21haW4iOiJwaXp6YWZhdWNldC54eXoifQ",
    signature: "MHg0NzUxNzViM2NkNDk1MmZiZWM4MWQyYzhjODMyNWJkMjBkNjFkMTZkYmRlYmRiYjY3YzA0Mzc0YzU0YWJkNzA0MDUxOGQzZGRkYzdmMmQ4Njc0ZjI4MTJiYTc1MTI0ZjEwMTUxNDViNzYyMTAyNGEzYzYxNmY4MjUyMDM4MjliMjFj"
  }

  return {
    accountAssociation,
    baseBuilder: {
      "allowedAddresses": ["0x9F87e82EcE0C5E94BCdcd9d9fD68cfb984934108"]
    },
    frame: {
      version: "1",
      name: APP_NAME ?? "PizzaFaucet",
      iconUrl: APP_ICON_URL,
      homeUrl: APP_URL,
      imageUrl: APP_OG_IMAGE_URL,
      buttonTitle: APP_BUTTON_TEXT ?? "Launch Frame",
      splashImageUrl: APP_SPLASH_URL,
      splashBackgroundColor: APP_SPLASH_BACKGROUND_COLOR,
      webhookUrl: APP_WEBHOOK_URL
    },
  };
}
