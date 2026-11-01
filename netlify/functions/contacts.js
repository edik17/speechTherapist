/**
 * Netlify Serverless Function per l'invio sicuro dei contatti.
 * Esegue l'invio protetto via Nodemailer nel cloud di Netlify.
 */
const nodemailer = require("nodemailer");

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

exports.handler = async function (event, context) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY'
  };

  // Gestione preflight CORS
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ message: 'Metodo non consentito. Usa POST.' })
    };
  }

  // Protezione Denial of Service: limite payload 15KB
  if (event.body && event.body.length > 15360) {
    return {
      statusCode: 413,
      headers,
      body: JSON.stringify({ message: 'Payload troppo grande (massimo 15KB consentiti).' })
    };
  }

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch (err) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ message: 'Payload JSON non valido.' })
    };
  }

  const { nome, email, messaggio, sede, website, _gotcha } = body;

  // 1. Protezione Honeypot anti-bot
  if (website || _gotcha) {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'Messaggio inviato correttamente!' })
    };
  }

  // 2. Validazione presenza campi
  if (!nome || !email || !messaggio) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ message: 'Tutti i campi obbligatori devono essere compilati.' })
    };
  }

  // 3. Sanitizzazione anti-CRLF
  const cleanNome = String(nome).replace(/[\r\n"<>]/g, '').trim().substring(0, 100);
  if (cleanNome.length < 2) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ message: 'Inserisci un nome valido.' })
    };
  }

  const cleanEmail = String(email).trim().toLowerCase().substring(0, 120);
  if (!EMAIL_REGEX.test(cleanEmail) || /[\r\n]/.test(cleanEmail)) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ message: 'Inserisci un indirizzo email valido.' })
    };
  }

  const cleanSede = String(sede || 'Generale').replace(/[\r\n"<>]/g, '').trim().substring(0, 80);
  const cleanMessaggio = String(messaggio).trim().substring(0, 3000);
  if (cleanMessaggio.length < 5) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ message: 'Il messaggio deve contenere almeno 5 caratteri.' })
    };
  }

  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const mailTo = process.env.MAIL_TO || smtpUser;

  if (!smtpUser || !smtpPass) {
    console.error("Credenziali SMTP non configurate su Netlify Environment Variables.");
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: 'Servizio non configurato. Ti invitiamo a contattarmi telefonicamente.' })
    };
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: smtpUser,
      pass: smtpPass
    }
  });

  const mailOptions = {
    from: `"${cleanNome}" <${smtpUser}>`,
    replyTo: cleanEmail,
    to: mailTo,
    subject: `Messaggio dal sito web (${cleanSede}): ${cleanNome}`,
    text: `Hai ricevuto un nuovo contatto dal sito web.\n\nNome: ${cleanNome}\nEmail Paziente: ${cleanEmail}\nSede preferita: ${cleanSede}\n\nMessaggio:\n${cleanMessaggio}`
  };

  try {
    await transporter.sendMail(mailOptions);
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'Messaggio inviato correttamente!' })
    };
  } catch (err) {
    console.error("Errore serverless sendMail:", err.message);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: "Si è verificato un errore durante l'invio. Riprova più tardi o contattami telefonicamente." })
    };
  }
};
