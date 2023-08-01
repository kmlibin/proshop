import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

//@desc fetch all products
//@route GET /api/products
//@access Public
const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.status(200).json(products);
});

//@desc fetch a single product
//@route GET /api/products/:id
//@access Public
const getSingleProduct = asyncHandler(async (req, res) => {
  const { id: productId } = req.params;
  const singleProduct = await Product.findById(productId);
  if (singleProduct) {
    res.status(200).json(singleProduct);
  } else {
    res.status(404);
    throw new Error("product not found");
  }
});

export { getAllProducts, getSingleProduct };
