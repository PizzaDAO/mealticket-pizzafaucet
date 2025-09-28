
import { useEffect, useState } from "react";
import { Cast } from "../Cast";
import { Cast as CastWithInteractions } from "~/lib/neynar";
import { ReimbursmentModal } from "../ReimburmentModal";
import { useReimbursement } from "~/components/providers/ReimbursementProvider";
import { getReimbursments } from "~/lib/reimburments";

export const ChannelCasts = () => {

  const { setReimburments } = useReimbursement();

  const [loading, setLoading] = useState(false)
  const [casts, setCasts] = useState<Array<CastWithInteractions>>([])

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/get-channel-feed", { cache: "no-store" })
        const casts = await res.json();
        setCasts(casts);
        console.log("Casts from API:", casts);
        if (casts.length === 0) return
        const reimburments = await getReimbursments()
        setReimburments(reimburments);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    })()
  }, [setReimburments])

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
            Failed to retrieve casts...
          </div>
        )
      }
    </div>
  );
};
