import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token)
      return res.status(401).json({ message: "no token,authorization denied" });
    if (!token) {
      return res.redirect("/api/auth/login"); // redirect to your existing login route
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Token verification failed" });
    }
    req.user = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ message: "token invalid" });
  }
};
