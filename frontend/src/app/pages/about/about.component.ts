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
  LucideSparkles
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
    LucideSparkles
  ],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  // Sedi cliniche attive sul territorio marchigiano
  locations: ClinicalLocation[] = [
    {
      city: 'Ancona',
      facility: 'Centro Multispecialistico "DSA e non SOLO"',
      role: 'Logopedista in Equipe Multidisciplinare',
      focus: 'Apprendimento (DSA), Linguaggio & Fonologia',
      desc: 'Valutazione e potenziamento clinico integrato a stretto contatto con neuropsichiatri infantili e psicologi, supportando studenti e famiglie nella sfera scolastica ed evolutiva.'
    },
    {
      city: 'Jesi',
      facility: 'Cooperativa Sociale E-movere',
      role: 'Logopedista Clinica Referente',
      focus: 'Età Evolutiva, Linguaggio & Motricità Orofacciale',
      desc: 'Presa in carico personalizzata per bambini e ragazzi con disturbi di linguaggio, squilibri miofunzionali e balbuzie, valorizzando anche le precedenti esperienze con Logopedia for Heart e Centro Contatto.'
    },
    {
      city: 'Sassoferrato',
      facility: 'Studio Polifunzionale "A modo mio"',
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
      subtitle: 'Master Universitario di I Livello con Votazione 110/110',
      desc: 'Rieducazione delle disfunzioni muscolari orofacciali: deglutizione atipica, respirazione orale primaria, incompetenza labiale e vizi di postura linguale. Lavoro in costante sinergia con odontoiatri e ortodontisti per favorire il successo delle terapie occlusali e prevenire recidive, con una cura meticolosa verso il vissuto emotivo e lo stress della famiglia.',
      tags: ['Deglutizione Atipica', 'Respirazione Orale', 'Malocclusioni', 'Sinergia Ortodontica']
    },
    {
      type: 'book',
      title: 'Disordini Fonologici & Metodica ARM Clinica',
      subtitle: 'Formazione specialistica avanzata (1° e 2° Livello)',
      desc: 'Trattamento dei disturbi del linguaggio e delle difficoltà articolatorie attraverso l\'approccio sillabico, la metodica ARM Clinica e l\'analisi dei tratti motori orali e verbali. Il bambino è guidato con strumenti giocosi e motivanti a superare le difficoltà fonotattiche senza ansia da prestazione.',
      tags: ['ARM Clinica', 'Approccio Sillabico', 'Tratti Motori Verbali', 'Rotacismo & Sibilanti']
    },
    {
      type: 'heart',
      title: 'Fluenza Verbale: Balbuzie & Cluttering',
      subtitle: 'Intervento integrato sugli aspetti Overt e Covert',
      desc: 'Un percorso fondato sugli insegnamenti specialistici della Dott.ssa Maria Silvia Mazzocchi per l\'età evolutiva. Non ci si limita alle manifestazioni manifeste (blocchi, ripetizioni), ma si accoglie l\'iceberg emotivo: l\'ansia anticipatoria, la paura del giudizio e l\'evitamento, ristabilendo la libertà e la gioia di comunicare.',
      tags: ['Balbuzie Infantile', 'Cluttering', 'Componente Emotiva Covert', 'Supporto alla Famiglia']
    },
    {
      type: 'sparkles',
      title: 'Voce Parlata, Cantata & Protocollo Miovocale',
      subtitle: 'Igiene e riabilitazione pneumo-fono-articolatoria',
      desc: 'Prevenzione e cura delle disfonie organiche e funzionali (noduli, polipi, affaticamento da surmenage) per adulti, professionisti della voce (insegnanti, formatori) e bambini, integrando respirazione costodiaframmatica, risonanza e coordinazione muscolare.',
      tags: ['Protocollo Miovocale', 'Disfonia Professionale', 'Igiene Vocale', 'Controllo Pneumo-Fonico']
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
      title: 'ARM CLINICA (1° e 2° Livello)',
      docente: 'Dott. Lorenzo Coccia',
      year: '2026',
      focus: 'Rieducazione e stimolazione articolatoria neuromotoria'
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
      focus: 'Presa in carico della sofferenza emotiva e delle strategie di evitamento'
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
