import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Article } from '../models/article.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private readonly articles: Article[] = [
    {
      id: '1',
      slug: 'campanelli-allarme-linguaggio-bambini',
      title: 'Campanelli d\'allarme nello sviluppo del linguaggio: quando consultare il logopedista?',
      subtitle: 'Dalla lallazione alle prime frasi: come distinguere le normali variazioni individuali dai segnali che richiedono una valutazione tempestiva.',
      excerpt: 'Capire quando è il momento opportuno per richiedere una consulenza logopedica permette di intervenire precocemente, trasformando le difficoltà in opportunità di crescita serena.',
      category: 'Evidenza Scientifica',
      readTime: '4 min di lettura',
      publishedAt: '18 Ottobre 2026',
      author: 'Dott.ssa Eleonora Mariotti',
      authorRole: 'Logopedista Clinica',
      tags: ['Età Evolutiva', 'Linguaggio', 'Prevenzione', 'Genitori'],
      keyPoints: [
        'A 24 mesi un vocabolario inferiore a 50 parole o l\'assenza di combinazioni di due parole ("mamma acqua") è un indicatore predittivo da monitorare.',
        'La formula del "aspettiamo che tanto poi parlerà" è superata dalla ricerca neuropsicologica: l\'intervento precoce sfrutta la massima neuroplasticità cerebrale.',
        'Una valutazione logopedica non è un\'etichetta: è prima di tutto uno spazio di ascolto e orientamento per la famiglia.',
        'Il gioco condiviso e l\'interazione faccia a faccia restano gli strumenti più potenti di stimolazione linguistica quotidiana.'
      ],
      content: `
        <p>Ogni bambino attraversa tappe evolutive con tempi personali. Tuttavia, la ricerca scientifica e le linee guida cliniche hanno individuato finestre temporali precise entro le quali determinate competenze linguistiche e comunicative dovrebbero emergere spontaneamente.</p>
        
        <h3>Cosa osservare nei primi anni di vita</h3>
        <p>Tra i 12 e i 18 mesi, l'attenzione va posta sulla comunicazione non verbale: l'indicazione con il dito (pointing dichiarativo per condividere l'attenzione), il contatto visivo reciproco e la comprensione di ordini semplici contestualizzati. L'assenza di questi elementi è un segnale di rilievo ancor prima della comparsa delle singole parole.</p>
        
        <p>Attorno ai 24-30 mesi, i bambini definiti in letteratura come "Parlatori Tardivi" (Late Talkers) producono un vocabolario espressivo ridotto (meno di 50 vocaboli) e faticano a combinare parole in frasi telegrafiche. Sebbene una percentuale di essi recuperi spontaneamente, un monitoraggio specialistico consente di discriminare chi beneficerà di un supporto mirato prima dell'ingresso nella scuola dell'infanzia.</p>

        <h3>Il ruolo del consulto tempestivo</h3>
        <p>Rivolgersi a un logopedista non significa medicalizzare la crescita, bensì fornire ai genitori strumenti pratici per arricchire l'ambiente comunicativo domestico. Il supporto precoce riduce la frustrazione del bambino nell'esprimere desideri ed emozioni, prevenendo ricadute su piano relazionale e sui futuri apprendimenti scolastici.</p>
      `
    },
    {
      id: '2',
      slug: 'deglutizione-atipica-e-ortodonzia-sinergia',
      title: 'Deglutizione atipica e ortodonzia: una sinergia fondamentale per la salute della bocca',
      subtitle: 'Come la postura della lingua e gli squilibri muscolari orofacciali condizionano la stabilità del trattamento ortodontico e la respirazione.',
      excerpt: 'La deglutizione disfunzionale e la postura linguale scorretta possono compromettere i risultati dell\'apparecchio ortodontico. Scopri perché la terapia miofunzionale fa la differenza.',
      category: 'Evidenza Scientifica',
      readTime: '5 min di lettura',
      publishedAt: '04 Ottobre 2026',
      author: 'Dott.ssa Eleonora Mariotti',
      authorRole: 'Logopedista Clinica',
      tags: ['Terapia Miofunzionale', 'Deglutizione', 'Ortodonzia', 'Respirazione'],
      keyPoints: [
        'Deglutiamo in media circa 1.500-2.000 volte al giorno: una spinta linguale scorretta esercita forze continue sui denti capaci di spostarli.',
        'La terapia miofunzionale rieduca la postura a riposo della lingua contro lo spot palatino e il sigillo labiale.',
        'Respirazione orale e deglutizione atipica sono spesso strettamente collegate, influenzando la postura cervicale e la qualità del sonno.',
        'La collaborazione precoce tra dentista/ortodontista e logopedista garantisce la stabilità a lungo termine del sorriso.'
      ],
      content: `
        <p>Spesso si pensa al logopedista unicamente in relazione alla parola e alla pronuncia dei suoni. In realtà, una branca clinica centrale è la Terapia Miofunzionale (TMF), volta a correggere gli squilibri della muscolatura orofacciale e le disfunzioni deglutitorie.</p>

        <h3>Cos'è la deglutizione atipica o disfunzionale?</h3>
        <p>Nel neonato, la deglutizione prevede che la lingua si interponga tra le gengive per favorire la suzione. Con l'eruzione dei denti e lo svezzamento, la deglutizione matura: la punta della lingua deve appoggiarsi sulla papilla retroincisiva (lo "spot"), mentre il dorso spinge il bolo verso il faringe senza alcuna contrazione visibile delle labbra o del mento.</p>

        <p>Quando questo passaggio non avviene, la lingua continua a spingere in avanti o lateralmente contro le arcate dentarie. Tale pressione ripetuta migliaia di volte al giorno contrasta l'azione degli archi ortodontici o provoca recidive al termine del trattamento.</p>

        <h3>Il percorso logopedico in sinergia</h3>
        <p>Attraverso esercizi mirati, consapevoli e progressivi, il paziente (bambino, adolescente o adulto) apprende la corretta fisiologia linguale, la respirazione nasale diaframmatica e la chiusura ermetica delle labbra, consolidando abitudini funzionali che proteggono dentatura e benessere generale.</p>
      `
    },
    {
      id: '3',
      slug: 'ascolto-emotivo-nel-percorso-logopedico',
      title: 'Oltre l\'esercizio riabilitativo: il valore dell\'ascolto e dell\'empatia in logopedia',
      subtitle: 'La voce e la parola sono l\'espressione più intima dell\'identità. Perché la relazione di fiducia è il primo vero strumento terapeutico.',
      excerpt: 'Non si riabilita solo un disturbo, si accoglie una persona con la sua storia. Riflessioni cliniche sul valore del legame terapeutico e del rispetto dei tempi individuali.',
      category: 'Riflessioni',
      readTime: '3 min di lettura',
      publishedAt: '22 Settembre 2026',
      author: 'Dott.ssa Eleonora Mariotti',
      authorRole: 'Logopedista Clinica',
      tags: ['Relazione Terapeutica', 'Empatia', 'Benessere Emotivo', 'Clinica'],
      keyPoints: [
        'Le difficoltà comunicative toccano il nucleo della sicurezza personale e dell\'autostima, sia nel bambino che nell\'adulto.',
        'La stanza di terapia deve rappresentare prima di tutto un luogo sicuro in cui l\'errore non è mai giudicato, ma diventa occasione di scoperta.',
        'L\'alleanza terapeutica con i genitori è l\'ingrediente decisivo: comprendere le loro preoccupazioni sostiene l\'intero percorso.',
        'La tecnica senza empatia resta un esercizio; l\'empatia guidata dal rigore scientifico genera trasformazione duratura.'
      ],
      content: `
        <p>In ogni incontro clinico, dietro una difficoltà di articolazione, un inceppo nella fluenza verbale o una disfonia da sforzo, c'è un vissuto emotivo che chiede di essere ascoltato con delicatezza.</p>

        <h3>Il peso delle parole non dette</h3>
        <p>Un bambino che non riesce a farsi capire dai compagni a scuola sperimenta frustrazione, a volte isolamento o rabbia. Un adulto che avverte la propria voce affaticata sul luogo di lavoro teme di perdere credibilità e sicurezza. Per questo motivo, la seduta logopedica non può e non deve ridursi a un mero protocollo di schede ed esercizi meccanici.</p>

        <p>Accogliere significa dare tempo. Significa sintonizzarsi sui micro-segnali, celebrare i piccoli traguardi quotidiani e costruire un patto in cui la persona si sente autenticamente vista e valorizzata.</p>

        <h3>Costruire il ponte verso la fiducia</h3>
        <p>Quando il paziente sperimenta che il suo valore non dipende dalla perfezione immediata della pronuncia, l'ansia da prestazione si allenta. È in quello spazio disteso che le connessioni neuronali si consolidano e la motivazione intrinseca sboccia, portando i progressi fuori dalla stanza di terapia, nella vita di ogni giorno.</p>
      `
    },
    {
      id: '4',
      slug: 'dsa-e-scuola-strategie-senza-perdere-autostima',
      title: 'DSA e scuola: strategie e strumenti compensativi senza perdere l\'autostima',
      subtitle: 'Dislessia, disortografia e discalculia non sono malattie: come trasformare una neurodivergenza in un percorso di apprendimento efficace e sereno.',
      excerpt: 'Dalla diagnosi al Piano Didattico Personalizzato (PDP): come accompagnare ragazzi e famiglie a riconoscere il proprio potenziale oltre le fatiche di lettura e scrittura.',
      category: 'Evidenza Scientifica',
      readTime: '6 min di lettura',
      publishedAt: '10 Settembre 2026',
      author: 'Dott.ssa Eleonora Mariotti',
      authorRole: 'Logopedista Clinica',
      tags: ['DSA', 'Dislessia', 'Scuola', 'Metodo di Studio'],
      keyPoints: [
        'I Disturbi Specifici dell\'Apprendimento non derivano da scarso impegno o deficit intellettivo, ma da un differente neuro-funzionamento.',
        'Gli strumenti compensativi (sintesi vocale, mappe concettuali, calcolatrice) non sono "favoritismi", ma occhiali per chi è miope.',
        'Lavorare sulle strategie metacognitive restituisce al ragazzo il controllo del proprio metodo di studio.',
        'Il dialogo costruttivo tra scuola, famiglia e specialista previene il burnout scolastico e tutela il benessere psicologico.'
      ],
      content: `
        <p>Ricevere una diagnosi di DSA (Disturbo Specifico dell\'Apprendimento) suscita frequentemente sentimenti contrastanti nella famiglia: da un lato sollievo per aver dato un nome a fatiche prolungate, dall'altro timore per il futuro accademico del proprio figlio.</p>

        <h3>Cosa accade nella mente con DSA</h3>
        <p>Nel cervello di chi presenta una dislessia evolutiva, i circuiti neurali deputati alla decodifica automatica segno-suono richiedono un dispendio energetico cognitivo notevolmente superiore. Ciò comporta che, mentre un lettore tipico legge senza sforzo cosciente, il bambino con dislessia consuma gran parte delle sue risorse attentive unicamente per decifrare le singole lettere, lasciando poca energia disponibile per la comprensione profonda del testo.</p>

        <h3>Il ruolo del Piano Didattico Personalizzato (PDP)</h3>
        <p>La Legge 170/2010 tutela il diritto allo studio attraverso misure dispensative e strumenti compensativi. La logopedia interviene non solo per potenziare le abilità strumentali deficitarie, ma soprattutto per insegnare allo studente come utilizzare in autonomia le tecnologie compensative (software per mappe concettuali, sintesi vocale di qualità, registratori digitali) e costruire un metodo di studio flessibile.</p>

        <p>L'obiettivo ultimo è far comprendere allo studente che il suo valore e la sua intelligenza sono infinitamente più grandi della velocità con cui legge un paragrafo.</p>
      `
    }
  ];

  getArticles(): Observable<Article[]> {
    return of(this.articles);
  }

  getArticleBySlug(slug: string): Observable<Article | undefined> {
    const found = this.articles.find(a => a.slug === slug);
    return of(found);
  }

  getRecentArticles(count: number = 3): Observable<Article[]> {
    return of(this.articles.slice(0, count));
  }
}
