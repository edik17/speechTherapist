import React from 'react';
import {
  Heart,
  ShieldCheck,
  Users,
  GraduationCap,
  CalendarCheck,
  Award,
  MapPin,
  Activity,
  BookOpen,
  CheckCircle2,
  Sparkles,
  Download,
  FileText,
  Quote,
  Navigation,
  ExternalLink,
} from 'lucide-react';
import { PageHero } from '../../shared/components/PageHero';
import { FadeUp } from '../../shared/directives/FadeUp';
import { MatButton } from '../../shared/ui/MatButton';
import './AboutPage.scss';

export interface Milestone {
  year: string;
  badge: string;
  title: string;
  institute: string;
  grade?: string;
  thesis?: string;
  desc: string;
}

export interface TrainingItem {
  title: string;
  docente: string;
  year?: string;
  focus: string;
}

export interface ClinicalLocation {
  city: string;
  facility: string;
  address: string;
  role: string;
  focus: string;
  desc: string;
  gmapsUrl: string;
  mapEmbedUrl: string;
}

export interface SpecializationArea {
  type: 'activity' | 'book' | 'heart' | 'sparkles';
  title: string;
  subtitle: string;
  desc: string;
  tags: string[];
}

const MANIFESTO_QUOTE = {
  text: 'Ogni percorso parte da una valutazione attenta e personalizzata. Il mio obiettivo non è semplicemente intervenire sulla difficoltà, ma valorizzare le potenzialità di ogni individuo, in un clima di fiducia e collaborazione.',
  author: 'Dott.ssa Eleonora Mariotti',
  role: 'Logopedista — Master in Motricità Orofacciale',
};

const LOCATIONS: ClinicalLocation[] = [
  {
    city: 'Ancona',
    facility: 'Centro multispecialistico DSA E NON SOLO',
    address: 'Via Rossa Guido, 8, 60131 Ancona AN',
    role: 'Logopedista in Equipe Multidisciplinare',
    focus: 'Apprendimento (DSA), Linguaggio & Motricità Orofacciale',
    desc: 'Valutazione e potenziamento clinico integrato a stretto contatto con neuropsichiatri infantili e psicologi, supportando studenti e famiglie nella sfera scolastica, fono-articolatoria ed evolutiva.',
    gmapsUrl: 'https://www.google.com/maps/search/?api=1&query=Via+Rossa+Guido+8+60131+Ancona+AN',
    mapEmbedUrl: 'https://maps.google.com/maps?q=Via+Rossa+Guido+8+60131+Ancona+AN&t=&z=15&ie=UTF8&iwloc=&output=embed',
  },
  {
    city: 'Jesi',
    facility: 'e-Movere, Centro Pedagogico Ludico Formativo',
    address: 'Viale Gallodoro, 70/a, 60035 Jesi AN',
    role: 'Logopedista Clinica Referente',
    focus: 'Età Evolutiva, Linguaggio & Rieducazione Miofunzionale',
    desc: 'Presa in carico personalizzata per bambini e ragazzi con disturbi di linguaggio, squilibri miofunzionali e balbuzie, valorizzando anche le precedenti esperienze con Logopedia for Heart e Centro Contatto.',
    gmapsUrl: 'https://www.google.com/maps/search/?api=1&query=Viale+Gallodoro+70a+60035+Jesi+AN',
    mapEmbedUrl: 'https://maps.google.com/maps?q=Viale+Gallodoro+70a+60035+Jesi+AN&t=&z=15&ie=UTF8&iwloc=&output=embed',
  },
  {
    city: 'Sassoferrato',
    facility: 'Studio a Modo Mio',
    address: 'Via Roma 39, 60041 Sassoferrato (AN)',
    role: 'Logopedista Titolare del Servizio',
    focus: 'Cura del Linguaggio, Voce & Deglutizione nell\'Entroterra',
    desc: 'Presidio riabilitativo essenziale per le comunità dell\'entroterra anconetano, per garantire a famiglie, bambini e adulti cure specialistiche vicine e senza lunghi spostamenti.',
    gmapsUrl: 'https://www.google.com/maps/search/?api=1&query=Via+Roma+39+60041+Sassoferrato+AN',
    mapEmbedUrl: 'https://maps.google.com/maps?q=Via+Roma+39+60041+Sassoferrato+AN&t=&z=15&ie=UTF8&iwloc=&output=embed',
  },
];

const SPECIALIZATIONS: SpecializationArea[] = [
  {
    type: 'activity',
    title: 'Motricità Orofacciale & Terapia Miofunzionale (SMOF)',
    subtitle: 'Specializzazione con Master Universitario (110/110)',
    desc: 'Valutazione e rieducazione delle funzioni orali nel bambino e nell\'adulto: deglutizione atipica/disfunzionale, respirazione orale primaria, difficoltà masticatorie e parafunzioni. Lavoro in costante sinergia con odontoiatri, ortodontisti e ORL per favorire la stabilità dei trattamenti occlusali, con particolare cura verso la riduzione dello stress genitoriale durante l\'iter terapeutico.',
    tags: ['Deglutizione Disfunzionale', 'Respirazione Orale', 'Difficoltà Masticatorie', 'Sinergia Ortodontica', 'Pazienti Adulti'],
  },
  {
    type: 'book',
    title: 'Disordini Fonologici & Metodo ARM (I e II Livello)',
    subtitle: 'Approccio Ritmico Motorio per l\'Apprendimento e il Linguaggio',
    desc: 'Presa in carico specialistica dei disturbi fono-articolatori e dei ritardi di linguaggio attraverso il Metodo ARM (Approccio Ritmico Motorio), l\'approccio sillabico e l\'analisi dei tratti motori verbali. Attraverso il canale ritmico e corporeo, il bambino sperimenta il successo comunicativo senza fatica né frustrazione.',
    tags: ['Metodo ARM', 'Approccio Ritmico Motorio', 'Approccio Sillabico', 'Tratti Motori Verbali', 'Rotacismo & Sibilanti'],
  },
  {
    type: 'heart',
    title: 'Fluenza Verbale: Balbuzie & Cluttering',
    subtitle: 'Intervento integrato sugli aspetti Overt e Covert',
    desc: 'Trattamento della balbuzie infantile e dell\'adulto secondo il modello avanzato della Dott.ssa Maria Silvia Mazzocchi. L\'intervento non si focalizza unicamente sulla superficie del blocco (overt), ma accoglie l\'iceberg emotivo sommerso (covert): l\'ansia da prestazione, il timore del giudizio e l\'evitamento delle parole.',
    tags: ['Balbuzie Infantile', 'Cluttering', 'Componente Emotiva Covert', 'Alleanza Genitoriale'],
  },
  {
    type: 'sparkles',
    title: 'Voce Parlata, Cantata & Protocollo Miovocale',
    subtitle: 'Igiene e riabilitazione pneumo-fono-articolatoria',
    desc: 'Prevenzione e cura delle disfonie organiche e funzionali (noduli, corditi, affaticamento da surmenage vocale) per bambini, adulti e professionisti della voce (insegnanti, formatori, attori) tramite il Protocollo Miovocale, integrando postura, dinamica respiratoria e risonanza.',
    tags: ['Protocollo Miovocale', 'Disfonia Professionale', 'Igiene Vocale', 'Controllo Pneumo-Fonico'],
  },
];

const MILESTONES: Milestone[] = [
  {
    year: 'Febbraio 2024 – Marzo 2025',
    badge: 'Master Universitario I Livello',
    title: 'Motricità Orofacciale: Valutazione e Riabilitazione Logopedica',
    institute: 'Formazione Post-Laurea Specialistica',
    grade: '110 / 110',
    thesis: 'Tesi: "Stress genitoriale nel percorso terapeutico di terapia miofunzionale"',
    desc: 'Studio clinico avanzato sullo squilibrio muscolare orofacciale e ricerca specifica sull\'impatto relazionale della terapia: come coinvolgere attivamente mamma e papà senza sovraccaricarli, trasformando la cura in un\'alleanza serena.',
  },
  {
    year: 'Ottobre 2019 – Novembre 2022',
    badge: 'Laurea delle Professioni Sanitarie',
    title: 'Laurea Triennale in Logopedia',
    institute: 'Università Politecnica delle Marche — Facoltà di Medicina e Chirurgia',
    grade: '110 / 110 e LODE',
    thesis: 'Tesi: "Malocclusioni di II classe: L\'uso della terapia miofunzionale in un paziente adulto e proposta questionario per la QOL (Qualità della Vita)"',
    desc: 'Corso di laurea concluso con la lode accademica. Il lavoro di tesi sperimentale ha collegato la rieducazione miofunzionale dell\'adulto con questionari standardizzati sulla qualità di vita percepita, unendo rigore quantitativo ed empatia clinica.',
  },
  {
    year: 'Maggio 2023 – Settembre 2023',
    badge: 'Esperienza Ospedaliera & Complessa',
    title: 'Logopedista Clinica presso Villa Adria',
    institute: 'Santo Stefano Riabilitazione — Torrette di Ancona',
    desc: 'Attività riabilitativa intensiva in contesto clinico-ospedaliero multidisciplinare a contatto con quadri neuromotori e funzionali complessi, collaborando fianco a fianco con medici fisiatri, foniatri, fisioterapisti e terapisti della neuro e psicomotricità.',
  },
  {
    year: 'Settembre 2014 – Luglio 2019',
    badge: 'Maturità Umanistica',
    title: 'Diploma di Maturità Classica a Indirizzo Scienze Umane',
    institute: 'Liceo Classico "Vittorio Emanuele II" — Jesi (AN)',
    grade: '100 / 100',
    desc: 'Cinque anni dedicati allo studio della psicologia, della pedagogia e dell\'antropologia: la matrice culturale che guida tuttora la mia dedizione all\'ascolto autentico, all\'accoglienza priva di giudizio e alla centralità della persona.',
  },
];

const TRAININGS: TrainingItem[] = [
  {
    title: 'Metodo ARM (Approccio Ritmico Motorio) — 1° e 2° Livello',
    docente: 'Dott. Lorenzo Coccia',
    year: '2026',
    focus: 'Rieducazione e stimolazione articolatoria neuromotoria per DSA e linguaggio',
  },
  {
    title: 'Il disordine fonologico: gli approcci di intervento',
    docente: 'Dott.ssa Caterina Apruzzese',
    year: '2026',
    focus: 'Metodi evidence-based per disturbi di comprensione e produzione fonologica, approccio sillabico, tratti motori verbali, rotacismo e interdentalità',
  },
  {
    title: 'Valutazione e terapia dello squilibrio miofunzionale oro-facciale',
    docente: 'Dott.ssa Claudia Ferreira (Roma)',
    year: '2024',
    focus: 'Visione teorico-pratica avanzata e protocolli applicati',
  },
  {
    title: 'Valutazione e trattamento degli aspetti Covert della Balbuzie',
    docente: 'Dott.ssa Maria Silvia Mazzocchi e Dott.ssa Roberta Perosa',
    focus: 'Presa in carico della sofferenza emotiva e delle strategie di evitamento in età evolutiva e nell\'adulto',
  },
  {
    title: 'Protocollo Miovocale per la voce parlata, cantata e reflusso faringo-laringeo',
    docente: 'Dott.ssa Federica Avolio e Milena D\'Aniello',
    focus: 'Terapia delle disfonie, coordinazione pneumofonica e gestione del reflusso faringo-laringeo',
  },
  {
    title: 'Tratti Motori Orali e Verbali',
    docente: 'Dott.ssa Giulia Tombari',
    focus: 'Ponte tra competenze motorie non verbali e precisione fono-articolatoria',
  },
  {
    title: 'La riabilitazione del bambino ipoacusico & Convegno Smile House',
    docente: 'Dott.ssa Letizia Guerzoni & Ambulatorio Smile House Ancona',
    focus: 'Malformazioni cranio-facciali e presa in carico del deficit uditivo',
  },
  {
    title: 'Approccio sillabico al disordine fonologico & Terapia del Cluttering',
    docente: 'Dott.ssa Lara Abram & Dott.ssa Roberta Perosa',
    focus: 'Pianificazione fonotattica sillabica e controllo del ritmo verbale',
  },
];

const VALUES = [
  {
    type: 'heart',
    title: 'Empatia & De-colpevolizzazione Familiare',
    text: 'Nessun percorso terapeutico ha successo se i genitori si sentono sotto esame. La mia ricerca universitaria sullo stress genitoriale mi ricorda ogni giorno di accogliere la famiglia come primo alleato, offrendo ascolto, rassicurazione e strategie concrete da vivere con serenità a casa.',
  },
  {
    type: 'science',
    title: 'Rigore Scientifico & Pratica Basata sulle Prove (EBP)',
    text: 'Dalla lode accademica al Master universitario, continuo a formarmi con i maggiori esperti nazionali. Ogni diagnosi e ogni esercizio rispondono ai protocolli scientifici più aggiornati della letteratura internazionale.',
  },
  {
    type: 'users',
    title: 'Lavoro di Rete Multidisciplinare',
    text: 'Il benessere del bambino e dell\'adulto si costruisce insieme. Collaboro costantemente con insegnanti, pediatri di libera scelta, neuropsichiatri infantili, ortodontisti e psicologi per garantire un\'evoluzione solida e condivisa.',
  },
];

export function AboutPage() {
  return (
    <div className="about-page">
      <PageHero
        title="La Mia Storia Professionale: Chi sono e Come lavoro"
        subtitle="Dalla formazione universitaria con Lode al Master in motricità oro-facciale: il mio percorso di studi e l'aggiornamento continuo per accompagnare bambini, famiglie e adulti."
      />

      {/* ============================================ */}
      {/* 1. BIOGRAFIA DISCORSIVA PERSONALE            */}
      {/* ============================================ */}
      <FadeUp as="section" className="bio-section">
        <div className="bio-image-col">
          <div className="bio-frame">
            <img
              src="/assets/images/EleLogopedista.jpg"
              alt="Dott.ssa Eleonora Mariotti Logopedista"
              className="profile-img"
            />
            <div className="bio-quote-overlay">
              <Heart size={18} className="quote-icon" />
              <span>La cura comincia sempre dall'ascolto autentico della persona.</span>
            </div>
          </div>

          {/* Azione Download CV */}
          <div className="cv-download-box">
            <a
              href="/assets/cv-eleonora-mariotti.pdf"
              target="_blank"
              rel="noopener"
              className="download-cv-btn"
              title="Scarica il Curriculum Vitae in formato europeo (PDF)"
            >
              <Download size={17} />
              <span>Scarica il Curriculum Vitae (PDF)</span>
            </a>
          </div>
        </div>

        <div className="bio-text-col reading-prose">
          <h2>Oltre la tecnica: il valore dell'espressione autentica</h2>

          <p>
            Mi chiamo <strong>Eleonora Mariotti</strong> e sono una logopedista che svolge la sua attività nella provincia di Ancona, a <strong>Sassoferrato</strong>, <strong>Ancona</strong> e <strong>Jesi</strong>.
          </p>

          <p>
            La mia passione per la comunicazione e la relazione affonda le radici negli anni del <em>Liceo Classico a indirizzo Scienze Umane "Vittorio Emanuele II"</em> di Jesi, dove ho conseguito il diploma con il massimo dei voti (<strong>100/100</strong>). Una base formativa che ha alimentato la mia passione per l'ascolto e che oggi guida ogni mio intervento clinico.
          </p>

          <p>
            Ho proseguito la mia formazione presso la Facoltà di Medicina e Chirurgia dell'<strong>Università Politecnica delle Marche</strong>, conseguendo nel 2022 la <em>Laurea Triennale delle Professioni Sanitarie in Logopedia</em> con la votazione di <strong>110/110 e LODE</strong>.
          </p>

          <p>
            Spinta dal desiderio di un'alta specializzazione, nel 2025 ho conseguito il <strong>Master Universitario di I Livello in Motricità Oro Facciale: Valutazione e riabilitazione logopedica</strong>, con la votazione di <strong>110/110</strong>.
          </p>

          <p>
            Per offrire alle famiglie un supporto sempre aggiornato, efficace e rispondente ai bisogni di ciascuno, amplio costantemente le mie competenze attraverso percorsi formativi specifici. Tra i vari corsi svolti, ho approfondito la valutazione e il trattamento della balbuzie e ho completato il I e II livello del <strong>Metodo ARM (Approccio Ritmico Motorio)</strong>, uno strumento mirato per l'intervento sui Disturbi Specifici dell'Apprendimento (DSA).
          </p>

          <p>
            La mia attività clinica si rivolge prevalentemente all'<strong>età evolutiva</strong>. Mi occupo di consulenze, valutazioni e riabilitazione del linguaggio, potenziamento degli apprendimenti scolastici e rieducazione delle funzioni orali.
          </p>

          <p>
            Contestualmente, la formazione specialistica in ambito miofunzionale mi permette di estendere la presa in carico anche agli <strong>adulti</strong>, offrendo percorsi mirati per la prevenzione, la valutazione e la riabilitazione delle disfunzioni del distretto oro-bucco-facciale (come deglutizione disfunzionale, respirazione orale e difficoltà masticatorie).
          </p>

          <p>
            Oltre all'attività in studio, ho avuto modo di prendere parte a progetti di screening nelle scuole e organizzo incontri informativi e di sensibilizzazione rivolti alle famiglie e laboratori di potenziamento dei prerequisiti scolastici dedicati ai bambini della scuola dell'infanzia e primaria.
          </p>

          <div className="signature-box">
            <span className="signature-name">Dott.ssa Eleonora Mariotti</span>
            <span className="signature-title">Logopedista • Iscritta all'Albo TSRM-PSTRP della Provincia di Ancona</span>
          </div>
        </div>
      </FadeUp>

      {/* ============================================ */}
      {/* 2. MANIFESTO CLINICO (CITAZIONE AUTENTICA)   */}
      {/* ============================================ */}
      <FadeUp as="section" className="manifesto-section">
        <div className="manifesto-card card">
          <div className="manifesto-icon">
            <Quote size={34} />
          </div>
          <blockquote className="manifesto-text">
            « {MANIFESTO_QUOTE.text} »
          </blockquote>
          <div className="manifesto-author">
            <strong>{MANIFESTO_QUOTE.author}</strong>
            <span>{MANIFESTO_QUOTE.role}</span>
          </div>
        </div>
      </FadeUp>

      {/* ============================================ */}
      {/* 3. AMBITI DI ALTA SPECIALIZZAZIONE CLINICA    */}
      {/* ============================================ */}
      <FadeUp as="section" className="specializations-section editorial-section">
        <div className="section-intro">
          <h2>Ambiti di Approfondimento &amp; Metodologia Clinica</h2>
          <p className="section-intro-sub">
            Dall'età evolutiva all'età adulta: interventi specialistici basati sulle evidenze per il distretto fono-articolatorio, miofunzionale e cognitivo.
          </p>
        </div>

        <div className="specializations-grid">
          {SPECIALIZATIONS.map((spec) => (
            <FadeUp as="article" key={spec.title} className="spec-card card">
              <div className="spec-header">
                <div className="spec-icon-box">
                  {spec.type === 'activity' && <Activity size={26} />}
                  {spec.type === 'book' && <BookOpen size={26} />}
                  {spec.type === 'heart' && <Heart size={26} />}
                  {spec.type === 'sparkles' && <Sparkles size={26} />}
                </div>
                <div className="spec-titles">
                  <h3>{spec.title}</h3>
                  <span className="spec-subtitle">{spec.subtitle}</span>
                </div>
              </div>

              <p className="spec-desc">{spec.desc}</p>

              <div className="spec-tags">
                {spec.tags.map((tag) => (
                  <span key={tag} className="tag-chip">
                    <CheckCircle2 size={13} />
                    {tag}
                  </span>
                ))}
              </div>
            </FadeUp>
          ))}
        </div>
      </FadeUp>

      {/* ============================================ */}
      {/* 4. I TRE PILASTRI VALORIALI                   */}
      {/* ============================================ */}
      <FadeUp as="section" className="values-section editorial-section">
        <div className="section-intro">
          <h2>I Tre Pilastri del Mio Operato Clinico</h2>
          <p className="section-intro-sub">Cosa guida ogni mia singola seduta, dalla prima valutazione alla conclusione del percorso.</p>
        </div>

        <div className="values-grid">
          {VALUES.map((val) => (
            <FadeUp key={val.title} className="value-card card">
              <div className="value-icon-circle">
                {val.type === 'heart' && <Heart size={26} />}
                {val.type === 'science' && <ShieldCheck size={26} />}
                {val.type === 'users' && <Users size={26} />}
              </div>
              <h3>{val.title}</h3>
              <p>{val.text}</p>
            </FadeUp>
          ))}
        </div>
      </FadeUp>

      {/* ============================================ */}
      {/* 7. FORMAZIONE ACCADEMICA & CONTINUA (ECM)     */}
      {/* ============================================ */}
      <FadeUp as="section" className="education-section editorial-section">
        <div className="section-intro">
          <h2>Formazione Accademica &amp; Ricerca Clinica</h2>
          <p className="section-intro-sub">Il percorso di studio certificato che garantisce il rigore scientifico di ogni intervento.</p>
        </div>

        <div className="timeline-container">
          <div className="timeline">
            {MILESTONES.map((item) => (
              <FadeUp key={item.title} className="timeline-item">
                <div className="timeline-marker">
                  <GraduationCap size={18} />
                </div>
                <div className="timeline-content card">
                  <div className="timeline-top">
                    <span className="timeline-year">{item.year}</span>
                    <span className="badge-type">{item.badge}</span>
                  </div>

                  <h3>{item.title}</h3>
                  <span className="timeline-institute">{item.institute}</span>

                  {item.grade && (
                    <div className="grade-highlight">
                      <Award size={16} />
                      <span>Votazione Conseguita: <strong>{item.grade}</strong></span>
                    </div>
                  )}

                  {item.thesis && (
                    <div className="thesis-box">
                      <span className="thesis-label">Progetto di Ricerca &amp; Tesi</span>
                      <p className="thesis-text">{item.thesis}</p>
                    </div>
                  )}

                  <p className="timeline-desc">{item.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>

        {/* Corsi Specialistici & Convegni ECM */}
        <FadeUp className="trainings-wrap">
          <div className="trainings-header">
            <h3>Alta Formazione Specialistica Continua (ECM)</h3>
            <p>Seminari intensivi, protocolli clinici e aggiornamento metodologico costante con i massimi docenti ed esperti del settore:</p>
          </div>

          <div className="trainings-grid">
            {TRAININGS.map((t) => (
              <div key={t.title} className="training-card card">
                <div className="training-icon">
                  <CheckCircle2 size={18} />
                </div>
                <div className="training-info">
                  <h4>{t.title}</h4>
                  <span className="training-docente">Docente / Ente: {t.docente}</span>
                  <p className="training-focus">{t.focus}</p>
                </div>
              </div>
            ))}
          </div>
        </FadeUp>
      </FadeUp>

      {/* ============================================ */}
      {/* 6. LE TRE SEDI SUL TERRITORIO (DOPO I CORSI)  */}
      {/* ============================================ */}
      <FadeUp as="section" className="territory-section editorial-section">
        <div className="section-intro">
          <h2>Le Mie Sedi sul Territorio</h2>
          <p className="section-intro-sub">
            Credo fermamente in una sanità di prossimità: per questo ho scelto di accogliere pazienti e famiglie in tre centri specialistici complementari sul territorio anconetano.
          </p>
        </div>

        <div className="territory-grid">
          {LOCATIONS.map((loc) => (
            <FadeUp as="article" key={loc.city} className="territory-card card">
              <div className="card-top">
                <div className="city-badge">
                  <MapPin size={16} />
                  <span>{loc.city}</span>
                </div>
                <span className="role-badge">{loc.role}</span>
              </div>
              <h3>{loc.facility}</h3>
              <span className="facility-address">{loc.address}</span>
              <h4 className="focus-title">{loc.focus}</h4>
              <p>{loc.desc}</p>

              {/* Mappa Google Embed Interattiva */}
              <div className="territory-map-container">
                <iframe
                  title={`Mappa Google - ${loc.city} - ${loc.facility}`}
                  src={loc.mapEmbedUrl}
                  className="territory-map-iframe"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Pulsante Diretto Google Maps */}
              <div className="territory-card-footer">
                <a
                  href={loc.gmapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="directions-btn"
                  title={`Apri ${loc.facility} su Google Maps`}
                >
                  <Navigation size={15} />
                  <span>Apri su Google Maps</span>
                  <ExternalLink size={13} className="ext-icon" />
                </a>
              </div>
            </FadeUp>
          ))}
        </div>
      </FadeUp>

      {/* ============================================ */}
      {/* 7. CTA FINALE RASSICURANTE                    */}
      {/* ============================================ */}
      <FadeUp as="section" className="about-cta-section">
        <div className="about-cta-card card">
          <h2>Iniziamo un Percorso Sereno Insieme</h2>
          <p>
            Se noti una difficoltà nel linguaggio, nella deglutizione, nella voce o negli apprendimenti scolastici, o se desideri un parere professionale per te o per tuo figlio, contattami con serenità. Saremo felici di valutare insieme la situazione.
          </p>
          <div className="about-cta-actions">
            <MatButton variant="raised" to="/contatti" className="about-btn-cta">
              <CalendarCheck size={18} />
              <span>Contattami o Prenota una Valutazione</span>
            </MatButton>
            <a
              href="/assets/cv-eleonora-mariotti.pdf"
              target="_blank"
              rel="noopener"
              className="about-btn-ghost"
            >
              <FileText size={18} />
              <span>Visualizza CV Ufficiale (PDF)</span>
            </a>
          </div>
        </div>
      </FadeUp>
    </div>
  );
}
