

import { checkMemberStatus } from "@/app/libs/farcaster/checkMemberStatus";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
   try {
      const searchPrams = req.nextUrl.searchParams
      const channelId = searchPrams.get('channelId')
      const fid = Number(searchPrams.get('fid'))
      if (!channelId || !fid)
         return NextResponse.json({ error: "Missing channelId or fid" }, { status: 400 })

      const { members } = await checkMemberStatus(channelId, fid)
      
      return NextResponse.json({ isMember: members.filter(m => m.user.fid == fid ).length > 0 }, { status: 200 })
   } catch (error) {
      console.error(error);
      return NextResponse.json({ error }, { status: 500 });
   }
}