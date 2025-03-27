

import { checkMemberStatus } from "@/app/libs/farcaster/checkMemberStatus";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
   const body = await req.json()
   try {
      const { members } = await checkMemberStatus(body.channelId, body.fid)
      
      return NextResponse.json({ isMember: members.filter(m => m.user.fid == body.fid ).length > 0 }, { status: 200 });
   } catch (error) {
      console.error(error);
      return NextResponse.json({ error: "An error occurred" }, { status: 500 });
   }
}