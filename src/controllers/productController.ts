import { Request, Response } from "express";
import { Product } from "../models/productModel";

// @desc   Get all products
// @route GET /api/products
// @access Public
export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc   Get single product by ID
// @route GET /api/products/:id
// @access Public
export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc   Create a new product
// @route POST /api/products
// @access Private/Admin
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, image, brand, category, countInStock } =
      req.body;

    const product = new Product({
      name,
      description,
      price,
      image,
      brand,
      category,
      countInStock,
      rating: 0,
      numReviews: 0,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
