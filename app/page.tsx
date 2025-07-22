
import { Metadata } from "next";
import { getFrameEmbedMetadata } from "./lib/utils";
import App from "./app";
import { getChannelCasts } from "./lib/farcaster";

export async function generateMetadata(): Promise<Metadata> {
  const imageUrl = ""
  return {
    title: "pizza faucet",
    openGraph: {
      title: "pizza faucet",
      description: "your one and only faucet for pizza",
      images: [imageUrl],
    },
    other: {
      "fc:frame": JSON.stringify(getFrameEmbedMetadata()),
    },
  };
}

const CHANNEL_ID = "pizzafaucet";

export default async function Page() {

  const casts = await getChannelCasts(CHANNEL_ID)

  return (<App channelId={CHANNEL_ID} casts={casts} />);
}
