import { useEffect, useState } from "react";
import UserIcon from "../assets/user.png";
import DropDown from "./DropDown";
import { getCategories } from "../services/categories";
import { Category } from "../types/category";
import Products from "./Products";
import { getProducts } from "../services/products";
import { Product } from "../types/produtct";

const Header = () => {
  const [active, setActive] = useState("MEN");
  const [dropdown, setDropdown] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const handleClick = (category: Category) => {
    setActive(category.name);
    const filteredProducts = products.filter(
      (product) =>
        product.categoryId === category.id || product.isOnSale === true
    );
    setFilteredProducts(filteredProducts);
  };

  const handleDropdown = () => {
    setDropdown((prev) => !prev);
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await getCategories();
        const productsData = await getProducts();
        setProducts(productsData.data);
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetch();
  }, []);

  console.log(products);
  return (
    <div>
      <div className="text-white p-4 flex justify-between items-center">
        <div className="flex justify-between items-center gap-10 text-sm">
          {categories &&
            categories.map((category) => (
              <p
                key={category.id}
                className={`cursor-pointer ${
                  active === category.name
                    ? "text-green-400 border-b border-green-400"
                    : ""
                }`}
                onClick={() => handleClick(category)}
              >
                {category.name}
              </p>
            ))}
        </div>

        <div onClick={handleDropdown}>
          <img src={UserIcon} alt="user_icon" className="w-6 h-6" />
        </div>
      </div>
      <div className="w-full h-[1px] bg-gray-700"></div>
      {dropdown && <DropDown />}

      {filteredProducts.length > 0 ? (
        <Products products={filteredProducts} />
      ) : (
        <p className="text-white mt-5 px-4">Products not found</p>
      )}
    </div>
  );
};

export default Header;
