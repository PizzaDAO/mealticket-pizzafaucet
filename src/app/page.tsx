import { Metadata } from "next";
import App from "./app";
import { APP_NAME, APP_DESCRIPTION, APP_OG_IMAGE_URL, CHANNEL_ID } from "~/lib/constants";
import { getMiniAppEmbedMetadata } from "~/lib/utils";
import { getChannelCasts } from "~/lib/getChannelCast";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: APP_NAME,
    openGraph: {
      title: APP_NAME,
      description: APP_DESCRIPTION,
      images: [APP_OG_IMAGE_URL],
    },
    other: {
      "fc:frame": JSON.stringify(getMiniAppEmbedMetadata()),
    },
  };
}

export default async function Home() {
  return (<App getCasts={getChannelCasts} />);
}
