'use server'

import { farcaster } from "./client";

export const respondToReimbursementCast = async (castHash: string, reimbursementTxHash: string) => {
  const signer = process.env.NEYNAR_SIGNER_ID as string;
  await farcaster.publishCast(
    signer,
    `Paid!<br> <a href="https://basescan.org/tx/${reimbursementTxHash}">https://basescan.org/tx/${reimbursementTxHash}</a>`,
    { replyTo: castHash, idem: castHash });
};