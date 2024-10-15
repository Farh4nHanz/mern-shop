import ProductModel from "../models/productModel.js";
import mongoose from "mongoose";

class ProductController {
  getAllProducts = async (req, res) => {
    try {
      const products = await ProductModel.find();
      res.status(200).json({ success: true, data: products });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  };

  getProductById = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id))
      return res
        .status(400)
        .json({ success: false, message: "Invalid product id!" });

    try {
      const product = await ProductModel.findById(id);

      if (!product)
        return res
          .status(404)
          .json({ success: false, message: "Product not found!" });

      res.status(200).json({ success: true, data: product });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  };

  addNewProduct = async (req, res) => {
    const newProduct = new ProductModel(req.body);

    try {
      await newProduct.save();

      res.status(201).json({
        success: true,
        message: "New product successfully added!",
        data: newProduct,
      });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  };

  updateProductById = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id))
      return res
        .status(400)
        .json({ success: false, message: "Invalid product id!" });

    try {
      const updatedProduct = await ProductModel.findByIdAndUpdate(
        id,
        req.body,
        { new: true }
      );

      if (!updatedProduct)
        return res
          .status(404)
          .json({ success: false, message: "Product not found!" });

      res.status(200).json({ success: true, data: updatedProduct, message: "Product updated successfully!" });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  };

  deleteProductById = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id))
      return res
        .status(400)
        .json({ success: false, message: "Invalid product id!" });

    try {
      const deletedProduct = await ProductModel.findByIdAndDelete(id);

      if (!deletedProduct)
        return res
          .status(404)
          .json({ success: false, message: "Product not found!" });

      res
        .status(200)
        .json({ success: true, message: "Product has been deleted!" });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  };

  deleteAllProducts = async (req, res) => {
    if (await ProductModel.countDocuments() < 1)
      return res
        .status(400)
        .json({ success: false, message: "No products data to delete!" });

    try {
      await ProductModel.deleteMany();
      res.status(200).json({ success: true, message: "All products has been deleted!" });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  };
}

export const productController = new ProductController();
