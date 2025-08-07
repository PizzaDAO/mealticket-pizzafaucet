"use client";

import dynamic from "next/dynamic";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { MiniAppProvider } from "@neynar/react";
import { SafeFarcasterSolanaProvider } from "./lib/providers/SafeFarcasterSolanaProvider";

const WagmiProvider = dynamic(
  () => import("./lib/providers/WagmiProvider").then(mod => mod.default),
  {
    ssr: false,
  }
);

export function Providers({ session, children }: { session: Session | null, children: React.ReactNode }) {
  const solanaEndpoint = process.env.SOLANA_RPC_ENDPOINT || "https://solana-rpc.publicnode.com";
  return (
    <SessionProvider session={session}>
      <WagmiProvider>
        <MiniAppProvider analyticsEnabled={true}>
          <SafeFarcasterSolanaProvider endpoint={solanaEndpoint}>
              {children}
          </SafeFarcasterSolanaProvider>
        </MiniAppProvider>
      </WagmiProvider>
    </SessionProvider>
  );
}
