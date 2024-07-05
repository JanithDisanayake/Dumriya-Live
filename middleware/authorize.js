const checkRole = (allowedRoles) => (req, res, next) => {
  const userRole = req.user.role;

  if (allowedRoles.includes(userRole)) {
    next();
  } else {
    res.status(403).json({ message: "Forbidden: Unauthorized role" }); // Unauthorized response
  }
};

module.exports = checkRole;
