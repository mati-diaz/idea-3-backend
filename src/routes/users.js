const { Router } = require("express");
const { register, login, getUsers, getUserById, updateUser, deleteUser } = require("../controllers/users");
const isAdmin = require("../middlewares/isAdmin");
const isOwner = require("../middlewares/isOwner");
const validateJWT = require("../middlewares/validateJWT");

const router = Router();

// route: /api/users/

router.post('/register', register);
router.post('/login', login);

router.get('/', validateJWT, isAdmin, getUsers);
router.get('/:id', validateJWT, isAdmin, getUserById);

router.put('/:id', validateJWT, isAdmin, updateUser);

router.delete('/:id', isOwner, deleteUser);

module.exports = router;
