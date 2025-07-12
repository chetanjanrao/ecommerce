// Note: These types are manually created based on your schemas.
// For a more robust and automated solution, consider using a tool like `sanity-codegen`.

export interface SanityBlock {
  _key: string;
  _type: "block";
  children: {
    _key: string;
    _type: "span";
    marks: any[];
    text: string;
  }[];
  markDefs: any[];
  style: string;
}
export interface SlugPageProps {
  params: {
    slug: string;
  };
}
export interface PageProps {
  /**
   * Route segment params (e.g., from [...slug], [id], etc.)
   */
  params?: { [key: string]: string };

  /**
   * Query string parameters from the URL
   * (e.g., ?query=shoes&category=sale)
   */
  searchParams?: { [key: string]: string | string[] | undefined };
}
export interface SanityDocument {
  _id: string;
  _type: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
}

export interface SanityReference<T extends SanityDocument> {
  _type: "reference";
  _ref: string;
}

export interface SanityImageAsset extends SanityDocument {
  _type: "sanity.imageAsset";
  url: string;
}

export interface SanityImage {
  _type: "image";
  asset: SanityReference<SanityImageAsset>;
}

export interface Slug {
  _type: "slug";
  current: string;
}

export interface Category extends SanityDocument {
  _type: "category";
  title?: string;
  slug?: Slug;
  description?: string;
}

export interface Sale extends SanityDocument {
  _type: "sales";
  title?: string;
  description?: string;
  discountAmount?: number;
  couponCode?: string;
  validFrom?: string; // Note: check your schema, it might be 'validForm'
  validUntil?: string;
  isActive?: boolean;
}

export interface Product extends SanityDocument {
  _type: "product";
  name?: string;
  Slug?: Slug;
  image?: SanityImage;
  description?: SanityBlock[];
  price?: number;
  categories?: SanityReference<Category>[];
  stock?: number;
}