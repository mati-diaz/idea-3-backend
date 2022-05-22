const categories = ['PIZZAS', 'EMPANADAS', 'BEBIDAS', 'POSTRES'];

const validateCategory = (req, res, next) => {
  if (req.body.category) {
    req.body.category = req.body.category.toUpperCase();
    if (categories.includes(req.body.category)) {
      next();
    } else {
      return res.status(400).json({ msg: 'Introduzca una categoria valida' });
    }
  } else {
    delete req.body.category;
    next();
  }
}

module.exports = validateCategory;