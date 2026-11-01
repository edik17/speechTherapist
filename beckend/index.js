require('dotenv').config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const hpp = require("hpp");
const { rateLimit } = require('express-rate-limit');

// Configurazione App
const app = express();
const port = process.env.PORT || 8080;

// Domini consentiti per le chiamate API (CORS Hardening)
const allowedOrigins = [
  'http://localhost:4200',
  'http://127.0.0.1:4200',
  'http://localhost:8080',
  'http://127.0.0.1:8080'
];

if (process.env.ALLOWED_ORIGINS) {
  process.env.ALLOWED_ORIGINS.split(',').forEach(origin => {
    const trimmed = origin.trim();
    if (trimmed && !allowedOrigins.includes(trimmed)) {
      allowedOrigins.push(trimmed);
    }
  });
}

app.use(cors({
  origin: function (origin, callback) {
    // Permette richieste senza origin (come curl, test locali o server-side)
    if (!origin) return callback(null, true);
    
    // Controlla domini espliciti o domini Netlify
    const isAllowed = allowedOrigins.includes(origin) || /\.netlify\.app$/.test(origin);
    if (isAllowed) {
      return callback(null, true);
    }
    
    console.warn(`[CORS] Origine bloccata: ${origin}`);
    return callback(new Error('Origine non autorizzata dalle policy CORS.'));
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Protezione Header HTTP tramite Helmet
app.use(helmet());

// Protezione da HTTP Parameter Pollution
app.use(hpp());

// Limite payload JSON per prevenire attacchi Denial of Service (max 15kb)
app.use(express.json({ limit: '15kb' }));

// Rate Limiter Globale per prevenire attacchi DoS / brute force su tutte le API
app.use(rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minuti
  max: 100, // massimo 100 richieste per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Troppe richieste da questo indirizzo IP, riprova più tardi.' }
}));

const contactRoutes = require("./routes/contactRoutes"); 
const reviewRoutes = require("./routes/reviewRoutes");

app.use("/api/contacts", contactRoutes);
app.use("/api/reviews", reviewRoutes);

// Gestione rotte non trovate
app.use((req, res) => {
  res.status(404).json({ message: "Endpoint non trovato." });
});

// Middleware centralizzato gestione errori
app.use((err, req, res, next) => {
  if (err.type === 'entity.too.large') {
    return res.status(413).json({ message: "Payload troppo grande (massimo 15KB consentiti)." });
  }
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ message: "Formato JSON non valido." });
  }
  if (err.message && err.message.includes('CORS')) {
    return res.status(403).json({ message: "Origine non autorizzata dalle policy CORS." });
  }
  console.error("Unhandled error:", err.message);
  res.status(500).json({ message: "Si è verificato un errore interno." });
});

// Avvio Server
app.listen(port, () => {
  console.log(`Server attivo e protetto su: http://localhost:${port}`);
});
