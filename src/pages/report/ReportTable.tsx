import React, { useMemo, useState } from "react";
import { Table, Input, Tag, Space } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { FilterValue, SorterResult } from "antd/es/table/interface";
import { Report } from "@models";

const { Search } = Input;

interface ReportTableProps {
  data: Report[];
  loading: boolean;
  onSearch: (value: string) => void;
  pagination: TablePaginationConfig;
  onChange: (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<Report> | SorterResult<Report>[]
  ) => void;
}

const statusColorMap: Record<Report["status"], string> = {
  Pending: "orange",
  Reviewing: "blue",
  Resolved: "green",
  Dismissed: "red",
};

const severityColorMap: Record<Report["severityLevel"], string> = {
  None: "grey",
  Minor: "green",
  Moderate: "orange",
  Severe: "red",
};

const ReportTable: React.FC<ReportTableProps> = ({
  data,
  loading,
  onSearch,
  pagination,
  onChange,
}) => {
  const [searchValue, setSearchValue] = useState("");

  const columns: ColumnsType<Report> = useMemo(
    () => [
      {
        title: "ID",
        dataIndex: "reportId",
        sorter: true,
        width: 70,
      },
      {
        title: "Title",
        dataIndex: "title",
        sorter: true,
        render: (text: string) => <span className="font-medium">{text}</span>,
      },
      {
        title: "Type",
        dataIndex: "targetType",
        filters: [
          { text: "Account", value: "Account" },
          { text: "Blog", value: "Blog" },
          { text: "Comment", value: "Comment" },
          { text: "Route", value: "Route" },
          { text: "Shop", value: "Shop" },
          { text: "Group", value: "Group" },
          { text: "Service", value: "Service" },
        ],
        filterMultiple: true,
        onFilter: (value, record) => record.targetType === value,
      },
      {
        title: "Status",
        dataIndex: "status",
        filters: Object.keys(statusColorMap).map((s) => ({
          text: s,
          value: s,
        })),
        render: (status: Report["status"]) => (
          <Tag color={statusColorMap[status]}>{status}</Tag>
        ),
      },
      {
        title: "Severity",
        dataIndex: "severityLevel",
        filters: Object.keys(severityColorMap).map((s) => ({
          text: s,
          value: s,
        })),
        render: (severity: Report["severityLevel"]) => (
          <Tag color={severityColorMap[severity]}>{severity}</Tag>
        ),
      },
      {
        title: "Reporter",
        dataIndex: "reporterUserName",
        render: (name, record) => (
          <Space>
            {record.reporterUserAvatarUrl && (
              <img
                src={record.reporterUserAvatarUrl}
                alt={name ?? "avatar"}
                className="w-6 h-6 rounded-full"
              />
            )}
            <span>{name ?? "N/A"}</span>
          </Space>
        ),
      },
      {
        title: "Created At",
        dataIndex: "createdAt",
        sorter: true,
        render: (value) => new Date(value).toLocaleString(),
      },
    ],
    []
  );

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <div className="flex justify-between mb-4">
        <h2 className="text-lg font-semibold">User Reports</h2>
        <Search
          placeholder="Search by title or description"
          allowClear
          onSearch={(value) => {
            setSearchValue(value);
            onSearch(value);
          }}
          className="max-w-sm"
        />
      </div>

      <Table
        rowKey="reportId"
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={pagination}
        onChange={onChange}
        bordered
      />
    </div>
  );
};

export default ReportTable;
