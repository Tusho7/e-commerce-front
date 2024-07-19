import { createContext, ReactNode, useEffect, useState } from "react";
import { getCategories } from "../services/categories";
import { getProducts } from "../services/products";
import { Category } from "../types/category";
import { Product } from "../types/product";
import { useUser } from "./UseUser";

export type DropdownContextType = {
  categories: Category[];
  active: string;
  dropdown: boolean;
  filteredProducts: Product[];
  handleClick: (category: Category) => void;
  handleDropdown: () => void;
  setFilteredProducts: React.Dispatch<React.SetStateAction<Product[]>>;
};

export const DropdownContext = createContext<DropdownContextType | null>(null);

export const DropdownProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useUser();
  const [active, setActive] = useState("MEN");
  const [dropdown, setDropdown] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const handleClick = (category: Category) => {
    setActive(category.name);
    const filtered = products.filter(
      (product) => product.categoryId === category.id || product.isOnSale
    );
    setFilteredProducts(filtered);
  };

  const handleDropdown = () => {
    setDropdown((prev) => !prev);
  };

  useEffect(() => {
    if (user) {
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
                product.categoryId === defaultCategory.id || product.isOnSale
            );
            setFilteredProducts(filtered);
          }
        } catch (error) {
          console.error("Failed to fetch categories:", error);
        }
      };
      fetch();
    }
  }, [user]);

  return (
    <DropdownContext.Provider
      value={{
        categories,
        active,
        dropdown,
        filteredProducts,
        setFilteredProducts,
        handleClick,
        handleDropdown,
      }}
    >
      {children}
    </DropdownContext.Provider>
  );
};
