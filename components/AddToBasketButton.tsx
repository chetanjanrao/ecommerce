"use client"
import React, { useEffect, useState } from "react";
import { Product } from "@/sanity.types";
import { useBasketStore } from "@/store/store";

interface AddToBasketButtonProps {
      product: Product;
      disabled?: boolean
}

function AddToBasketButton({ product, disabled }: AddToBasketButtonProps) {
      const { addItem, removeItem, getItemCount } = useBasketStore();
      const itemCount = getItemCount(product._id);
      const [isClient, setIsClient] = useState(false);
      useEffect(() => {
            setIsClient(true)
      }, [])
      if (!isClient) {
            return null;
      }
      return (
            <div className="flex items-center space-x-2 justify-center">
                  <button
                        onClick={() => removeItem(product._id)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center 
  transition-colors duration-200 ${itemCount === 0
                                    ? "bg-gray-100 cursor-not-allowed"
                                    : "bg-gray-200 hover:bg-gray-300"
                              }`}
                        disabled={itemCount === 0 || disabled}
                  >
                        <span
                              className={`text-xl font-bold ${itemCount === 0 ? "text-gray-400" : "text-gray-600"
                                    }`}
                        >
                              –
                        </span>
                  </button>
                  <span className="w-8 text-center font-semibold">{itemCount}</span>
                  <button
                        onClick={() => addItem(product)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center hover:cursor-pointer
  transition-colors duration-200 ${disabled
                                    ? "bg-gray-100 cursor-not-allowed"
                                    : "bg-blue-500 hover:bg-blue-600"
                              }`}
                        disabled={disabled}
                  >
                        <span
                              className={`text-xl font-bold hover:cursor-pointer ${itemCount === 0 ? "text-gray-400" : "text-gray-600"
                                    }`}
                        >
                              +
                        </span>
                  </button>
            </div>
      )
}
export default AddToBasketButton;