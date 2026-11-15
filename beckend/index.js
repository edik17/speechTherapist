require('dotenv').config();

const crypto = require("crypto");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const hpp = require("hpp");
const { rateLimit } = require('express-rate-limit');

// Configurazione App
const app = express();
app.disable('x-powered-by');
const port = process.env.PORT || 8080;
const bindHost = process.env.BIND_HOST || '127.0.0.1';

// Protezione Header HTTP tramite Helmet (prima di CORS per coprire anche le preflight)
app.use(helmet());

// Domini consentiti per le chiamate API (CORS Hardening)
const allowedOrigins = [
  'http://localhost:4200',
  'http://127.0.0.1:4200',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://localhost:8080',
  'http://127.0.0.1:8080',
  'https://eleonora-mariotti-logopedista.web.app',
  'https://eleonora-mariotti-logopedista.firebaseapp.com'
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
    // Permette richieste senza origin (es. test locali o chiamate server-side)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    console.warn(`[CORS] Origine bloccata: ${origin}`);
    return callback(new Error('Origine non autorizzata dalle policy CORS.'));
  },
  methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Protezione da HTTP Parameter Pollution
app.use(hpp());

// Limite payload JSON per supporto report clinici e dati di valutazione (max 100kb)
app.use(express.json({ limit: '100kb' }));

// Rate Limiter Globale per prevenire attacchi DoS / brute force su tutte le API
app.use(rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minuti
  max: 200, // massimo 200 richieste per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Troppe richieste da questo indirizzo IP, riprova più tardi.' }
}));

// Access Control per l'area clinica privata:
// - Se CLINICAL_API_TOKEN è configurato, richiede Bearer token timing-safe.
// - Altrimenti consente solo richieste dirette da loopback locale senza header di proxy/tunnel esterni.
function requireClinicalAccess(req, res, next) {
  const configuredToken = process.env.CLINICAL_API_TOKEN;
  if (configuredToken) {
    const authHeader = String(req.headers.authorization || '');
    const supplied = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';
    const a = Buffer.from(supplied, 'utf8');
    const b = Buffer.from(configuredToken, 'utf8');
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
      return res.status(401).json({ success: false, message: 'Accesso clinico non autorizzato.' });
    }
    return next();
  }

  const remoteAddr = req.socket?.remoteAddress || req.ip || '';
  const isLoopback = remoteAddr === '127.0.0.1' || remoteAddr === '::1' || remoteAddr === '::ffff:127.0.0.1';
  const hasProxyHeaders = Boolean(
    req.headers['x-forwarded-for'] ||
    req.headers['cf-connecting-ip'] ||
    req.headers['forwarded'] ||
    req.headers['via']
  );

  if (!isLoopback || hasProxyHeaders) {
    return res.status(403).json({
      success: false,
      message: 'Endpoint clinico accessibile solo in locale o tramite CLINICAL_API_TOKEN configurato.'
    });
  }

  return next();
}

const contactRoutes = require("./routes/contactRoutes"); 
const reviewRoutes = require("./routes/reviewRoutes");
const clinicalRoutes = require("./routes/clinicalRoutes");

app.use("/api/contacts", contactRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/clinical", requireClinicalAccess, clinicalRoutes);

// Gestione rotte non trovate
app.use((req, res) => {
  res.status(404).json({ message: "Endpoint non trovato." });
});

// Middleware centralizzato gestione errori
app.use((err, req, res, next) => {
  if (err.type === 'entity.too.large') {
    return res.status(413).json({ message: "Payload troppo grande (massimo 100KB consentiti)." });
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

// Avvio Server (bind di default su 127.0.0.1 per protezione locale)
app.listen(port, bindHost, () => {
  console.log(`Server attivo e protetto su: http://${bindHost}:${port}`);
});
