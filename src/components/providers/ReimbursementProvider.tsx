"use client";

import { PropsWithChildren, createContext, useContext, useState } from "react";

import { Reimbursment, storeReimbursment } from "~/lib/reimburments";
import { CastWithInteractions } from "@neynar/nodejs-sdk/build/api";


interface ReimbursementContextType {
  openModal: (cast: CastWithInteractions) => void;
  closeModal: () => void;
  cast: CastWithInteractions | null;
  isModalOpen: boolean;
  setReimburments: (r: Reimbursment[]) => void;
  updateReimburments: (castHash: string, txHash: `0x${string}`) => Promise<void>;
  checkReimbursement: (castHash: string) => Reimbursment | undefined;
}

const ReimbursementContext = createContext<ReimbursementContextType | null>(null);

export const ReimbursementProvider = ({ children }: PropsWithChildren) => {
  const [cast, setCast] = useState<CastWithInteractions | null>(null);
  const [reimburments, setReimburments] = useState<Reimbursment[]>([]);


  return (
    <ReimbursementContext.Provider
      value={{
        openModal: (cast: CastWithInteractions) => setCast(cast),
        closeModal: () => setCast(null),
        cast,
        isModalOpen: cast !== null,
        setReimburments: (r: Reimbursment[]) => setReimburments(r),
        updateReimburments: async (castHash: string, txHash: `0x${string}`) => {
          storeReimbursment({ castHash, transactionHash: txHash }).then(setReimburments);
        },
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
