const { model, Schema } = require('mongoose');

const productSchema = Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  price: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    default: 0
  },
  category: {
    type: String,
    required: true
  },
  image: String
});

productSchema.method('toJSON', function() {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const Product = model('Product', productSchema);

module.exports = Product;