import ProductGrid from "@/components/ProductGrid";
import { searchProductsByName } from "@/sanity/lib/products/searchProductsByName";

type SearchPageProps = {
  // Use a more comprehensive type for searchParams to satisfy Next.js's internal PageProps constraint.
  // This type accounts for:
  // - Any possible string key from a URL search parameter.
  // - Values that could be a single string, an array of strings (e.g., ?foo=1&foo=2), or undefined (if the param isn't present).
  searchParams: { [key: string]: string | string[] | undefined };
};

async function SearchPage({ searchParams }: SearchPageProps) {
  // Access the query.
  // We use type assertion `as string` or check `typeof query === 'string'`
  // because searchParams.query could technically be `string[]` or `undefined`
  // based on the robust type definition, even if you only expect a single string.
  const query = (searchParams.query as string) || "";
  const products = await searchProductsByName(query);

  return (
    <div className="flex flex-col items-center justify-top min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
        {products.length > 0 ? (
          <>
            <h1 className="text-3xl font-bold mb-6 text-center">
              Search results for: {query}
            </h1>
            <ProductGrid products={products} />
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-6 text-center">
              No products found for: {query}
            </h1>
            <p className="text-gray-600 text-center">
              Try searching with different keywords.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default SearchPage;