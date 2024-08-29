import "server-only";

import { Cast } from "@/app/components/Cast";
import { getChannelCasts } from "@/app/libs/farcaster";
import { Suspense } from "react";
import { ReimbursmentModal } from "./ReimburmentModal";
import { Skeleton } from "./Skeleton";

interface Props {
  channelId: string;
}

export const ChannelCasts = async (props: Props) => {
  const { channelId } = props;

  const casts = getChannelCasts(channelId);

  return (
    <div className="max-sm:space-y-2 sm:space-y-4">
      <ReimbursmentModal />
      <h3 className="font-display text-xl font-bold">Recent requests</h3>
      <Suspense fallback={<Skeleton count={8} height={228} />}>
        {casts.then(casts => {
          return (
            <>
              {casts.map(cast => (
                <Cast cast={cast} key={cast.hash} />
              ))}
              {casts.length === 0 && (
                <div className="text-center font-sans text-lg font-medium md:col-span-full">
                  No casts found yet...
                </div>
              )}
            </>
          );
        })}
      </Suspense>
    </div>
  );
};
