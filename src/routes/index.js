const { Router } = require("express");

const router = Router();

router.use('/products', require('./products'));

module.exports = router;