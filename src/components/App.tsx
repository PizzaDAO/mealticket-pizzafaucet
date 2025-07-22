"use client";

import { useEffect } from "react";
import { useMiniApp } from "@neynar/react";
import { Header } from "~/components/ui/Header";
import { Footer } from "~/components/ui/Footer";
import { ChannelCasts, Instructions } from "~/components/ui/tabs";
import { CHANNEL_ID, USE_WALLET } from "~/lib/constants";
import { useNeynarUser } from "../hooks/useNeynarUser";
import { Rubik, Gluten } from "next/font/google";
import { CastWithInteractions } from "@neynar/nodejs-sdk/build/api";

// --- Types ---
export enum Tab {
  Home = "home",
  Actions = "actions",
  Context = "context",
  Wallet = "wallet",
}

export interface AppProps {
  casts: Array<CastWithInteractions>
}


const sans = Rubik({ subsets: ["latin"], variable: "--font-sans" });
const display = Gluten({ subsets: ["latin"], variable: "--font-display" });

export default function App(
  { casts }: AppProps
) {
  // --- Hooks ---
  const {
    isSDKLoaded,
    context,
    setInitialTab,
    setActiveTab,
    currentTab,
  } = useMiniApp();

  // --- Neynar user hook ---
  const { user: neynarUser } = useNeynarUser(context || undefined);

  // --- Effects ---
  /**
   * Sets the initial tab to "home" when the SDK is loaded.
   * 
   * This effect ensures that users start on the home tab when they first
   * load the mini app. It only runs when the SDK is fully loaded to
   * prevent errors during initialization.
   */
  useEffect(() => {
    if (isSDKLoaded) {
      setInitialTab(Tab.Actions);
    }
  }, [isSDKLoaded, setInitialTab]);

  // --- Early Returns ---
  if (!isSDKLoaded) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="spinner h-8 w-8 mx-auto mb-4"></div>
          <p>Loading SDK...</p>
        </div>
      </div>
    );
  }

  // --- Render ---
  return (
    <div
      style={{
        ...display.style,
        paddingTop: context?.client.safeAreaInsets?.top ?? 0,
        paddingBottom: context?.client.safeAreaInsets?.bottom ?? 0,
        paddingLeft: context?.client.safeAreaInsets?.left ?? 0,
        paddingRight: context?.client.safeAreaInsets?.right ?? 0,
      }}
    >
      {/* Header should be full width */}
      <Header neynarUser={neynarUser} />

      {/* Main content and footer should be centered */}
      <div className="container py-2 pb-20">
        {/* Main title */}
        <div className="flex justify-center px-6">
          <div className="text-center w-full max-w-md mx-auto">
            <div className="lg:sticky lg:top-[136px]">
              <h2 className="flex gap-2 font-display text-5xl font-bold sm:text-[82px]">
                Pizza <span className="text-red-500 inline-block"> Faucet</span>
              </h2>
              <p className="mb-12 text-right text-xl font-medium text-yellow-950 lg:text-3xl">
                A Free and Open faucet designed to bring pizza to the people.
              </p>
            </div>
          </div>
        </div>
        {/* Tab content rendering */}
        {currentTab === Tab.Actions && <Instructions channelId={CHANNEL_ID} />}
        {currentTab === Tab.Context && <ChannelCasts casts={casts} />}

        {/* Footer with navigation */}
        <Footer activeTab={currentTab as Tab} setActiveTab={setActiveTab} showWallet={USE_WALLET} />
      </div>
    </div>
  );
}

