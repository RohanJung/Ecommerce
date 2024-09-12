import Category from "../models/categoryModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400).json({ message: "Please fill in all fields." });
    return;
  }

  const categoryExists = await Category.findOne({ name });
  if (categoryExists) {
    res.status(400).json({ message: "Category already exists." });
    return;
  }

  try {
    const newCategory = new Category({ name });
    await newCategory.save();
    res.status(201).json({
      _id: newCategory._id,
      name: newCategory.name,
    });
  } catch (error) {
    res.status(500).json({ message: "An error occurred. Please try again." });
  }
});

export { createCategory };
