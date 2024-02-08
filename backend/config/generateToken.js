const jwt = require("jsonwebtoken");

const generateToken = (id, ei) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: ei,
  });
};

module.exports = generateToken;
