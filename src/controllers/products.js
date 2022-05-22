const uploadImg = require("../helpers/imageUploads");
const Product = require("../models/Product");
const path = require("path");
const fs = require("fs");

const createProduct = async (req, res) => {
  try {
    const existProduct = await Product.findOne({ name: req.body.name });

    if (existProduct) {
      if (req.file) {
        const file = path.join(__dirname, `../../uploads/${req.file.filename}`);
        fs.unlink(file, error => {
          if (error) throw error;
        });
      }

      return res.status(400).json({
        msg: 'Ya existe un producto con ese nombre'
      });
    }

    if (req.file) {
      const image = await uploadImg(req.file);
      req.body.image = image
    }

    const product = new Product(req.body);

    await product.save();

    res.status(201).json({
      msg: 'Producto creado correctamente'
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: "Error del servidor",
    });
  }
}

const getProducts = async (req, res) => {
  try {
    const { category } = req.query;

    let products;

    if (category) {
      products = await Product.find({ category: category.toUpperCase() });
    } else {
      products = await Product.find();
    }

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
      res.status(404).json({
        msg: 'Producto no encontrado'
      });
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

    if (req.file) {
      const image = await uploadImg(req.file);
      req.body.image = image
    }

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

    res.status(200).json({
      msg: 'Producto eliminado correctamente'
    });
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