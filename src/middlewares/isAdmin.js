const User = require("../models/User");

const isAdmin = async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user) return res.status(400).json({ msg: 'Usuario no valido' });
  if (user.role === 'ADMIN') {
    next();
  } else {
    return res.status(400).json({
      msg: 'Necesitas ser administrador para realizar esta acción'
    });
  }
}

module.exports = isAdmin;