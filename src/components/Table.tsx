"use client";

import { useState } from "react";
import { DataItem, FormattedData } from "@/types";

type TableProps = {
  data: FormattedData[];
};
const percentageFields = new Set(["avgScrollPercentage", "bounceCount"]);

const humanReadableHeaders: { [key in keyof DataItem]: string } = {
  url: "URL",
  totalCount: "Total",
  totalVisitorCount: "Visitors",
  bounceCount: "Bounce",
  startsWithCount: "Enters",
  endsWithCount: "Exits",
  avgScrollPercentage: "Scroll",
  totalPageviewCount: "Pageviews",
};

const Table: React.FC<TableProps> = ({ data }) => {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof DataItem;
    sort: "asc" | "desc";
  } | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [inputPage, setInputPage] = useState("");
  const rowsPerPage = 10;

  const handleSort = (key: keyof DataItem) => {
    setSortConfig((prevSortConfig) => {
      return {
        key,
        sort:
          prevSortConfig?.key === key && prevSortConfig.sort === "desc"
            ? "asc"
            : "desc",
      };
    });
  };

  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputPage(e.target.value);
  };

  const handlePageInputSubmit = () => {
    const pageNumber = Math.max(1, Math.min(totalPages, Number(inputPage)));
    if (!isNaN(pageNumber)) {
      setCurrentPage(pageNumber);
    }
    setInputPage("");
  };

  const sortedData = sortConfig
    ? [...data].sort((a, b) => {
        let valueA = a[sortConfig.key];
        let valueB = b[sortConfig.key];

        // handle percentage fields
        if (
          percentageFields.has(sortConfig.key) &&
          typeof valueA === "string" &&
          typeof valueB === "string"
        ) {
          valueA = parseFloat(valueA.replace("%", ""));
          valueB = parseFloat(valueB.replace("%", ""));
        }

        if (valueA === valueB) return 0;

        if (sortConfig.sort === "asc") {
          return valueA < valueB ? -1 : 1;
        } else {
          return valueA > valueB ? -1 : 1;
        }
      })
    : data;

  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + rowsPerPage);

  const totalPages = Math.ceil(sortedData.length / rowsPerPage);

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-end items-center mb-4 space-x-2">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="text-white disabled:opacity-50"
        >
          {"<"}
        </button>
        <span className="px-4 py-2">
          {currentPage}/{totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="text-white disabled:opacity-50"
        >
          {">"}
        </button>
        <input
          type="number"
          min={1}
          value={inputPage}
          onChange={handlePageInputChange}
          className="w-12 text-center"
          placeholder={currentPage.toString()}
        />
        <button
          onClick={handlePageInputSubmit}
          className="px-1 py-1 bg-gray-900 text-white rounded"
        >
          Go
        </button>
      </div>
      <table className="table w-full">
        <thead>
          <tr>
            {Object.keys(data[0]).map((key) => (
              <th
                key={key}
                className={`uppercase h-20 bg-gray-900 w-1/12 ${
                  key !== "url" ? "cursor-pointer" : ""
                }`}
                onClick={() =>
                  key !== "url" && handleSort(key as keyof DataItem)
                }
              >
                {humanReadableHeaders[key as keyof DataItem]}
                {sortConfig?.key === key &&
                  (sortConfig.sort === "asc" ? " ▲" : " ▼")}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item, index) => (
            <tr key={index} className="hover:bg-gray-700 h-20">
              {Object.entries(item).map(([key, value]) => (
                <td key={key} className="max-w-xs break-words ">
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
