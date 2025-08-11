import { ImageResponse } from "next/og";
import { APP_ICON_URL } from "~/lib/constants";

export const dynamic = 'force-dynamic';

export async function GET() {

  const imageUrl = APP_ICON_URL;

  return new ImageResponse(
    (
      <div tw="flex h-full w-full flex-col justify-center items-center relative bg-[#facc15]">
        <div tw="flex w-96 h-96 rounded-full overflow-hidden mb-8 border-8 border-white">
           <img src={imageUrl} alt="Profile" tw="w-full h-full object-cover" />
        </div>
        <h1 tw="text-8xl text-white"></h1>
        <p tw="text-5xl mt-4 text-center text-white opacity-80">
          <span>The Pizza faucet</span> <br />
          <span>Powered by PizzaDao🍕</span>
        </p>
      </div>
    ),
    {
      width: 1200,
      height: 800,
    }
  );
}