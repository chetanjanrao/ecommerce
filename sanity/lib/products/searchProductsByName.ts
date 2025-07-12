import { defineQuery } from "next-sanity"
import { sanityFetch } from "../live"
import { Product } from "@/sanity.types";


export const searchProductsByName = async (query: string): Promise<Product[]> =>{
      // Return early if the query is empty
      console.log("query", query)
      if (!query) {
            return [];
      }

      // const PRODUCT_SEARCH_QUERY = defineQuery(
      //      `*[_type == "Products" && name match $name] | order(name asc)`
      // )
      const PRODUCT_SEARCH_QUERY = defineQuery(`
  *[
    _type == "product" &&
    name match $name
  ] | order(name asc)
`);
      try{
            const products = await sanityFetch({
                  query: PRODUCT_SEARCH_QUERY,
                  params: {
                        name: `${query}*`, // Use a wildcard for partial matching
                  },
            });
            return products.data || [];
      }catch(error){
            console.log("Error fetching products", error);
            return [];
      }
    
}




 