"use client";
import { Product } from "@/sanity.types";
import ProductThumb from "./ProductThumb";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

export default function ProductGrid({ products }: { products: Product[] }) {
   useEffect(()=>{
   console.log("ProductGrid rendering, products:", products);

   },[])
   return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
         <AnimatePresence>
            {products.map((product) => (
               <motion.div
                  key={product._id}
                  layout
                  initial={{ opacity: 0.2 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0.2 }}
                  className="flex justify-center"
               >
                  <ProductThumb product={product} />
               </motion.div>
            ))}
         </AnimatePresence>
      </div>
   );
}
