import React, { useEffect, useState } from "react";
import { Category } from "../../../types/category";
import { getCategories } from "../../../services/categories";

interface AddProductModalProps {
  onClose: () => void;
  onAddProduct: (newProduct: FormData) => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({
  onClose,
  onAddProduct,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [stock, setStock] = useState("");
  const [colors, setColors] = useState("");
  const [sizes, setSizes] = useState("");
  const [shipping, setShipping] = useState("");
  const [isOnSale, setIsOnSale] = useState(false);
  const [salePercentage, setSalePercentage] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryId, setCategoryId] = useState<number>(1);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImages(Array.from(event.target.files));
    }
  };

  const handleSubmit = () => {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("colors", colors);
    formData.append("sizes", sizes);
    formData.append("shipping", shipping);
    formData.append("isOnSale", isOnSale ? "true" : "false");
    formData.append("salePercentage", salePercentage);
    formData.append("categoryId", String(categoryId));

    images.forEach((image) => {
      formData.append("products", image);
    });

    onAddProduct(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white text-black p-6 rounded-lg shadow-lg max-w-2xl w-full">
        <h2 className="text-xl font-bold mb-4">Add New Product</h2>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-2">
              Description
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-2">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-2">Stock</label>
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-2">Colors</label>
            <input
              type="text"
              value={colors}
              onChange={(e) => setColors(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-2">Sizes</label>
            <input
              type="text"
              value={sizes}
              onChange={(e) => setSizes(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-2">Shipping</label>
            <input
              type="text"
              value={shipping}
              onChange={(e) => setShipping(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-2">Category</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(parseInt(e.target.value, 10))}
              className="w-full px-3 py-2 border rounded"
              required
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-span-1 flex items-center">
            <input
              type="checkbox"
              checked={isOnSale}
              onChange={(e) => setIsOnSale(e.target.checked)}
              className="mr-2"
            />
            <label className="text-sm font-medium">On Sale</label>
          </div>
          {isOnSale && (
            <div className="col-span-1">
              <label className="block text-sm font-medium mb-2">
                Sale Percentage
              </label>
              <input
                type="number"
                value={salePercentage}
                onChange={(e) => setSalePercentage(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
          )}
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-2">
              Image Uploads
            </label>
            <input
              type="file"
              multiple
              onChange={handleImageChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="col-span-1 flex justify-end space-x-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
