"use server";

import { Redis } from '@upstash/redis'
import { revalidateTag, unstable_cache } from "next/cache";

const REDIS_KEY = "reimbursments";
const CACHE_KEY = "reimbursments";

const kv = Redis.fromEnv()

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

export async function storeHawkieReimbursment() {
  const reimbursment: Reimbursment = { 
    castHash: '0x2e02a0167009d1335f46b1e585321b231d400b24', 
    transactionHash: '0x0a010b37899ad59463f95c9cb2b157d23009b7742929b54ca558041ff34f4991' 
  };
  return storeReimbursment(reimbursment);
}