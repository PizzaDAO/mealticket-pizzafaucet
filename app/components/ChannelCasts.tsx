import "server-only";

import { Cast } from "@/app/components/Cast";
import { getChannelCasts } from "@/app/libs/farcaster";
import { Suspense } from "react";
import { ReimbursmentModal } from "./ReimburmentModal";
import { Skeleton } from "./Skeleton";
import { Casts } from "./Casts";
import { storeHawkieReimbursment } from "../libs/reimburments";

interface Props {
  channelId: string;
}

export const ChannelCasts = (props: Props) => {
  const { channelId } = props;

  return (
    <div className="max-sm:space-y-2 sm:space-y-4 overflow-auto">
      <ReimbursmentModal />
      <h3 className="font-display text-xl font-bold">Recent requests</h3>
      <Casts channelCasts={getChannelCasts(channelId)} hawkieCastStore={storeHawkieReimbursment()} />
    </div>
  );
};
