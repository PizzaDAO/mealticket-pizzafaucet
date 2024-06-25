"use server";

import { kv } from "@vercel/kv";
import { revalidateTag, unstable_cache } from "next/cache";

const REDIS_KEY = "reimbursments";
const CACHE_KEY = "reimbursments";

export interface Reimbursment {
  castHash: string;
  transactionHash: `0x${string}`;
}

export const getReimbursments = unstable_cache(
  async () => (await kv.get<Reimbursment[]>(REDIS_KEY)) || [],
  undefined,
  { tags: [CACHE_KEY] },
);

export async function storeReimbursment(reimbursment: Reimbursment) {
  const reimbursments = await getReimbursments();

  if (reimbursments.some(r => r.castHash === reimbursment.castHash)) {
    return reimbursments;
  }

  const newReimbursments = [...reimbursments, reimbursment];
  await kv.set(REDIS_KEY, newReimbursments);
  console.debug("Stored reimbursment", reimbursment);
  revalidateTag(CACHE_KEY);

  return newReimbursments;
}
