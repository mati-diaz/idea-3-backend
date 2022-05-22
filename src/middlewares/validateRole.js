const validateRole = (req, res, next) => {
  if(req.body.role) {
    if (['ADMIN', 'CLIENT'].includes(req.body.role)) {
      next();
    } else {
      return res.status(400).json({
        msg: 'Los roles permitidos son ADMIN o CLIENT'
      });
    }
  } else {
    delete req.body.role;
    next();
  }
}

module.exports = validateRole;