import { ProductListProps } from "../services/headerAndProductList";
import Products from "./Products";

const ProductList = ({
  filteredProducts,
  setFilteredProducts,
  updateTopModels,
  active,
}: ProductListProps) => {
  return (
    <div>
      {filteredProducts.length > 0 ? (
        <Products
          filteredProducts={filteredProducts}
          setFilteredProducts={setFilteredProducts}
          updateTopModels={updateTopModels}
        />
      ) : (
        <div className="text-white mt-4 px-4 md:px-8 max-w-[1200px] mx-auto">
          <h1 className="text-2xl mb-3">Product List</h1>
          <p>Products not found in the {active} category.</p>
          <p>Check back later for new products.</p>
        </div>
      )}
    </div>
  );
};

export default ProductList;
