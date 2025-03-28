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

export const FarcasterLogin = ({setLoggedIn, toggle, setToggle}: Props) => {

   const closeModal = () => {
      setToggle(false)
      setChannelToken("")
      setStatus(undefined)
      setLoading(true)
      setError(null)
      setErrorStatus(false)
      setSignInUrl("")
   }

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
            const res = await fetch("/api/register-signer")
            const signerRes = (await res.json()).signer
            console.log(signerRes)
            setSigner(signerRes)
            setSignInUrl(signerRes?.signer_approval_url || "")
            setLoading(false)
            console.log(signInUrl)
         } catch (error) {
            setErrorStatus(true)
            setError(error)
            setLoading(false)
         }
      })()
   }, [signInUrl, toggle])

   useEffect(() => {
      (async () => {
         if (signInUrl && toggle && !errorStatus && (state === 'pending_approval' || state === undefined)) {
            const res = await fetch(`/api/confirm-status`, {
               headers: { "Content-Type": "application/json" },
               method: 'POST', body: JSON.stringify({ signer: signer?.signer_uuid })
            })
            const data = (await res.json()).signer
            setState(data.status)
            if (data.status === 'approved') {
               setSigner(data)
               setLoggedIn(true)
               console.log(data)
               localStorage.setItem("signer", JSON.stringify(data))
               closeModal()
            } else setCount(count + 1)
         }  
      })()
   }, [signInUrl, toggle, state, count])

   return (
      <Dialog open={toggle} onClose={closeModal} className="relative z-50">
         <DialogBackdrop className="fixed inset-0 bg-black/75 backdrop-blur" />
         <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
            <DialogPanel className="w-full flex flex-col items-center gap-4 max-w-lg rounded-xl border bg-yellow-50 p-5 font-sans lg:p-8">
               <DialogTitle className="w-full text-left font-display text-2xl font-bold">
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
      console.log('open')
      setToggle(true)
   }

   return (
      <button
        className="block rounded-3xl border-2 border-black/50 bg-yellow-50 px-8 pb-2.5 pt-3.5 text-center font-display text-xl font-bold uppercase text-black shadow-lg duration-100 ease-in-out hover:bg-yellow-200 hover:text-black" type="button" onClick={openModal}
      >
        Connect Farcaster Account
        <FarcasterLogin toggle={toggle} setToggle={setToggle} setLoggedIn={setLoggedIn} />
      </button> 
   )
}