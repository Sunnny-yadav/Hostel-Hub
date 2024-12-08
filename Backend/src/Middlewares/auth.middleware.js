import { User } from "../Models/user.model.js";
import { AsyncHandeller } from "../utils/AsyncHandeller.js";
import jwt from "jsonwebtoken";

export const verifyJWT = AsyncHandeller(async (req, res, next) => {
  const Token = req.header("Authorization")?.replace("Bearer ", "");
  if (!Token) {
    res.status(400).json({
      Error: "Token not avilable :: unauthorized user",
    });
  }

  const decodedToken = jwt.verify(Token, process.env.ACCESS_TOKEN_SECRET_KEY);

  console.log(decodedToken)
  // const user = await User.findOne({email : decodedToken.email}).select("-password");
  const user = await User.findOne({ _id: decodedToken?.id }).select("-password");

  console.log(user)
  if (!user) {
    res.status(400).json({
      Error: "Invalid user Token",
    });
  }

  req.userData = user;
  next();
});
