import { defineQuery } from "next-sanity"
import { CouponCode } from "./couponCode"
import { sanityFetch } from "../live";
import { Sale } from "@/sanity.types";
export const getActiveSaleByCouponCode=async(couponCode:CouponCode): Promise<Sale | null>=>{
console.log("Fetching active sale by coupon code:", couponCode);

const ACTIVE_SALE_BY_COUPON_QUERY = defineQuery(`
      *[
          _type == "sales"
          && isActive == true
          && couponCode == $couponCode
      ] | order(validFrom desc)[0]
   `);
   try{
      const activeSale = await sanityFetch({
            query: ACTIVE_SALE_BY_COUPON_QUERY,
            params: { couponCode },
      })
      
      return activeSale ? activeSale.data : null;
   }catch(error){
      console.error("Error while fetching active sale by coupon code:", error);
      return null;
   }
   
}