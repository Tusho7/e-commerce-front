import { useEffect, useState } from "react";
import { deleteCategory, getCategories } from "../../services/categories";
import { Category } from "../../types/category";
import { Link } from "react-router-dom";
import EditIcon from "../../assets/edit_icon.png";
import DeleteIcon from "../../assets/delete_icon.png";
import AddCategory from "./modals/AddCategory";
import Swal from "sweetalert2";

const AdminCategories = () => {
  const [categoriesData, setCategoriesData] = useState<Category[]>([]);
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);

  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const response = await getCategories();
        setCategoriesData(response.data);
      } catch (error) {
        console.error("Failed to fetch categories data:", error);
      }
    };
    fetchCategoriesData();
  }, []);

  const handleAddCategory = async (newCategory: Category) => {
    setCategoriesData((prevData) => [...prevData, newCategory]);
  };

  const handleDeleteCategory = async (id: number) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await deleteCategory(id);
        setCategoriesData((prevData) =>
          prevData.filter((section) => section.id !== id)
        );
        Swal.fire({
          title: "Deleted!",
          text: "Category deleted successfully",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error("Failed to delete category:", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to delete Category",
          icon: "error",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto p-4">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-2xl lg:text-5xl font-extrabold text-gray-300 w-[160px] lg:w-[670px]">
          Categories
        </h1>
        <div className="flex flex-col gap-2 text-center justify-start items-start lg:flex-row">
          <button
            onClick={() => setIsAddCategoryModalOpen(true)}
            className="bg-green-500 text-white text-xs py-1 px-1 lg:py-2 lg:px-6 rounded-lg shadow-lg hover:bg-green-600 transition-all lg:mr-4"
          >
            Add Category
          </button>
          <Link
            to="/admin_dashboard"
            className="bg-indigo-600 text-white text-xs py-1 px-1 lg:py-2 lg:px-6 rounded-lg shadow-lg hover:bg-indigo-700 transition-all"
          >
            Go to Main Page
          </Link>
        </div>
      </div>
      <div className="space-y-6">
        {categoriesData.map((section) => (
          <div key={section.id} className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">{section.name}</h2>
              <div className="flex gap-4">
                <img
                  src={EditIcon}
                  alt="edit_icon"
                  className="w-7 h-7 cursor-pointer"
                />
                <img
                  src={DeleteIcon}
                  alt="delete_icon"
                  className="w-7 h-7 cursor-pointer"
                  onClick={() => handleDeleteCategory(section.id)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {isAddCategoryModalOpen && (
        <AddCategory
          onAdd={handleAddCategory}
          onClose={() => setIsAddCategoryModalOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminCategories;
