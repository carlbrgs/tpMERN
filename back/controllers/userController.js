const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
require ("dotenv").config();

const registerUser = async (req, res) => {
  try {
    console.log(req.body);
    if (!req.body.password) {
      return res.status(400).send({ error: "Password is required" });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      ...req.body,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).send(user);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};


const loginUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).send({ error: "User not found" });
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(400).send({ error: "Invalid credentials" });
        }
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRATION,
          });

        res.status(200).send({ user, token });      

    }
    catch (error) {
        res.status(400).send({ error: error.message });
    }
};


const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send({ error: "User not found" });
        }
        res.send(user);
    }
    catch (error) {
        res.status(400).send({ error: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send({ error: "User not found" });
        }
        
        await user.save();
        res.send(user);
    }
    catch (error) {
        res.status(400).send({ error: error.message });
    }
};

const checkAuth = (req, res) => {
    const token = req.cookies.token;
  
    if (!token) {
      return res.status(401).json({ authenticated: false, message: "Token missing" });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return res.status(200).json({ authenticated: true, user: decoded });
    } catch (err) {
      return res.status(401).json({ authenticated: false, message: "Invalid token" });
    }
  };

module.exports = { registerUser, loginUser, updateUser, getUser, checkAuth };
