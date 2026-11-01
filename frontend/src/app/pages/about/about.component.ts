import { Component } from '@angular/core';
import { PageHeroComponent } from '../../shared/components/page-hero/page-hero.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { FadeUpDirective } from '../../shared/directives/fade-up.directive';
import { 
  LucideHeart, 
  LucideShieldCheck, 
  LucideUsers, 
  LucideGraduationCap, 
  LucideCalendarCheck,
  LucideAward,
  LucideMapPin,
  LucideActivity,
  LucideBookOpen,
  LucideCheckCircle2,
  LucideSparkles,
  LucideDownload,
  LucideFileText,
  LucideSchool,
  LucideQuote
} from '@lucide/angular';

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
}

export interface SpecializationArea {
  type: 'activity' | 'book' | 'heart' | 'sparkles';
  title: string;
  subtitle: string;
  desc: string;
  tags: string[];
}

export interface SchoolProject {
  title: string;
  subtitle: string;
  desc: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    PageHeroComponent,
    MatButtonModule,
    RouterLink,
    FadeUpDirective,
    LucideHeart,
    LucideShieldCheck,
    LucideUsers,
    LucideGraduationCap,
    LucideCalendarCheck,
    LucideAward,
    LucideMapPin,
    LucideActivity,
    LucideBookOpen,
    LucideCheckCircle2,
    LucideSparkles,
    LucideDownload,
    LucideFileText,
    LucideSchool,
    LucideQuote
  ],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  // Citazione manifesto ufficiale di Eleonora
  manifestoQuote = {
    text: 'Ogni percorso inizia con una valutazione personalizzata. Il mio interesse non è solo "risolvere" un disturbo, ma valorizzare le potenzialità di ogni individuo, creando un clima di fiducia e collaborazione con la famiglia e la scuola.',
    author: 'Dott.ssa Eleonora Mariotti',
    role: 'Logopedista — Master in Motricità Orofacciale'
  };

  // Sedi cliniche attive sul territorio marchigiano
  locations: ClinicalLocation[] = [
    {
      city: 'Ancona',
      facility: 'Centro multispecialistico DSA E NON SOLO',
      address: 'Via Rossa Guido, 8, 60131 Ancona AN',
      role: 'Logopedista in Equipe Multidisciplinare',
      focus: 'Apprendimento (DSA), Linguaggio & Motricità Orofacciale',
      desc: 'Valutazione e potenziamento clinico integrato a stretto contatto con neuropsichiatri infantili e psicologi, supportando studenti e famiglie nella sfera scolastica, fono-articolatoria ed evolutiva.'
    },
    {
      city: 'Jesi',
      facility: 'e-Movere, Centro Pedagogico Ludico Formativo',
      address: 'Viale Gallodoro, 70/a, 60035 Jesi AN',
      role: 'Logopedista Clinica Referente',
      focus: 'Età Evolutiva, Linguaggio & Rieducazione Miofunzionale',
      desc: 'Presa in carico personalizzata per bambini e ragazzi con disturbi di linguaggio, squilibri miofunzionali e balbuzie, valorizzando anche le precedenti esperienze con Logopedia for Heart e Centro Contatto.'
    },
    {
      city: 'Sassoferrato',
      facility: 'Studio a Modo Mio',
      address: 'Via Roma 39, 60041 Sassoferrato (AN)',
      role: 'Logopedista Titolare del Servizio',
      focus: 'Cura del Linguaggio, Voce & Deglutizione nell\'Entroterra',
      desc: 'Presidio riabilitativo essenziale per le comunità dell\'entroterra anconetano, per garantire a famiglie, bambini e adulti cure specialistiche vicine e senza lunghi spostamenti.'
    }
  ];

  // Aree di specializzazione clinica discorsive
  specializations: SpecializationArea[] = [
    {
      type: 'activity',
      title: 'Motricità Orofacciale & Terapia Miofunzionale (SMOF)',
      subtitle: 'Specializzazione con Master Universitario (110/110)',
      desc: 'Valutazione e rieducazione delle funzioni orali nel bambino e nell\'adulto: deglutizione atipica/disfunzionale, respirazione orale primaria, difficoltà masticatorie e parafunzioni. Lavoro in costante sinergia con odontoiatri, ortodontisti e ORL per favorire la stabilità dei trattamenti occlusali, con particolare cura verso la riduzione dello stress genitoriale durante l\'iter terapeutico.',
      tags: ['Deglutizione Disfunzionale', 'Respirazione Orale', 'Difficoltà Masticatorie', 'Sinergia Ortodontica', 'Pazienti Adulti']
    },
    {
      type: 'book',
      title: 'Disordini Fonologici & Metodo ARM (I e II Livello)',
      subtitle: 'Approccio Ritmico Motorio per l\'Apprendimento e il Linguaggio',
      desc: 'Presa in carico specialistica dei disturbi fono-articolatori e dei ritardi di linguaggio attraverso il Metodo ARM (Approccio Ritmico Motorio), l\'approccio sillabico e l\'analisi dei tratti motori verbali. Attraverso il canale ritmico e corporeo, il bambino sperimenta il successo comunicativo senza fatica né frustrazione.',
      tags: ['Metodo ARM', 'Approccio Ritmico Motorio', 'Approccio Sillabico', 'Tratti Motori Verbali', 'Rotacismo & Sibilanti']
    },
    {
      type: 'heart',
      title: 'Fluenza Verbale: Balbuzie & Cluttering',
      subtitle: 'Intervento integrato sugli aspetti Overt e Covert',
      desc: 'Trattamento della balbuzie infantile e dell\'adulto secondo il modello avanzato della Dott.ssa Maria Silvia Mazzocchi. L\'intervento non si focalizza unicamente sulla superficie del blocco (overt), ma accoglie l\'iceberg emotivo sommerso (covert): l\'ansia da prestazione, il timore del giudizio e l\'evitamento delle parole.',
      tags: ['Balbuzie Infantile', 'Cluttering', 'Componente Emotiva Covert', 'Alleanza Genitoriale']
    },
    {
      type: 'sparkles',
      title: 'Voce Parlata, Cantata & Protocollo Miovocale',
      subtitle: 'Igiene e riabilitazione pneumo-fono-articolatoria',
      desc: 'Prevenzione e cura delle disfonie organiche e funzionali (noduli, corditi, affaticamento da surmenage vocale) per bambini, adulti e professionisti della voce (insegnanti, formatori, attori) tramite il Protocollo Miovocale, integrando postura, dinamica respiratoria e risonanza.',
      tags: ['Protocollo Miovocale', 'Disfonia Professionale', 'Igiene Vocale', 'Controllo Pneumo-Fonico']
    }
  ];

  // Progetti di prevenzione, screening scolastici e supporto genitoriale
  schoolProjects: SchoolProject[] = [
    {
      title: 'Screening nelle Scuole dell\'Infanzia e Primarie',
      subtitle: 'Identificazione precoce dei fattori di rischio',
      desc: 'Attività di osservazione e screening condotta direttamente negli istituti scolastici per individuare precocemente indicatori di fragilità fonologica, comunicativa e motorio-articolatoria, prevenendo difficoltà più strutturate.'
    },
    {
      title: 'Potenziamento dei Prerequisiti Scolastici',
      subtitle: 'Accompagnare l\'ingresso alla scuola primaria',
      desc: 'Laboratori e percorsi individuali dedicati ai bambini in età prescolare (5-6 anni) per consolidare le competenze metafonologiche, l\'orientamento visuo-spaziale e il ritmo, basi irrinunciabili per l\'apprendimento sereno di lettura e scrittura.'
    },
    {
      title: 'Incontri di Sensibilizzazione per Genitori',
      subtitle: 'Condivisione, ascolto e strategie pratiche a casa',
      desc: 'Momenti formativi e serate a tema per mamme e papà, mirati a chiarire i dubbi più frequenti sulle tappe di sviluppo del linguaggio, sulle abitudini viziate (ciuccio, biberon, respirazione a bocca aperta) e sul come stimolare la parola nella vita quotidiana.'
    }
  ];

  // Tappe della formazione accademica formale
  milestones: Milestone[] = [
    {
      year: 'Febbraio 2024 – Marzo 2025',
      badge: 'Master Universitario I Livello',
      title: 'Motricità Orofacciale: Valutazione e Riabilitazione Logopedica',
      institute: 'Formazione Post-Laurea Specialistica',
      grade: '110 / 110',
      thesis: 'Tesi: "Stress genitoriale nel percorso terapeutico di terapia miofunzionale"',
      desc: 'Studio clinico avanzato sullo squilibrio muscolare orofacciale e ricerca specifica sull\'impatto relazionale della terapia: come coinvolgere attivamente mamma e papà senza sovraccaricarli, trasformando la cura in un\'alleanza serena.'
    },
    {
      year: 'Ottobre 2019 – Novembre 2022',
      badge: 'Laurea delle Professioni Sanitarie',
      title: 'Laurea Triennale in Logopedia',
      institute: 'Università Politecnica delle Marche — Facoltà di Medicina e Chirurgia',
      grade: '110 / 110 e LODE',
      thesis: 'Tesi: "Malocclusioni di II classe: L\'uso della terapia miofunzionale in un paziente adulto e proposta questionario per la QOL (Qualità della Vita)"',
      desc: 'Corso di laurea concluso con la lode accademica. Il lavoro di tesi sperimentale ha collegato la rieducazione miofunzionale dell\'adulto con questionari standardizzati sulla qualità di vita percepita, unendo rigore quantitativo ed empatia clinica.'
    },
    {
      year: 'Maggio 2023 – Settembre 2023',
      badge: 'Esperienza Ospedaliera & Complessa',
      title: 'Logopedista Clinica presso Villa Adria',
      institute: 'Santo Stefano Riabilitazione — Torrette di Ancona',
      desc: 'Attività riabilitativa intensiva in contesto clinico-ospedaliero multidisciplinare a contatto con quadri neuromotori e funzionali complessi, collaborando fianco a fianco con medici fisiatri, foniatri, fisioterapisti e terapisti della neuro e psicomotricità.'
    },
    {
      year: 'Settembre 2014 – Luglio 2019',
      badge: 'Maturità Umanistica',
      title: 'Diploma di Maturità Classica a Indirizzo Scienze Umane',
      institute: 'Liceo Classico "Vittorio Emanuele II" — Jesi (AN)',
      grade: '100 / 100',
      desc: 'Cinque anni dedicati allo studio della psicologia, della pedagogia e dell\'antropologia: la matrice culturale che guida tuttora la mia dedizione all\'ascolto autentico, all\'accoglienza priva di giudizio e alla centralità della persona.'
    }
  ];

  // Corsi specialistici e convegni ECM
  trainings: TrainingItem[] = [
    {
      title: 'Metodo ARM (Approccio Ritmico Motorio) — 1° e 2° Livello',
      docente: 'Dott. Lorenzo Coccia',
      year: '2026',
      focus: 'Rieducazione e stimolazione articolatoria neuromotoria per DSA e linguaggio'
    },
    {
      title: 'Il disordine fonologico: gli approcci di intervento',
      docente: 'Dott.ssa Caterina Apruzzese',
      year: '2026',
      focus: 'Metodi evidence-based per i disturbi di comprensione e produzione fonologica'
    },
    {
      title: 'Valutazione e terapia dello squilibrio miofunzionale oro-facciale',
      docente: 'Dott.ssa Claudia Ferreira (Roma)',
      year: '2024',
      focus: 'Visione teorico-pratica avanzata e protocolli applicati'
    },
    {
      title: 'Valutazione e trattamento degli aspetti Covert della Balbuzie',
      docente: 'Dott.ssa Maria Silvia Mazzocchi',
      focus: 'Presa in carico della sofferenza emotiva e delle strategie di evitamento in età evolutiva'
    },
    {
      title: 'Protocollo Miovocale per la voce parlata e cantata',
      docente: 'Dott.ssa Federica Avolio e Milena D\'Aniello',
      focus: 'Terapia delle disfonie e coordinazione pneumofonica'
    },
    {
      title: 'Tratti Motori Orali e Verbali',
      docente: 'Dott.ssa Giulia Tombari',
      focus: 'Ponte tra competenze motorie non verbali e precisione fono-articolatoria'
    },
    {
      title: 'La riabilitazione del bambino ipoacusico & Convegno Smile House',
      docente: 'Dott.ssa Letizia Guerzoni & Ambulatorio Smile House Ancona',
      focus: 'Malformazioni cranio-facciali e presa in carico del deficit uditivo'
    },
    {
      title: 'Approccio sillabico al disordine fonologico & Terapia del Cluttering',
      docente: 'Dott.ssa Lara Abram & Dott.ssa Roberta Perosa',
      focus: 'Pianificazione fonotattica sillabica e controllo del ritmo verbale'
    }
  ];

  // Valori guida
  values = [
    { 
      type: 'heart',
      title: 'Empatia & De-colpevolizzazione Familiare', 
      text: 'Nessun percorso terapeutico ha successo se i genitori si sentono sotto esame. La mia ricerca universitaria sullo stress genitoriale mi ricorda ogni giorno di accogliere la famiglia come primo alleato, offrendo ascolto, rassicurazione e strategie concrete da vivere con serenità a casa.' 
    },
    { 
      type: 'science',
      title: 'Rigore Scientifico & Pratica Basata sulle Prove (EBP)', 
      text: 'Dalla lode accademica al Master universitario, continuo a formarmi con i maggiori esperti nazionali. Ogni diagnosi e ogni esercizio rispondono ai protocolli scientifici più aggiornati della letteratura internazionale.' 
    },
    { 
      type: 'users',
      title: 'Lavoro di Rete Multidisciplinare', 
      text: 'Il benessere del bambino e dell\'adulto si costruisce insieme. Collaboro costantemente con insegnanti, pediatri di libera scelta, neuropsichiatri infantili, ortodontisti e psicologi per garantire un\'evoluzione solida e condivisa.' 
    }
  ];
}
