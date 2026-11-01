const nodemailer = require("nodemailer");

// 1. Configurazione Transporter con credenziali da variabili d'ambiente
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// Regex RFC 5322 semplificata per validazione email
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

// 2. Controller invio messaggio con validazione, sanitizzazione anti-CRLF e honeypot
exports.addContact = async (req, res) => {
  const { nome, email, messaggio, sede, website, _gotcha } = req.body;

  // 1. Protezione Anti-Bot Honeypot: se il campo nascosto è compilato, scarta silenziosamente
  if (website || _gotcha) {
    console.warn("🛡️ Bot rilevato tramite campo honeypot. Richiesta scartata.");
    return res.status(200).json({ message: "Messaggio inviato correttamente!" });
  }

  // 2. Validazione presenza campi obbligatori
  if (!nome || !email || !messaggio) {
    return res.status(400).json({ message: "Tutti i campi obbligatori (Nome, Email, Messaggio) devono essere compilati." });
  }

  // 3. Sanitizzazione e validazione anti-CRLF su 'nome'
  // Rimuove ritorni a capo (\r, \n), virgolette e caratteri di controllo per prevenire Email Header Injection
  const cleanNome = String(nome)
    .replace(/[\r\n"<>]/g, '')
    .trim()
    .substring(0, 100);

  if (cleanNome.length < 2) {
    return res.status(400).json({ message: "Inserisci un nome valido (almeno 2 caratteri)." });
  }

  // 4. Validazione formato e sicurezza su 'email'
  const cleanEmail = String(email).trim().toLowerCase().substring(0, 120);
  if (!EMAIL_REGEX.test(cleanEmail) || /[\r\n]/.test(cleanEmail)) {
    return res.status(400).json({ message: "Inserisci un indirizzo email valido (es. nome@dominio.it)." });
  }

  // 5. Sanitizzazione 'sede'
  const cleanSede = String(sede || 'Generale')
    .replace(/[\r\n"<>]/g, '')
    .trim()
    .substring(0, 80);

  // 6. Validazione 'messaggio'
  const cleanMessaggio = String(messaggio).trim().substring(0, 3000);
  if (cleanMessaggio.length < 5) {
    return res.status(400).json({ message: "Il messaggio deve contenere almeno 5 caratteri." });
  }

  const recipient = process.env.MAIL_TO || process.env.SMTP_USER;
  if (!recipient) {
    console.error("❌ ERRORE CONFIGURAZIONE: MAIL_TO e SMTP_USER non impostati nelle variabili d'ambiente.");
    return res.status(500).json({ 
      message: "Servizio di messaggistica temporaneamente non disponibile. Ti invitiamo a contattarmi telefonicamente." 
    });
  }

  // 7. Preparazione opzioni email con header sanitizzati
  const mailOptions = {
    from: `"${cleanNome}" <${process.env.SMTP_USER}>`,
    replyTo: cleanEmail,
    to: recipient,
    subject: `Messaggio dal sito web (${cleanSede}): ${cleanNome}`,
    text: `Hai ricevuto un nuovo contatto dal sito web.\n\nNome: ${cleanNome}\nEmail Paziente: ${cleanEmail}\nSede preferita: ${cleanSede}\n\nMessaggio:\n${cleanMessaggio}`
  };

  // 8. Invio effettivo con gestione errori sicura (No Information Disclosure)
  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Email inviata con successo da ${cleanNome} (${cleanEmail})`);
    return res.status(200).json({ message: "Messaggio inviato correttamente!" });
  } catch (error) {
    // Il log dettagliato rimane confinato sul server protetto
    console.error("❌ ERRORE NODEMAILER DURANTE L'INVIO:", error.message || error);
    // Risposta neutra e rassicurante al client: nessun dato o errore interno esposto
    return res.status(500).json({ 
      message: "Si è verificato un errore durante l'invio della richiesta. Riprova più tardi o contattami telefonicamente." 
    });
  }
};
