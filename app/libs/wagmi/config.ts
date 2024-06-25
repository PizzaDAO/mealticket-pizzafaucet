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

export const BASE_USDC_ADDRESS = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";
