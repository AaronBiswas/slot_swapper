import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const protectRoute = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    console.log("No token found in cookies");
    return res.status(401).json({ error: "No token provided, please log in" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      console.log("No user found with decoded userId:", decoded.userId);
      return res
        .status(401)
        .json({ error: "User not found, please login again" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
