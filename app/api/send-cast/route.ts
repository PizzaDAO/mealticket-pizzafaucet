
import { NextRequest, NextResponse } from "next/server";
import { farcaster } from "../../libs/farcaster/client";
import { PostCastReqBodyEmbeds } from "@neynar/nodejs-sdk/build/api";

export async function POST(req: NextRequest) {
   const body = await req.json()
   try {
      const embeds: PostCastReqBodyEmbeds[] = [
         
      ]
      await farcaster.publishCast({
         signerUuid: body.signer
      })
      return NextResponse.json({ }, { status: 200 });
   } catch (error) {
      console.error(error);
      return NextResponse.json({ error: "An error occurred" }, { status: 500 });
   }
}