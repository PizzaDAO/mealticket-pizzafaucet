import { AuthClientError } from "@farcaster/auth-client";
import { QRCode } from "@farcaster/auth-kit";

export function QRCodeDialog({
   loading,
   url,
   isError,
   error,
}: {
   loading: boolean
   url: string
   isError: boolean
   error?: AuthClientError
}) {
   return (
      <div className={'body'}>
         {isError &&
            <>
               <div className={'siwf-heading text-red-400'}>!!!Error!!!</div>
               <div className={'instructions'}>
                  {error?.message ?? "Unknown error, please try again."}
               </div>
            </>
         }
         {
            !isError &&
            <>
               <div className={'instructions'}>
                  {"To sign in with Farcaster, scan the code below with your phone&#39;s camera."}
               </div>
               {
                  loading &&
                  <div className={'qr-code-image'}>
                     <svg className="animate-spin h-20 w-20 text-gray-500" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path
                           className="opacity-75"
                           fill="currentColor"
                           d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 11-8 8z"
                        />
                     </svg>
                  </div>
               }
               {
                  !loading && url &&
                  <>
                     <div className="qr-code-image">
                        <QRCode uri={url} size={200} />
                     </div>
                     <div style={{ display: "flex", justifyContent: "center" }}>
                        <button
                           style={{
                              display: "flex",
                              alignItems: "center",
                              fontWeight: 500,
                           }}
                           onClick={() => {
                              window.open(url, "_blank");
                           }}
                        >
                           <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={12}
                              height={18}
                              fill="none"
                           >
                              <title>Sign in With Farcaster QR Code</title>
                              <path
                                 fill="#7C65C1"
                                 fillRule="evenodd"
                                 d="M0 3a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V3Zm4-1.5v.75c0 .414.336.75.75.75h2.5A.75.75 0 0 0 8 2.25V1.5h1A1.5 1.5 0 0 1 10.5 3v12A1.5 1.5 0 0 1 9 16.5H3A1.5 1.5 0 0 1 1.5 15V3A1.5 1.5 0 0 1 3 1.5h1Z"
                                 clipRule="evenodd"
                              />
                           </svg>
                           <span style={{ marginLeft: 9 }}>{"I&#39;m using my phone →"}</span>
                        </button>
                     </div>
                  </>
               }
            </>
         }

      </div>
   );
}