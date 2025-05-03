import React, { useMemo } from "react";
import { Button, Popconfirm, Table, Tag } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { FilterValue, SorterResult } from "antd/es/table/interface";
import type { Subscription } from "@models";
import { useDeleteSubscription } from "@hooks/subscriptions";

interface SubscriptionTableProps {
  data: Subscription[];
  loading: boolean;
  onSearch: (value: string) => void;
  pagination: TablePaginationConfig;
  onChange: (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<Subscription> | SorterResult<Subscription>[]
  ) => void;
}

const SubscriptionTable: React.FC<SubscriptionTableProps> = ({
  data,
  loading,
  pagination,
  onChange,
}) => {
  const { mutate: deleteSubscription, isPending } = useDeleteSubscription();

  const columns: ColumnsType<Subscription> = useMemo(
    () => [
      {
        title: "ID",
        dataIndex: "subscriptionPlanId",
        key: "subscriptionPlanId",
        width: 70,
      },
      {
        title: "Plan Name",
        dataIndex: "name",
        key: "name",
        render: (text: string) => <span className="font-medium">{text}</span>,
      },
      {
        title: "Price (VND)",
        dataIndex: "price",
        key: "price",
        render: (price: number) => (
          <span>{price.toLocaleString("vi-VN")}₫</span>
        ),
      },
      {
        title: "Duration (Days)",
        dataIndex: "duration",
        key: "duration",
      },
      {
        title: "Status",
        dataIndex: "isActive",
        key: "isActive",
        filters: [
          { text: "Active", value: true },
          { text: "Inactive", value: false },
        ],
        filterMultiple: false,
        render: (isActive: boolean) => (
          <Tag color={isActive ? "green" : "red"}>
            {isActive ? "Active" : "Inactive"}
          </Tag>
        ),
      },
      {
        title: "Created At",
        dataIndex: "createdAt",
        key: "createdAt",
        sorter: true,
        render: (value) => new Date(value).toLocaleString("vi-VN"),
      },
      {
        title: "Actions",
        key: "actions",
        render: (_, record) =>
          record.isActive && (
            <Popconfirm
              title="Are you sure you want to delete this subscription?"
              onConfirm={() => deleteSubscription(record.subscriptionPlanId)}
              okText="Yes"
              cancelText="No"
            >
              <Button danger size="small" loading={isPending}>
                Delete
              </Button>
            </Popconfirm>
          ),
      },
    ],
    [deleteSubscription, isPending]
  );

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <Table
        rowKey="subscriptionPlanId"
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

export default SubscriptionTable;
