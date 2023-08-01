import express from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

const router = express.Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.status(200).json(products);
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id: productId } = req.params;
    const singleProduct = await Product.findById(productId);
    if(singleProduct) {
       res.status(200).json(singleProduct);  
    }
   res.status(404).json({msg: 'product not found'})
  })
);

export default router;
