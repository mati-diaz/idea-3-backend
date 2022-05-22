const Product = require("../models/Product");

const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);

    await product.save();

    res.status(201).json({
      msg: 'Producto creado correctamente'
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error del servidor",
    });
  }
}

const getProducts = async (req, res) => {
  try {
    const { category } = req.query;
    const products = await Product.find();

    if (products.length) {
      res.status(200).json({ products });
    } else {
      res.status(204).json();
    }
  } catch (error) {
    res.status(500).json({
      msg: "Error del servidor",
    });
  }
}

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (product) {
      res.status(200).json({ product });
    } else {
      res.status(204).json();
    }
  } catch (error) {
    res.status(500).json({
      msg: "Error del servidor",
    });
  }
}

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await Product.findByIdAndUpdate(id, req.body);

    res.status(200).json({
      msg: 'Producto actualizado correctamente'
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error del servidor",
    });
  }
}

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await Product.findByIdAndDelete(id);
  } catch (error) {
    res.status(500).json({
      msg: "Error del servidor",
    });
  }
}

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
}