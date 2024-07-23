import React from "react";

interface PaginationProps {
  canPreviousPage: boolean;
  canNextPage: boolean;
  pageCount: number;
  pageOptions: number[];
  pageIndex: number;
  pageSize: number;
  setPageSize: (size: number) => void;
  gotoPage: (page: number) => void;
  nextPage: () => void;
  previousPage: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  canPreviousPage,
  canNextPage,
  pageCount,
  pageOptions,
  pageIndex,
  pageSize,
  setPageSize,
  gotoPage,
  nextPage,
  previousPage,
}) => {
  return (
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
          {pageIndex + 1} of {pageOptions.length}
        </strong>{" "}
      </span>
      <select
        value={pageSize}
        onChange={(e) => setPageSize(Number(e.target.value))}
        className="text-gray-700 border-gray-300 rounded-md cursor-pointer"
      >
        {[5, 10, 20].map((size) => (
          <option key={size} value={size}>
            Show {size}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Pagination;
