

import { checkMemberStatus } from "@/app/lib/farcaster/checkMemberStatus";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
   try {
      const { channelId, fid } = await req.json()
      if (!channelId || !fid)
         return NextResponse.json({ error: "Missing channelId or fid" }, { status: 400 })

      const { members } = await checkMemberStatus(channelId, fid)
      return NextResponse.json({ isMember: members.filter(m => m.user.fid == fid).length > 0 }, { status: 200 })
   } catch (error) {
      console.error(error);
      return NextResponse.json({ error }, { status: 500 });
   }
}