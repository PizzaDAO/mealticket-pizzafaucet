
import { NextRequest, NextResponse } from "next/server";
import { farcaster } from "../../libs/farcaster/client";

export async function POST(req: NextRequest) {
   try {
      const { signerUuid } = await req.json()
      const data = await farcaster.lookupSigner({ signerUuid })
      return NextResponse.json({ signer: data }, { status: 200 });
   } catch (error) {
      console.error(error);
      return NextResponse.json({ error: "An error occurred" }, { status: 500 });
   }
}