
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { OperationResponse, Signer } from "@neynar/nodejs-sdk/build/api";

type Props = {
   channelId: string,
   toggle: boolean,
   setToggle: Dispatch<SetStateAction<boolean>>,
}

export const MemberStatusModal = ({ channelId, toggle, setToggle}: Props) => {

   const closeModal = () => {
      setToggle(false)
   }

   const acceptInvite = async () => {
      const { signer_uuid: signerId }: Signer = JSON.parse(localStorage.getItem('signer') ?? '')
      const reqData = { channelId, signerId }
      const res = await fetch('/api/accept-invite', {
         headers: { "Content-Type": "application/json" },
         method: 'PUT', body: JSON.stringify(reqData)
      })
      const { success, message }: OperationResponse = await res.json()
      if (success) console.log(message)
   }

   return (
      <Dialog open={toggle} onClose={closeModal} className="relative z-50">
         <DialogBackdrop className="fixed inset-0 bg-black/75 backdrop-blur" />
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
      </Dialog>
   );
}