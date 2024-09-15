"use client";

import { ConnectKitButton } from "connectkit";
import { useReimbursement } from "../libs/ReimbursementProvider";
import { CastWithInteractions } from "../libs/farcaster";

interface Props {
  cast: CastWithInteractions;
}

export const CastAction = (props: Props) => {
  const { cast } = props;
  const { openModal, checkReimbursement } = useReimbursement();

  const reimbursement = checkReimbursement(cast.hash);

  if (reimbursement) {
    return (
      <a
        href={`https://basescan.org/tx/${reimbursement?.transactionHash}`}
        target="_blank"
        className="rounded-xl font-display text-sm font-bold text-zinc-500 duration-100 ease-in-out hover:text-zinc-400 lg:text-base"
      >
        Paid!
      </a>
    );
  }

  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show }) => {
        return (
          <button
            className="rounded-xl bg-green-500 px-2 pb-0.5 pt-1.5 font-display text-xs font-bold text-white shadow-md duration-100 ease-in-out hover:bg-green-400 disabled:cursor-not-allowed disabled:bg-zinc-500 lg:text-sm"
            onClick={() => (isConnected ? openModal(cast) : show?.())}
          >
            Reimburse
          </button>
        );
      }}
    </ConnectKitButton.Custom>
  );
};
