export const APP_URL = `https://${process.env.NEXT_PUBLIC_URL!}`;
export const APP_NAME = process.env.NEXT_PUBLIC_FRAME_NAME;
export const APP_DESCRIPTION = process.env.NEXT_PUBLIC_FRAME_DESCRIPTION;
export const APP_PRIMARY_CATEGORY = process.env.NEXT_PUBLIC_FRAME_PRIMARY_CATEGORY;
export const APP_TAGS = process.env.NEXT_PUBLIC_FRAME_TAGS?.split(',');
export const APP_ICON_URL = `${APP_URL}/logo.png`;
export const APP_OG_IMAGE_URL = `${APP_URL}/api/opengraph-image`;
export const APP_SPLASH_URL = `${APP_URL}/splash.png`;
export const APP_SPLASH_BACKGROUND_COLOR = "#facc15";
export const APP_BUTTON_TEXT = process.env.NEXT_PUBLIC_FRAME_BUTTON_TEXT;
export const APP_WEBHOOK_URL = process.env.NEYNAR_API_KEY && process.env.NEYNAR_CLIENT_ID 
    ? `https://api.neynar.com/f/app/${process.env.NEYNAR_CLIENT_ID}/event`
    : `${APP_URL}/api/webhook`;
