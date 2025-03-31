
import { NextRequest, NextResponse } from "next/server";
import { farcaster } from "../../libs/farcaster/client";
import { ChannelMemberRole, PostCastReqBodyEmbeds } from "@neynar/nodejs-sdk/build/api";

export async function PUT(req: NextRequest) {
   const body = await req.json()
   try {
      const res = await farcaster.respondChannelInvite({
         signerUuid: body.signerId,
         channelId: body.channelId,
         role: ChannelMemberRole.Member,
         accept: true
      })
      return NextResponse.json(res, { status: 200 });
   } catch (error) {
      console.error(error);
      return NextResponse.json({ error: "An error occurred" }, { status: 500 });
   }
}