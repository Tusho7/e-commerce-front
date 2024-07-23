import React, { useState, useEffect } from "react";
import { Product } from "../../../types/product";
import { FaTimes } from "react-icons/fa"; // For the close icon
import { updateProduct } from "../../../services/products";

interface EditProductModalProps {
  product: Product | null;
  onClose: () => void;
}

const EditProductModal: React.FC<EditProductModalProps> = ({
  product,
  onClose,
}) => {
  const [formData, setFormData] = useState<Product | null>(null);

  useEffect(() => {
    setFormData(product || null);
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) =>
      prev ? { ...prev, [e.target.name]: e.target.value } : null
    );
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) =>
      prev ? { ...prev, [e.target.name]: e.target.checked } : null
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      try {
        //@ts-expect-error - TypeScript does not recognize the FormData type
        await updateProduct(product?.id, formData);
        window.location.reload();
        onClose();
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 text-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Edit Product</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-6">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-medium mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData?.name || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-medium mb-2"
                htmlFor="description"
              >
                Description
              </label>
              <input
                type="text"
                id="description"
                name="description"
                value={formData?.description || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-medium mb-2"
                htmlFor="shipping"
              >
                Shipping
              </label>
              <input
                type="text"
                id="shipping"
                name="shipping"
                value={formData?.shipping || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-medium mb-2"
                htmlFor="price"
              >
                Price
              </label>
              <input
                type="text"
                id="price"
                name="price"
                value={formData?.price || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-medium mb-2"
                htmlFor="stock"
              >
                Stock
              </label>
              <input
                type="number"
                id="stock"
                name="stock"
                value={formData?.stock || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-medium mb-2"
                htmlFor="colors"
              >
                Colors
              </label>
              <input
                type="text"
                id="colors"
                name="colors"
                value={formData?.colors || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-medium mb-2"
                htmlFor="sizes"
              >
                Sizes
              </label>
              <input
                type="text"
                id="sizes"
                name="sizes"
                value={formData?.sizes || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                id="isOnSale"
                name="isOnSale"
                checked={formData?.isOnSale || false}
                onChange={handleCheckboxChange}
                className="h-5 w-5 text-blue-500 border-gray-300 rounded focus:ring-blue-500 "
              />
              <label
                className="ml-2 text-gray-700 text-sm font-medium"
                htmlFor="isOnSale"
              >
                On Sale
              </label>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-medium mb-2"
                htmlFor="salePercentage"
              >
                Sale Percentage
              </label>
              <input
                type="number"
                id="salePercentage"
                name="salePercentage"
                value={formData?.salePercentage || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Product Image
              </label>
              <div className="flex justify-center">
                <img
                  src={
                    formData?.images?.set[0]
                      ? `${import.meta.env.VITE_API_STORAGE}${
                          formData.images.set[0]
                        }`
                      : "path/to/fallback-image.png"
                  }
                  alt="product"
                  className="w-32 h-32 object-cover rounded-lg border border-gray-300 shadow-sm"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-150"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductModal;
