//helpers
import jwt from "jsonwebtoken";

//middlewares
import asyncHandler from "./asyncHandler.js";

//models
import User from "../models/userModel.js";

//protect routes for users that are registered
//remember to call next at end of middleware
const protect = asyncHandler(async (req, res, next) => {
  let token;
  //read the jwt from the cookie (remember, we named it jwt)
  token = req.cookies.jwt;
  if (token) {
    try {
      //decode the token to get userid,
      //remember, in token, we created a token with the userID
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      //req.user - adds user to request object, with user props
      //-password removes the password from what we are requesting so we don't get that back
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("not authorized, no token");
  }
});

//for admins auth

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("not authorized as admin");
  }
};

export { protect, admin };
