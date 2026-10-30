import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/User.js";

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  // 1. Check if token exists in Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token provided");
  }

  // 2. Verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // 3. Find user from token payload
  const user = await User.findById(decoded.id).select("-password");

  if (!user) {
    res.status(401);
    throw new Error("User not found, authorization denied");
  }

  // 4. Attach user to request
  req.user = user;

  next();
});