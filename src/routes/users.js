const { Router } = require("express");
const { check } = require("express-validator");

const isAdmin = require("../middlewares/isAdmin");
const isOwner = require("../middlewares/isOwner");
const validateJWT = require("../middlewares/validateJWT");
const validateFields = require("../middlewares/validateFields");
const validateRole= require("../middlewares/validateRole");

const {
  register,
  login,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
} = require("../controllers/users");

const router = Router();

// route: /api/users/

router.post('/register', [
  check('email', 'Se necesita un correo valido').notEmpty().isEmail(),
  check('name', 'Se necesita un nombre').notEmpty(),
  check('password', 'Se necita una contraseña con un minimo de 6 caracteres').notEmpty().isLength(6),
  validateFields
], register);
router.post('/login', [
  check('email', 'Se necesita un correo valido').notEmpty().isEmail(),
  check('password', 'Se necita una contraseña').notEmpty(),
  validateFields
], login);

router.get('/', validateJWT, isAdmin, getUsers);
router.get('/:id', [
  validateJWT,
  isAdmin,
  check('id', 'No es un id de mongo valido').isMongoId(),
  validateFields
], getUserById);

router.put('/:id', [
  validateJWT,
  isAdmin,
  validateRole
], updateUser);

router.delete('/:id', validateJWT, isOwner, deleteUser);

module.exports = router;
