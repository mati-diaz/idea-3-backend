const { model, Schema } = require('mongoose');

const userSchema = Schema({
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'CLIENT'
  }
});

userSchema.method('toJSON', function() {
  const { __v, _id, password, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const User = model('User', userSchema);

module.exports = User;