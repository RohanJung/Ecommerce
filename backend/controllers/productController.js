import Product from "../models/productModel";
import asyncHandler from "../middlewares/asyncHandler";

const createProdct = asyncHandler(async (req, res) => {
  const {
    name,
    image,
    brand,
    quantity,
    category,
    description,
    price,
    countInStock,
  } = req.body;

  if (
    !name ||
    !image ||
    !brand ||
    !quantity ||
    !category ||
    !description ||
    !price ||
    !countInStock
  ) {
    res.status(400).json({ message: "Please fill in all fields." });
    return;
  }

  const productExists = await Product.findOne({ name });
  if (productExists) {
    res.status(400).json({ message: "Product already exists." });
    return;
  }

  try {
    const newProduct = new Product({
      name,
      image,
      brand,
      quantity,
      category,
      description,
      price,
      countInStock,
    });
    await newProduct.save();
    res.status(201).json({
      _id: newProduct._id,
      name: newProduct.name,
    });
  } catch (error) {
    res.status(500).json({ message: "An error occurred. Please try again." });
  }
});

export { createProduct };
