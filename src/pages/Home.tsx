import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ProductList from "../components/ProductList";
import TopModels from "../components/TopModels";
import { UseDropdown } from "../contexts/UseDropdown";
import { topModels } from "../services/topModels";
import Reviews from "./Reviews";
import { Product } from "../types/product";
import { Review } from "../types/review";
import { getReviews } from "../services/reviews";

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
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchDatas = async () => {
      try {
        const productsData = await topModels();
        setTopModelsData(productsData.data);
        const response = await getReviews();
        setReviews(response.data);
      } catch (error) {
        console.error("Failed to fetch top models:", error);
      }
    };
    fetchDatas();
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
      <div className="min-h-[100vh]">
        <ProductList
          active={active}
          filteredProducts={filteredProducts}
          setFilteredProducts={setFilteredProducts}
          updateTopModels={setTopModelsData}
        />
        {topModelsData && topModelsData.length > 0 && (
          <TopModels products={topModelsData} />
        )}

        {reviews && reviews.length > 0 && <Reviews reviews={reviews} />}
      </div>

      <Footer />
    </>
  );
};

export default Home;
