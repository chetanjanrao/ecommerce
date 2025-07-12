// Make sure Product is exported from "@/sanity.types" or import the correct type
// import { Product } from "@/sanity.types";
import { Product } from "@/sanity.types";
import { imageUrl } from "../lib/imageUrl"
import Link from "next/link";
import Image from "next/image";
export default function ProductThumb({ product }: { product: Product }) {
    const isOutOfStock = product.stock != null && product.stock <= 0;
    console.log("product thumb",product)
   
    return (
        <Link href={`/product/${product?.slug?.current}`}
            className={`group flex flex-col text-black bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden ${isOutOfStock ? "opacity-50" : ""}`}
        >
            
            <div className="relative aspect-[4/3] w-full h-full overflow-hidden">
                {product.image && ( <Image
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    //  src={imageUrl(product.images).url()}
                    src={imageUrl(product.image).url()}
                    
                    alt={product.name || "Product image"}
                    fill
                    sizes="(max-width: 780px) 100vw, (max-width: 1200px) 50vw, 33vw"
                /> )
                }
                 {
                    isOutOfStock && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <span className="text-white font-bold text-lg">Out Of stock</span>
                        </div>
                    )
                }
             </div>
               <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-800 truncate">{product.name}</h2>
              
               <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                 {product.description?.map((block)=>block._type === "block"
                 ? block.children?.map((child: { text: any })=>child.text).join("") : ""
                 ).join("") || "no description available"} 

               </p>
                <p className="mt-2 text-lg font-bold text-gray-900">&#8377; {product.price}</p>
           </div>
        </Link>
    )
}