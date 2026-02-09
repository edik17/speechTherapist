const express = require("express");
const { addContact } = require("../controllers/contactController");
const router = express.Router();

// Accettiamo SOLO l'invio (POST)
router.post("/", addContact);

module.exports = router;