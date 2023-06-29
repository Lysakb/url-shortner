const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const { JWT_SECRET } = require("../config/env");

const authenticateUser = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const verifiedToken = jwt.verify(token, JWT_SECRET);

      req.user = await userModel.findById(verifiedToken.id);
      next();
    } catch (error) {
      res.status(400).json({message: "Not authorized!"});
    }
  }

  if (!token) {
    return res.status(400).json({message: "No token!"});
  }
};

module.exports = authenticateUser;
