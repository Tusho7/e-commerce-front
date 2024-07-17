import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ProductList from "../components/ProductList";
import { getCategories } from "../services/categories";
import { getProducts } from "../services/products";
import { Category } from "../types/category";
import { Product } from "../types/product";
import { useWishlist } from "../utils/toggleWishlist";

const Home = () => {
  const [active, setActive] = useState("MEN");
  const [dropdown, setDropdown] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const { filteredProducts, setFilteredProducts, toggleWishlist } =
    useWishlist();

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
        const defaultCategory = response.data.find(
          (category: { name: string }) => category.name === "MEN"
        );
        if (defaultCategory) {
          const filtered = productsData.data.filter(
            (product: { categoryId: number; isOnSale: boolean }) =>
              product.categoryId === defaultCategory.id ||
              product.isOnSale === true
          );
          setFilteredProducts(filtered);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetch();
  }, [setFilteredProducts]);

  return (
    <>
      <Header
        categories={categories}
        active={active}
        handleClick={handleClick}
        handleDropdown={handleDropdown}
        dropdown={dropdown}
      />
      <ProductList
        filteredProducts={filteredProducts}
        setFilteredProducts={setFilteredProducts}
        toggleWishlist={toggleWishlist}
      />
      <Footer />
    </>
  );
};

export default Home;
