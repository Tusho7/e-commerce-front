import WishListIcon from "../assets/wishlist.jpg";
import { Product } from "../types/produtct";

const Products = ({ products }: { products: Product[] }) => {
  const removeQuotes = (str: string | undefined) => {
    if (!str) return "";
    return str.replace(/^"(.*)"$/, "$1");
  };

  const truncateDescription = (str: string | undefined) => {
    if (!str) return "";
    if (str.length > 15) {
      return str.substring(0, 15) + "...";
    }
    return str;
  };

  const addToWishlist = (productId: number) => {
    console.log(`Added product with ID ${productId} to wishlist`);
  };

  return (
    <div className="flex overflow-x-auto gap-4 py-4 pl-4">
      {products.map((product) => (
        <div key={product.id} className="flex-none w-[135px] max-w-[135px]">
          <div className="aspect-w-3 aspect-h-2 h-[100px] bg-white flex justify-center items-center p-1 mb-2 rounded-lg">
            <img
              src={`${import.meta.env.VITE_API_STORAGE}${
                product.images.set[0]
              }`}
              alt={product.name}
              className=""
            />
          </div>

          <div className="text-white flex flex-col gap-[1px]">
            <h3 className="text-base font-semibold">
              {removeQuotes(product.name)}
            </h3>
            <p className="text-sm mb-2">
              {truncateDescription(removeQuotes(product.description))}
            </p>
            <p className="text-base font-bold">{removeQuotes(product.price)}</p>
            <p className="text-sm">Stock: {product.stock}</p>

            <section className="flex justify-between items-center gap-5 mt-3">
              <button className="bg-black text-white text-xs px-2 py-[10px] rounded-md">
                Add to Cart
              </button>

              <div
                className="border-black flex justify-center rounded-md items-center p-[6px] bg-white"
                onClick={() => addToWishlist(product.id)}
              >
                <img src={WishListIcon} className="w-6 h-6" alt="Wishlist" />
              </div>
            </section>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
