import { DataGrid } from "@mui/x-data-grid";
import { humanReadableHeaders } from "@/app/constants/tableConfig";
import { FormattedData } from "@/types";

type TableProps = {
  data: FormattedData[];
};

const Table: React.FC<TableProps> = ({ data }) => {
  if (data.length === 0) {
    return <div>No data available</div>;
  }

  const rows = data.map((item, index) => ({
    id: index + 1,
    ...item,
    // Since URL is a JSX element, we need to have a special treatment
    url: item.url.props.href || "",
  }));

  const columns = Object.keys(data[0]).map((key) => ({
    field: key,
    headerName: humanReadableHeaders[key as keyof FormattedData],
    flex: 1,
    sortable: true,
  }));

  return (
    <div
      style={{
        backgroundColor: "#f0f0f0",
        borderRadius: "8px",
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        sortingOrder={["asc", "desc"]}
      />
    </div>
  );
};

export default Table;
