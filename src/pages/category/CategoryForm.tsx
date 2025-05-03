import React from "react";
import { Input, Button, message } from "antd";
import { useForm, Controller } from "react-hook-form";
import { usePostCategory } from "@hooks/categories";

interface CategoryFormInputs {
  categoryName: string;
}

const CategoryForm: React.FC = () => {
  const { control, handleSubmit, reset } = useForm<CategoryFormInputs>();
  const { mutate: createCategory, isPending } = usePostCategory();

  const onSubmit = (data: CategoryFormInputs) => {
    createCategory(data.categoryName, {
      onSuccess: (category) => {
        message.success(`Created category: ${category.categoryName}`);
        reset(); // clear the form
      },
      onError: (err) => {
        message.error((err as Error).message || "Failed to create category");
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Controller
        name="categoryName"
        control={control}
        rules={{ required: "Category name is required" }}
        render={({ field, fieldState }) => (
          <>
            <Input
              {...field}
              placeholder="Enter category name"
              status={fieldState.error ? "error" : ""}
            />
            {fieldState.error && (
              <p className="text-red-500 text-xs">{fieldState.error.message}</p>
            )}
          </>
        )}
      />

      <Button
        type="primary"
        htmlType="submit"
        loading={isPending}
        disabled={isPending}
      >
        Submit
      </Button>
    </form>
  );
};

export default CategoryForm;
