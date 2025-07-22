'use client'

import { PropsWithChildren, useEffect, useState } from "react";
import { Signer } from "@neynar/nodejs-sdk/build/api";

interface Props {
  channelId: string;
}

export const Instructions = (props: Props) => {
  const { channelId } = props
  const [isLoggedIn, setLoggedIn] = useState(false)
  const [isMember, setMemberStatus] = useState(false)



  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited');

    if (!hasVisited) {
      localStorage.clear(); // Or clear specific keys if needed
      localStorage.setItem('hasVisited', 'true');
    }
    setLoggedIn(!!localStorage.getItem("faucet_user_isLoggedIn"))
    if (isLoggedIn) {
      (async () => {
        const { fid, signer_uuid }: Signer = JSON.parse(localStorage.getItem("faucet_user_signer") ?? "{}")
        await checkMemberStatus(fid ?? 0)
        console.log(isMember, signer_uuid)
      })()
    }
  }, [isLoggedIn])

  const checkMemberStatus = async (fid: number) => {
    const res = await fetch(`/api/is-member`, {
      headers: { "Content-Type": "application/json" },
      method: 'POST', body: JSON.stringify({ channelId, fid })
    })
    const { isMember: memberStatus } = await res.json()
    console.log(memberStatus)
    setMemberStatus(memberStatus)
  }

  const sendInvite = async (fid: number) => {
    const reqData = {
      channelId, fid
    }
    const res = await fetch('/api/send-invite', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reqData)
    })
  }

 return (
    <div className="relative max-w-full rounded-3xl bg-yellow-100 p-6 lg:p-8">
      <h3 className="font-display text-3xl font-bold">Instructions</h3>
      <p className="text-pretty font-display text-base font-medium lg:text-lg">
        To submit your pizza purchase for reimbursement using PizzaFaucet follow these simple steps.
      </p>

      <ul className="my-6 space-y-2">
        <Step i={1}>Take a photo of your pizza and the receipt</Step>
        <Step i={2}>
          Open{" "}
          <a
            href="https://warpcast.com/"
            className="text-red-500 duration-100 ease-out hover:text-red-400"
            target="_blank"
          >
            Warpcast
          </a>
          <br /> (and go to{" "}
          <a
            href={`https://warpcast.com/~/channel/${channelId}`}
            target="_blank"
            className="text-red-500 duration-100 ease-out hover:text-red-400"
          >
            /{channelId}
          </a>
          )
        </Step>
        <Step i={3}>
          Send a cast with your photo and tag <span className="text-red-500">@base</span> +{" "}
          <span className="text-red-500">@pizzadao</span>
        </Step>
      </ul>

      <a
        href={`https://warpcast.com/~/channel/${channelId}`}
        target="_blank"
        className="block rounded-3xl border-2 border-black/50 bg-yellow-50 px-8 pb-2.5 pt-3.5 text-center font-display text-xl font-bold uppercase text-black shadow-lg duration-100 ease-in-out hover:bg-yellow-200 hover:text-black"
      >
        Submit request
      </a>
      <a
        href="https://www.base.org/onchainsummer"
        className="absolute right-0 top-0 flex size-20 -translate-y-1/2 rounded-full lg:size-36 lg:translate-x-1/2"
        target="_blank"
      >
        <img src="/images/onchain-summer.png" alt="Onchain Summer" className="h-full w-full" />
      </a>
    </div>
  );
};


function Step(props: PropsWithChildren<{ i: number }>) {
  return (
    <li className="flex items-center space-x-4 rounded-3xl bg-black/[.03] p-2">
      <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-red-500 font-display text-xl font-bold text-white lg:size-12 lg:text-2xl">
        {props.i}
      </div>
      <p className="max-w-80 text-pretty font-display text-sm font-medium leading-none lg:text-lg">
        {props.children}
      </p>
    </li>
  );
}

