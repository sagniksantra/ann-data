import express from "express";
import { config } from "dotenv";
import mongoose from "mongoose";
import paymentRoute from "./routes/paymentRoutes.js";
import cors from "cors";
config({ path: "./config/config.env" });

export const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", paymentRoute);

app.get("/api/getkey", (req, res) =>
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
);

// MarketPlace
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
});

const Product = mongoose.model("Product", productSchema);

app.post("/api/products", async (req, res) => {
  const { name, price, image } = req.body;
  try {
    const product = new Product({ name, price, image });
    await product.save();
    res.json({ message: "Product added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
