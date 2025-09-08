import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ServicesComponent } from './pages/services/services.component';
import { FaqComponent } from './pages/faq/faq.component';
import { ContactComponent } from './pages/contact/contact.component';
import { TestimonialsComponent } from './pages/testimonials/testimonials.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Home – Logopedista' },
  { path: 'chi-sono', component: AboutComponent, title: 'Chi sono – Logopedista' },
  { path: 'servizi', component: ServicesComponent, title: 'Servizi – Logopedia' },
  { path: 'faq', component: FaqComponent, title: 'FAQ – Logopedia' },
  { path: 'contatti', component: ContactComponent, title: 'Contatti' },
  { path: 'testimonianze', component: TestimonialsComponent, title: 'Testimonianze' },
  { path: '**', redirectTo: '' }
];
