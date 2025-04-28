'use client'

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
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

export const FarcasterProfile = () => {
   const [open, setOpen] = useState(false);
   const dropdownRef = useRef<HTMLDivElement>(null);

   // Close dropdown when clicking outside
   useEffect(() => {
      function handleClickOutside(e: MouseEvent) {
         if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
            setOpen(false);
         }
      }
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
   }, []);

   const handleLogout = () => {
      console.log('Logging out...');
      localStorage.removeItem("faucet_user_signer")
      localStorage.removeItem("faucet_user_isLoggedIn")
      window.location.reload()
      // Add your logout logic here
   };

   return (
      <div className="relative inline-block text-left" ref={dropdownRef}>
         <button
            onClick={() => setOpen(!open)}
            className="rounded-full overflow-hidden w-10 h-10 border border-gray-300"
         >
            <img
               src="/avatar.png"
               alt="Avatar"
               className="w-full h-full object-cover"
            />
         </button>

         {open && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-10">
               <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
               >
                  Logout
               </button>
            </div>
         )}
      </div>
   );
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
         className="flex gap-2 items-center justify-center rounded-3xl border-2 border-black/50 bg-yellow-50 px-8 pb-2.5 pt-3.5 text-center font-display text-md md:text-xl font-bold uppercase text-black shadow-lg duration-100 ease-in-out hover:bg-yellow-200 hover:text-black"
          type="button" onClick={openModal}
      >
         <svg width="20" height="20" viewBox="0 0 167 155" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
               fillRule="evenodd" clipRule="evenodd" 
               d="M55.8902 155H0.999897V149C0.999897 146.239 3.23865 144 6.00007 144H6.99998V138C6.99998 135.239 9.2385 133 11.9999 133V43.9999H6.50002L0 21.9999H29V0H138V21.9999H167L160.5 43.9999H155V133C157.762 133 160 135.239 160 138V144H161C163.761 144 166 146.239 166 149V155H111.171V149C111.171 146.239 113.41 144 116.172 144H117.171V138C117.171 135.296 119.318 133.093 122 133.003V84C120.231 64.3773 103.583 48.9999 83.5 48.9999C63.4169 48.9999 46.7685 64.3773 45 84V133.001C47.7106 133.06 49.8902 135.275 49.8902 138V141V144H50.8901C53.6515 144 55.8902 146.239 55.8902 149V155Z" fill="#855DCD"
            />
         </svg>
         <span className="pt-1">Connect Farcaster Account</span>
         <FarcasterLogin toggle={toggle} setToggle={setToggle} setLoggedIn={setLoggedIn} />
      </button>
   )
}
