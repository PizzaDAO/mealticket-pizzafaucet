"use client";

import { PropsWithChildren, createContext, useContext, useState } from "react";

import { Reimbursment, storeReimbursment } from "~/lib/reimburments";
import { CastWithInteractions } from "@neynar/nodejs-sdk/build/api";
import { BaseError, useAccount, useSwitchChain, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { base } from "viem/chains";
import { parseAbi, parseEther } from "viem";
import { BASE_USDC_ADDRESS } from "~/lib/constants";


interface ReimbursementContextType {
  openModal: (cast: CastWithInteractions) => void;
  closeModal: () => void;
  cast: CastWithInteractions | null;
  isModalOpen: boolean;
  setReimburments: (r: Reimbursment[]) => void;
  reimburse: (amount: string, to: `0x${string}`) => void;
  updateReimburments: (castHash: string, txHash: `0x${string}`) => Promise<void>;
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
  const { chainId } = useAccount();
  const { switchChainAsync } = useSwitchChain();

  const { data: hash, writeContract, isPending, error, reset } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  return (
    <ReimbursementContext.Provider
      value={{
        openModal: (cast: CastWithInteractions) => setCast(cast),
        closeModal: () => setCast(null),
        cast,
        isModalOpen: cast !== null,
        setReimburments: (r: Reimbursment[]) => setReimburments(r),
        reimburse: async (amount: string, to: `0x${string}`) => {
          if (chainId !== base.id) {
            try {
              await switchChainAsync({ chainId: base.id });
            } catch (_e) {
              return;
            }
          }
          writeContract({
            abi: parseAbi(["function transfer(address to, uint256 amount) returns (bool)"]),
            address: BASE_USDC_ADDRESS,
            functionName: "transfer",
            args: [to, parseEther(amount) / BigInt(1e12)],
            chainId: base.id,
          });
        },
        updateReimburments: async (castHash: string, txHash: `0x${string}`) => {
          storeReimbursment({ castHash, transactionHash: txHash }).then(setReimburments);
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
