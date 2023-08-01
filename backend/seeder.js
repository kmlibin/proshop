import mongoose from "mongoose";
import dotenv from "dotenv";

import connectDB from "./config/db.js";

import users from "./data/users.js";
import products from "./data/products.js";

import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";

dotenv.config();
connectDB();

const importData = async () => {
  try {
    //delete stuff in DB first
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    //create users
    const createdUsers = await User.insertMany(users);

    //only users can create products, need admin
    const adminUser = createdUsers[0]._id;

    //create an object with each product and attach the user id of the person who created it (should be admin).
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    //create products in db
    await Product.insertMany(sampleProducts);
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

//when you call node backend/seeder, add -d for destroy
if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
