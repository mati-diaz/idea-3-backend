const { Router } = require("express");

const router = Router();

// route: /api/products

router.get('/', (req, res) => {
  res.json({
    msg: 'products'
  })
});

module.exports = router;