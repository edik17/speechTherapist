import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { PageHeroComponent } from '../../shared/components/page-hero/page-hero.component';
import { FadeUpDirective } from '../../shared/directives/fade-up.directive';
import { LucideHelpCircle, LucideMessageSquare } from '@lucide/angular';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [
    CommonModule, 
    MatExpansionModule, 
    MatButtonModule, 
    RouterLink,
    PageHeroComponent,
    FadeUpDirective,
    LucideHelpCircle,
    LucideMessageSquare
  ],
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent {
  faqs = [
    {
      question: "Serve l'impegnativa del medico per la prima visita?",
      answer: "No, per il primo colloquio conoscitivo e la valutazione logopedica privata non è strettamente necessaria l'impegnativa del pediatra o del medico curante. Tuttavia, è sempre molto utile portare con sé ogni eventuale referto o documento clinico pregresso."
    },
    {
      question: "Quanto dura una seduta logopedica?",
      answer: "La seduta clinica dura di norma 45 minuti. Tale durata è scientificamente considerata ottimale per mantenere alto l'ingaggio attentivo, specialmente nei bambini più piccoli, senza incorrere in affaticamento cognitivo."
    },
    {
      question: "Svolgete consulenze o sedute online?",
      answer: "Sì, offro consulenze a distanza di parent-training per genitori e percorsi di riabilitazione vocale per adulti, previo colloquio di inquadramento e verifica dell'effettiva idoneità clinica alla telemedicina."
    },
    {
      question: "In cosa consiste esattamente la valutazione iniziale?",
      answer: "La valutazione comprende un'anamnesi iniziale dettagliata, l'osservazione qualitativa e la somministrazione di test standardizzati e accreditati. Al termine viene rilasciata una relazione clinica con la restituzione degli esiti e l'eventuale proposta di un percorso personalizzato."
    },
    {
      question: "Come viene coinvolta la scuola nel percorso di un bambino?",
      answer: "Con il consenso dei genitori, mantengo un dialogo costante con gli insegnanti mediante incontri dedicati o scambi via email/telefono, per condividere strategie inclusive e monitorare i progressi anche in classe."
    }
  ];
}
