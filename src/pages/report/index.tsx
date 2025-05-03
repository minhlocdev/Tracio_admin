import { useCallback, useMemo, useState } from "react";
import ReportTable from "./ReportTable";
import { useGetReports } from "@hooks/reports";
import { GetReportRequest } from "@services/reports";
import type { TablePaginationConfig } from "antd/es/table";
import { FilterValue, SorterResult } from "antd/es/table/interface";
import { Report } from "@models";

const ReportPage = () => {
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"ascend" | "descend" | null>(null);
  const [filters, setFilters] = useState<Record<string, string[]>>({});

  const params: GetReportRequest = useMemo(
    () => ({
      search,
      pageNumber: page,
      pageSize,
      sortBy: sortField ?? undefined,
      sortDirection:
        sortOrder === "ascend"
          ? "asc"
          : sortOrder === "descend"
          ? "desc"
          : undefined,
      ...filters,
    }),
    [search, page, pageSize, sortField, sortOrder, filters]
  );

  const { data, isLoading } = useGetReports(params);

  const handleTableChange = useCallback(
    (
      pagination: TablePaginationConfig,
      filters: Record<string, FilterValue | null>,
      sorter: SorterResult<Report> | SorterResult<Report>[]
    ) => {
      setPage(pagination.current || 1);
      setPageSize(pagination.pageSize || 10);

      if (!Array.isArray(sorter) && sorter.field) {
        setSortField(sorter.field as string);
        setSortOrder(sorter.order as "ascend" | "descend");
      } else {
        setSortField(null);
        setSortOrder(null);
      }

      const convertedFilters: Record<string, string[]> = {};
      for (const key in filters) {
        const value = filters[key];
        if (Array.isArray(value)) {
          convertedFilters[key] = value as string[];
        }
      }

      setFilters(convertedFilters);
    },
    []
  );

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <div className="p-4">
      <ReportTable
        data={data?.items || []}
        loading={isLoading}
        onSearch={handleSearch}
        pagination={{
          current: page,
          pageSize,
          total: data?.totalCount || 0,
        }}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default ReportPage;
