"use client";

import { useReimbursement } from "../libs/ReimbursementProvider";
import DateRelative from "./DateRelative";

interface Props {
  castUrl: string;
  timestamp: string;
  isReimbursed: boolean;
}

export const CastAction = (props: Props) => {
  const { castUrl, timestamp, isReimbursed } = props;
  const { isActive } = useReimbursement();

  if (!isActive) {
    return (
      <a
        href={castUrl}
        target="_blank"
        className="text-sm text-zinc-500 duration-100 hover:text-zinc-800"
      >
        <DateRelative date={timestamp} variant="short" />
      </a>
    );
  }

  return (
    <button
      disabled={isReimbursed}
      title={isReimbursed ? "Reimbursed" : undefined}
      className="font-display rounded-xl bg-red-500 px-2 pb-0.5 pt-1.5 text-xs font-medium text-white duration-100 ease-in-out hover:bg-red-400 disabled:cursor-not-allowed disabled:bg-zinc-500"
    >
      {isReimbursed ? "Reimbursed" : "Reimburse"}
    </button>
  );
};
