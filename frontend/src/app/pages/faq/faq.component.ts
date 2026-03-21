import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { PageHeroComponent } from '../../shared/components/page-hero/page-hero.component'; // Assicurati che il percorso sia giusto

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [
    CommonModule, 
    MatExpansionModule, 
    MatButtonModule, 
    MatIconModule, 
    RouterLink,
    PageHeroComponent
  ],
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent {
  // Gestisci qui le tue FAQ
  faqs = [
    {
      question: "Serve l'impegnativa del medico per la prima visita?",
      answer: "No, per il primo colloquio conoscitivo e la valutazione logopedica privata non è strettamente necessaria l'impegnativa, anche se è sempre utile portare l'eventuale documentazione medica o scolastica precedente."
    },
    {
      question: "Quanto dura una seduta logopedica?",
      answer: "In genere una seduta dura 45 minuti. Questo tempo è considerato ottimale per mantenere alta l'attenzione, specialmente nei bambini, ed eseguire gli esercizi in modo efficace senza affaticare il paziente."
    },
    {
      question: "Fate colloqui o terapie online?",
      answer: "Sì, offro consulenze online per genitori e adulti. Anche alcune terapie specifiche (come quelle per la voce o per gli adulti) possono essere svolte in modalità tele-riabilitativa, previo accordo e valutazione di fattibilità."
    },
    {
      question: "Come avviene la valutazione iniziale?",
      answer: "La prima fase consiste in un colloquio per raccogliere la storia clinica (anamnesi). Successivamente si procede con l'osservazione e la somministrazione di test standardizzati per delineare un profilo delle competenze e proporre un piano di trattamento personalizzato."
    }
  ];
}