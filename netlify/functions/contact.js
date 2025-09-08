const nodemailer = require('nodemailer');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const data = JSON.parse(event.body || '{}');
    const { name, email, phone, message } = data;

    if (!name || !email || !message) {
      return { statusCode: 400, body: 'Missing required fields' };
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: String(process.env.SMTP_SECURE || 'false') === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    const info = await transporter.sendMail({
  from: process.env.MAIL_FROM || process.env.SMTP_USER,
  to: "mariotti.eleonora14@gmail.com", 
  replyTo: email,
  subject: `Nuovo messaggio dal sito – ${name}`,
  text: `Nome: ${name}
Email: ${email}
Telefono: ${phone || '-'}

${message}`,
      html: `<p><strong>Nome:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Telefono:</strong> ${phone || '-'}</p>
             <p><strong>Messaggio:</strong><br>${(message || '').replace(/\n/g,'<br>')}</p>`
    });

    return { statusCode: 200, body: JSON.stringify({ ok: true, id: info.messageId }) };
  } catch (err) {
    console.error('Contact function error:', err);
    return { statusCode: 500, body: 'Internal Server Error' };
  }
};