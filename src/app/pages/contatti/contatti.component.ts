// src/app/pages/contatti/contatti.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necessario per *ngIf
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // <-- Importa Reactive Forms

// --- Importazioni di Angular Material ---
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';


@Component({
  selector: 'app-contatti',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule, // <-- Aggiungi ReactiveFormsModule

    // Moduli Material
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatListModule
  ],
  templateUrl: './contatti.component.html',
  styleUrls: ['./contatti.component.scss']
})
export class ContattiComponent implements OnInit {

  // La nostra variabile per il form
  contactForm!: FormGroup; // Il '!' dice a TS che la inizializzeremo in ngOnInit

  // Inizializziamo il FormBuilder per creare il form
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    // Costruiamo il form quando il componente si carica
    this.contactForm = this.fb.group({
      nome: ['', Validators.required], // Campo 'nome', obbligatorio
      email: ['', [Validators.required, Validators.email]], // Campo 'email', obbligatorio E deve essere un'email
      messaggio: ['', [Validators.required, Validators.minLength(10)]] // Obbligatorio e lungo almeno 10 caratteri
    });
  }

  // Funzione chiamata quando il form viene inviato
  onSubmit(): void {
    if (this.contactForm.valid) {
      // Per ora, ci limitiamo a stampare i dati in console
      // In un'app reale, qui faresti una chiamata HTTP a un backend
      console.log('Form inviato:', this.contactForm.value);

      // Svuota il form dopo l'invio
      this.contactForm.reset();
    } else {
      // Se il form non è valido (es. l'utente ha provato a forzare l'invio)
      console.log('Form non valido');
      // Puoi marcare tutti i campi come "toccati" per mostrare gli errori
      this.contactForm.markAllAsTouched();
    }
  }

  // Piccola funzione "helper" per accedere più facilmente ai campi nel template (opzionale ma utile)
  get nome() { return this.contactForm.get('nome'); }
  get email() { return this.contactForm.get('email'); }
  get messaggio() { return this.contactForm.get('messaggio'); }
}