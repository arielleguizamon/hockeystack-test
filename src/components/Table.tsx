"use client";

import { useState, useMemo, useCallback } from "react";
import { FormattedData } from "@/types";
import { useSortedData, usePaginatedData } from "@/app/hooks/useTableData";
import { humanReadableHeaders } from "@/app/constants/tableConfig";

const rowsPerPage = 10;

type TableProps = {
  data: FormattedData[];
};

const Table: React.FC<TableProps> = ({ data }) => {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof FormattedData;
    sort: "asc" | "desc";
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [inputPage, setInputPage] = useState("");

  const sortedData = useMemo(
    () => useSortedData(data, sortConfig),
    [data, sortConfig]
  );
  const paginatedData = useMemo(
    () => usePaginatedData(sortedData, currentPage, rowsPerPage),
    [sortedData, currentPage]
  );

  const totalPages = useMemo(
    () => Math.ceil(sortedData.length / rowsPerPage),
    [sortedData]
  );

  const handleSort = useCallback((key: keyof FormattedData) => {
    setSortConfig((prevSortConfig) => ({
      key,
      sort:
        prevSortConfig?.key === key && prevSortConfig.sort === "desc"
          ? "asc"
          : "desc",
    }));
  }, []);

  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputPage(e.target.value);
  };

  const handlePageInputSubmit = useCallback(() => {
    const pageNumber = Math.max(1, Math.min(totalPages, Number(inputPage)));
    if (!isNaN(pageNumber)) {
      setCurrentPage(pageNumber);
    }
    setInputPage("");
  }, [inputPage, totalPages]);

  const handlePrevPage = useCallback(() => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  }, []);

  const handleNextPage = useCallback(() => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  }, [totalPages]);

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-end items-center mb-4 space-x-2">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="text-white disabled:opacity-50"
          aria-label="Previous Page"
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
          aria-label="Next Page"
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
        <TableHeader
          data={data}
          sortConfig={sortConfig}
          handleSort={handleSort}
        />
        <TableBody paginatedData={paginatedData} />
      </table>
    </div>
  );
};

const TableHeader: React.FC<{
  data: FormattedData[];
  sortConfig: { key: keyof FormattedData; sort: "asc" | "desc" } | null;
  handleSort: (key: keyof FormattedData) => void;
}> = ({ data, sortConfig, handleSort }) => (
  <thead>
    <tr>
      {Object.keys(data[0]).map((key) => (
        <th
          key={key}
          className={`uppercase h-20 bg-gray-900 max-w-xs ${
            key !== "url" ? "cursor-pointer" : ""
          }`}
          onClick={() =>
            key !== "url" && handleSort(key as keyof FormattedData)
          }
        >
          {humanReadableHeaders[key as keyof FormattedData]}
          {sortConfig?.key === key && (sortConfig.sort === "asc" ? " ▲" : " ▼")}
        </th>
      ))}
    </tr>
  </thead>
);

const TableBody: React.FC<{ paginatedData: FormattedData[] }> = ({
  paginatedData,
}) => (
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
);

export default Table;
