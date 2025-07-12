import React from "react";
import { getProductBySlug } from "@/sanity/lib/products/getProductBySlug";
import { imageUrl } from "@/lib/imageUrl";
import { PortableText } from "next-sanity";
import AddToBasketButton from "@/components/AddToBasketButton";
// import { SlugPageProps } from "@/sanity.types";
type SlugPageProps = Promise<{slug : string}>;
async function ProductPage( params : {props: SlugPageProps} ) {
      const slug : string =  params.props;
      const product = await getProductBySlug(slug);
      
      if (!product) {
            return (
                  <div className="flex items-center justify-center min-h-screen bg-gray-100">
                        <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
                              
                              <div className="text-6xl mb-4">🚫</div>
                              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                                    Page Not Found
                              </h1>
                              <p className="text-gray-600">
                                    The product you are looking for does not exist.
                              </p>      
                        </div>
                  </div>
            )
      }
      const isOutOfStock = product.stock != null && product.stock <= 0;

      return (
            <div className="container mx-auto px-4 py-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className={`relative aspect-square overflow-hidden rounded-lg shadow-lg ${isOutOfStock ? "opacity-50" : ""}`}>
                              {product.image && (
                                    <img
                                          src={imageUrl(product.image).url()}
                                          alt={product.name || "Product image"}
                                          className="object-contain transition-transform duration-300 group-hover:scale-105"
                                    />
                              )}
                              {
                                    isOutOfStock && (
                                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white font-bold text-lg">
                                                <span className="text-white font-bold text-lg">Out of stock</span>
                                          </div>
                                    )
                              }
                        </div>
                        <div className="flex flex-col justify-top">
                              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                              <div className="text-xl font-semibold mb-4">
                                    &#8377; {product.price?.toFixed(2)}
                              </div>
                              <div className="prose max-w-none mb-6">
                                    {
                                          Array.isArray(product.description) && <PortableText value={product.description} />
                                    }
                              </div>
                              <div className="mt-5">
                                    <AddToBasketButton product={product} />
                              </div>
                        </div>
                  </div>
            </div>
      )
}

export default ProductPage;
