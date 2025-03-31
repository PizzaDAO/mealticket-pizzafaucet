"use client";

import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { BaseError, parseEther } from "viem";
import { base } from "viem/chains";
import { useAccount, useSwitchChain, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { CastWithInteractions } from "./farcaster";
import { Reimbursment, getReimbursments, storeReimbursment } from "./reimburments";
import { BASE_USDC_ADDRESS } from "./wagmi/config";
import { usdcAbi } from "./wagmi/usdcabi";

interface ReimbursementContextType {
  openModal: (cast: CastWithInteractions) => void;
  closeModal: () => void;
  cast: CastWithInteractions | null;
  isModalOpen: boolean;
  reimburse: (amount: string, to: `0x${string}`) => void;
  isPending: boolean;
  isConfirming: boolean;
  isConfirmed: boolean;
  error: string | undefined;
  hash: `0x${string}` | undefined;
  reset: () => void;
  checkReimbursement: (castHash: string) => Reimbursment | undefined;
}

const ReimbursementContext = createContext<ReimbursementContextType | null>(null);

export const ReimbursementProvider = ({ children }: PropsWithChildren) => {
  const [cast, setCast] = useState<CastWithInteractions | null>(null);
  const [reimburments, setReimburments] = useState<Reimbursment[]>([]);
  const { chainId, isConnected } = useAccount();
  const { switchChainAsync } = useSwitchChain();

  const { data: hash, writeContract, isPending, error, reset } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    getReimbursments().then(setReimburments);
  }, []);

  useEffect(() => {
    if (isConfirmed && cast && hash) {
      storeReimbursment({ castHash: cast.hash, transactionHash: hash }).then(setReimburments);
      // TODO: reply to cast that, reimbursement is paid
      (async () => await fetch('/api/reply-reimpursement', {
        headers: { "Content-Type": "application/json" }, method: 'POST', 
        body: JSON.stringify({ castHash: cast.hash, reimbursementTxHash: hash })
      }))()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConfirmed, cast, hash]);

  return (
    <ReimbursementContext.Provider
      value={{
        openModal: (cast: CastWithInteractions) => setCast(cast),
        closeModal: () => setCast(null),
        cast,
        isModalOpen: cast !== null,
        reimburse: async (amount: string, to: `0x${string}`) => {
          if (chainId !== base.id) {
            try {
              await switchChainAsync({ chainId: base.id });
            } catch (e) {
              return;
            }
          }

          writeContract({
            abi: usdcAbi,
            address: BASE_USDC_ADDRESS,
            functionName: "transfer",
            args: [to, parseEther(amount) / BigInt(1e12)],
            chainId: base.id,
          });
        },
        isPending,
        isConfirming,
        isConfirmed,
        error: error ? (error as BaseError).shortMessage || error.message : undefined,
        hash,
        reset,
        checkReimbursement: (castHash: string) => reimburments.find(r => r.castHash === castHash),
      }}
    >
      {children}
    </ReimbursementContext.Provider>
  );
};

export const useReimbursement = (): ReimbursementContextType => {
  const context = useContext(ReimbursementContext);
  if (context === null) {
    throw new Error("useReimbursement must be used within a ReimbursementProvider");
  }
  return context;
};
