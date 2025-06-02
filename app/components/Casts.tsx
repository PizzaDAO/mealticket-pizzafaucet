'use client'

import { CastWithInteractions } from "../libs/farcaster"
import { useEffect, useState } from 'react';
import { Cast } from "./Cast";
import { Reimbursment } from "../libs/reimburments";

export const Casts = ({ channelCasts, hawkieCastStore }: {channelCasts: Promise<CastWithInteractions[]>, hawkieCastStore: Promise<Reimbursment[]>}) => {

   const [casts, setCasts] = useState<CastWithInteractions[] | undefined >(undefined);

   useEffect(() => {
      (async () => {
         const hawkieCast = await hawkieCastStore;
         console.log("Hawkie cast", hawkieCast.find(cast => cast.castHash === '0x2e02a0167009d1335f46b1e585321b231d400b24'));
         setCasts(await channelCasts);
      })()
   }, [channelCasts])

   return (
      <>
         {casts && casts.map(cast => (
           <Cast cast={cast} key={cast.hash} />
        ))}
        {casts && casts.length === 0 && (
           <div className="text-center font-sans text-lg font-medium md:col-span-full">
            No casts found yet...
           </div>
        )}
      </>
   )

}
