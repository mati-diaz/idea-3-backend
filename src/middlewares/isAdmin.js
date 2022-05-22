const isAdmin = (req, res, next) => {
  if (req.user.role === 'ADMIN') {
    next();
  } else {
    return res.status(400).json({
      msg: 'Necesitas ser administrador para realizar esta acción'
    });
  }
}

module.exports = isAdmin;