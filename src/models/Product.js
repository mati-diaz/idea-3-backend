const { model, Schema } = require('mongoose');

const productSchema = Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  image: String
});

const Product = model('Product', productSchema);

module.exports = Product;