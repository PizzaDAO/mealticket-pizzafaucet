
import type { Metadata } from "next";
import { Gluten, Rubik } from "next/font/google";
import React, { PropsWithChildren } from "react";
import "./globals.css";
import { Providers } from "./providers";
import { getSession } from "@/auth";

const sans = Rubik({ subsets: ["latin"], variable: "--font-sans" });
const display = Gluten({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  title: "Pizza Faucet",
  description: "A Free and Open faucet design to bring pizza to the people.",
};


export default async function RootLayout({ children }: PropsWithChildren) {
  const session = await getSession()
  return (
    <html lang="en">
      <body
        className={`${sans.variable} ${display.variable} overscroll-none bg-yellow-400 text-black`}
      >
        <Providers session={session}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
