import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

//@desc fetch all products
//@route GET /api/products
//@access Public
const getAllProducts = asyncHandler(async (req, res) => {
  //...w/pagination, basically linking it to params, access thru req.query
  //create page size for pagination
  const pageSize = 5;
  //get page number from frontend (or 1)
  const page = Number(req.query.pageNumber || 1);
  console.log(req)
  //get the amount of documents (products ) we have
  const count = await Product.countDocuments();
  //limit the amount we find to the page size, and then skip the necessary amount of products (if on 3rd page, skip 2nd and 1st pages)
  const products = await Product.find({})
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  //send back page and amount of pages
  res.status(200).json({ products, page, pages: Math.ceil(count / pageSize) });
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

//@desc create a product
//@route POST /api/products
//@access private/admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample Name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample Brand",
    category: "Sample Category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample Description",
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

//@desc update a product
//@route PUT /api/products/:id
//@access Private/admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

//@desc delete a product
//@route DELETE /api/products/:id
//@access Private/admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.status(200).json({ message: "product deleted" });
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

//@desc create a new review
//@route POST /api/products/:id/reviews
//@access Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);
  //check to make sure user hasn't already reviewed the product
  if (product) {
    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("product already reviewed");
    }
    //create the review and push to product.review
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    //adds all ratings together, then divide by length of review
    product.rating =
      product.reviews.reduce((acc, review) => acc + review.rating, 0) /
      product.reviews.length;
    await product.save();
    res.status(201).json({ message: "review added" });
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

export {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
};
