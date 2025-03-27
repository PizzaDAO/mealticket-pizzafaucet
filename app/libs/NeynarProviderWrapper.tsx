"use client";

import { PropsWithChildren } from "react";
import { NeynarContextProvider, Theme } from "@neynar/react";

const NeynarProviderWrapper = ({ children }: PropsWithChildren) => {

  return (
    <NeynarContextProvider
      settings={{
        clientId: process.env.NEXT_PUBLIC_NEYNAR_CLIENT_ID as string,
        defaultTheme: Theme.Dark
      }}
    >
      { children }
    </NeynarContextProvider>
  );
};

export default NeynarProviderWrapper;