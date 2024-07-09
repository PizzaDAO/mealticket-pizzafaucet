"use client";

import { Avatar, ConnectKitButton } from "connectkit";

export const ConnectWalletButton = () => {
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show, truncatedAddress, ensName, address }) => {
        return (
          <>
            {isConnected && (
              <button onClick={show}>
                <Avatar address={address} size={38} name={ensName || truncatedAddress} />
              </button>
            )}
            {!isConnected && (
              <button
                onClick={show}
                className="rounded-xl border border-black bg-yellow-50 px-2.5 pb-1.5 pt-2.5 font-display font-bold text-black shadow-md duration-100 ease-in-out hover:bg-yellow-100 max-sm:text-sm lg:px-4"
              >
                Connect Wallet
              </button>
            )}
          </>
        );
      }}
    </ConnectKitButton.Custom>
  );
};
