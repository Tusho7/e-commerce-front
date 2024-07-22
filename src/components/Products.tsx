import WishListIcon from "../assets/wishlist.jpg";
import { useUser } from "../contexts/UseUser";
import Swal from "sweetalert2";
import { ProductContextType, Product, WishlistItem } from "../types/product";
import Wishlisted from "../assets/wishlisted.png";
import { removeQuotes } from "../utils/removeQuotes";
import { truncateDescription } from "../utils/tuncateDesc";
import { useState } from "react";
import AddToCartModal from "../modals/AddToCart";
import { addToCart, removeFromCart } from "../services/cart";
import { Link } from "react-router-dom";
import { getProducts } from "../services/products";
import { removeWishlist, createWishlist } from "../services/wishlist";
import { topModels } from "../services/topModels";

const Products = ({
  filteredProducts,
  setFilteredProducts,
  updateTopModels,
}: ProductContextType) => {
  const { user } = useUser();
  const [modalProduct, setModalProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userId = user?.user.id;

  const handleAddToCart = async (
    productId: number,
    quantity: number,
    colors: string,
    sizes: string
  ) => {
    try {
      const isInCart = filteredProducts.some(
        (p) => p.id === productId && p.inCart
      );

      if (isInCart) {
        await removeFromCart(userId, productId);
        Swal.fire({
          icon: "success",
          title: "Product removed from cart",
          showConfirmButton: false,
          timer: 1500,
        });
        const updatedProducts = filteredProducts.map((product) =>
          product.id === productId ? { ...product, inCart: false } : product
        );
        setFilteredProducts(updatedProducts);
      } else {
        await addToCart(userId, productId, quantity, colors, sizes);
        Swal.fire({
          icon: "success",
          title: "Product added to cart",
          showConfirmButton: false,
          timer: 1500,
        });
        const updatedProducts = filteredProducts.map((product) =>
          product.id === productId ? { ...product, inCart: true } : product
        );
        setFilteredProducts(updatedProducts);
      }
    } catch (error) {
      console.log("Failed to update cart: ", error);
      Swal.fire({
        icon: "error",
        title: "Failed to update cart",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const openModal = (product: Product) => {
    setModalProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalProduct(null);
    setIsModalOpen(false);
  };

  const handleWishlist = async (product: Product) => {
    try {
      const userId = user?.user?.id;
      if (userId) {
        const isWishlisted = product.wishlist.some(
          (item: WishlistItem) => item.userId === userId
        );
        if (isWishlisted) {
          await removeWishlist(product.id, userId);
          Swal.fire({
            icon: "success",
            title: "Product removed from wishlist",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          await createWishlist(product.id, userId);
          Swal.fire({
            icon: "success",
            title: "Product added to wishlist",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        const updatedProducts = await getProducts();

        const filtered = updatedProducts.data.filter(
          (p: Product) => p.categoryId === product.categoryId
        );
        setFilteredProducts(filtered);

        const topModelsData = await topModels();
        updateTopModels(topModelsData.data);
      }
    } catch (error) {
      console.log("Failed to update wishlist: ", error);
    }
  };

  return (
    <div className="pt-4 mb-10 pl-4 flex flex-col gap-2 text-white md:px-8 md:gap-7 max-w-[1200px] mx-auto">
      <h1 className="text-2xl md:text-3xl">Product List</h1>
      <div className="flex overflow-x-auto gap-4 md:overscroll-x-none md:flex-wrap md:gap-6 md:justify-between">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="flex-none w-[135px] max-w-[135px] md:w-[180px] md:max-w-[180px]"
          >
            <div className="aspect-w-3 aspect-h-2 h-[100px] flex justify-center items-center mb-2 rounded-lg md:h-[120px]">
              <img
                src={`${import.meta.env.VITE_API_STORAGE}${
                  product.images.set[0]
                }`}
                alt={product.name}
                className="w-full h-full rounded-lg"
              />
            </div>

            <div className="text-white flex flex-col gap-[1px]">
              <h3 className="text-sm font-semibold md:text-base">
                {truncateDescription(removeQuotes(product.name))}
              </h3>
              <p className="text-xs mb-2 md:text-sm">
                {truncateDescription(removeQuotes(product.description))}
              </p>
              <p className="text-xs font-bold md:text-sm text-center">
                {removeQuotes(product.price)}
              </p>
              <p className="text-xs md:text-sm">Stock: {product.stock}</p>

              <section className="flex justify-between items-center gap-5 mt-3">
                {product.cart.length > 0 ? (
                  <div>
                    <Link
                      className="bg-black text-white text-xs px-2 py-[10px] rounded-md"
                      to="/cart"
                    >
                      See Cart
                    </Link>
                  </div>
                ) : (
                  <button
                    className={`bg-black text-white text-xs px-2 py-[10px] rounded-md ${
                      product.inCart ? "opacity-50" : ""
                    }`}
                    onClick={() => {
                      if (!product.inCart) {
                        openModal(product);
                      } else if (product.inCart || product.cart.length > 0) {
                        handleAddToCart(product.id, 1, "", "");
                      }
                    }}
                  >
                    {product.inCart || product.cart.length > 0
                      ? "Remove"
                      : "Add to Cart"}
                  </button>
                )}

                <div
                  className="border-black flex justify-center rounded-md items-center p-[6px] bg-white cursor-pointer"
                  onClick={() => handleWishlist(product)}
                >
                  {product.wishlist.length > 0 ? (
                    <img
                      src={Wishlisted}
                      className="w-6 h-6"
                      alt="wishlisted"
                    />
                  ) : (
                    <img
                      src={WishListIcon}
                      className="w-6 h-6"
                      alt="Wishlist"
                    />
                  )}
                </div>
              </section>
            </div>
          </div>
        ))}
        {modalProduct && (
          <AddToCartModal
            product={modalProduct}
            isOpen={isModalOpen}
            onClose={closeModal}
            onAddToCart={handleAddToCart}
          />
        )}
      </div>
    </div>
  );
};

export default Products;
