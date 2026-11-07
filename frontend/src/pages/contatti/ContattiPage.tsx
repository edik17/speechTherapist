import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import confetti from 'canvas-confetti';
import {
  Phone,
  Mail,
  MapPin,
  Send,
  Clock,
  Calendar,
  ArrowRight,
} from 'lucide-react';
import { FadeUp } from '../../shared/directives/FadeUp';
import { MatFormField, MatInput, MatTextarea, MatSelect } from '../../shared/ui/MatFormField';
import { MatCheckbox } from '../../shared/ui/MatCheckbox';
import { MatButton } from '../../shared/ui/MatButton';
import { matSnackBar } from '../../shared/ui/MatSnackBar';
import './ContattiPage.scss';

const WEEKLY_SCHEDULE = [
  { day: 'Lunedì', location: 'Sassoferrato', hours: '09:00 - 20:00', dayIndex: 1, note: 'Studio a Modo Mio — Via Roma 39' },
  { day: 'Martedì', location: 'Ancona', hours: '09:00 - 20:00', dayIndex: 2, note: 'DSA E NON SOLO — Via Rossa Guido, 8' },
  { day: 'Mercoledì', location: 'Jesi', hours: '09:00 - 20:00', dayIndex: 3, note: 'e-Movere — Viale Gallodoro, 70/a' },
  { day: 'Giovedì', location: 'Sassoferrato', hours: '09:00 - 20:00', dayIndex: 4, note: 'Studio a Modo Mio — Via Roma 39' },
  { day: 'Venerdì', location: 'Ancona', hours: '09:00 - 20:00', dayIndex: 5, note: 'DSA E NON SOLO — Via Rossa Guido, 8' },
];

export function ContattiPage() {
  const [searchParams] = useSearchParams();
  const sedeParam = searchParams.get('sede');
  const validSedi = ['Ancona', 'Jesi', 'Sassoferrato', 'Online / Da concordare'];
  const matchedSede = validSedi.find(
    (s) => s.toLowerCase() === (sedeParam || '').toLowerCase()
  );

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    sede: matchedSede || 'Ancona',
    messaggio: '',
    privacyAccepted: false,
    website: '', // Honeypot
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isToday = (dayIndex: number): boolean => {
    return new Date().getDay() === dayIndex;
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const isEmailValid = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const nomeError = touched.nome && !formData.nome.trim()
    ? 'Inserisci il tuo nome e cognome per poterti rispondere'
    : null;

  const emailError = touched.email
    ? !formData.email.trim()
      ? "L'email è necessaria per poterti ricontattare"
      : !isEmailValid(formData.email)
      ? 'Inserisci un indirizzo email valido (es. nome@dominio.it)'
      : null
    : null;

  const messaggioError = touched.messaggio && !formData.messaggio.trim()
    ? 'Scrivi brevemente due righe sulla tua richiesta'
    : null;

  const privacyError = touched.privacyAccepted && !formData.privacyAccepted
    ? 'È necessario esprimere il consenso al trattamento dati per procedere.'
    : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setTouched({
      nome: true,
      email: true,
      messaggio: true,
      privacyAccepted: true,
    });

    if (
      !formData.nome.trim() ||
      !formData.email.trim() ||
      !isEmailValid(formData.email) ||
      !formData.messaggio.trim() ||
      !formData.privacyAccepted
    ) {
      matSnackBar.open('Per favore compila tutti i campi obbligatori contrassegnati.', 'OK');
      return;
    }

    setIsSubmitting(true);

    try {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (e) {}

    const isLocal =
      typeof window !== 'undefined' &&
      (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
    const apiUrl = isLocal ? 'http://localhost:8080/api/contacts' : '/api/contacts';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      setIsSubmitting(false);
      matSnackBar.open('Grazie per averci scritto! Ti risponderemo al più presto. 📩', 'Chiudi');
      setFormData({
        nome: '',
        email: '',
        sede: 'Ancona',
        messaggio: '',
        privacyAccepted: false,
        website: '',
      });
      setTouched({});
    } catch (error) {
      setIsSubmitting(false);
      console.warn('Backend offline o errore di rete. Avvio fallback email:', error);
      matSnackBar.open(
        'Grazie! Se preferisci, ti abbiamo preparato anche l\'email precompilata.',
        'OK'
      );

      // Fallback email precompilata
      const subject = encodeURIComponent(`Richiesta di contatto da ${formData.nome} - Sede: ${formData.sede}`);
      const body = encodeURIComponent(
        `Nome e Cognome: ${formData.nome}\nEmail: ${formData.email}\nSede scelta: ${formData.sede}\n\nMessaggio:\n${formData.messaggio}`
      );
      window.open(
        `mailto:mariotti.eleonora14@gmail.com?subject=${subject}&body=${body}`,
        '_blank',
        'noopener,noreferrer'
      );

      setFormData({
        nome: '',
        email: '',
        sede: 'Ancona',
        messaggio: '',
        privacyAccepted: false,
        website: '',
      });
      setTouched({});
    }
  };

  return (
    <div className="contact-editorial-container">
      <FadeUp as="header" className="contact-header">
        <h1>Contatti &amp; Ricevimento</h1>
        <p className="contact-lead">
          Ricevo su appuntamento ad <strong>Ancona</strong>, <strong>Jesi</strong> e <strong>Sassoferrato</strong>. Contattami per informazioni, consulenze o per fissare un primo colloquio conoscitivo.
        </p>
      </FadeUp>

      {/* ============================================ */}
      {/* SEZIONE 1: CALENDARIO SETTIMANALE DEGLI ORARI */}
      {/* ============================================ */}
      <FadeUp as="section" className="schedule-section card">
        <div className="section-title-row">
          <div className="icon-circle">
            <Calendar size={22} />
          </div>
          <div>
            <h2>Orari &amp; Disponibilità Settimanale</h2>
            <span className="section-subtitle">Presenza programmata nei singoli studi professionali</span>
          </div>
        </div>

        <div className="schedule-grid">
          {WEEKLY_SCHEDULE.map((item) => (
            <div
              key={item.day}
              className={`day-card ${isToday(item.dayIndex) ? 'is-today' : ''}`}
            >
              {isToday(item.dayIndex) && (
                <span className="today-indicator">📍 OGGI IN SEDE</span>
              )}
              <div className="day-header">
                <span className="day-name">{item.day}</span>
              </div>
              <div className="day-body">
                <div className="location-name">{item.location}</div>
                <div className="hours-row">
                  <Clock size={14} />
                  <span>{item.hours}</span>
                </div>
                <span className="note-pill">{item.note}</span>
              </div>
            </div>
          ))}
        </div>
      </FadeUp>

      {/* ============================================ */}
      {/* BANNER DI RINVIO ALLA PAGINA SEDI            */}
      {/* ============================================ */}
      <FadeUp className="sedi-reference-banner card">
        <div className="banner-content">
          <div className="banner-icon-wrap">
            <MapPin size={24} />
          </div>
          <div className="banner-text">
            <h3>Cerchi la posizione esatta e le indicazioni stradali delle strutture?</h3>
            <p>
              Consulta le schede dettagliate delle 3 sedi operative (Ancona, Jesi, Sassoferrato) con mappe interattive Google Maps e navigazione GPS rapida.
            </p>
          </div>
        </div>
        <MatButton variant="stroked" to="/sedi" className="btn-sedi-link">
          <span>Consulta le Sedi sul Territorio</span>
          <ArrowRight size={16} />
        </MatButton>
      </FadeUp>

      {/* ============================================ */}
      {/* SEZIONE 3: MODULO CONTATTI ZERO-ANSIA        */}
      {/* ============================================ */}
      <FadeUp as="section" className="contact-form-section">
        <div className="contact-grid">
          {/* Colonna Recapiti Diretti */}
          <div className="info-card card">
            <div className="info-card-header">
              <h3>Recapiti Rapidi</h3>
              <p>Se preferisci un contatto telefonico immediato o un messaggio WhatsApp:</p>
            </div>

            <div className="info-list">
              <div className="info-item">
                <div className="icon-wrapper">
                  <Phone size={20} />
                </div>
                <div>
                  <span className="info-label">Telefono &amp; WhatsApp</span>
                  <a href="tel:+393661460520" className="info-val">
                    +39 366 146 0520
                  </a>
                </div>
              </div>

              <div className="info-item">
                <div className="icon-wrapper">
                  <Mail size={20} />
                </div>
                <div>
                  <span className="info-label">Email Professionale</span>
                  <a href="mailto:mariotti.eleonora14@gmail.com" className="info-val">
                    mariotti.eleonora14&#64;gmail.com
                  </a>
                </div>
              </div>

              <div className="info-item">
                <div className="icon-wrapper">
                  <MapPin size={20} />
                </div>
                <div>
                  <span className="info-label">Sedi Principali</span>
                  <span className="info-val">Sassoferrato • Ancona • Jesi</span>
                </div>
              </div>

              <div className="info-item">
                <div className="icon-wrapper">
                  <Clock size={20} />
                </div>
                <div>
                  <span className="info-label">Orario di Ricevimento</span>
                  <span className="info-val">Lunedì - Venerdì: 09:00 - 20:00</span>
                </div>
              </div>
            </div>

            <div className="peace-of-mind-box">
              <strong>Perché iniziare con un colloquio?</strong>
              <p>
                Non richiede prescrizioni vincolanti ed è il modo migliore per analizzare le tue necessità specifiche con il giusto tempo e tutta la cura necessaria.
              </p>
            </div>
          </div>

          {/* Colonna Form Zero-Ansia */}
          <div className="form-card card">
            <div className="form-header">
              <h2>Richiedi Informazioni o Prenota</h2>
              <p>Compila i campi qui sotto. Ti risponderò personalmente con rispetto e precisione.</p>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <MatFormField label="Nome e Cognome *" error={nomeError}>
                <MatInput
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  onBlur={() => handleBlur('nome')}
                  placeholder="es. Maria Rossi"
                  autoComplete="name"
                  required
                />
              </MatFormField>

              <MatFormField label="Indirizzo Email *" error={emailError}>
                <MatInput
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  onBlur={() => handleBlur('email')}
                  placeholder="es. maria.rossi@email.com"
                  autoComplete="email"
                  required
                />
              </MatFormField>

              <MatFormField label="In quale sede preferisci la visita? *">
                <MatSelect
                  value={formData.sede}
                  onChange={(e) => setFormData({ ...formData, sede: e.target.value })}
                >
                  <option value="Sassoferrato">Studio di Sassoferrato (Lunedì &amp; Giovedì)</option>
                  <option value="Ancona">Studio di Ancona (Martedì &amp; Venerdì)</option>
                  <option value="Jesi">Studio di Jesi (Mercoledì)</option>
                  <option value="Online / Da concordare">Primo colloquio online / Da concordare</option>
                </MatSelect>
              </MatFormField>

              <MatFormField
                label="Come posso aiutarti? (età, tipo di richiesta...) *"
                error={messaggioError}
              >
                <MatTextarea
                  rows={4}
                  value={formData.messaggio}
                  onChange={(e) => setFormData({ ...formData, messaggio: e.target.value })}
                  onBlur={() => handleBlur('messaggio')}
                  placeholder="Descrivi con parole tue le difficoltà o il motivo della richiesta. Non preoccuparti dei termini tecnici: spiegami semplicemente la situazione."
                  required
                />
              </MatFormField>

              {/* Honeypot invisibile anti-bot */}
              <div
                style={{
                  position: 'absolute',
                  left: -9999,
                  opacity: 0,
                  height: 0,
                  width: 0,
                  overflow: 'hidden',
                }}
                aria-hidden="true"
              >
                <label htmlFor="website-hp">Lascia vuoto questo campo</label>
                <input
                  id="website-hp"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                />
              </div>

              {/* Consenso Privacy GDPR */}
              <div className="privacy-consent-row">
                <MatCheckbox
                  checked={formData.privacyAccepted}
                  onChange={(e) => {
                    setFormData({ ...formData, privacyAccepted: e.target.checked });
                    handleBlur('privacyAccepted');
                  }}
                >
                  <span className="privacy-label">
                    Dichiaro di aver letto l'informativa e acconsento al trattamento dei dati personali secondo il <strong>GDPR</strong> per la gestione della richiesta. *
                  </span>
                </MatCheckbox>
                {privacyError && <div className="privacy-error">{privacyError}</div>}
              </div>

              <div className="submit-row">
                <MatButton
                  type="submit"
                  variant="raised"
                  className="submit-terracotta-btn"
                  disabled={isSubmitting}
                >
                  <Send size={18} className="btn-icon" />
                  <span>{isSubmitting ? 'Invio del messaggio...' : 'Invia la Richiesta'}</span>
                </MatButton>
              </div>

              {/* Micro-nota rassicurante */}
              <div className="privacy-reassurance-note">
                <span className="lock-icon">🔒</span>
                <span>
                  I tuoi dati sono protetti e trattati con la massima riservatezza secondo il GDPR. Riceverai risposta personalmente entro <strong>24-48 ore lavorative</strong>.
                </span>
              </div>
            </form>
          </div>
        </div>
      </FadeUp>
    </div>
  );
}
