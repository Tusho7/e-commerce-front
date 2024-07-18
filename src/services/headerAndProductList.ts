import React from "react";
import { Category } from "../types/category";
import { Product } from "../types/product";

export interface HeaderProps {
  categories: Category[];
  active: string;
  handleClick: (category: Category) => void;
  handleDropdown: () => void;
  dropdown: boolean;
}

export interface ProductListProps {
  filteredProducts: Product[];
  setFilteredProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  updateTopModels: (newTopModels: Product[]) => void;
}
