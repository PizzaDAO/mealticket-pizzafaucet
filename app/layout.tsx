
import type { Metadata } from "next";
import { Gluten, Rubik } from "next/font/google";
import React, { PropsWithChildren } from "react";
import "./globals.css";
import { ReimbursementProvider } from "./libs/ReimbursementProvider";
import Wagmi from "./libs/wagmi/WagmiProvider";

const sans = Rubik({ subsets: ["latin"], variable: "--font-sans" });
const display = Gluten({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  title: "Pizza Faucet",
  description: "A Free and Open faucet design to bring pizza to the people.",
};


export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body
        className={`${sans.variable} ${display.variable} overscroll-none bg-yellow-400 text-black`}
      >
          <Wagmi>
            <ReimbursementProvider>
              {children}
            </ReimbursementProvider>
          </Wagmi>
      </body>
    </html>
  );
}
