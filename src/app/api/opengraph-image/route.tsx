import { ImageResponse } from "next/og";

export const dynamic = 'force-dynamic';

export async function GET() {

  return new ImageResponse(
    (
      <div tw="flex h-full w-full flex-col justify-center items-center relative bg-primary">
        <div tw="flex w-96 h-96 rounded-full overflow-hidden mb-8 border-8 border-white">
          {/* <img src="/images/logo.png" alt="Profile" tw="w-full h-full object-cover" /> */}
        </div>
        <h1 tw="text-8xl text-white"></h1>
        <p tw="text-5xl mt-4 text-white opacity-80">Powered by PizzaDao🍕</p>
      </div>
    ),
    {
      width: 1200,
      height: 800,
    }
  );
}