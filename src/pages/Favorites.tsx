import { useEffect, useState } from "react";
import { getWishlistByUserId, removeWishlist } from "../services/wishlist";
import { useUser } from "../contexts/UseUser";
import { removeQuotes } from "../utils/removeQuotes";
import React from "react";
import UserIcon from "../assets/user.png";
import DropDown from "../components/DropDown";
import { Link } from "react-router-dom";
import { truncateDescription } from "../utils/tuncateDesc";
import Wishlisted from "../assets/wishlisted.png";
import { addToCart, removeFromCart } from "../services/cart";
import Swal from "sweetalert2";
import AddToCartFromWishlistModal from "../modals/AddToCartFromWishlist";
import { WishlistProduct } from "../types/product";
import Footer from "../components/Footer";
import { logoutUser } from "../services/api/Auth";

const Favorites = () => {
  const { user } = useUser();
  const userId = user?.user.id;

  const [dropdown, setDropdown] = useState(false);
  const [wishlistsData, setWishlistsData] = useState<WishlistProduct[]>([]);
  const [modalProduct, setModalProduct] = useState<WishlistProduct | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const { data } = await getWishlistByUserId(userId);
        setWishlistsData(data.wishlist);
      } catch (error) {
        console.error("Failed to fetch wishlist:", error);
      }
    };

    if (userId) {
      fetchWishlist();
    }
  }, [userId]);

  const handleDropdown = () => {
    setDropdown((prev) => !prev);
  };

  const removeFromWishlist = async (productId: number) => {
    try {
      await removeWishlist(productId, userId);
      const updatedWishlist = await getWishlistByUserId(userId);
      setWishlistsData(updatedWishlist.data.wishlist);
      window.location.reload();
      Swal.fire({
        icon: "success",
        title: "Product removed from wishlist",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to remove product from wishlist",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const openModal = (product: WishlistProduct) => {
    setModalProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalProduct(null);
    setIsModalOpen(false);
  };

  const handleAddToCart = async (
    productId: number,
    quantity: number,
    colors: string,
    sizes: string
  ) => {
    try {
      const isInCart = wishlistsData.some(
        (p) => p.productId === productId && p.inCart
      );
      if (isInCart) {
        await removeFromCart(userId, productId);
        Swal.fire({
          icon: "success",
          title: "Product removed from cart",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        await addToCart(userId, productId, quantity, colors, sizes);
        Swal.fire({
          icon: "success",
          title: "Product added to cart",
          showConfirmButton: false,
          timer: 1500,
        });
      }

      const updatedProducts = wishlistsData.map((product) =>
        product.productId === productId
          ? {
              ...product,
              inCart: !isInCart,
              stock: product.product.stock - quantity,
            }
          : product
      );

      setWishlistsData(updatedProducts);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to update cart",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      window.location.href = "/";
      localStorage.clear();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <div className="text-white p-4 flex justify-between items-center max-w-[1200px] mx-auto">
        <div className="flex justify-between items-center gap-10 text-sm md:text-base ">
          <Link to="/home">Home</Link>
        </div>

        <div className="hidden md:flex md:gap-4 md:items-center">
          <Link to="/profile">Profile</Link>
          <Link to="/favorites">My Favorites</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/settings">Settings</Link>
          <p onClick={handleLogout} className="cursor-pointer">
            Logout
          </p>
        </div>

        <div onClick={handleDropdown} className="md:hidden">
          <img src={UserIcon} alt="user_icon" className="w-6 h-6" />
        </div>
      </div>
      <div className="w-full h-[1px] bg-gray-700"></div>
      {dropdown && <DropDown />}
      <div className="p-4 min-h-screen max-w-[1200px] mx-auto">
        {wishlistsData.length > 0 ? (
          <div className="flex flex-wrap justify-between gap-10">
            {wishlistsData.map((item) => (
              <div
                key={item.productId}
                className="flex-none w-[135px] max-w-[135px]"
              >
                <div className="aspect-w-3 aspect-h-2 h-[100px] bg-white flex justify-center items-center mb-2 rounded-lg">
                  <img
                    src={`${import.meta.env.VITE_API_STORAGE}${
                      item.product.images.set[0]
                    }`}
                    alt={removeQuotes(item.product.name)}
                    className="w-full h-full rounded-lg"
                  />
                </div>

                <div className="text-white flex flex-col gap-[1px]">
                  <h3 className="text-xs font-semibold max-w-[130px]">
                    {truncateDescription(removeQuotes(item.product.name))}
                  </h3>
                  <p className="text-sm mb-2">
                    {truncateDescription(
                      removeQuotes(item.product.description)
                    )}
                  </p>
                  <p className="text-xs font-bold">
                    {removeQuotes(item.product.price)}
                  </p>
                  <p className="text-sm">Stock: {item.product.stock}</p>

                  <section className="flex justify-between items-center gap-5 mt-3">
                    {item.Cart.length > 0 ? (
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
                          item.inCart ? "opacity-50" : ""
                        }`}
                        onClick={() => {
                          if (!item.inCart) {
                            openModal(item);
                          } else if (item.inCart || item.Cart.length > 0) {
                            handleAddToCart(item.productId, 1, "", "");
                          }
                        }}
                      >
                        {item.inCart || item.Cart.length > 0
                          ? "Remove"
                          : "Add to Cart"}
                      </button>
                    )}

                    <div
                      className="border-black flex justify-center rounded-md items-center p-[6px] bg-white cursor-pointer"
                      onClick={() => removeFromWishlist(item.productId)}
                    >
                      <img
                        src={Wishlisted}
                        className="w-6 h-6"
                        alt="Wishlisted"
                      />
                    </div>
                  </section>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-white flex flex-col items-center py-10">
            <p className="text-lg mb-2">Your wishlist is empty!</p>
            <p className="text-sm mb-4">
              Start adding products to your wishlist.
            </p>
            <Link
              to="/home"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Browse Products
            </Link>
          </div>
        )}
      </div>

      <Footer />

      {modalProduct && (
        <AddToCartFromWishlistModal
          product={modalProduct}
          isOpen={isModalOpen}
          onClose={closeModal}
          onAddToCart={handleAddToCart}
        />
      )}
    </React.Fragment>
  );
};

export default Favorites;
