const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { registerUser, loginUser, updateUser, getUser, checkAuth } = require("../controllers/userController");

router.post("/create", registerUser);
router.post("/login", loginUser);
router.get("/get/:id", getUser);
router.put("/update/:id",authMiddleware, updateUser);
router.get("/check", authMiddleware, checkAuth);


module.exports = router;
