import "server-only";

import { Cast } from "@/app/components/Cast";
import { getChannelCasts } from "@/app/libs/farcaster/getFarcasterCasts";
import { Suspense } from "react";
import { CastWithInteractions } from "../libs/farcaster/client";
import { ReimbursmentModal } from "./ReimburmentModal";
import { Skeleton } from "./Skeleton";

interface Props {
  channelId: string;
}

export const ChannelCasts = async (props: Props) => {
  const { channelId } = props;

  const casts = getChannelCasts(channelId);

  return (
    <section className="px-4 pb-24 pt-16 lg:px-6">
      <ReimbursmentModal />
      <div className="mx-auto max-w-7xl items-start max-sm:space-y-2 sm:grid sm:grid-cols-2 sm:gap-6 md:grid-cols-3">
        <Suspense fallback={<Skeleton count={8} height={228} />}>
          {casts.then(casts => {
            // Split casts into 4 columns to ensure recent casts are in top rows, not jut in the 1st column
            const columns: Array<CastWithInteractions[]> = [[], [], []];
            casts.forEach((cast, index) => {
              columns[index % 3].push(cast);
            });

            return (
              <>
                {columns.map((column, i) => (
                  <div key={`column_${i}`} className="grid grid-cols-1 gap-8">
                    {column.map(cast => (
                      <Cast cast={cast} key={cast.hash} />
                    ))}
                  </div>
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
    </section>
  );
};
