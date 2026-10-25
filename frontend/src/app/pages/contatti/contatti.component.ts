import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import confetti from 'canvas-confetti';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { 
  LucidePhone, 
  LucideMail, 
  LucideMapPin, 
  LucideSend, 
  LucideClock,
  LucideCalendar,
  LucideNavigation,
  LucideExternalLink
} from '@lucide/angular';

import { FadeUpDirective } from '../../shared/directives/fade-up.directive';

export interface Studio {
  id: string;
  name: string;
  city: string;
  days: string;
  hours: string;
  address: string;
  coords: [number, number];
  gmapsUrl: string;
  badgeColor?: string;
}

@Component({
  selector: 'app-contatti',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule,
    FadeUpDirective,
    LucidePhone,
    LucideMail,
    LucideMapPin,
    LucideSend,
    LucideClock,
    LucideCalendar,
    LucideNavigation,
    LucideExternalLink
  ],
  templateUrl: './contatti.component.html',
  styleUrls: ['./contatti.component.scss']
})
export class ContattiComponent implements OnInit, AfterViewInit, OnDestroy {
  contactForm!: FormGroup;
  isSubmitting = false;
  private maps: L.Map[] = [];

  // Calendario settimanale suddiviso per giorno
  weeklySchedule = [
    { day: 'Lunedì', location: 'Sassoferrato', hours: '09:00 - 19:30', dayIndex: 1, note: 'Studio Privato' },
    { day: 'Martedì', location: 'Ancona', hours: '09:00 - 19:30', dayIndex: 2, note: 'Studio Privato' },
    { day: 'Mercoledì', location: 'Jesi', hours: '09:00 - 19:30', dayIndex: 3, note: 'Studio Privato' },
    { day: 'Giovedì', location: 'Sassoferrato', hours: '09:00 - 19:30', dayIndex: 4, note: 'Studio Privato' },
    { day: 'Venerdì', location: 'Ancona', hours: '09:00 - 19:30', dayIndex: 5, note: 'Studio Privato' },
  ];

  // Le 3 Sedi con rispettive coordinate per le mappe indipendenti
  studios: Studio[] = [
    {
      id: 'sassoferrato',
      name: 'Studio di Sassoferrato',
      city: 'Sassoferrato (AN)',
      days: 'Lunedì & Giovedì',
      hours: '09:00 - 19:30',
      address: 'Sassoferrato (AN)',
      coords: [43.4326, 12.8617],
      gmapsUrl: 'https://www.google.com/maps/search/?api=1&query=Sassoferrato+AN',
      badgeColor: '#0F4C5C'
    },
    {
      id: 'ancona',
      name: 'Studio di Ancona',
      city: 'Ancona (AN)',
      days: 'Martedì & Venerdì',
      hours: '09:00 - 19:30',
      address: 'Ancona (AN)',
      coords: [43.6158, 13.5189],
      gmapsUrl: 'https://www.google.com/maps/search/?api=1&query=Ancona+AN',
      badgeColor: '#E76F51'
    },
    {
      id: 'jesi',
      name: 'Studio di Jesi',
      city: 'Jesi (AN)',
      days: 'Mercoledì',
      hours: '09:00 - 19:30',
      address: 'Jesi (AN)',
      coords: [43.5226, 13.2438],
      gmapsUrl: 'https://www.google.com/maps/search/?api=1&query=Jesi+AN',
      badgeColor: '#2A9D8F'
    }
  ];

  constructor(
    private fb: FormBuilder, 
    private http: HttpClient, 
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      sede: ['Ancona', Validators.required],
      messaggio: ['', Validators.required]
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initStudioMaps();
    }, 100);
  }

  ngOnDestroy(): void {
    this.maps.forEach(m => {
      try {
        m.remove();
      } catch (e) {
        console.warn('Error removing map:', e);
      }
    });
    this.maps = [];
  }

  isToday(dayIndex: number): boolean {
    return new Date().getDay() === dayIndex;
  }

  private initStudioMaps(): void {
    const defaultIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
    L.Marker.prototype.options.icon = defaultIcon;

    this.studios.forEach(studio => {
      const container = document.getElementById(`map-${studio.id}`);
      if (container) {
        if ((container as any)._leaflet_id) {
          try {
            delete (container as any)._leaflet_id;
          } catch (e) {}
        }
        try {
          const map = L.map(container, {
            scrollWheelZoom: false
          }).setView(studio.coords, 14);

          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; OpenStreetMap'
          }).addTo(map);

          L.marker(studio.coords)
            .addTo(map)
            .bindPopup(`
              <div style="font-family: inherit; font-size: 13px; line-height: 1.4;">
                <strong style="color: #0F4C5C; font-size: 14px;">${studio.name}</strong><br>
                <span>${studio.city}</span><br>
                <b style="color: #E76F51;">${studio.days}</b><br>
                <span style="color: #666; font-size: 12px;">${studio.hours}</span>
              </div>
            `);

          this.maps.push(map);
          setTimeout(() => {
            try { map.invalidateSize(); } catch (e) {}
          }, 400);
        } catch (err) {
          console.warn('Map initialization failed for', studio.id, err);
        }
      }
    });
  }

  onSubmit() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      this.showNotification('Per favore compila tutti i campi obbligatori contrassegnati.', 'OK');
      return;
    }

    this.isSubmitting = true;
    const { nome, email, sede, messaggio } = this.contactForm.value;
    const payload = { nome, email, sede, messaggio };

    console.log("Invio messaggio:", payload);

    try {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}

    // Invia al backend locale o esegue fallback immediato
    this.http.post('http://localhost:8080/api/contacts', payload)
      .subscribe({
        next: (response) => {
          this.isSubmitting = false;
          console.log('Successo:', response);
          this.showNotification('Grazie per averci scritto! Ti risponderemo al più presto. 📩', 'Chiudi');
          this.contactForm.reset({ sede: 'Ancona' });
          
          Object.keys(this.contactForm.controls).forEach(key => {
            this.contactForm.get(key)?.setErrors(null);
          });
        },
        error: (error) => {
          this.isSubmitting = false;
          console.warn('Backend offline o errore di rete. Avvio fallback email:', error);
          this.showNotification('Grazie! Se preferisci, ti abbiamo preparato anche l\'email precompilata.', 'OK');
          
          // Prepara email precompilata di fallback
          const subject = encodeURIComponent(`Richiesta di contatto da ${nome} - Sede: ${sede}`);
          const body = encodeURIComponent(`Nome e Cognome: ${nome}\nEmail: ${email}\nSede scelta: ${sede}\n\nMessaggio:\n${messaggio}`);
          window.open(`mailto:mariotti.eleonora14@gmail.com?subject=${subject}&body=${body}`, '_blank');

          this.contactForm.reset({ sede: 'Ancona' });
          Object.keys(this.contactForm.controls).forEach(key => {
            this.contactForm.get(key)?.setErrors(null);
          });
        }
      });
  }

  private showNotification(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000, 
      horizontalPosition: 'center', 
      verticalPosition: 'bottom',
      panelClass: ['custom-snackbar'] 
    });
  }

  get nome() { return this.contactForm.get('nome'); }
  get email() { return this.contactForm.get('email'); }
  get sede() { return this.contactForm.get('sede'); }
  get messaggio() { return this.contactForm.get('messaggio'); }
}