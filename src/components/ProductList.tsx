import { ProductListProps } from "../services/headerAndProductList";
import Products from "./Products";

const ProductList = ({
  filteredProducts,
  setFilteredProducts,
  toggleWishlist,
}: ProductListProps) => {
  return (
    <div>
      {filteredProducts.length > 0 ? (
        <Products
          filteredProducts={filteredProducts}
          toggleWishlist={toggleWishlist}
          setProducts={setFilteredProducts}
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
