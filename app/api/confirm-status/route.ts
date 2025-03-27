
import { NextRequest, NextResponse } from "next/server";
import { farcaster } from "../../libs/farcaster/client";

export async function GET(req: NextRequest) {
   try {
      const searchParams = req.nextUrl.searchParams
      const signerUuid = searchParams.get("signer") ?? ""
      const data = await farcaster.lookupSigner({ signerUuid })
      return NextResponse.json({ signer: data }, { status: 200 });
   } catch (error) {
      console.error(error);
      return NextResponse.json({ error: "An error occurred" }, { status: 500 });
   }
}