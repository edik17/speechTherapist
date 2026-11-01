const express = require("express");
const { rateLimit } = require("express-rate-limit");
const { addContact } = require("../controllers/contactController");

const router = express.Router();

// Rate limiter dedicato per la protezione anti-spam / email bombing
// Massimo 5 richieste ogni 15 minuti per singolo indirizzo IP
const contactFormLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: "Hai inviato troppe richieste in un breve intervallo. Riprova tra 15 minuti o contattami direttamente al telefono."
  }
});

// Accettiamo SOLO l'invio protetto (POST)
router.post("/", contactFormLimiter, addContact);

module.exports = router;
