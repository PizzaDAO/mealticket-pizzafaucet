'use client'

import { PropsWithChildren, useState } from "react";
import UploadReceiptField from "../UploadRecieptForm";

interface Props {
  channelId: string;
  fid?: number;
}

export const Instructions = (props: Props) => {
  const { channelId, fid } = props
  const [isMember, setMemberStatus] = useState(false)
  const [showUploadForm, setShowUploadForm] = useState(false);


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
    <div className="relative max-w-full rounded-3xl bg-yellow-100 p-6 lg:p-8 mb-2">
      <h3 className="font-display text-3xl font-bold">Instructions</h3>
      {
        showUploadForm ? (
          <div>
            <p className="text-pretty font-display text-base font-medium lg:text-lg">
              Fill out the form to submit your pizza purchase for reimbursement. It will be posted on
              <a className="ml-1 text-blue-600" href="https://warpcast.com/~/channel/pizzafaucet" target="blank">/pizzafaucet</a>
            </p>
            <UploadReceiptField channelId={channelId} />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <div>
              <p className="text-pretty font-display text-base font-medium lg:text-lg">
                To submit your pizza purchase for reimbursement using PizzaFaucet follow these simple steps.
              </p>
              <ul className="my-4 space-y-2">
                <Step i={1}>Take a photo of your pizza and the receipt</Step>
                <Step i={2}>
                  Ensure you follow the faucet channel. Not Sure? <button className="text-red-500">Check!</button>
                </Step>
                <Step i={3}>
                  Click the button below to upload your receipt and photo.
                </Step>
              </ul>
            </div>
            <button
              className="block rounded-3xl border-2 border-black/50 bg-yellow-50 px-8 py-1 text-center font-display text-xl font-bold uppercase text-black shadow-lg duration-100 ease-in-out hover:bg-yellow-200 hover:text-black"
              onClick={() => setShowUploadForm(true)}
            >
              Proceed
            </button>
          </div>
        )
      }

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

