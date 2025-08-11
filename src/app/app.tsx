"use client";

import dynamic from "next/dynamic";

// note: dynamic import is required for components that use the Frame SDK
const AppComponent = dynamic(() => import("~/components/App"), {
  ssr: false,
});

export default function App() {
  return <AppComponent />;
}
