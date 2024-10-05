import React, { useState } from "react";
import {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from "../../redux/api/categoryApiSlice";
import { set } from "mongoose";

const CategoryList = () => {
  const { data: categories, error, isLoading } = useGetCategoriesQuery();
  const [name, setName] = useState("");
  const [form, setForm] = useState(false);
  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [editForm, setEditForm] = useState(false);
  const [editData, setEditData] = useState({
    id: "",
    name: "",
  });

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const result = await createCategory({ name }).unwrap();
      console.log(result);
      setName("");
      setForm(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const { id, name } = editData;
      const result = await updateCategory({
        categoryId: id,
        categoryData: { name },
      }).unwrap();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      console.log(id);
      const result = await deleteCategory({ id }).unwrap();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="pl-48">
      <div>
        <h1 className="text-4xl font-bold">Category List</h1>
      </div>

      <div>
        <button
          className="p-4 m-4 border border-solid border-black rounded-lg"
          onClick={() => setForm(true)} // Toggle form visibility
        >
          Add Category
        </button>
      </div>

      <table className="w-full mt-4">
        <thead>
          <tr>
            <th className="border border-gray-400">ID</th>
            <th className="border border-gray-400">Name</th>
            <th className="border border-gray-400">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories &&
            categories.map((category) => (
              <tr key={category._id}>
                <td className="border border-gray-400">{category._id}</td>
                <td className="border border-gray-400">{category.name}</td>
                <td className="border border-gray-400">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                    onClick={() => {
                      setEditForm(true); // Show the edit form
                      setEditData({ id: category._id, name: category.name }); // Set the current category's id and name
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleDelete(category._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {form && (
        <form className="mt-4" onSubmit={handleCreate}>
          <div>
            <label htmlFor="name" className="block mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full border border-gray-400 p-2 rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-2 py-1 rounded mt-2"
          >
            Submit
          </button>
        </form>
      )}
      {editForm && (
        <form className="mt-4" onSubmit={handleEdit}>
          <div>
            <label htmlFor="name" className="block mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full border border-gray-400 p-2 rounded"
              value={editData.name}
              onChange={
                (e) => setEditData({ ...editData, name: e.target.value }) // Keep the id, update the name
              }
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-2 py-1 rounded mt-2"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default CategoryList;
