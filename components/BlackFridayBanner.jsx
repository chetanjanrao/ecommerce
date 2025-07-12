import { COUPON_CODES } from "@/sanity/lib/sales/couponCode";
import { getActiveSaleByCouponCode } from "@/sanity/lib/sales/getActiveSaleByCouponCode";
async function BlackFridayBanner() {
   const sale = await getActiveSaleByCouponCode(COUPON_CODES.BFRIDAY);
   if (!sale.isActive) {
      return null;
   }
   console.log("sale", sale)
   return (
      <div className="bg-gradient-to-r ml-0.5 from-red-800 to-black text-white p-6 rounded-lg shadow-md">
         <h2 className="text-2xl font-bold">{sale?.title}</h2>
         <p className="text-lg mt-1">Welcome to this year's largest sale!</p>

         <div className="mt-4">
            <span className="inline-block bg-white text-black font-semibold py-2 px-4 rounded-full">
               Use code: <span className="text-red-600 font-bold">{sale?.couponCode}</span> for{" "}
               <span className="font-bold">{sale?.discountAmount} % OFF</span>
            </span>
         </div>
      </div>
   )

}
export default BlackFridayBanner;