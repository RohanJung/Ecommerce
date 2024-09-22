import React, { useEffect } from "react";
import {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from "../../redux/api/categoryApiSlice";

const CategoryList = () => {
  const { data: categories, error, isLoading } = useGetCategoriesQuery();

  useEffect(() => {
    if (!isLoading && !error && categories) {
      console.log("Categories:", categories);
    }
    if (error) {
      console.error("Error fetching categories:", error);
    }
  }, [categories, error, isLoading]);
  return (
    <div className="pl-48 ">
      <h1 className="text-4xl font-bold">Category List</h1>
    </div>
  );
};

export default CategoryList;
