"use client";

import dynamic from "next/dynamic";
import { Cast } from "~/lib/neynar";

// note: dynamic import is required for components that use the Frame SDK
const AppComponent = dynamic(() => import("~/components/App"), {
  ssr: false,
});

export default function App(
  { getCasts }: { getCasts: Promise<Cast[]> } 
) {
  return <AppComponent getCasts={getCasts} />;
}
