import WishListIcon from "../assets/wishlist.jpg";
import { createWishlist, removeWishlist } from "../services/wishlist";
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

const Products = ({
  products,
  toggleWishlist,
  setProducts,
}: ProductContextType) => {
  const { user } = useUser();
  const [modalProduct, setModalProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userId = user?.user.id;

  const handleWishlistToggle = async (product: Product) => {
    try {
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
        toggleWishlist(product);
      }
    } catch (error) {
      console.log("Failed to update wishlist: ", error);
    }
  };

  const handleAddToCart = async (
    productId: number,
    quantity: number,
    colors: string,
    sizes: string
  ) => {
    try {
      const isInCart = products.some((p) => p.id === productId && p.inCart);

      if (isInCart) {
        await removeFromCart(userId, productId);
        Swal.fire({
          icon: "success",
          title: "Product removed from cart",
          showConfirmButton: false,
          timer: 1500,
        });
        const updatedProducts = products.map((product) =>
          product.id === productId ? { ...product, inCart: false } : product
        );
        setProducts(updatedProducts);
      } else {
        await addToCart(userId, productId, quantity, colors, sizes);
        Swal.fire({
          icon: "success",
          title: "Product added to cart",
          showConfirmButton: false,
          timer: 1500,
        });
        const updatedProducts = products.map((product) =>
          product.id === productId
            ? { ...product, inCart: true, stock: product.stock - quantity }
            : product
        );
        setProducts(updatedProducts);
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

  return (
    <div className="py-4 pl-4 min-h-screen flex flex-col gap-5 text-white">
      <h1>Product List</h1>
      <div className="flex overflow-x-auto gap-4 ">
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
              <p className="text-base font-bold">
                {removeQuotes(product.price)}
              </p>
              <p className="text-sm">Stock: {product.stock}</p>

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
                  onClick={() => handleWishlistToggle(product)}
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
