'use server'

import { farcaster } from "./client";

export const respondToReimbursementCast = async (castHash: string) => {
  const signer = process.env.NEYNAR_SIGNER_ID as string;
  await farcaster.publishCast(signer, "Paid!", {
    replyTo: castHash, idem: castHash
  });
};