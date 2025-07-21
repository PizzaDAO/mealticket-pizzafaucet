
import { NextRequest, NextResponse } from "next/server";
import { farcaster } from "../../lib/farcaster/client";

export async function POST(req: NextRequest) {
   try {
      const { signer } = await req.json()
      const data = await farcaster.lookupSigner({ signerUuid: signer })
      return NextResponse.json({ signer: data }, { status: 200 });
   } catch (error) {
      console.error(error);
      return NextResponse.json({ error: "An error occurred" }, { status: 500 });
   }
}