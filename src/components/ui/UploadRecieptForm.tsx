
'use client'

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import Image from 'next/image';
import sdk from '@farcaster/miniapp-sdk';

type Embed = [string, string] | [string] | []
type ComponentProps = {
   channelId: string
}

export interface FormData {
   images: [File, File] | [File] | [];
   text: string;
   amount: number;
}


export default function UploadReceiptField({ channelId }: ComponentProps) {
   // const [formData, setFormData] = useState<FormData>()
   const { register, handleSubmit, setValue, setError, clearErrors, watch, formState: { errors }, } = useForm<FormData>({
      defaultValues: {
         images: [],
         text: "Proof of Pizza @pizzadao @base",
         amount: 0,
      },
   });

   const [imagePreviews, setImagePreviews] = useState<Embed>([]);
   const images = watch("images");

   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files) return;

      const uploadedFiles = Array.from(files).concat(images || []);
      console.log("Uploaded Files:", uploadedFiles);
      if (uploadedFiles.length > 2) {
         setError("images", { message: "You can upload a maximum of 2 images." });
         return;
      }

      const validFiles = uploadedFiles.filter((file) => file.size <= 20 * 1024 * 1024);
      if (validFiles.length !== uploadedFiles.length) {
         setError("images", { message: "Each image must be less than 3MB." });
         return;
      }

      const valid: [] | [File] | [File, File] = validFiles.length == 2 ? [validFiles[0] as File, validFiles[1] as File] : [validFiles[0] as File];

      const previewUrls = validFiles.map((file) => URL.createObjectURL(file));
      const urls: Embed = previewUrls.length === 2 ? [previewUrls[0] as string, previewUrls[1] as string] : [previewUrls[0] as string];

      setImagePreviews((prev) => prev.length ? [prev[0] as string, previewUrls[0]] : urls);
      setValue("images", valid, { shouldValidate: true });
      clearErrors("images"); // Clear error once valid images are added
   };

   const removeImage = (index: number) => {

      if (images.length === 1) {
         setImagePreviews([]);
         setValue("images", [], { shouldValidate: true });
         setError("images", { message: "Upload proof of pizza" });
         return
      };

      setImagePreviews(index == 0 ? [imagePreviews[1] as string] : [imagePreviews[0] as string]);
      const updatedImages: [File] | [] = index == 0 ? [images[1] as File] : [images[0] as File]
      setValue("images", updatedImages, { shouldValidate: true });

   };

   const onSubmit = async (data: FormData) => {
      if (data.images.length === 0) {
         setError("images", { message: "Upload proof of pizza" });
         return;
      }
      const formData = new FormData()
      images.forEach((img: File) => formData.append("images", img))
      try {
         const res = await (await fetch('/api/upload-image', {
            method: 'POST', body: formData
         })).json()

         const embeds: Embed = res.imageUrls.length === 1 ? [res?.imageUrls[0]] : [res?.imageUrls[0], res?.imageUrls[1]];

         await sdk.actions.composeCast({
            text: `${data.text}\n\nCost: $${data.amount}`.trim(),
            embeds, channelKey: channelId,
         })
      } catch (error: any) {
         console.error("Error uploading images:", error);
         setError("images", { message: error.message || "Failed to upload images" });
         return;
      }
   };

   return (
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 my-3 text-pretty font-display text-sm font-medium leading-none'>
         <label htmlFor='test' className='flex flex-col gap-2 mt-1'>
            <span className='pl-3 text-red-500'>Message</span>
            <textarea {...register('text')} id='address' placeholder='Had the best pizza in west phili' rows={4} className='rounded-tr-3xl rounded-bl-3xl bg-black/[.03] p-3 outline-none border' />
         </label>
         <div className='relative'>
            <span className='pl-3 text-red-500'>Upload Images of Pizza and Receipt</span>
            <input
               id='file'
               type="file"
               accept="image/*"
               multiple
               className="hidden"
               onChange={handleImageUpload}
            />
            <label htmlFor='file' className="relative flex flex-col items-center min-h-36 justify-center bg-black/[.03] rounded-3xl p-3 mt-2">
               <svg width="27" height="26" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.5013 9.58334C6.5013 6.03952 9.37414 3.16668 12.918 3.16668C16.0571 3.16668 18.672 5.42205 19.2262 8.40113C19.3039 8.81889 19.6026 9.16136 20.0059 9.29512C22.3285 10.0654 24.0013 12.2555 24.0013 14.8333C24.0013 18.055 21.3896 20.6667 18.168 20.6667C17.5236 20.6667 17.0013 21.189 17.0013 21.8333C17.0013 22.4777 17.5236 23 18.168 23C22.6783 23 26.3346 19.3437 26.3346 14.8333C26.3346 11.4588 24.2886 8.56481 21.372 7.31952C20.374 3.58434 16.9683 0.833344 12.918 0.833344C8.08548 0.833344 4.16797 4.75085 4.16797 9.58334C4.16797 9.70034 4.17027 9.81684 4.17484 9.93282C2.08019 11.1413 0.667969 13.4047 0.667969 16C0.667969 19.866 3.80198 23 7.66797 23C8.3123 23 8.83464 22.4777 8.83464 21.8333C8.83464 21.189 8.3123 20.6667 7.66797 20.6667C5.09064 20.6667 3.0013 18.5773 3.0013 16C3.0013 14.0664 4.17751 12.4049 5.85806 11.697C6.34437 11.4921 6.63263 10.9863 6.56103 10.4635C6.5217 10.1763 6.5013 9.88253 6.5013 9.58334Z" fill="#475367" />
                  <path d="M12.7262 15.128C13.1682 14.7351 13.8344 14.7351 14.2764 15.128L16.0264 16.6836C16.508 17.1117 16.5514 17.8491 16.1233 18.3307C15.7488 18.752 15.1376 18.8379 14.668 18.5662V24.1667C14.668 24.811 14.1456 25.3333 13.5013 25.3333C12.857 25.3333 12.3346 24.811 12.3346 24.1667V18.5662C11.8651 18.8379 11.2538 18.752 10.8793 18.3307C10.4513 17.8491 10.4946 17.1117 10.9762 16.6836L12.7262 15.128Z" fill="#475367" />
               </svg>
               <span className="text-blue-600 lg:text-lg">
                  Click to Upload Pizza and Receipt Images
               </span>
            </label>
            {errors.images && <span className='text-sm text-light text-red-700'>{errors.images.message}</span>}
            <div className="flex gap-2 mt-2">
               {imagePreviews.map((src, index) => (
                  <div key={index} className="relative w-20 h-20">
                     <Image src={src} alt={`Preview ${index}`} fill className="rounded object-cover" />
                     <button
                        type="button"
                        className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 rounded-full"
                        onClick={() => removeImage(index)}
                     >
                        ✕
                     </button>
                  </div>
               ))}
            </div>
         </div>
         <label htmlFor='amount' className='flex flex-col gap-2 mt-1'>
            <span className='pl-3 text-red-500'>Amount to Reimburse</span>
            <input {...register('amount', { required: true })} id='address' placeholder='$100' className='rounded-3xl bg-black/[.03] p-3 outline-none border-b' />
            {errors.amount && <span className='text-sm text-light text-red-700'>state the amount to be reimbursed</span>}
         </label>
         <div>
            <input
               className=" w-full block rounded-3xl border-2 border-black/50 bg-yellow-50 px-8 pb-2.5 pt-3.5 text-center font-display text-xl font-bold uppercase text-black shadow-lg duration-100 ease-in-out hover:bg-yellow-200 hover:text-black" type='submit' value={'Submit request'}
            />
         </div>
      </form>
   )
}
