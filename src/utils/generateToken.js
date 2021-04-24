import jwt from "jsonwebtoken";

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

export default issueTokens;
