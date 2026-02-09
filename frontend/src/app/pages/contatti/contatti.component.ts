// src/app/pages/contatti/contatti.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

// --- Importazioni di Angular Material ---
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contatti',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    // Moduli Material
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSnackBarModule
  ],
  templateUrl: './contatti.component.html',
  styleUrls: ['./contatti.component.scss']
})
export class ContattiComponent implements OnInit {

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

  onSubmit() {
    if (this.contactForm.invalid) {
      return;
    }
    const payload = {
      nome: this.contactForm.value.nome,
      email: this.contactForm.value.email,
      messaggio: this.contactForm.value.messaggio
    };

    console.log("Sto inviando questo al server:", payload); // Debug per vedere cosa parte

    // INVIO AL SERVER
    this.http.post('http://localhost:8080/api/contacts', payload)
      .subscribe({
        next: (response) => {
          console.log('Successo:', response);
          this.showNotification('Grazie per averci scritto! Ti risponderemo presto. 📩', 'Chiudi');
          this.contactForm.reset(); // Pulisce il form dopo l'invio
          
          // Reset visivo per evitare errori rossi sui campi vuoti
          Object.keys(this.contactForm.controls).forEach(key => {
            this.contactForm.get(key)?.setErrors(null);
          });
        },
        error: (error) => {
          console.error('Errore:', error);
          this.showNotification('Errore durante l\'invio. Riprova più tardi.', 'X');
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