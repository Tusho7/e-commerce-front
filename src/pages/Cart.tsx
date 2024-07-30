import React, { useEffect, useState } from "react";
import { getUserCart, removeFromCart } from "../services/cart";
import { useUser } from "../contexts/UseUser";
import { Link } from "react-router-dom";
import UserIcon from "../assets/user.png";
import DropDown from "../components/DropDown";
import { removeQuotes } from "../utils/removeQuotes";
import { CartItem } from "../types/cartItem";
import Swal from "sweetalert2";
import Footer from "../components/Footer";
import { logoutUser } from "../services/api/Auth";

const Cart = () => {
  const { user } = useUser();
  const userId = user?.user.id;

  const [dropdown, setDropdown] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const fetchUserCart = async () => {
      try {
        const response = await getUserCart(userId);
        setCartItems(response.data);
      } catch (error) {
        console.error("Failed to fetch cart items:", error);
      }
    };

    if (userId) {
      fetchUserCart();
    }
  }, [userId]);

  const handleDropdown = () => {
    setDropdown((prev) => !prev);
  };

  const handleRemoveFromCart = async (productId: number) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove it!",
    });

    if (result.isConfirmed) {
      try {
        await removeFromCart(userId, productId);
        setCartItems((prev) =>
          prev.filter((item) => item.product.id !== productId)
        );
        window.location.reload();
        Swal.fire(
          "Removed!",
          "Your item has been removed from the cart.",
          "success"
        );
      } catch (error) {
        console.error("Failed to remove item from cart:", error);
        Swal.fire("Error!", "Failed to remove item from the cart.", "error");
      }
    }
  };

  const totalPrice = cartItems.reduce((acc, item) => {
    const price = parseFloat(removeQuotes(item.product.price));
    return acc + price * item.quantity;
  }, 0);

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
      <div className="text-white py-4 flex justify-between items-center max-w-[1200px] mx-auto">
        <div className="flex justify-between items-center gap-10 text-sm md:text-base">
          <Link to="/home">Home</Link>
        </div>

        <div onClick={handleDropdown} className="md:hidden">
          <img src={UserIcon} alt="user_icon" className="w-6 h-6" />
        </div>

        <div className="hidden md:flex md:gap-4 md:items-center">
          <Link to="/profile">Profile</Link>
          <Link to="/favorites">My Favorites</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/settings">Settings</Link>
          <p onClick={handleLogout}>Logout</p>
        </div>
      </div>
      <div className="w-full h-[1px] bg-gray-700"></div>
      {dropdown && <DropDown />}

      <div className="container max-w-[1200px] mx-auto py-8 px-4">
        <h2 className="text-4xl mb-6 text-center text-white font-bold">
          Your Cart
        </h2>
        {cartItems.length > 0 ? (
          <div className="text-white min-h-screen">
            <ul className="space-y-4">
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="flex flex-col items-center justify-center gap-3 border rounded-lg bg-[#1F2937] border-gray-700 shadow-lg transition-transform transform hover:scale-105 max-w-[500px] mx-auto"
                >
                  <section className="flex justify-between items-center p-4">
                    <div className="flex gap-4 items-center">
                      <img
                        src={`${import.meta.env.VITE_API_STORAGE}${
                          item.product.images.set[0]
                        }`}
                        alt={removeQuotes(item.product.name)}
                        className="w-20 h-20 object-cover rounded-full"
                      />
                      <div>
                        <h3 className="text-lg font-semibold">
                          {removeQuotes(item.product.name)}
                        </h3>
                        <p className="text-sm">
                          {removeQuotes(item.product.description)}
                        </p>
                        <p className="text-sm">Color: {item.colors}</p>
                        <p className="text-sm">Size: {item.sizes}</p>
                        <p className="text-sm">Quantity: {item.quantity}</p>
                        <p className="text-sm">
                          Price: {removeQuotes(item.product.price)}
                        </p>
                        <p className="text-md font-semibold">
                          Total:{" "}
                          {(
                            parseFloat(removeQuotes(item.product.price)) *
                            item.quantity
                          ).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </section>

                  <button
                    className="bg-red-600 text-white px-4 py-2 mb-3 w-[200px] self-center rounded-lg hover:bg-red-700 transition"
                    onClick={() => handleRemoveFromCart(item.productId)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-4 text-lg font-bold text-right max-w-[500px] mx-auto">
              <span>Total Price: {totalPrice.toFixed(2)}</span>
            </div>
            <div className="mt-8 flex justify-center max-w-[500px] mx-auto">
              <Link
                to="/checkout"
                className="bg-blue-600 text-white px-6 py-3 w-full text-center rounded-lg shadow-lg hover:bg-blue-700 transition"
              >
                Pay
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-white flex flex-col items-center py-10 max-w-[1200px] mx-auto min-h-screen">
            <p className="text-lg mb-2">Your Cart is empty!</p>
            <p className="text-sm mb-4">Start adding products to your Cart.</p>
            <Link
              to="/home"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Browse Products
            </Link>
          </div>
        )}
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Cart;
