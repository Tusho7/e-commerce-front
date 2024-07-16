import React, { useState } from "react";
import { AddToCartFromWishlistProps } from "../types/cartModal";
import { removeQuotes } from "../utils/removeQuotes";

const AddToCartFromWishlistModal = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
}: AddToCartFromWishlistProps) => {
  const [quantity, setQuantity] = useState(1);
  const colorsArray = product.product.colors.replace(/"/g, "").split(",");
  const sizesArray = product.product.sizes.replace(/"/g, "").split(",");
  const [selectedColor, setSelectedColor] = useState(colorsArray[0]);
  const [selectedSize, setSelectedSize] = useState(sizesArray[0]);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value >= 1 && value <= product.product.stock) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    onAddToCart(product.product.id, quantity, selectedColor, selectedSize);
    onClose();
  };

  const price = parseFloat(removeQuotes(product.product.price));
  const totalPrice = (price * quantity).toFixed(2);

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
        <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform scale-100 hover:scale-105 w-[330px] md:w-[500px]">
          <h2 className="text-2xl font-semibold text-center mb-4">
            Add to Cart
          </h2>
          <img
            src={`${import.meta.env.VITE_API_STORAGE}${
              product.product.images.set[0]
            }`}
            alt={product.product.name}
            className="w-24 h-24 object-cover mx-auto rounded-md shadow-md"
          />

          <div className="mt-4">
            <label className="block text-sm font-medium">Quantity:</label>
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              className="border border-gray-300 rounded-lg p-2 w-full mt-1 transition duration-150 ease-in-out focus:outline-none focus:ring focus:ring-blue-300"
              min="1"
            />
            <p className="text-gray-500 mt-2">
              Available: {product.product.stock}
            </p>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium">Color:</label>
            <select
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 w-full mt-1 transition duration-150 ease-in-out focus:outline-none focus:ring focus:ring-blue-300"
            >
              {colorsArray.map((color: string) => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium">Color:</label>
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 w-full mt-1 transition duration-150 ease-in-out focus:outline-none focus:ring focus:ring-blue-300"
            >
              {sizesArray.map((size: string) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          <p className="mt-4 text-lg font-bold">Price: {totalPrice} $</p>
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleAddToCart}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-150 ease-in-out"
            >
              Add to Cart
            </button>
            <button
              onClick={onClose}
              className="bg-gray-300 text-black px-4 py-2 rounded-lg ml-3 hover:bg-gray-400 transition duration-150 ease-in-out"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default AddToCartFromWishlistModal;
