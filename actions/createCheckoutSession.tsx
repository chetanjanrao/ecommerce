"use server";
import { imageUrl } from "@/lib/imageUrl";
import stripe from "@/lib/stripe";
import { BasketItem } from "@/store/store";


export type Metadata = {
	orderNumber: string;
	customerName: string;
	customerEmail: string;
	clerkUserId: string;
};

export type GroupedBasketItem = {
	product: BasketItem["product"];
	quantity: number;
};

async function createCheckoutSession(
	items: GroupedBasketItem[],
	metadata: Metadata
) {
	console.log("Creating checkout session...")
	try {
		// check if any grouped items dont have a price
		const itemsWithoutPrice = items.filter((item) => !item.product.price);
		if (itemsWithoutPrice.length > 0) {
			throw new Error("Some items do not have a price");
		}

		const customers = await stripe.customers.list({
			email: metadata.customerEmail,
			limit: 1
		});
		let customerId: string | undefined;
		if (customers.data.length > 0) {
			customerId = customers.data[0].id;
		}
		const baseUrl = process.env.NODE_ENV === 'production'
			? `https ://${process.env.VERCEL_URL}`
  : `${ process.env.NEXT_PUBLIC_BASE_URL }`;

		const successUrl = `${ baseUrl }/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`;

		const cancelUrl = `${ baseUrl }/basket`;
		{/*Creating session with stripe */ }
		const session = await stripe.checkout.sessions.create({
			customer: customerId,
			customer_creation: customerId ? undefined : "always",
			customer_email: !customerId ? metadata.customerEmail : undefined,
			metadata,
			mode: "payment",
			allow_promotion_codes: true,
			success_url:successUrl, 
			cancel_url: cancelUrl,
			line_items: items.map((item) => ({
				price_data: {
					currency: "INR",
					unit_amount: Math.round(item.product.price! * 100),
					product_data: {
						name: item.product.name || "unnamed product",
						description: item.product.name || "Product description",
						metadata:
						{
							id: item.product._id
						},
						images: item.product.image ? [imageUrl(item.product.image).url()] : undefined,
					}
				},
				quantity: item.quantity
			}

			),
			)
		})
		return session.url;
	} catch (error) {
		console.error("Error creating checkout session:", error);
		throw error;
	}
}
export default createCheckoutSession;