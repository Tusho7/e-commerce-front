import React, { useEffect, useState } from "react";
import { getProducts } from "../../services/products";
import Table from "./Table";
import { Product } from "../../types/product";
import { Link } from "react-router-dom";
import EditIcon from "../../assets/edit_icon.png";
import DeleteIcon from "../../assets/delete_icon.png";

const AdminProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getProducts();
      setProducts(response.data);
    };
    fetchProducts();
  }, []);

  const handleEdit = (product: Product) => {
    console.log("Edit product", product);
    // Implement your edit logic here
  };

  const handleDelete = (productId: number) => {
    console.log("Delete product", productId);
    // Implement your delete logic here
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
        <Link
          to="/admin_dashboard"
          className="bg-indigo-600 text-white text-xs py-1 px-1 lg:py-2 lg:px-6 rounded-lg shadow-lg hover:bg-indigo-700 transition-all"
        >
          Go to Main Page
        </Link>
      </div>

      <div>
        <Table columns={columns as never} data={data as never} />
      </div>
    </div>
  );
};

export default AdminProducts;
