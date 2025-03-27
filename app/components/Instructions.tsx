'use client'

import OnchainSummer from "@/app/images/onchain-summer.png";
import Image from "next/image";
import UploadReceiptField from './UploadRecieptForm';
import { useState } from "react";
import { NeynarAuthButton, SIWN_variant, useNeynarContext } from "@neynar/react";

interface Props {
  channelId: string;
}

export const Instructions = (props: Props) => {
  const { channelId } = props
  const [isLoggedIn, setLoggedIn] = useState(false) 

  return (
    <div className="relative max-w-full rounded-3xl bg-yellow-100 p-6 lg:p-8">
      <h3 className="font-display text-3xl font-bold">Instructions</h3>
      <p className="text-pretty font-display text-base font-medium lg:text-lg">
        To submit your pizza purchase for reimbursement using PizzaFaucet fill the following form.
      </p>
      <UploadReceiptField isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn}  />
      <a
        href="https://www.base.org/onchainsummer"
        className="absolute right-0 top-0 flex size-20 -translate-y-1/2 rounded-full lg:size-36 lg:translate-x-1/2"
        target="_blank"
      >
        <Image src={OnchainSummer} alt="Onchain Summer" className="h-full w-full" />
      </a>
    </div>
  );
};
