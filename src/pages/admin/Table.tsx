// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck - TypeScript does not recognize the getTableProps method
import {
  TableInstance,
  TableState,
  useGlobalFilter,
  UseGlobalFiltersInstanceProps,
  useSortBy,
  useTable,
  UseSortByInstanceProps,
  usePagination,
} from "react-table";
import { Product } from "../../types/product";
import GlobalFilter from "./components/GlobalFilter";
import { TableProps } from "../../types/tableProps";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSort,
  faSortUp,
  faSortDown,
} from "@fortawesome/free-solid-svg-icons";
import Pagination from "./components/TablePagination";

function Table({ columns, data }: TableProps) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
    setGlobalFilter,
    preGlobalFilteredRows,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
  }: TableInstance<Product> &
    UseGlobalFiltersInstanceProps<Product> &
    UseSortByInstanceProps<Product> & {
      state: TableState<Product> & { globalFilter: string };
      preGlobalFilteredRows: Product[];
    } = useTable<Product>(
    {
      columns,
      data,
      initialState: { pageSize: 5 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  return (
    <div className="overflow-x-auto rounded">
      <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={state.globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      <div className="min-w-full overflow-x-auto">
        <table
          {...getTableProps()}
          className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md"
        >
          <thead className="bg-gradient-to-r from-blue-500 to-teal-500 text-white sticky top-0 z-10">
            {headerGroups.map((headerGroup) => {
              const { key, ...restHeaderGroupProps } =
                headerGroup.getHeaderGroupProps();
              return (
                <tr key={key} {...restHeaderGroupProps}>
                  {headerGroup.headers.map((column) => {
                    const { key: columnKey, ...restColumnProps } =
                      column.getHeaderProps(column.getSortByToggleProps());
                    return (
                      <th
                        key={columnKey}
                        {...restColumnProps}
                        className={`px-2 py-1 text-left font-medium text-xs sm:text-sm uppercase tracking-wider cursor-pointer w-[150px] max-w-[150px] ${
                          column.id === "name" ||
                          column.id === "price" ||
                          column.id === "Actions"
                            ? "block"
                            : "hidden lg:table-cell"
                        }`}
                      >
                        {column.render("Header")}
                        <span className="ml-1">
                          {column.isSorted ? (
                            column.isSortedDesc ? (
                              <FontAwesomeIcon icon={faSortDown} />
                            ) : (
                              <FontAwesomeIcon icon={faSortUp} />
                            )
                          ) : (
                            <FontAwesomeIcon icon={faSort} />
                          )}
                        </span>
                      </th>
                    );
                  })}
                </tr>
              );
            })}
          </thead>
          <tbody {...getTableBodyProps()} className="bg-white">
            {page.map((row) => {
              prepareRow(row);
              const { key, ...restRowProps } = row.getRowProps();
              return (
                <tr
                  key={key}
                  {...restRowProps}
                  className="transition-transform duration-300 transform hover:scale-95 hover:bg-gray-50 hover:rounded-lg"
                >
                  {row.cells.map((cell) => {
                    const { key: cellKey, ...restCellProps } =
                      cell.getCellProps();
                    return (
                      <td
                        key={cellKey}
                        {...restCellProps}
                        className={`px-2 py-1 text-gray-800 text-xs sm:text-sm flex justify-center items-center w-[100px] h-[100px] ${
                          cell.column.id === "name" ||
                          cell.column.id === "price" ||
                          cell.column.id === "Actions"
                            ? "block"
                            : "hidden lg:table-cell"
                        }`}
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>

        <Pagination
          canPreviousPage={canPreviousPage}
          canNextPage={canNextPage}
          pageCount={pageCount}
          pageOptions={pageOptions}
          pageIndex={state.pageIndex}
          pageSize={state.pageSize}
          setPageSize={setPageSize}
          gotoPage={gotoPage}
          nextPage={nextPage}
          previousPage={previousPage}
        />
      </div>
    </div>
  );
}

export default Table;
