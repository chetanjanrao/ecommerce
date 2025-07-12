// Update the import to match the actual exports from "@/sanity.types"
import { Category, Product } from "@/sanity.types";
import ProductGrid from "./ProductGrid";
import CategorySelectorComponent from "../components/ui/category-selector";

interface ProductsViewProps {
      products: Product[],
      categories : Category[]
}
export default function ProductView({ products, categories }: ProductsViewProps) {
   
     
      return (
            <div className="flex flex-col sm:flex-col">
                  {/*categori*/}
                  <div className="w-full sm:w-[200px] flex justify-center ">
                        <CategorySelectorComponent categories={categories} />  
                  </div>
                  {/* Replace with your product grid or list component */}
                  <ProductGrid products={products} /> 
                  <div className="flex-1">
                        <div>
                              <hr className="w-1/2 sm:w-3/4" />
                        </div>
                  </div>
            </div>)
}