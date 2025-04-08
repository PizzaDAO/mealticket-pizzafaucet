'use client'

import { Dispatch, SetStateAction, useEffect, useState } from "react"
import {
   Dialog,
   DialogBackdrop,
   DialogPanel,
   DialogTitle,
} from "@headlessui/react";
import { appClient } from "../libs/farcaster/loginConfig";
import { QRCodeDialog } from "./qr-code";
import { StatusAPIResponse } from "@farcaster/auth-client";
import { Signer } from "@neynar/nodejs-sdk/build/api";

type ComponentProps = {
   isLoggedIn: boolean,
   setLoggedIn: Dispatch<SetStateAction<boolean>>
}

type Props = {
   toggle: boolean,
   setToggle: Dispatch<SetStateAction<boolean>>,
   setLoggedIn: Dispatch<SetStateAction<boolean>>
}

export const FarcasterLogin = ({ setLoggedIn, toggle, setToggle }: Props) => {

   const [count, setCount] = useState(0)
   const [loading, setLoading] = useState(true)
   const [channelToken, setChannelToken] = useState("");
   const [signInUrl, setSignInUrl] = useState("");
   const [errorStatus, setErrorStatus] = useState(false)
   const [error, setError] = useState<any>(null)

   const [status, setStatus] = useState<'pending' | 'completed' | undefined>(undefined)
   const [resData, setResData] = useState<StatusAPIResponse>()

   const [signer, setSigner] = useState<Signer | undefined>(undefined)
   const [state, setState] = useState("")

   const [alert, setAlert] = useState("")

   // useEffect(() => {
   //    if (!channelToken && toggle)
   //       (async () => {
   //          const { data: { channelToken: token, url }, isError, error: err } = await appClient.createChannel({
   //              siweUri: "https://example.com/login",
   //             domain: "example.com"
   //          });
   //          setChannelToken(token)
   //          setSignInUrl(url)
   //          setErrorStatus(isError)
   //          setError(err)
   //          setLoading(false)
   //       })()
   // }, [channelToken, toggle])

   // useEffect(() => {
   //    (async () => {
   //       if (channelToken && !errorStatus && (status === 'pending' || status === undefined)) {
   //          const { data, isError, error } = await appClient.status({
   //             channelToken,
   //          });
   //          setStatus(data.state)
   //          setErrorStatus(isError)
   //          setError(error)
   //          if (data.state === 'completed') {
   //             setResData(data)
   //             setLoggedIn(true)
   //             console.log(data)
   //          } else setCount(count + 1)
   //       }  
   //    })()
   // }, [channelToken, status, count])


   useEffect(() => {
      if (!signInUrl && toggle)
         (async () => {
            try {
               const signerRes = (await (await fetch("/api/register-signer", {
                  method: 'POST', body: JSON.stringify("{}")
               })).json()).signer
               setSigner(signerRes)
               setSignInUrl(signerRes?.signer_approval_url || "")
               setLoading(false)
            } catch (error) {
               console.log(error)
               setErrorStatus(true)
               setError(error)
               setLoading(false)
            }
         })()
   }, [signInUrl, toggle])

   useEffect(() => {
      (async () => {
         console.log(signInUrl, toggle, error)
         if (signInUrl && toggle && !errorStatus && (!state || state === 'pending_approval')) {
            const res = await fetch(`/api/confirm-status`, {
               headers: { "Content-Type": "application/json" },
               method: 'POST', body: JSON.stringify({ signer: signer?.signer_uuid })
            })
            const data = (await res.json()).signer
            setState(data.status)
            console.log(state)
            if (data.status === 'approved') {
               setSigner(data)
               setLoggedIn(true)
               localStorage.setItem("faucet_user_signer", JSON.stringify(data))
               localStorage.setItem("faucet_user_isLoggedIn", "true");
               exit()
            } else setCount(count + 1)
         }
      })()
   }, [signInUrl, toggle, state, count])


   const closeModal = () => {
      if (state === 'pending_approval') {
         setAlert("You would have to restart the process, wait a few moment if you have approved on warpcast.")
         return
      }
      setToggle(false)
      setChannelToken("")
      setStatus(undefined)
      setLoading(true)
      setError(null)
      setErrorStatus(false)
      setSignInUrl("")
   }

   const exit = () => {
      setToggle(false)
      setChannelToken("")
      setStatus(undefined)
      setLoading(true)
      setError(null)
      setErrorStatus(false)
      setSignInUrl("")
      setAlert("")
   }

   return (
      <Dialog open={toggle} onClose={closeModal} className="relative z-50">
         <DialogBackdrop className="fixed inset-0 bg-black/75 backdrop-blur" />
         <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
            <DialogPanel className="w-full flex flex-col items-center gap-4 max-w-lg rounded-xl border bg-yellow-50 p-5 font-sans lg:p-8">
               {
                  alert &&
                  <div className="bg-red-100 p-2">
                     <p className="text-red-500 text-pretty tx">{alert} <button className="text-yellow-500 pointer bg" onClick={exit}>Exit anyway</button></p>
                  </div>
               }
               <DialogTitle className="w-full text-left font-display text-xl md:text-2xl font-bold">
                  Connect Farcaster Account
               </DialogTitle>
               <QRCodeDialog loading={loading} url={signInUrl} isError={errorStatus} error={error} />
            </DialogPanel>
         </div>
      </Dialog>
   );
}

export const FarcasterLoginButton = ({ setLoggedIn }: ComponentProps) => {

   const [toggle, setToggle] = useState(false)

   const openModal = () => {
      setToggle(true)
   }

   return (
      <button
         className="block rounded-3xl border-2 border-black/50 bg-yellow-50 px-8 pb-2.5 pt-3.5 text-center font-display text-md md:text-xl font-bold uppercase text-black shadow-lg duration-100 ease-in-out hover:bg-yellow-200 hover:text-black" type="button" onClick={openModal}
      >
         Connect Farcaster Account
         <FarcasterLogin toggle={toggle} setToggle={setToggle} setLoggedIn={setLoggedIn} />
      </button>
   )
}
