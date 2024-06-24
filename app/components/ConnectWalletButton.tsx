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
                className="font-display rounded-xl bg-red-500 px-4 pb-1.5 pt-2.5 font-medium text-white duration-100 ease-in-out hover:bg-red-400"
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
