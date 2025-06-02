'use client'

import { CastWithInteractions } from "../libs/farcaster"
import { useEffect, useState } from 'react';
import { Cast } from "./Cast";

export const Casts = ({ channelCasts }: {channelCasts: Promise<CastWithInteractions[]>}) => {

   const [casts, setCasts] = useState<CastWithInteractions[] | undefined >(undefined);

   useEffect(() => {
      (async () => {
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
