import { ProductListProps } from "../services/headerAndProductList";
import Products from "./Products";

const ProductList = ({
  filteredProducts,
  setFilteredProducts,
  updateTopModels,
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
        <div className="min-h-screen">
          <p className="text-white mt-5 px-4">Products not found</p>
        </div>
      )}
    </div>
  );
};

export default ProductList;
