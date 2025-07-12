import { defineType, defineField } from "sanity";
import { TrolleyIcon } from "@sanity/icons";

export const productType = defineType({
  name: "product", // ✅ lowercase & singular for correct _type and typegen
  title: "Products",
  type: "document",
  icon: TrolleyIcon,
  fields: [
    defineField({
      name: "name", // ✅ only one "name" field — this is the product's name
      title: "Product Name",
      type: "string",
      validation: (Rule) => Rule.required()
    }),

    defineField({
      name: "slug", // ✅ lowercase
      title: "slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96
      },
      validation: (Rule) => Rule.required()
    }),

    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true
      }
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "blockContent" // assuming you have this custom type
    }),

    defineField({
      name: "price",
      title: "Price",
      type: "number",
      validation: (Rule) => Rule.required().min(0)
    }),

    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }]
    }),

    defineField({
      name: "stock",
      title: "Stock",
      type: "number",
      validation: (Rule) => Rule.min(0)
    })
  ],

  preview: {
    select: {
      title: "name",
      media: "image",
      price: "price"
    },
    prepare({ title, price, media }) {
      return {
        title,
        subtitle: price ? `$${price}` : "No price",
        media
      };
    }
  }
});
