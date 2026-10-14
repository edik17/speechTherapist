import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card'; 
import { PageHeroComponent } from '../../shared/components/page-hero/page-hero.component';
import { animate, utils } from 'animejs';
import { 
  LucideMic, 
  LucideBookOpen, 
  LucideActivity, 
  LucideArrowRight, 
  LucideSparkles 
} from '@lucide/angular';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    MatButtonModule,
    MatCardModule,
    PageHeroComponent,
    LucideMic,
    LucideBookOpen,
    LucideActivity,
    LucideArrowRight
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {
  services = [
    {
      title: 'Linguaggio e Parola',
      desc: 'Ritardi di linguaggio, disturbi fonetico-fonologici e balbuzie.',
      iconType: 'mic'
    },
    {
      title: 'Apprendimento (DSA)',
      desc: 'Valutazione e trattamento per Dislessia, Disortografia, Disgrafia e Discalculia.',
      iconType: 'book'
    },
    {
      title: 'Deglutizione e Voce',
      desc: 'Terapia miofunzionale, disfonia e deglutizione atipica in età evolutiva e adulta.',
      iconType: 'activity'
    }
  ];

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    animate(this.el.nativeElement.querySelectorAll('.service-card'), {
      translateY: [40, 0],
      opacity: [0, 1],
      delay: utils.stagger(150, { start: 500 }),
      easing: 'easeOutQuint',
      duration: 1200
    });
  }
}