const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSignup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const savedUser = await userModel.findOne({ email });
    if (savedUser) {
      return res
        .status(400)
        .json({ message: "User already exists, please login" });
    }
    await user.save();
    res.status(200).json({ message: "Signup successful!", user });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User does not exist, please signup" });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res
        .status(400)
        .json({ message: "Invalid password, please try again" });
    }

    const userId = {
      id: user._id,
      email: user.email,
    };

    const token = jwt.sign(userId, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Login successful!", token });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
    userSignup,
    userLogin
}