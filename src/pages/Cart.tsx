import React, { useEffect, useState } from "react";
import { getUserCart, removeFromCart } from "../services/cart";
import { useUser } from "../contexts/UseUser";
import { Link } from "react-router-dom";
import UserIcon from "../assets/user.png";
import DropDown from "../components/DropDown";
import { removeQuotes } from "../utils/removeQuotes";
import { CartItem } from "../types/cartItem";
import Swal from "sweetalert2";

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

  return (
    <React.Fragment>
      <div className="text-white p-4 flex justify-between items-center  shadow-md">
        <Link to="/home" className="text-sm hover:underline">
          Home
        </Link>

        <div onClick={handleDropdown}>
          <img src={UserIcon} alt="user_icon" className="w-6 h-6" />
        </div>
      </div>
      <div className="w-full h-[1px] bg-gray-700"></div>
      {dropdown && <DropDown />}

      <div className="container mx-auto py-8 px-4">
        <h2 className="text-4xl mb-6 text-center text-white font-bold">
          Your Cart
        </h2>
        {cartItems.length > 0 ? (
          <div className="text-white">
            <ul className="space-y-4">
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="flex flex-col gap-3 border rounded-lg bg-gray-900 border-gray-700 shadow-lg transition-transform transform hover:scale-105"
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
            <div className="mt-4 text-lg font-bold text-right">
              <span>Total Price: {totalPrice.toFixed(2)}</span>
            </div>
            <div className="mt-8 flex justify-center">
              <Link
                to="/checkout"
                className="bg-blue-600 text-white px-6 py-3 w-full text-center rounded-lg shadow-lg hover:bg-blue-700 transition"
              >
                Pay
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-white flex flex-col items-center py-10">
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
    </React.Fragment>
  );
};

export default Cart;
