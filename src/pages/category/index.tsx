import React from "react";
import { Button, Popconfirm, Table } from "antd";
import { Category as Cate } from "@models";
import CategoryForm from "./CategoryForm";
import { useGetCategories, useDeleteCategory } from "@hooks/categories";

const Category: React.FC = () => {
  const { data, isLoading, error } = useGetCategories();
  const { mutate: deleteCategory, isPending } = useDeleteCategory();

  const columns = [
    {
      title: "ID",
      dataIndex: "categoryId",
      key: "categoryId",
    },
    {
      title: "Category Name",
      dataIndex: "categoryName",
      key: "categoryName",
    },
    {
      title: "Action",
      key: "action",
      render: (_: void, record: Cate) => (
        <Popconfirm
          title="Are you sure you want to delete this category?"
          onConfirm={() => deleteCategory(record.categoryId)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="link" danger loading={isPending}>
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  if (error) return <div>Error loading categories.</div>;

  return (
    <div className="flex flex-row gap-6 w-full items-start">
      {/* Table on the left */}
      <div className="flex-1">
        <Table<Cate>
          rowKey="categoryId"
          columns={columns}
          dataSource={data}
          loading={isLoading}
          pagination={{ pageSize: 10 }}
          className="w-full"
        />
      </div>
      <div className="w-[320px] border border-neutral-200 rounded-lg p-4 shadow-sm bg-white">
        <h3 className="text-lg font-semibold mb-2">Create New Category</h3>
        <CategoryForm />
      </div>
    </div>
  );
};

export default Category;
