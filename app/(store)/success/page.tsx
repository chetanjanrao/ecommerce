"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useBasketStore } from "../../../store/store";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function SuccessPage() {
      const searchParams = useSearchParams();
      const orderNumber = searchParams.get("orderNumber");
      const clearBasket = useBasketStore((state) => state.clearBasket);

      useEffect(() => {
            if (orderNumber) {
                  clearBasket();
            }
      }, [orderNumber, clearBasket]);

      return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
                  <div className="bg-white p-12 rounded-xl shadow-lg max-w-2xl w-full mx-4">
                        <div className="flex justify-center mb-8">
                              <div className="h-18  w-18 rounded-full bg-green-100 flex items-center justify-center">
                                    <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M20 50 L40 70 L80 30" stroke="green" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                              </div>
                        </div>
                        <h1 className="text-2xl font-semibold mb-4 text-center">Thank you for your order!</h1>
                        <div className="border-t text-center border-b border-gray-200 py-6 mb-6">
                             <p className="text-lg text-gray-700 mb-4">
                               Your order has been confiremed and will be shipped shortly.
                             </p>
                             <div className="space-y-2">
                                 {
                                    orderNumber && (
                                          <p className="text-gray-600 flex items-center space-x-5">
                                                <span>Order Number:</span>
                                                <span className="font-mono text-sm text-green-600">{orderNumber}</span>
                                          </p>
                                    )
                                 }
                             </div>
                        </div>
                        <div className="space-y-4">
                              <p className="text-gray-600">
                                    A confirmation email has been sent to your email address.Please check your inbox.
                              </p>
                              <div className="flex  flex-col gap-4 items-center justify-center">
                                  <Button className="bg-green-600 hover:bg-green-700">
                                      <Link href="/orders"  >View order details.</Link>
                                  </Button>
                                  <Button variant={"outline"}>
                                     <Link  href="/">Continue shopping</Link>
                                  </Button>
                              </div>
                         </div>     
                  </div>
            </div>
      );
}

export default SuccessPage;