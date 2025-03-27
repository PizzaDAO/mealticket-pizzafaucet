
import { NextRequest, NextResponse } from "next/server";
import { farcaster } from "../../libs/farcaster/client";
import { ChannelMemberRole, PostCastReqBodyEmbeds } from "@neynar/nodejs-sdk/build/api";

export async function POST(req: NextRequest) {
   const body = await req.json()
   try {
      await farcaster.respondChannelInvite({
         signerUuid: body.signer,
         channelId: body.channelId,
         role: ChannelMemberRole.Member,
         accept: true
      })
      return NextResponse.json({ }, { status: 200 });
   } catch (error) {
      console.error(error);
      return NextResponse.json({ error: "An error occurred" }, { status: 500 });
   }
}