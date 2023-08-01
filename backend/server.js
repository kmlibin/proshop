import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";

//connect to MongoDB
connectDB();
//create server
const app = express();

app.get("/", (req, res) => {
  res.send("API running");
});

app.use("/api/products", productRoutes);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
