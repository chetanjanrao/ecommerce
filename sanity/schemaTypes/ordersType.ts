import { defineType, defineField } from "sanity";

export const ordersType = defineType({
  name: "order",
  title: "Order",
  type: "document",
  fields: [
    defineField({
      name: "products",
      title: "Products",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "product",
              title: "Product",
              type: "reference",
              to: [{ type: "product" }] // ✅ referencing the correct lowercase type
            }),
            defineField({
              name: "quantity",
              title: "Quantity",
              type: "number",
              validation: (Rule) => Rule.required().min(1)
            })
          ]
        }
      ]
    }),

    defineField({
      name: "customerName",
      title: "Customer Name",
      type: "string",
      validation: (Rule) => Rule.required()
    }),

    defineField({
      name: "email",
      title: "Customer Email",
      type: "string",
      validation: (Rule) => Rule.required().email()
    }),

    defineField({
      name: "status",
      title: "Order Status",
      type: "string",
      options: {
        list: ["pending", "processing", "shipped", "delivered", "cancelled"]
      },
      initialValue: "pending"
    }),

    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      readOnly: true
    })
  ]
});
