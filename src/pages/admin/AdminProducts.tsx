import React, { useEffect, useState } from "react";
import {
  createProduct,
  deleteProductById,
  getProducts,
} from "../../services/products";
import Table from "./Table";
import { Product } from "../../types/product";
import { Link } from "react-router-dom";
import EditIcon from "../../assets/edit_icon.png";
import DeleteIcon from "../../assets/delete_icon.png";
import EditProductModal from "./modals/EditProduct";
import Swal from "sweetalert2";
import AddProductModal from "./modals/AddProduct";

const AdminProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getProducts();
      setProducts(response.data);
    };
    fetchProducts();
  }, []);

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = async (productId: number) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await deleteProductById(productId);
        Swal.fire("Deleted!", "The product has been deleted.", "success");
        setProducts((prev) =>
          prev.filter((product) => product.id !== productId)
        );
      } catch (error) {
        Swal.fire("Error!", "Failed to delete the product.", "error");
        console.error("Delete product error:", error);
      }
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeAddProductModal = () => {
    setIsAddProductModalOpen(false);
  };

  const handleAddProduct = async (newProduct: FormData) => {
    try {
      await createProduct(newProduct);
      Swal.fire("Added!", "The product has been added.", "success");
      const updatedProducts = await getProducts();
      setProducts(updatedProducts.data);
    } catch (error) {
      Swal.fire("Error!", "Failed to add the product.", "error");
      console.error("Add product error:", error);
    }
    closeAddProductModal();
  };

  const columns = React.useMemo(
    () => [
      { Header: "ID", accessor: "id" },
      { Header: "Name", accessor: "name" },
      { Header: "Description", accessor: "description" },
      { Header: "Shipping", accessor: "shipping" },
      { Header: "Price", accessor: "price" },
      {
        Header: "Image",
        accessor: "images",
        Cell: ({ value }: { value: { set: string[] } }) => {
          return (
            <img
              src={
                value?.set[0]
                  ? `${import.meta.env.VITE_API_STORAGE}${value.set[0]}`
                  : "path/to/fallback-image.png"
              }
              alt="product"
              className="ml-2 w-14 h-14 object-cover rounded-full"
            />
          );
        },
      },
      {
        Header: "Actions",
        Cell: ({ row }: { row: { original: Product } }) => (
          <div className="flex space-x-2 ">
            <section className="flex gap-2 items-center justify-center pr-7 lg:hidden">
              <img
                src={EditIcon}
                alt="edit_icon"
                className="w-5 h-5 cursor-pointer"
              />
              <img
                src={DeleteIcon}
                alt="delete_icon"
                className="w-5 h-5 cursor-pointer"
              />
            </section>
            <button
              onClick={() => handleEdit(row.original)}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition hidden lg:flex"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(row.original.id)}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition hidden lg:flex"
            >
              Delete
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const data = React.useMemo(() => products, [products]);

  return (
    <div className="max-w-[1300px] mx-auto text-white py-12 px-1 lg:px-0">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-2xl lg:text-5xl font-extrabold text-gray-300">
          Products
        </h1>
        <div>
          <button
            onClick={() => setIsAddProductModalOpen(true)}
            className="bg-green-500 text-white text-xs py-1 px-1 lg:py-2 lg:px-6 rounded-lg shadow-lg hover:bg-green-600 transition-all mr-4"
          >
            Add Product
          </button>
          <Link
            to="/admin/admin_dashboard"
            className="bg-indigo-600 text-white text-xs py-1 px-1 lg:py-2 lg:px-6 rounded-lg shadow-lg hover:bg-indigo-700 transition-all"
          >
            Go to Main Page
          </Link>
        </div>
      </div>

      <div>
        <Table columns={columns as never} data={data as never} />
      </div>

      {isModalOpen && selectedProduct && (
        <EditProductModal product={selectedProduct} onClose={closeModal} />
      )}

      {isAddProductModalOpen && (
        <AddProductModal
          onClose={closeAddProductModal}
          onAddProduct={handleAddProduct}
        />
      )}
    </div>
  );
};

export default AdminProducts;
