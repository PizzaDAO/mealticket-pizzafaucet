

const Page = () => {

   return (
      <main className="flex flex-col gap-4">
         <PropertyImageGrid />
         <div className="mx-10">
            <PropertyInfoSection />
            <PropertyFeatureSection />
            <PropertyLocationSection />
            <PropertyPolicySection />
         </div>
      </main>
   )

}

const PropertyImageGrid = () => {
   return (
      <div className="grid grid-cols-6">
         <div className="col-span-4 p-4 border border-gray-400 relative">
            <img src="../images/list.jpeg" className="object-cover" />
            <button className="rounded-3xl px-7 py-2 bg-green-400 text-white absolute start-5 bottom-5">View all photos</button>
         </div>
         <div className="col-span-2 grid grid-cols-2 p-2 gap-2 border border-gray-400">
            <span className="p-4 border border-gray-400"></span>
            <span className="p-4 border border-gray-400"></span>
            <span className="p-4 border border-gray-400"></span>
            <span className="p-4 border border-gray-400"></span>
         </div>
      </div>
   )
}

const PropertyInfoSection = () => {
   return (
      <div className="flex align-center gap-8 ">
         <div className="w-3/5">
            <h1 className="text-5xl font-bold">24 units of Stores</h1>
            <p className="text-xm font-medium pt-2">Victoria Island, Lagos</p>
            <div className="flex space-between w-full pt-5">
               <p className="w-full">
                  <span>12 warehouse</span>
                  <span className="pl-2">8 standard stores</span>
               </p>
               <p className="w-full">
                  <span className="pr-2">5000sq</span>
                  <span className="border-l px-2 border-gray-400">Central Area</span>
                  <span className="border-l px-2 border-gray-400">4 Floors</span>
                  <span className="border-l px-2 border-gray-400">Elevator</span>
               </p>
            </div>
            <div>
               <h3 className="text-3xl font-semibold pt-9">Description</h3>
               <p>A truly global city, London has long been considered a hub for culture, style, and finance...</p>
            </div>
            <div>
               <h3 className="text-2xl font-semibold pt-4">In sed</h3>
               <p>N nullam eget urna suspendisse odio arcu...</p>
            </div>
            <div>
               <h3 className="text-2xl font-semibold pt-4">Adpiscing risus fermentum</h3>
               <p>Lacus eros consequat pellentesque lacus...</p>
            </div>
         </div>
         <div className="w-2/5 py-7 px-8 bg-gray-200 rounded-2xl">
            <h2 className="w-full text-center text-3xl font-bold text-gray-900">£20,000,000</h2>
            <div className="flex space-between items-center gap-4 mt-5">
               <p className="w-full flex flex-col font-semibold">
                  Project start <span className="px-3 py-2 bg-white rounded-md mt-1 font-normal">31.12.2021</span>
               </p>
               <p className="w-full flex flex-col font-semibold">
                  Project expected end <span className="px-3 py-2 bg-white rounded-md mt-1 font-normal">31.02.2022</span>
               </p>
            </div>
            <p className="mt-3">All utilities are included</p>
            <div className="mt-4 flex flex-col gap-2">
               <p className="grid grid-cols-3">
                  <span className="col-span-2">Maximum investors count</span>
                  <span className="self-end text-right">50</span>
               </p>
               <p className="grid grid-cols-3">
                  <span className="col-span-2">Expected yearly ROI</span>
                  <span className="flex flex-col text-right">
                     £3700
                     <span className="text-xs font-light">incl. VAT</span>
                  </span>
               </p>
               <p className="grid grid-cols-3 font-semibold">
                  <span className="col-span-2">Pay upon booking</span>
                  <span className="flex flex-col text-right">
                     £10000.23
                     <span className="text-xs font-light">incl. VAT</span>
                  </span>
               </p>
               <p className="grid grid-cols-3">
                  <span className="col-span-2 flex flex-col ">
                     Total costs
                     <span className="text-xs">show more</span>
                  </span>
                  <span className="flex flex-col text-right">
                     £4001.70
                     <span className="text-xs">incl. VAT</span>
                  </span>
               </p>
            </div>
            <div className="flex flex-col items-center mt-3">
               <button className="mt-4 bg-green-600 text-white px-6 py-2 rounded-3xl hover:bg-green-700">Proceed to fund</button>
               <p className="mt-2 text-xs text-gray-600 text-center">When you book this apartment, your reservation will be confirmed instantly.</p>
            </div>
         </div>
      </div>
   )
}

const PropertyFeatureSection = () => {
   return (
      <div className="mt-6 ">
         <h2 className="text-4xl font-bold text-center">Features</h2>
         <div className="grid grid-flow-col grid-rows-4 gap-x-8 text-gray-700">
            <p className="flex flex-col">
               TV
               <span className="text-xs">Flat-screen TV</span>
            </p>
            <p>Fridge</p>
            <p>Washing machine</p>
            <p>Kettle</p>
            <p>Dryer</p>
            <p>Fireplace</p>
            <p>Coffee machine</p>
            <p>Iron</p>
            <p>Phone</p>
            <p>Dishes</p>
            <p>Wardrobe</p>
         </div>
      </div>
   )
}

const PropertyLocationSection = () => {
   return (
      <div className="mt-6 ">
         <h2 className="text-4xl font-bold text-center">Location</h2>
         <iframe className="w-full h-64 mt-4" src="https://www.google.com/maps/embed" allowFullScreen></iframe>
      </div>
   )
}

const PropertyPolicySection = () => {
   return (
      <div className="mt-6 ">
         <h2 className="text-4xl font-bold text-center">Policy Detail</h2>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
            <div>
               <h3 className="font-bold">Investment Rules</h3>
               <ul className="text-gray-700 list-disc pl-5">
                  <li>No transfer of ownership within the first year</li>
                  <li>Capital repayment after project completion</li>
                  <li>No third-party / proxy investment</li>
               </ul>
            </div>
            <div>
               <h3 className="font-bold">Cancellation Policy</h3>
               <p className="text-gray-700">Free cancellation up to 24hrs before check-in</p>
            </div>
            <div>
               <h3 className="font-bold">Insurance Policy</h3>
               <p className="text-gray-700">The project is currently being insured by Coronation Insurance</p>
            </div>
         </div>
      </div>
   )
}

export default Page