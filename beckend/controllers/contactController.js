const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, // Scrivilo a mano
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER, // SCRIVILO A MANO TRA VIRGOLETTE
    pass: process.env.SMTP_PASS // INCOLLA QUI LA TUA PASSWORD APP (quella di 16 lettere)
  }
});

// 2. La funzione che invia (PULITA DA DATABASE)
exports.addContact = async (req, res) => {

  const { nome, email, messaggio } = req.body;

  // Validazione semplice
  if (!nome || !email || !messaggio) {
    return res.status(400).json({ message: "Tutti i campi sono obbligatori!" });
  }

  // Preparazione Email
  const mailOptions = {
    from: `"${nome}" <${process.env.SMTP_USER}>`, // Mittente (deve essere la tua mail auth)
    replyTo: email, // Se rispondi, vai all'email del paziente
    to: process.env.MAIL_TO, // Destinatario (Logopedista)
    subject: `Messaggio dal sito web: ${nome}`,
    text: `Hai ricevuto un nuovo contatto.\n\nNome: ${nome}\nEmail Paziente: ${email}\n\nMessaggio:\n${messaggio}`
  };

  // Invio effettivo
  try {
    await transporter.sendMail(mailOptions);
    console.log("✅ EMAIL INVIATA CON SUCCESSO!");
    res.status(200).json({ message: "Messaggio inviato correttamente!" });
  } catch (error) {
    console.error("❌ ERRORE NODEMAILER:", error);
    res.status(500).json({ message: "Errore durante l'invio", error: error.message });
  }
};

exports.addContact = async (req, res) => {
  const { nome, email, messaggio } = req.body;

  if (!nome || !email || !messaggio) {
    return res.status(400).json({ message: "Tutti i campi sono obbligatori!" });
  }

  const mailOptions = {
    from: `"${nome}" <${process.env.SMTP_USER}>`, // Gmail richiede che il mittente sia autenticato
    replyTo: email, // Se clicchi rispondi, rispondi al paziente
    to: process.env.MAIL_TO,
    subject: `Nuovo messaggio dal sito: ${nome}`,
    text: `Hai ricevuto un nuovo contatto.\n\nNome: ${nome}\nEmail paziente: ${email}\n\nMessaggio:\n${messaggio}`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email inviata con successo!");
    res.status(200).json({ message: "Messaggio inviato correttamente!" });
  } catch (error) {
    console.error("Errore invio email:", error);
    res.status(500).json({ message: "Errore del server durante l'invio." });
  }
};