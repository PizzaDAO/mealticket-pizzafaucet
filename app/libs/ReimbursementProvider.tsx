"use client";
import { PropsWithChildren, createContext, useContext, useState } from "react";

interface ReimbursementContextType {
  isActive: boolean;
  activate: () => void;
  deactivate: () => void;
}

const ReimbursementContext = createContext<ReimbursementContextType | null>(null);

export const ReimbursementProvider = ({ children }: PropsWithChildren) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const activate = () => setIsActive(true);
  const deactivate = () => setIsActive(false);

  return (
    <ReimbursementContext.Provider value={{ isActive, activate, deactivate }}>
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
