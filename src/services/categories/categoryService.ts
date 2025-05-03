import { ResponseModel, Category } from "@models";
import axiosClient from "../axiosClient";

export const getCategories = async (): Promise<Category[]> => {
  const response = await axiosClient.get<
    ResponseModel<{ categories: Category[] }>
  >(`https://shop.tracio.space/api/categories`);
  return response.data.result.categories;
};

export const postCategory = async (categoryName: string): Promise<Category> => {
  const response = await axiosClient.post<ResponseModel<Category>>(
    "https://shop.tracio.space/api/categories",
    { categoryName }
  );

  if (!response.data.isSucceed) {
    throw new Error(response.data.message || "Failed to create category");
  }

  return response.data.result;
};

export const deleteCategory = async (categoryId: number): Promise<void> => {
  await axiosClient.delete(
    `https://shop.tracio.space/api/categories/${categoryId}`
  );
};
