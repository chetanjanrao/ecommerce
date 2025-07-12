"use client";
import React, { useEffect, useState } from "react"
import { useBasketStore } from "@/store/store"
import { SignInButton, useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import AddToBasketButton from "@/components/AddToBasketButton";
import Image from "next/image";
import createCheckoutSession from "@/actions/createCheckoutSession";
import { imageUrl } from "@/lib/imageUrl";
import Loader from "@/components/Loader";
import { Metadata } from "@/actions/createCheckoutSession";


function BasketPage() {
   const groupedItems = useBasketStore((state) => state.getGroupedItems());
   const { isSignedIn } = useAuth();
   const { user } = useUser();
   const router = useRouter();

   const [isClient, setIsClient] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   useEffect(() => {
      setIsClient(true)
   }, [])
   if (!isClient) {
      return <Loader />
   }
   async function handleCheckout() {
      if (!isSignedIn) return;
      setIsLoading(true);
      try {
         const metadata: Metadata = {
            orderNumber: crypto.randomUUID(),
            customerName: user?.fullName ?? "Unknown",
            customerEmail: user?.emailAddresses[0].emailAddress ?? "Unknown",
            clerkUserId: user?.id ?? "Unknown",
         }
         const checkoutUrl = await createCheckoutSession(groupedItems, metadata)
         console.log("checkoutUrl", checkoutUrl);
         if (checkoutUrl) {
            window.location.href = checkoutUrl;
         }
      } catch (error) {
         console.log(error);
      } finally {
         setIsLoading(false);
      }
   }

   if (groupedItems.length === 0) {
      return (
         <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
               <h1 className="text-3xl font-bold text-gray-800 mb-4">
                Your 🛒  Basket is Empty
               </h1>
            </div>
         </div>
      )
   }


   return (
      <div className="container mx-auto px-4 max-w-6xl">
         <h1 className="text-2xl font-bold mb-4">Your Basket</h1>
         <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-grow">
               {
                  groupedItems.map((item) => (
                     <div key={item.product._id}
                        className="mb-4 p-4 border rounded flex items-center justify-between"
                     >
                        <div className="flex items-center cursor-pointer flex-1 min-w-0"
                           onClick={() => router.push(`/product/${item.product.Slug?.current}`)}
                        >
                           <div className="w-20 h-20 sm:-24 flex-shrink-0 mr-4">
                              {
                                 item.product.image && (
                                    <Image
                                       src={imageUrl(item.product.image).url()}
                                       alt={item.product.name || "Product image"}
                                       className="w-full h-full object-contain rounded"
                                       width={95}
                                       height={96}
                                    />
                                 )
                              }
                           </div>
                           <div className="min-w-0">
                              <h2 className="text-xl sm:text-xl font-semibold truncate">{item.product.name}</h2>
                              <p className="text-sm sm:text-base">
                                 Price : {((item.product.price ?? 0) * item.quantity).toFixed(2)}
                              </p>
                           </div>
                        </div>
                        <div className="flex items-center ml-4 flex-shrink-0"><AddToBasketButton product={item.product} disabled={isLoading} />
                        </div>
                     </div>
                  ))
               }
            </div>
         </div>


         <div className="w-[97%] m-4 lg:w-80 lg:sticky lg:top-4 h-fit bg-white p-4 border rounded order-first lg:order-last fixed bottom-0 left-0 lg:left-auto">
            <h3 className="text-xl font-semibold">Order Summary</h3>
            <div className="mt-4 space-y-2">
               <p className="flex justify-between">
                  <span>Items</span>
                  <span>
                     {groupedItems.reduce((total, item) => total + item.quantity, 0)}
                  </span>
               </p>
               <p className="flex justify-between text-2xl font-bold border-t pt-2">
                  <span>Total </span>
                  <span>
                     &#8377; {useBasketStore.getState().getTotalPrice().toFixed(2)}
                  </span>
               </p>
               {
                  isSignedIn ? (
                     <button onClick={handleCheckout}
                        disabled={isLoading}
                        className="mt-4 w-full bg-blue-500 text-white font-semibold pt-2 pb-2 px-4 rounded hover:bg-blue-600 hover:cursor-pointer"
                     >
                        {isLoading ? "Loading..." : "Checkout"}
                     </button>
                  ) : (
                     <SignInButton mode="modal">
                        <button className="mt-4 w-full bg-blue-500 font-semibold text-white pt-2 pb-2 px-4 rounded hover:bg-blue-600 hover:cursor-pointer">
                           Sign In to Checkout
                        </button>
                     </SignInButton>
                  )
               }
            </div>
         </div>
      </div>
   )
}
export default BasketPage;