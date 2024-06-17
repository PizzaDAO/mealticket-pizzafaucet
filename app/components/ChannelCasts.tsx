import "server-only";

import { getChannelCasts } from "@/app/libs/farcaster/getFarcasterCasts";
import { Cast } from "@/app/components/farcaster/Cast";

interface Props {
  headerText?: string;
  channelId: string;
}

export const ChannelCasts = async (props: Props) => {
  const { headerText = "", channelId } = props;

  const casts = await getChannelCasts(channelId);

  if (casts.length === 0) return null;

  return (
    <section className="bg-lead-50 rounded-2xl px-4 pb-24 pt-16 lg:px-6 dark:bg-zinc-800">
      <div className="mx-auto max-w-screen-2xl">
        <h2 className="text-lead-900 text-center text-3xl font-bold sm:text-4xl dark:text-zinc-100">
          {headerText}
        </h2>
        <p className="text-lead-800 mx-auto mt-2.5 max-w-2xl text-center text-base leading-7 dark:text-zinc-300">
            A Free and Open faucet design to bring pizza to the people.
        </p>
        <div className="mx-auto mt-16 max-w-7xl sm:grid sm:grid-cols-3 sm:gap-6 space-y-2 sm:space-y-0">
          {casts.map(cast => {
            return (
              <div key={cast.hash}>
                <Cast cast={cast} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
