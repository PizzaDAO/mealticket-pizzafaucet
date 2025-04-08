'use client'

import OnchainSummer from "@/app/images/onchain-summer.png";
import Image from "next/image";
import UploadReceiptField from './UploadRecieptForm';
import { useEffect, useState } from "react";
import { Signer } from "@neynar/nodejs-sdk/build/api";

interface Props {
  channelId: string;
}

export const Instructions = (props: Props) => {
  const { channelId } = props
  const [isLoggedIn, setLoggedIn] = useState(false)
  const [isMember, setMemberStatus] = useState(false)


  useEffect(() => {
    setLoggedIn(localStorage.getItem("faucet_user_isLoggedIn") === "true")
    if (isLoggedIn) {
      (async () => {
        const { fid, signer_uuid }: Signer = JSON.parse(localStorage.getItem("faucet_user_signer") ?? "")
        await checkMemberStatus(fid ?? 0)
        console.log(isMember, signer_uuid)
        if (!isMember) await sendInvite(fid ?? 0)
      })()
    }
  }, [isLoggedIn])

  useEffect(() => {
    const oneTimeStorageClear = localStorage.getItem("oneTimeStorageClear")
    if (!oneTimeStorageClear) {
      if (localStorage.get("faucet_user_signer"))
        localStorage.removeItem("faucet_user_signer")

      if (localStorage.get("faucet_user_signer"))
        localStorage.removeItem("faucet_user_signer")

      localStorage.setItem("oneTimeStorageClear", "true")
    }
  }, [])

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
        Fill out the form to submit your pizza purchase for reimbursement. It will be posted on
        <a className="ml-1 text-blue-600" href="https://warpcast.com/~/channel/pizzafaucet" target="blank">/pizzafaucet</a>
      </p>
      <UploadReceiptField checkMemberStatus={checkMemberStatus} channelId={channelId} isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} isMember={isMember} />
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
