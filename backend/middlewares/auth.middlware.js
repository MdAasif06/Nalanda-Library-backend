import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  // Header to find token 
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1]; // Bearer <token>

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // id + role
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
