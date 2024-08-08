import { DataItem, FormattedData } from "@/types";
import { percentageFields } from "@/app/constants/tableConfig";

export const useSortedData = (
  data: FormattedData[],
  sortConfig: { key: keyof DataItem; sort: "asc" | "desc" } | null
): FormattedData[] => {
  if (!sortConfig) return data;

  return [...data].sort((a, b) => {
    let valueA = a[sortConfig.key];
    let valueB = b[sortConfig.key];

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
  });
};

export const usePaginatedData = (
  data: FormattedData[],
  currentPage: number,
  rowsPerPage: number
): FormattedData[] => {
  const startIndex = (currentPage - 1) * rowsPerPage;
  return data.slice(startIndex, startIndex + rowsPerPage);
};
