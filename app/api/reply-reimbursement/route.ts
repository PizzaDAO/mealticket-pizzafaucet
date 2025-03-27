
import { respondToReimbursementCast } from "@/app/libs/farcaster";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
   const body = await req.json()
   try {
      await respondToReimbursementCast(body.castHash, body.reimbursementTxHash)
      return NextResponse.json({ }, { status: 200 });
   } catch (error) {
      console.error(error);
      return NextResponse.json({ error: "An error occurred" }, { status: 500 });
   }
}