
import { NextRequest, NextResponse } from "next/server";
import { farcaster } from "../../lib/farcaster/client";
import { ChannelMemberRole, PostCastReqBodyEmbeds } from "@neynar/nodejs-sdk/build/api";

export async function POST(req: NextRequest) {
   const body = await req.json()
   try {
      const data = await farcaster.inviteChannelMember({
         signerUuid: process.env.NEYNAR_SIGNER_ID || "",
         channelId: body.channelId,
         fid: body.fid,
         role: ChannelMemberRole.Member
      })
      return NextResponse.json(data, { status: 200 });
   } catch (error) {
      console.error(error);
      return NextResponse.json({ error: "An error occurred" }, { status: 500 });
   }
}