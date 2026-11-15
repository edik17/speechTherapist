import React from 'react';
import {
  Heart,
  CalendarCheck,
  MapPin,
  Activity,
  BookOpen,
  CheckCircle2,
  Sparkles,
  Download,
  FileText,
  Quote,
} from 'lucide-react';
import { PageHero } from '../../shared/components/PageHero';
import { TrainingShowcase, TrainingCourseItem } from '../../shared/components/TrainingShowcase';
import { FadeUp } from '../../shared/directives/FadeUp';
import { MatButton } from '../../shared/ui/MatButton';
import './AboutPage.scss';

export interface SpecializationArea {
  type: 'activity' | 'book' | 'heart' | 'sparkles';
  title: string;
  subtitle: string;
  desc: string;
  tags: string[];
}

const MANIFESTO_QUOTE =
  'Ogni percorso parte da una valutazione attenta e personalizzata. Il mio obiettivo non è semplicemente intervenire sulla difficoltà, ma valorizzare le potenzialità di ogni individuo, in un clima di fiducia e collaborazione.';

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

const TRAININGS: TrainingCourseItem[] = [
  {
    id: 'arm-clinica',
    title: 'ARM CLINICA — 1° e 2° Livello (Approccio Ritmico Motorio)',
    docente: 'Dott. Lorenzo Coccia',
    date: 'Marzo – Aprile 2026',
    group: 'ecm',
    category: 'fonologia',
    categoryLabel: 'Fonologia & Metodo ARM',
    focus: 'Rieducazione e stimolazione articolatoria neuromotoria per disturbi del linguaggio e DSA.',
  },
  {
    id: 'disordine-fonologico',
    title: 'Il disordine fonologico: gli approcci di intervento',
    docente: 'Dott.ssa Caterina Apruzzese',
    date: '10–11 Gennaio 2026',
    group: 'ecm',
    category: 'fonologia',
    categoryLabel: 'Fonologia & Metodo ARM',
    focus: 'Protocolli evidence-based per la valutazione e il trattamento dei disturbi fonologici in età evolutiva.',
  },
  {
    id: 'squilibrio-miofunzionale',
    title: 'La valutazione e la terapia dello squilibrio miofunzionale oro-facciale: una visione teorico-pratica',
    docente: 'Dott.ssa Claudia Ferreira (Roma)',
    date: '7–8 Settembre 2024',
    group: 'ecm',
    category: 'miofunzionale',
    categoryLabel: 'Motricità Orofacciale',
    focus: 'Valutazione avanzata e rieducazione miofunzionale applicata a deglutizione disfunzionale e funzioni orali.',
  },
  {
    id: 'bambino-ipoacusico',
    title: 'Corso Webinar: La riabilitazione del bambino ipoacusico',
    docente: 'Dott.ssa Letizia Guerzoni',
    date: '4–5 Febbraio 2023',
    group: 'ecm',
    category: 'voce-evolutiva',
    categoryLabel: 'Voce & Età Evolutiva',
    focus: 'Percorsi logopedici per lo sviluppo percettivo-uditivo e comunicativo-linguistico nel deficit uditivo infantile.',
  },
  {
    id: 'smile-house',
    title: 'Convegno Ambulatorio Smile House sulle malformazioni cranio-facciali',
    docente: 'Ambulatorio Smile House Ancona (AN)',
    date: '4 Novembre 2022',
    group: 'ecm',
    category: 'miofunzionale',
    categoryLabel: 'Motricità Orofacciale',
    focus: 'Presa in carico multidisciplinare logopedica, chirurgica e ortodontica delle malformazioni cranio-facciali.',
  },
  {
    id: 'autismo-oggi',
    title: 'Convegno Autismo Oggi: la presa in carico dei disturbi autistici dalla diagnosi precoce all\'età adulta',
    docente: 'Convegno Specialistico',
    date: '27–28 Maggio 2022',
    group: 'ecm',
    category: 'voce-evolutiva',
    categoryLabel: 'Voce & Età Evolutiva',
    focus: 'Strategie comunicative e relazionali lungo tutto l\'arco di vita per i disturbi dello spettro autistico.',
  },
  {
    id: 'tratti-motori',
    title: 'Tratti motori Orali e Verbali, un ponte tra competenze non verbali e aspetti fono-articolatori',
    docente: 'Dott.ssa Giulia Tombari',
    date: '7, 14, 17 Settembre 2021',
    group: 'ecm',
    category: 'fonologia',
    categoryLabel: 'Fonologia & Metodo ARM',
    focus: 'Integrazione delle abilità motorie orali e verbali per l\'impostazione e l\'automatizzazione articolatoria.',
  },
  {
    id: 'approccio-sillabico',
    title: 'Quando qualquadra non cosa: approccio sillabico al disordine fonologico',
    docente: 'Dott.ssa Lara Abram',
    group: 'specialist',
    category: 'fonologia',
    categoryLabel: 'Fonologia & Metodo ARM',
    focus: 'Pianificazione fonotattica a partire dalla struttura sillabica per favorire una generalizzazione rapida dei suoni.',
  },
  {
    id: 'balbuzie-valutazione',
    title: 'Valutazione degli aspetti sintomatologici della balbuzie',
    docente: 'Dott.ssa Maria Silvia Mazzocchi',
    group: 'specialist',
    category: 'fluenza',
    categoryLabel: 'Balbuzie & Fluenza',
    focus: 'Inquadramento clinico delle disfluenze manifeste, frequenze e profili di fluenza verbale.',
  },
  {
    id: 'balbuzie-covert',
    title: 'Trattamento degli aspetti sintomatologici e degli aspetti Covert della balbuzie — età evolutiva',
    docente: 'Dott.ssa Maria Silvia Mazzocchi',
    group: 'specialist',
    category: 'fluenza',
    categoryLabel: 'Balbuzie & Fluenza',
    focus: 'Intervento integrato su blocchi verbali, vissuti emotivi sommersi, evitamenti e alleanza con la famiglia.',
  },
  {
    id: 'terapia-cluttering',
    title: 'Terapia del Cluttering',
    docente: 'Dott.ssa Roberta Perosa',
    group: 'specialist',
    category: 'fluenza',
    categoryLabel: 'Balbuzie & Fluenza',
    focus: 'Regolazione della velocità d\'eloquio, chiarezza articolatoria e monitoraggio comunicativo nel cluttering.',
  },
  {
    id: 'sibilanti',
    title: 'Interdentalizzazione e lateralizzazione dei fonemi sibilanti',
    docente: 'Dott.ssa Chiara Castellani',
    group: 'specialist',
    category: 'fonologia',
    categoryLabel: 'Fonologia & Metodo ARM',
    focus: 'Correzione mirata delle distorsioni dei fonemi /s/ e /z/ in sinergia tra impostazione articolatoria e postura linguale.',
  },
  {
    id: 'rotacismo',
    title: 'Rotacismo',
    docente: 'Dott.ssa Chiara Castellani',
    group: 'specialist',
    category: 'fonologia',
    categoryLabel: 'Fonologia & Metodo ARM',
    focus: 'Tecniche specifiche di facilitazione vibratoria, impostazione e consolidamento del fonema /r/.',
  },
  {
    id: 'protocollo-miovocale',
    title: 'Protocollo Miovocale',
    docente: 'Dott.ssa Federica Avolio e Dott.ssa Milena D\'Aniello',
    group: 'specialist',
    category: 'voce-evolutiva',
    categoryLabel: 'Voce & Età Evolutiva',
    focus: 'Rieducazione miofunzionale applicata alla voce parlata, cantata e alla gestione del reflusso faringo-laringeo.',
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
              src="/assets/images/ImmagineEle.jpeg"
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
            « {MANIFESTO_QUOTE} »
          </blockquote>
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
      {/* 4. CORSI DI FORMAZIONE, SEMINARI & ECM       */}
      {/* ============================================ */}
      <FadeUp as="div">
        <TrainingShowcase courses={TRAININGS} cvUrl="/assets/cv-eleonora-mariotti.pdf" />
      </FadeUp>

      {/* ============================================ */}
      {/* 6. CTA FINALE RASSICURANTE                    */}
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
            <MatButton variant="stroked" to="/sedi" className="about-btn-ghost">
              <MapPin size={18} />
              <span>Visualizza le Sedi sul Territorio</span>
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
