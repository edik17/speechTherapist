const nodemailer = require("nodemailer");

// 1. Configurazione Transporter con la "scorciatoia" Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// 2. La funzione che invia il messaggio
exports.addContact = async (req, res) => {
  const { nome, email, messaggio } = req.body;

  // Validazione
  if (!nome || !email || !messaggio) {
    return res.status(400).json({ message: "Tutti i campi sono obbligatori!" });
  }

  // Preparazione Email
  const mailOptions = {
    from: `"${nome}" <${process.env.SMTP_USER}>`, 
    replyTo: email, 
    to: process.env.MAIL_TO, 
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
    // Ti restituisco l'errore specifico per capire se Google rifiuta ancora la password
    res.status(500).json({ message: "Errore durante l'invio", error: error.message });
  }
};