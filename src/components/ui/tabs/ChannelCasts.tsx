
import { Cast } from "../Cast";
import { CastWithInteractions } from "@neynar/nodejs-sdk/build/api";
// import { ReimbursmentModal } from "./ReimburmentModal";

interface Props {
  casts: Array<CastWithInteractions>
}

export const ChannelCasts = ({ casts }: Props) => {

  return (
    <div className="max-sm:space-y-2 sm:space-y-4 overflow-auto">
      {/* <ReimbursmentModal /> */}
      <h3 className="font-display text-xl font-bold">Recent requests</h3>
      {
        casts && casts.map(cast => (
          <Cast cast={cast} key={cast.hash} />
        ))}
      {
        casts && casts.length === 0 && (
          <div className="text-center font-sans text-lg font-medium md:col-span-full">
            No casts found yet...
          </div>
        )
      }
    </div>
  );
};
