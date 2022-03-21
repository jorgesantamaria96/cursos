export const verifyUser = (req, res, next) => {
  req.body.role === "admin" ? (req.isAdmin = true) : (req.isAdmin = false);
  next();
};
