
import { NextRequest, NextResponse } from "next/server";
import { farcaster } from "../../libs/farcaster/client";
import { PostCastReqBodyEmbeds } from "@neynar/nodejs-sdk/build/api";

export async function POST(req: NextRequest) {
   const { images, signerId, text } = await req.json()
   try {
      const embeds: PostCastReqBodyEmbeds[] = images.map((url: string) => ({ url }))
      const res = await farcaster.publishCast({
         signerUuid: signerId,
         embeds, text
      })
      return NextResponse.json(res, { status: 200 });
   } catch (error) {
      console.error(error);
      return NextResponse.json({ error: "An error occurred" }, { status: 500 });
   }
}