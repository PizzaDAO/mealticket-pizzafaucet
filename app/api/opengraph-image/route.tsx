import { APP_ICON_URL } from "@/app/lib/constants";
import { ImageResponse } from "next/og";
// import { NextRequest } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {

  const imgSrc = APP_ICON_URL ?? "/logo.png"

  return new ImageResponse(
    (
      <div tw="flex h-full w-full flex-col justify-center items-center relative bg-purple-600">
          <div tw="flex w-96 h-96 rounded-full overflow-hidden mb-8 border-8 border-white">
            <img src={imgSrc} alt="Profile" tw="w-full h-full object-cover" />
          </div>
        <h1 tw="text-center text-8xl text-white">The Pizza Faucet<br />By PizzaDAO</h1>
      </div>
    ),
    {
      width: 1200,
      height: 800,
    }
  );
}