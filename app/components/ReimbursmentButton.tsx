"use client";

import classnames from "classnames";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useReimbursement } from "../libs/ReimbursementProvider";

export const ReimbursmentButton = () => {
  const { isActive, activate, deactivate } = useReimbursement();
  const { isConnected } = useAccount();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    setShowButton(isConnected);
  }, [isConnected]);

  if (!showButton) return null;

  return (
    <button
      onClick={() => (isActive ? deactivate() : activate())}
      className={classnames(
        "font-display rounded-xl px-4 pb-1.5 pt-2.5 font-medium text-white duration-100 ease-in-out",
        {
          "bg-red-500 hover:bg-red-400": !isActive,
          "bg-zinc-600 hover:bg-zinc-500": isActive,
        },
      )}
    >
      Reimburse
    </button>
  );
};
