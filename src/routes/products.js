const { Router } = require("express");
const { check } = require("express-validator");
const isAdmin = require("../middlewares/isAdmin");
const validateCategory = require("../middlewares/validateCategory");
const validateFields = require("../middlewares/validateFields");
const validateJWT = require("../middlewares/validateJWT");
const { getProducts, createProduct, getProductById, updateProduct, deleteProduct } = require("../controllers/products");
const upload = require("../helpers/multerConfig");

const router = Router();

// route: /api/products

router.post('/', [
  validateJWT,
  isAdmin,
  upload.single('image'),
  check('name', 'Se necesita un nombre').notEmpty(),
  check('price', 'Se necesita un precio').notEmpty(),
  check('category', 'Se necesita una categoria').notEmpty(),
  validateCategory,
  validateFields
], createProduct);

router.get('/', getProducts);
router.get('/:id', getProductById);

router.put('/:id', [
  validateJWT,
  isAdmin,
  validateCategory
], updateProduct);

router.delete('/:id', validateJWT, isAdmin, deleteProduct);

module.exports = router;