import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ProductList from "../components/ProductList";
import TopModels from "../components/TopModels";
import { UseDropdown } from "../contexts/UseDropdown";
import { topModels } from "../services/topModels";
import Reviews from "./Reviews";
import { Product } from "../types/product";

const Home = () => {
  const {
    categories,
    active,
    handleClick,
    handleDropdown,
    dropdown,
    filteredProducts,
    setFilteredProducts,
  } = UseDropdown();

  const [topModelsData, setTopModelsData] = useState<Product[]>([]);

  useEffect(() => {
    const fetchTopModels = async () => {
      try {
        const productsData = await topModels();
        setTopModelsData(productsData.data);
      } catch (error) {
        console.error("Failed to fetch top models:", error);
      }
    };
    fetchTopModels();
  }, []);

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
        active={active}
        filteredProducts={filteredProducts}
        setFilteredProducts={setFilteredProducts}
        updateTopModels={setTopModelsData}
      />
      <TopModels products={topModelsData} />
      <Reviews />
      <Footer />
    </>
  );
};

export default Home;
