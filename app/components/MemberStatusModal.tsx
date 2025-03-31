'use client'

import { Dispatch, SetStateAction, useEffect, useState } from "react"
import {
   Dialog,
   DialogBackdrop,
   DialogPanel,
   DialogTitle,
} from "@headlessui/react";
import { OperationResponse, Signer } from "@neynar/nodejs-sdk/build/api";

type Props = {
   isMember: boolean,
   channelId: string,
   toggle: boolean,
   castData: any,
   setToggle: Dispatch<SetStateAction<boolean>>,
   checkMemberStatus: (fid: number) => Promise<void>
}

export const MemberStatusModal = ({ channelId, toggle, setToggle, castData, isMember, checkMemberStatus }: Props) => {

   const [loading, setLoading] = useState(false)
   const [status, setStatus] = useState("")
   const [success, setSuccess] = useState(false)

   useEffect(() => {
      if (toggle && isMember)
         (async () => {
            await sendCast()
         })()
   }, [isMember, toggle])

   const closeModal = () => {
      setToggle(false)
   }

   const acceptInvite = async () => {
      const { signer_uuid: signerId, fid }: Signer = JSON.parse(localStorage.getItem('signer') ?? '')
      const reqData = { channelId, signerId }
      const res = await fetch('/api/accept-invite', {
         headers: { "Content-Type": "application/json" },
         method: 'PUT', body: JSON.stringify(reqData)
      })
      const { success, message }: OperationResponse = await res.json()
      if (success) {
         console.log(message)
         await checkMemberStatus(fid ?? 0)
      }
   }

   const sendCast = async () => {
      setLoading(true)
      const { images, text, amount } = castData
      try {

         setStatus("forwarding cast ...")
         const { signer_uuid } = JSON.parse(localStorage.getItem('signer') ?? "")
         const formData = new FormData()
         images.forEach((img: File) => formData.append("images", img))
         formData.append("text", `${text} $${amount}`.trim())
         formData.append("signerId", signer_uuid)
         formData.append("channelId", channelId)

         const res = await (await fetch('/api/send-cast', {
            method: 'POST', body: formData
         })).json()
         console.log()
         if (res.success) {
            setStatus("cast successfully sent")
            console.log(res.cast)
            setLoading(false)
            setSuccess(true)
         } else if (res.isError) {
            setLoading(false)
            setStatus("cast not sent because of error " + (res.error?.message || ""))
         } else {
            setLoading(false)
            setStatus("cast sending failed, try again")
         }
      } catch (error: any) {
         console.log(error)
         setLoading(false)
         setStatus("cast not sent because of error " + (error?.message || ""))
      }
   }

   return (
      <Dialog open={toggle} onClose={closeModal} className="relative z-50">
         <DialogBackdrop className="fixed inset-0 bg-black/75 backdrop-blur" />
         {
            !isMember &&
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
               <DialogPanel className="w-full flex flex-col items-center gap-4 max-w-lg rounded-xl border bg-yellow-50 p-5 font-sans lg:p-8">
                  <DialogTitle className="w-full text-left font-display text-2xl font-bold">
                     Accept Pizzafaucet Membership Invitation
                  </DialogTitle>
                  <div className="flex gap-4">
                     <button
                        className="block rounded-3xl border-2 border-black/50 bg-green-200 px-8 pb-2.5 pt-3.5 text-center font-display text-xl font-bold uppercase text-black shadow-lg duration-100 ease-in-out hover:bg-green-300 hover:text-black" onClick={acceptInvite}
                     >
                        Accept
                     </button>
                     <button
                        className="block rounded-3xl border-2 border-black/50 bg-red-200 px-8 pb-2.5 pt-3.5 text-center font-display text-xl font-bold uppercase text-black shadow-lg duration-100 ease-in-out hover:bg-red-300 hover:text-black" onClick={closeModal}
                     >
                        Cancel
                     </button>
                  </div>
               </DialogPanel>
            </div>
         }
         {
            isMember && castData &&
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
               <DialogPanel className="w-full flex flex-col items-center gap-4 max-w-lg rounded-xl border bg-yellow-50 p-5 font-sans lg:p-8">
                  <DialogTitle className="w-full flex space-between font-display text-xl font-bold">
                     Casting to Pizzafaucet channel <span className="border border-red-400 text-red-400 rounded-full p-2 text-l" onClick={closeModal}>x</span>
                  </DialogTitle>
                  <div>
                     {
                        loading &&
                        <>
                           <div className={'qr-code-image flex-col items-center'}>
                              <svg className="animate-spin h-20 w-20 text-gray-500" viewBox="0 0 24 24" fill="none">
                                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                 <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 11-8 8z"
                                 />
                              </svg>
                              <p className='instructions'>{status}</p>
                           </div>
                        </>
                     }
                     {
                        !loading && success &&
                        <>
                           <div className={'qr-code-image flex-col items-center'}>
                              <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                 <circle cx="50" cy="50" r="45" stroke="green" stroke-width="5" fill="none" />
                                 <polyline points="30,50 45,65 70,35" stroke="green" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round" />
                              </svg>

                              <p className='instructions'>{status}</p>
                           </div>
                        </>
                     }
                     {
                        !loading && !success &&
                        <>
                           <div className={'qr-code-image flex-col items-center'}>
                              {/* <svg className="animate-spin h-20 w-20 text-gray-500" viewBox="0 0 24 24" fill="none">
                                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                 <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 11-8 8z"
                                 />
                              </svg> */}
                              <p className='instructions text-red-400'>{status}</p>
                           </div>
                        </>
                     }
                  </div>
               </DialogPanel>
            </div>
         }
      </Dialog>
   );
}