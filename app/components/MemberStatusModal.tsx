'use client'

import { put } from '@vercel/blob';
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import {
   Dialog,
   DialogBackdrop,
   DialogPanel,
   DialogTitle,
} from "@headlessui/react";
import { OperationResponse, PostCastResponse, Signer } from "@neynar/nodejs-sdk/build/api";

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
   const [success, setSuccess] = useState(false)
   
   useEffect(() => {
      if(toggle && isMember)
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
      const { images, address, amount } = castData
      try {
         const imageUrls = (await Promise.all(images.map((image: File) => {
            return put(image.name, image, {
               access: 'public'
            })
         }))).map(blob => blob.url)
         console.log(imageUrls)

         const { signer_uuid } = JSON.parse(localStorage.getItem('signer') ?? "")
         const reqData = {
            imageUrls, signerId: signer_uuid,
            text: `${address} $${amount}`
         }

         const res: PostCastResponse = await (await fetch('/api/send-cast', {
            headers: { "Content-Type": "application/json" },
            method: 'POST', body: JSON.stringify(reqData)
         })).json()

         if (res.success){ 
            console.log(res.cast) 
            setLoading(false)
            setSuccess(true)
         }
      } catch (error) {
         console.log(error)
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
                  <DialogTitle className="w-full text-left font-display text-2xl font-bold">
                     Casting to Pizzafaucet channel
                  </DialogTitle>
                  <div>
                     {
                        loading && 
                        <></>
                     }
                     {
                        !loading && success && 
                        <></>
                      }
                  </div>
               </DialogPanel>
            </div>
         }
      </Dialog>
   );
}