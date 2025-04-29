import React from "react";
import { Button, Popconfirm, Table } from "antd";
import { useGetCategories } from "../../hooks/categories/useGetCategories";
import { Category as Cate } from "../../constants/models/Category";
import CategoryForm from "./CategoryForm";
import { useDeleteCategory } from "../../hooks/categories/useDeleteCategory";

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
    <div className="flex flex-col gap-3 w-full">
      <Table<Cate>
        rowKey="categoryId"
        columns={columns}
        dataSource={data}
        loading={isLoading}
        pagination={{ pageSize: 10 }}
        className="w-full"
      />

      <div className="flex">
        <div className="w-full max-w-md">
          <CategoryForm />
        </div>
      </div>
    </div>
  );
};

export default Category;
