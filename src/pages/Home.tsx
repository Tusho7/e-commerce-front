import Footer from "../components/Footer";
import Header from "../components/Header";
import ProductList from "../components/ProductList";
import { UseDropdown } from "../contexts/UseDropdown";
import { useWishlist } from "../utils/toggleWishlist";

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

  const { toggleWishlist } = useWishlist();

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
        toggleWishlist={toggleWishlist}
        setFilteredProducts={setFilteredProducts}
      />
      <Footer />
    </>
  );
};

export default Home;
