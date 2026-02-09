require('dotenv').config(); // 1. Sempre per primo!

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const hpp = require("hpp");
const { rateLimit } = require('express-rate-limit');

// Configurazione App
const app = express();
const port = process.env.PORT || 8080;

// Configurazione Sicurezza e CORS
app.use(cors({
  origin: 'http://localhost:4200' // L'indirizzo di Angular
}));

app.use(helmet());
app.use(hpp());

app.use(rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minuti
  max: 100, // massimo 100 richieste per IP
  message: 'Too many requests from this IP, please try again later.'
}));

// Configurazione Dati
app.use(express.json());

// --- ROTTE ---
// ATTENZIONE: Controlla che il file nella cartella 'routes' abbia QUESTO nome esatto!
const contactRoutes = require("./routes/contactRoutes"); 
// Se il tuo file si chiama 'contactRoutes.js', cambia la riga sopra in "./routes/contactRoutes"

app.use("/api/contacts", contactRoutes);

// Avvio Server
app.listen(port, () => {
  console.log(`Server attivo su: http://localhost:${port}`);
});