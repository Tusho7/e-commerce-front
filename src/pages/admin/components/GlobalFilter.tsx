import { useAsyncDebounce } from "react-table";
import React from "react";
import { GlobalFilterProps } from "../../../types/tableProps";

function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}: GlobalFilterProps) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value: string) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <div className="flex items-center space-x-2 mb-4">
      <label htmlFor="search-input" className="text-white">
        Search:
      </label>
      <div className="relative flex-grow">
        <input
          id="search-input"
          type="text"
          value={value || ""}
          onChange={(e) => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
          placeholder={`Search ${count} records...`}
          className="w-[90%] md:w-[20%] px-1 py-1 lg:px-4 lg:py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          aria-label="Search"
        />
        {value && (
          <button
            type="button"
            onClick={() => {
              setValue("");
              onChange("");
            }}
            className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
          >
            <svg
              className="w-5 h-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 6l12 12M6 18L18 6" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

export default GlobalFilter;
