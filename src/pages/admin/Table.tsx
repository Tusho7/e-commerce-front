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
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    //@ts-expect-error - TypeScript does not recognize the getSortByToggleProps method
                    {...column.getHeaderProps(column.getSortByToggleProps())}
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
                      {
                        //@ts-expect-error - TypeScript does not recognize the isSorted property
                        column.isSorted ? (
                          //@ts-expect-error - TypeScript does not recognize the isSortedDesc property
                          column.isSortedDesc ? (
                            <FontAwesomeIcon icon={faSortDown} />
                          ) : (
                            <FontAwesomeIcon icon={faSortUp} />
                          )
                        ) : (
                          <FontAwesomeIcon icon={faSort} />
                        )
                      }
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className="bg-white">
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  className="transition-transform duration-300 transform hover:scale-95 hover:bg-gray-50 hover:rounded-lg"
                >
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
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
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="pagination flex justify-between items-center p-4 bg-white border-t border-gray-200">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
              className="px-2 py-1 bg-gray-300 text-gray-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {"<<"}
            </button>
            <button
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
              className="px-2 py-1 bg-gray-300 text-gray-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {"<"}
            </button>
            <button
              onClick={() => nextPage()}
              disabled={!canNextPage}
              className="px-2 py-1 bg-gray-300 text-gray-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {">"}
            </button>
            <button
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
              className="px-2 py-1 bg-gray-300 text-gray-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {">>"}
            </button>
          </div>
          <span className="text-gray-700">
            Page{" "}
            <strong>
              {state.pageIndex + 1} of {pageOptions.length}
            </strong>{" "}
          </span>
          <select
            value={state.pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="text-gray-700 border-gray-300 rounded-md cursor-pointer"
          >
            {[5, 10, 20].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default Table;
