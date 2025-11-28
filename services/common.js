exports.isAuth = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.send(401);
  }
};

exports.sanitizeUser = (user) => {
  return { id: user.id, role: user.role };
};
