
import { NextRequest, NextResponse } from "next/server";
import { farcaster } from "../../libs/farcaster/client";
import { mnemonicToAccount } from "viem/accounts";
import { ViemLocalEip712Signer } from "@farcaster/hub-nodejs";
import { bytesToHex, hexToBytes } from "viem";

export async function GET(req: NextRequest) {
   try {
      const signer = await farcaster.createSigner();

      console.log(signer)
      const { signature, deadline, appFid, error } = await generateSignature(signer.public_key);

      if (!signature)
         return NextResponse.json({ error }, { status: 500 });

      const data = await farcaster.registerSignedKey({
         signerUuid: signer.signer_uuid,
         signature,
         deadline: deadline ?? 0,
         appFid: appFid ?? 0,
         sponsor: {
            sponsored_by_neynar: true
         }
      })
      return NextResponse.json({ signer: data }, { status: 200 });
   } catch (error) {
      console.error(error);
      return NextResponse.json({ error: "An error occurred" }, { status: 500 });
   }
}

const generateSignature = async function (public_key: string) {
   try {
      if (typeof process.env.FARCASTER_DEVELOPER_MNEMONIC === "undefined") {
         throw new Error("FARCASTER_DEVELOPER_MNEMONIC is not defined");
      }

      const FARCASTER_DEVELOPER_MNEMONIC = process.env.FARCASTER_DEVELOPER_MNEMONIC;
      const FID = process.env.APP_FID as string;

      const account = mnemonicToAccount(FARCASTER_DEVELOPER_MNEMONIC);
      const appAccountKey = new ViemLocalEip712Signer(account);

      const deadline = Math.floor(Date.now() / 1000) + 86400; // 24 hours
      const uintAddress = hexToBytes(public_key as `0x${string}`);

      const signature = await appAccountKey.signKeyRequest({
         requestFid: BigInt(FID),
         key: uintAddress,
         deadline: BigInt(deadline),
      });

      if (signature.isErr()) {
         throw signature.error
      }

      const sigHex = bytesToHex(signature.value);

      return { deadline, signature: sigHex, appFid: Number(FID) };
   } catch (error) {
      return {
         signature: "",
         error
      }
   }
};
