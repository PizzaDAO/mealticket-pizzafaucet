"use client";

import { useReimbursement } from "../libs/ReimbursementProvider";
import { CastWithInteractions } from "../libs/farcaster/client";
import { getCastUrl } from "../libs/farcaster/utils";
import DateRelative from "./DateRelative";

interface Props {
  cast: CastWithInteractions;
}

export const CastAction = (props: Props) => {
  const { cast } = props;
  const { timestamp } = cast;
  const { isActive, openModal, checkReimbursment } = useReimbursement();

  const reimbursment = checkReimbursment(cast.hash);

  if (!isActive) {
    return (
      <a
        href={getCastUrl(cast)}
        target="_blank"
        className="text-sm text-zinc-500 duration-100 hover:text-zinc-800"
      >
        <DateRelative date={timestamp} variant="short" />
      </a>
    );
  }

  if (reimbursment) {
    return (
      <a
        href={`https://basescan.org/tx/${reimbursment.transactionHash}`}
        target="_blank"
        className="rounded-xl bg-zinc-500 px-2 pb-0.5 pt-1.5 font-display text-xs font-medium text-white duration-100 ease-in-out hover:bg-zinc-400"
      >
        Reimbursed
      </a>
    );
  }

  return (
    <button
      className="rounded-xl bg-red-500 px-2 pb-0.5 pt-1.5 font-display text-xs font-medium text-white duration-100 ease-in-out hover:bg-red-400 disabled:cursor-not-allowed disabled:bg-zinc-500"
      onClick={() => openModal(cast)}
    >
      Reimburse
    </button>
  );
};
