
'use client'

import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { NeynarAuthButton, SIWN_variant, useNeynarContext } from "@neynar/react";
import { FarcasterLoginButton } from './FarcasterLogin';


type ComponentProps = {
   isLoggedIn: boolean,
   setLoggedIn: Dispatch<SetStateAction<boolean>>
}

type Inputs = {
   images: FileList,
   address: string,
   amount: Number
}


export default function UploadReceiptField({ isLoggedIn, setLoggedIn }: ComponentProps) {

   const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
   const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
   } = useForm<Inputs>();

   useEffect(() => {
      addImages(watch("images"))
   }, [watch('images')])


   const addImages = (images: FileList) => {
      if (uploadedFiles && uploadedFiles?.length > 2 && (uploadedFiles.length + images.length) > 2) {
         return;
      }
      let files = uploadedFiles;
      for (let i = 0; i < images.length; i++) {
         files.push(images.item(i) as File)
      }
      setUploadedFiles(files)
      console.log("image added", uploadedFiles)
   }

   const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

   return (
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 my-3 text-pretty font-display text-sm font-medium leading-none'>
         <div className='relative'>
            <span className='pl-3 text-red-500'>Upload Image of Pizza and Receipt</span>
            <input {...register('images', { required: true })} id='file' type='file' multiple className='hidden' />
            <label htmlFor='file' className="relative flex flex-col items-center min-h-36 justify-center bg-black/[.03] rounded-3xl p-3 mt-2">
               <svg width="27" height="26" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.5013 9.58334C6.5013 6.03952 9.37414 3.16668 12.918 3.16668C16.0571 3.16668 18.672 5.42205 19.2262 8.40113C19.3039 8.81889 19.6026 9.16136 20.0059 9.29512C22.3285 10.0654 24.0013 12.2555 24.0013 14.8333C24.0013 18.055 21.3896 20.6667 18.168 20.6667C17.5236 20.6667 17.0013 21.189 17.0013 21.8333C17.0013 22.4777 17.5236 23 18.168 23C22.6783 23 26.3346 19.3437 26.3346 14.8333C26.3346 11.4588 24.2886 8.56481 21.372 7.31952C20.374 3.58434 16.9683 0.833344 12.918 0.833344C8.08548 0.833344 4.16797 4.75085 4.16797 9.58334C4.16797 9.70034 4.17027 9.81684 4.17484 9.93282C2.08019 11.1413 0.667969 13.4047 0.667969 16C0.667969 19.866 3.80198 23 7.66797 23C8.3123 23 8.83464 22.4777 8.83464 21.8333C8.83464 21.189 8.3123 20.6667 7.66797 20.6667C5.09064 20.6667 3.0013 18.5773 3.0013 16C3.0013 14.0664 4.17751 12.4049 5.85806 11.697C6.34437 11.4921 6.63263 10.9863 6.56103 10.4635C6.5217 10.1763 6.5013 9.88253 6.5013 9.58334Z" fill="#475367" />
                  <path d="M12.7262 15.128C13.1682 14.7351 13.8344 14.7351 14.2764 15.128L16.0264 16.6836C16.508 17.1117 16.5514 17.8491 16.1233 18.3307C15.7488 18.752 15.1376 18.8379 14.668 18.5662V24.1667C14.668 24.811 14.1456 25.3333 13.5013 25.3333C12.857 25.3333 12.3346 24.811 12.3346 24.1667V18.5662C11.8651 18.8379 11.2538 18.752 10.8793 18.3307C10.4513 17.8491 10.4946 17.1117 10.9762 16.6836L12.7262 15.128Z" fill="#475367" />
               </svg>
               <span className="text-blue-600 lg:text-lg">
                  Click to upload Pizza and Receipt
               </span>
            </label>
            {
               uploadedFiles.length > 0 &&
               <div className='z-10 absolute top-0 end-3 p-3 bg-sky-400 flex gap-2'>
                  { uploadedFiles.map((file, index) => (
                     <div key={index} className='border py-4 px-3 border-red-400'>
                        1
                     </div>
                  )) }
               </div> 
            }
         </div>
         {errors.images && <span className='text-sm text-light text-red-700'>add an address to be funded upon comfirmation</span>}
         
         <label htmlFor='address' className='flex flex-col gap-2 mt-1'>
            <span className='pl-3 text-red-500'>Reimbursement Address</span>
            <input {...register('address', { required: true })} id='address' placeholder='0x' className='rounded-3xl bg-black/[.03] p-3 outline-none border-b' />
            {errors.address && <span className='text-sm text-light text-red-700'>add an address to be funded upon comfirmation</span>}
         </label>
         <label htmlFor='amount' className='flex flex-col gap-2 mt-1'>
            <span className='pl-3 text-red-500'>Amount to Reimburse</span>
            <input {...register('amount', { required: true })} id='address' placeholder='$100' className='rounded-3xl bg-black/[.03] p-3 outline-none border-b' />
            {errors.amount && <span className='text-sm text-light text-red-700'>state the amount to be reimbursed</span>}
         </label>
         {
            isLoggedIn &&
            <input
               className="block rounded-3xl border-2 border-black/50 bg-yellow-50 px-8 pb-2.5 pt-3.5 text-center font-display text-xl font-bold uppercase text-black shadow-lg duration-100 ease-in-out hover:bg-yellow-200 hover:text-black" type='submit' value={'Submit request'}
            />
         }
         {
            !isLoggedIn &&
            <FarcasterLoginButton isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />
         }
      </form>
   )
}