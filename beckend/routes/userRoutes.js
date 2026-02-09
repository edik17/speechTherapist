const express = require("express");
const {registerUser, loginUser, getUserContacts} = require("../controllers/userController");
const {registerUserValidator, loginUserValidator} = require("../validators/userValidators");
const {verifyToken} = require("../middlewares/authMiddleware")

const router = express.Router();

router.post("/register", registerUserValidator, registerUser);
router.post("/login", loginUserValidator, loginUser);
router.get("/contact", verifyToken, getUserContacts);

module.exports = router;