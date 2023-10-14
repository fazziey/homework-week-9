const jwt = require("jsonwebtoken");

const signToken = (data) => {
  const token = jwt.sign(data, "12345", { expiresIn: "1h" });
  return token;
};

const verifyToken = (token) => {
  const data = jwt.verify(token, "12345");
  return data;
};

module.exports = { signToken, verifyToken };
