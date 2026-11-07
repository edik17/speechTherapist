import React from 'react';
import { HelpCircle, MessageSquare } from 'lucide-react';
import { PageHero } from '../../shared/components/PageHero';
import { FadeUp } from '../../shared/directives/FadeUp';
import { MatAccordion, MatExpansionPanel, MatExpansionPanelHeader, MatPanelTitle } from '../../shared/ui/MatAccordion';
import { MatButton } from '../../shared/ui/MatButton';
import './FaqPage.scss';

const FAQS = [
  {
    question: "Serve l'impegnativa del medico per la prima visita?",
    answer:
      "No, per il primo colloquio conoscitivo e la valutazione logopedica privata non è strettamente necessaria l'impegnativa del pediatra o del medico curante. Tuttavia, è sempre molto utile portare con sé ogni eventuale referto o documento clinico pregresso.",
  },
  {
    question: "Quanto dura una seduta logopedica?",
    answer:
      "La seduta clinica dura di norma 45 minuti. Tale durata è scientificamente considerata ottimale per mantenere alto l'ingaggio attentivo, specialmente nei bambini più piccoli, senza incorrere in affaticamento cognitivo.",
  },
  {
    question: "Svolgete consulenze o sedute online?",
    answer:
      "Sì, offro consulenze a distanza di parent-training per genitori e percorsi di riabilitazione vocale per adulti, previo colloquio di inquadramento e verifica dell'effettiva idoneità clinica alla telemedicina.",
  },
  {
    question: "In cosa consiste esattamente la valutazione iniziale?",
    answer:
      "La valutazione comprende un'anamnesi iniziale dettagliata, l'osservazione qualitativa e la somministrazione di test standardizzati e accreditati. Al termine viene rilasciata una relazione clinica con la restituzione degli esiti e l'eventuale proposta di un percorso personalizzato.",
  },
  {
    question: "Come viene coinvolta la scuola nel percorso di un bambino?",
    answer:
      "Con il consenso dei genitori, mantengo un dialogo costante con gli insegnanti mediante incontri dedicati o scambi via email/telefono, per condividere strategie inclusive e monitorare i progressi anche in classe.",
  },
];

export function FaqPage() {
  return (
    <div className="faq-page">
      <PageHero
        title="Domande Frequenti"
        subtitle="Tutto quello che è utile sapere prima di iniziare un percorso logopedico insieme."
      />

      <FadeUp className="faq-container">
        <div className="faq-intro-header">
          <h2>Hai dei dubbi sul percorso?</h2>
          <p>
            Ecco le risposte alle domande che genitori e pazienti pongono più frequentemente prima di fissare un primo appuntamento.
          </p>
        </div>

        <MatAccordion className="custom-accordion">
          {FAQS.map((faq, index) => (
            <MatExpansionPanel key={faq.question} index={index} className="faq-panel">
              <MatExpansionPanelHeader>
                <MatPanelTitle className="faq-question">
                  {faq.question}
                </MatPanelTitle>
              </MatExpansionPanelHeader>

              <div className="faq-answer-wrap">
                <p className="faq-answer">{faq.answer}</p>
              </div>
            </MatExpansionPanel>
          ))}
        </MatAccordion>

        <FadeUp className="faq-cta-box card">
          <div className="cta-icon-wrap">
            <HelpCircle size={30} />
          </div>
          <h3>Non hai trovato risposta alla tua situazione?</h3>
          <p>
            Ogni persona è unica. Scrivimi un messaggio descrivendo la tua esigenza: sarò felice di darti un primo orientamento gratuito.
          </p>
          <MatButton variant="raised" to="/contatti" className="faq-cta-btn">
            <MessageSquare size={16} />
            <span>Scrivimi direttamente</span>
          </MatButton>
        </FadeUp>
      </FadeUp>
    </div>
  );
}
