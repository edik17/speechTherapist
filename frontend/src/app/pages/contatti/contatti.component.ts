// src/app/pages/contatti/contatti.component.ts

import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import confetti from 'canvas-confetti';

// --- Importazioni di Angular Material & Lucide Icons ---
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { 
  LucidePhone, 
  LucideMail, 
  LucideMapPin, 
  LucideSend, 
  LucideClock 
} from '@lucide/angular';

@Component({
    selector: 'app-contatti',
    imports: [
      ReactiveFormsModule,
      MatCardModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatListModule,
      MatSnackBarModule,
      LucidePhone,
      LucideMail,
      LucideMapPin,
      LucideSend,
      LucideClock
    ],
    templateUrl: './contatti.component.html',
    styleUrls: ['./contatti.component.scss']
})
export class ContattiComponent implements OnInit, AfterViewInit {
  private map: L.Map | undefined;

  // La nostra variabile per il form
  contactForm!: FormGroup;

  // Inizializziamo il FormBuilder e HttpClient
  constructor(private fb: FormBuilder, private http: HttpClient, private snackBar: MatSnackBar) { }

  // 1. IMPORTANTE: Creiamo il form quando il componente si avvia
  ngOnInit(): void {
    this.contactForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      messaggio: ['', Validators.required]
    });
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    const coords: [number, number] = [43.5982, 13.5146]; // Coordinate Ancona

    // Fix per le icone di default in Leaflet
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

    this.map = L.map('map-container').setView(coords, 14);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);

    L.marker(coords)
      .addTo(this.map)
      .bindPopup(`
        <div style="font-family: inherit; font-size: 13px; line-height: 1.4;">
          <strong style="color: #0F4C5C; font-size: 14px;">Studio di Logopedia</strong><br>
          Dott.ssa Eleonora Mariotti<br>
          <span style="color: #666;">Riceve su appuntamento</span>
        </div>
      `)
      .openPopup();
  }

  onSubmit() {
    if (this.contactForm.invalid) {
      return;
    }
    const payload = {
      nome: this.contactForm.value.nome,
      email: this.contactForm.value.email,
      messaggio: this.contactForm.value.messaggio
    };

    console.log("Sto inviando questo al server:", payload);

    // Animazione celebrativa con confetti!
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 }
    });

    // INVIO AL SERVER
    this.http.post('http://localhost:8080/api/contacts', payload)
      .subscribe({
        next: (response) => {
          console.log('Successo:', response);
          this.showNotification('Grazie per averci scritto! Ti risponderemo presto. 📩', 'Chiudi');
          this.contactForm.reset();
          
          Object.keys(this.contactForm.controls).forEach(key => {
            this.contactForm.get(key)?.setErrors(null);
          });
        },
        error: (error) => {
          console.error('Errore:', error);
          this.showNotification('Messaggio ricevuto in anteprima (server locale). A presto!', 'Chiudi');
        }
      });
  }
private showNotification(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000, 
      horizontalPosition: 'center', 
      verticalPosition: 'bottom',
      panelClass: ['custom-snackbar'] 
    });
  }
  // Piccola funzione "helper" per accedere più facilmente ai campi nel template
  get nome() { return this.contactForm.get('nome'); }
  get email() { return this.contactForm.get('email'); }
  get messaggio() { return this.contactForm.get('messaggio'); }
}