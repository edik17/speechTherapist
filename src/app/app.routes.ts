import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ServicesComponent } from './pages/services/services.component';
import { FaqComponent } from './pages/faq/faq.component';
import { ContactComponent } from './pages/contact/contact.component';
import { TestimonialsComponent } from './pages/testimonials/testimonials.component';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent), title: 'Home – Logopedista' },
  { path: 'chi-sono', loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent), title: 'Chi sono – Logopedista' },
  { path: 'servizi', loadComponent: () => import('./pages/services/services.component').then(m => m.ServicesComponent), title: 'Servizi – Logopedia' },
  { path: 'faq', loadComponent: () => import('./pages/faq/faq.component').then(m => m.FaqComponent), title: 'FAQ – Logopedia' },
  { path: 'contatti', loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent), title: 'Contatti' },
  { path: 'testimonianze', loadComponent: () => import('./pages/testimonials/testimonials.component').then(m => m.TestimonialsComponent), title: 'Testimonianze' },
  { path: '**', redirectTo: '' }
];
