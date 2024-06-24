import { getDefaultConfig } from "connectkit";
import { createConfig, http } from "wagmi";
import { base } from "wagmi/chains";

export const config = createConfig(
  getDefaultConfig({
    chains: [base],
    transports: {
      // [mainnet.id]: http(),
      [base.id]: http(),
    },

    walletConnectProjectId: `${process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID}`,

    appName: "Pizza Faucet",
    appDescription: "A Free and Open faucet design to bring pizza to the people.",
    appUrl: "https://pizzafaucet.xyz",
    appIcon: "https://pizzafaucet.xyz/logo.png",
  }),
);
