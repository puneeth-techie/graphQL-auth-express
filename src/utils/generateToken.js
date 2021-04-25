import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const issueTokens = ({ name, email, _id }) => {
  const accessToken = jwt.sign({ name, email, _id }, process.env.ACCESS_TOKEN, {
    expiresIn: "5m",
  });
  const refreshToken = jwt.sign(
    { name, email, _id },
    process.env.REFRESH_TOKEN,
    { expiresIn: "2d" }
  );
  return { accessToken, refreshToken };
};

const getUser = async (token) => {
  if (!token) {
    throw new Error("No Access Token. Authorization header required.");
  } else {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
    const user = await User.findById(decoded._id);
    if (!user) {
      throw new Error("Invalid Token. Please login and get access token");
    } else {
      return user;
    }
  }
};

const getRefreshToken = async (rToken) => {
  if (!rToken) {
    throw new Error("No Refresh Token header.");
  } else {
    const decoded = jwt.verify(rToken, process.env.REFRESH_TOKEN);
    const user = await User.findById(decoded._id);
    if (!user) {
      throw new Error("Invalid Token. Please login and get access token");
    } else {
      return user;
    }
  }
};

export { issueTokens, getUser, getRefreshToken };
