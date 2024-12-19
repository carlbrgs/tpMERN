const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {createAnnonce, getAnnonces, updateAnnonce, getAnnonceByUserId, deleteAnnonce, getAnnonceById } = require("../controllers/annonceController");

router.post("/create", authMiddleware, createAnnonce);
router.get("/get", getAnnonces);
router.get("/get/:annonceId", authMiddleware, getAnnonceById);
router.put("/update/:annonceId", authMiddleware, updateAnnonce);
router.get("/getUser/:userId", getAnnonceByUserId);
router.delete("/delete/:annonceId", authMiddleware, deleteAnnonce);

module.exports = router;