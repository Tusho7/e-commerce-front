import { Column } from "react-table";
import { Product } from "./product";

export interface TableProps {
  columns: Column<Product>[];
  data: Product[];
}

export interface GlobalFilterProps {
  preGlobalFilteredRows: Product[];
  globalFilter: string;
  setGlobalFilter: (filter: string | undefined) => void;
}
