const { Router } = require("express");

const router = Router();

router.use('/products', require('./products'));
router.use('/users', require('./users'));

module.exports = router;