
import { useEffect, useState } from "react";
import { Cast } from "../Cast";
import { Cast as CastWithInteractions } from "~/lib/neynar";
import { ReimbursmentModal } from "../ReimburmentModal";

export const ChannelCasts = () => {

  const [loading, setLoading] = useState(false)
  const [casts, setCasts] = useState<Array<CastWithInteractions>>([]);

  useEffect(() => {
    setLoading(true)
    fetch("/api/get-channel-feed", {cache: "no-store"})
      .then(async (res: Response) => {
        console.log("Response from API:", await res.json());
        setCasts(await res.json());
      })
    setLoading(false);
  }, []);

  return (
    <div className="max-sm:space-y-2 sm:space-y-4 overflow-auto">
      <ReimbursmentModal />
      <h3 className="font-display text-xl font-bold">Recent requests</h3>
      {
        loading && <>Loading...</>
      }
      {
        !loading && casts && casts.map(cast => (
          <Cast cast={cast} key={cast.hash} />
        ))}
      {
        !loading && casts && casts.length === 0 && (
          <div className="text-center font-sans text-lg font-medium md:col-span-full">
            No casts found yet...
          </div>
        )
      }
    </div>
  );
};
