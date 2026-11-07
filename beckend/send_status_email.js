const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const nodemailer = require('nodemailer');

async function sendStatusEmail() {
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (!smtpUser || !smtpPass) {
    console.error('Credenziali SMTP mancanti nel file .env');
    process.exit(1);
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  const photoPath = path.resolve(__dirname, '../frontend/src/assets/images/EleLogopedista.jpg');
  const posterPath = path.resolve(__dirname, '../frontend/src/assets/videos/intervista-eleonora-poster.jpg');

  const htmlContent = `
<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #2C3E50; margin: 0; padding: 20px; background-color: #F8F9FA; }
    .container { max-width: 650px; margin: 0 auto; background: #FFFFFF; border-radius: 12px; overflow: hidden; border: 1px solid #E2E8F0; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
    .header { background: linear-gradient(135deg, #0F4C5C, #2A9D8F); padding: 30px 24px; text-align: center; color: #FFFFFF; }
    .header h1 { margin: 0; font-size: 24px; font-weight: 600; letter-spacing: -0.5px; }
    .header p { margin: 8px 0 0 0; opacity: 0.9; font-size: 15px; }
    .content { padding: 30px 24px; }
    .badge { display: inline-block; background-color: #E6F4EA; color: #137333; padding: 6px 14px; border-radius: 20px; font-weight: bold; font-size: 13px; margin-bottom: 20px; }
    .photo-card { text-align: center; margin: 20px 0; }
    .photo-card img { width: 140px; height: 140px; border-radius: 50%; object-fit: cover; border: 4px solid #FFFFFF; box-shadow: 0 4px 10px rgba(0,0,0,0.15); }
    .section-title { font-size: 18px; color: #0F4C5C; border-bottom: 2px solid #E2E8F0; padding-bottom: 6px; margin-top: 25px; margin-bottom: 15px; font-weight: 600; }
    ul { padding-left: 20px; margin: 10px 0; }
    li { margin-bottom: 8px; }
    .step-box { background: #F1FAEE; border-left: 4px solid #2A9D8F; padding: 12px 16px; margin: 10px 0; border-radius: 0 8px 8px 0; font-size: 14px; }
    .cta-btn { display: inline-block; background: #E76F51; color: #FFFFFF !important; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: bold; margin-top: 20px; }
    .footer { background: #EDF2F7; padding: 20px 24px; text-align: center; font-size: 12px; color: #718096; border-top: 1px solid #E2E8F0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Dott.ssa Eleonora Mariotti</h1>
      <p>Logopedista • Studio Professionale ad Ancona, Jesi e Sassoferrato</p>
    </div>

    <div class="content">
      <div style="text-align: center;">
        <span class="badge">✅ Migrazione React & Allineamento Testi Completati al 100%</span>
      </div>

      <div class="photo-card">
        <img src="cid:foto_profilo" alt="Dott.ssa Eleonora Mariotti" />
      </div>

      <p>Gentile <strong>Dott.ssa Eleonora Mariotti</strong>,</p>
      <p>ti confermiamo che il sito web è stato integralmente migrato all'architettura moderna <strong>React 18 + TypeScript + Vite</strong> e che tutti i testi sono stati <strong>perfettamente sincronizzati al 100%</strong> con il documento Google ufficiale.</p>

      <div class="section-title">📌 Sintesi degli Interventi Eseguiti</div>
      <ul>
        <li><strong>Home Page</strong>: Titolo principale aggiornato in <em>"Logopedia: Potenziare la Comunicazione, il Linguaggio e l'Apprendimento Insieme"</em>; integrato il video player per l'intervista TV <em>Story Time su Canale Italia</em>; rimossa la griglia ridondante dei servizi per dare risalto alla video-intervista.</li>
        <li><strong>Come Funziona (5 Step Clinici)</strong>: Integrati i 5 passaggi ufficiali definiti nel documento:
          <div class="step-box">
            <strong>1. Primo Contatto & Ascolto Telefonico</strong> (Orientamento iniziale)<br>
            <strong>2. Incontro Conoscitivo</strong> (In studio o on-line)<br>
            <strong>3. Valutazione Clinica</strong> (Osservazione & Somministrazione di test standardizzati)<br>
            <strong>4. Restituzione & Piano di Trattamento</strong> (Consegna della relazione scritta)<br>
            <strong>5. Trattamento Logopedico</strong> (Frequenza e durata su misura)
          </div>
        </li>
        <li><strong>Pagina Chi Sono</strong>: Intestazione <em>"La Mia Storia Professionale: Chi sono e Come lavoro"</em>, biografia clinica con diploma 100/100, Laurea con Lode, Master in Motricità Orofacciale (110/110), esperienza a Villa Adria e i 3 presidi territoriali.</li>
        <li><strong>Pagina Servizi</strong>: I 5 ambiti specialistici (Linguaggio, DSA, Voce, SMOF, Fluenza).</li>
        <li><strong>Pagina Le Mie Tesi</strong>: Titolo <em>"Le Mie Tesi & Ricerca Clinica"</em>, con i lavori di Master sullo stress genitoriale e di Laurea sulle malocclusioni e QOL.</li>
        <li><strong>Pagina Contatti & Sedi</strong>: Intestazione <em>"Contatti & Ricevimento"</em>, calendario orari con rilevamento dinamico del giorno corrente ("Oggi in sede") e 3 mappe geografiche Leaflet interattive.</li>
      </ul>

      <div class="section-title">📄 File Ufficiale Google Doc</div>
      <p>Il file Google Doc ufficiale è stato aggiornato con una sezione dedicata allo stato di avanzamento e alle specifiche tecniche del nuovo sito.</p>
      <div style="text-align: center;">
        <a href="https://docs.google.com/document/d/1knz3B-eqtEwkFsAT1eWmTRWVdApYmdrpGtIpJIHM7z4/edit" class="cta-btn" target="_blank">Apri il Documento Google Aggiornato</a>
      </div>
    </div>

    <div class="footer">
      <p>Email automatica di aggiornamento progetto generata dal sistema di sviluppo.<br>
      © 2026 Dott.ssa Eleonora Mariotti — Tutti i diritti riservati.</p>
    </div>
  </div>
</body>
</html>
  `;

  const mailOptions = {
    from: `"Dott.ssa Eleonora Mariotti - Sito Web" <${smtpUser}>`,
    to: 'mariotti.eleonora14@gmail.com',
    subject: 'Stato di Avanzamento e Aggiornamento Sito Web - Dott.ssa Eleonora Mariotti',
    html: htmlContent,
    attachments: [
      {
        filename: 'EleLogopedista.jpg',
        path: photoPath,
        cid: 'foto_profilo',
      },
      {
        filename: 'intervista-eleonora-poster.jpg',
        path: posterPath,
      },
    ],
  };

  console.log(`Invio email in corso verso: ${mailOptions.to}...`);
  const info = await transporter.sendMail(mailOptions);
  console.log('✅ Email inviata con successo!', info.messageId);
}

sendStatusEmail().catch((err) => {
  console.error('❌ Errore durante l\'invio dell\'email:', err);
  process.exit(1);
});
