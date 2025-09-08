import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContactService } from '../../core/services/contact.service';

@Component({
  standalone: true,
  selector: 'app-contact',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  template: `
  <section class="card">
    <h1>Contatti</h1>
    <p>Compila il modulo e ti risponderò al più presto.</p>

    <form [formGroup]="form" (ngSubmit)="submit()" class="form">
      <mat-form-field appearance="outline">
        <mat-label>Nome e cognome</mat-label>
        <input matInput formControlName="name" required>
        <mat-error *ngIf="form.controls.name.invalid">Inserisci il nome</mat-error>
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Email</mat-label>
        <input matInput formControlName="email" required type="email">
        <mat-error *ngIf="form.controls.email.invalid">Email valida obbligatoria</mat-error>
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Telefono (opzionale)</mat-label>
        <input matInput formControlName="phone">
      </mat-form-field>

      <mat-form-field appearance="outline" class="full">
        <mat-label>Messaggio</mat-label>
        <textarea matInput rows="6" formControlName="message" required></textarea>
        <mat-error *ngIf="form.controls.message.invalid">Scrivi un messaggio</mat-error>
      </mat-form-field>

      <button mat-raised-button color="accent" type="submit" [disabled]="form.invalid || loading">
        {{ loading ? 'Invio…' : 'Invia' }}
      </button>
    </form>

    <div class="map card" style="margin-top:16px">
      <h3>Dove siamo</h3>
      <!-- Semplice embed mappa; sostituisci con la posizione reale -->
      <iframe
        title="Mappa"
        width="100%" height="280" style="border:0"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        src="https://www.google.com/maps/embed?pb=!1m18!...">
      </iframe>
    </div>
  </section>
  `,
  styles:[`
    .form {
      display:grid; gap:16px;
      grid-template-columns: repeat(2, 1fr);
    }
    .form .full { grid-column: 1 / -1; }
    @media (max-width: 900px){ .form { grid-template-columns: 1fr; } }
  `]
})
export class ContactComponent {
  loading = false;
  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  constructor(private fb: FormBuilder, private svc: ContactService, private snack: MatSnackBar) {}

  async submit() {
    if (this.form.invalid) return;
    this.loading = true;
    try {
      await this.svc.send(this.form.value as any);
      this.snack.open('Messaggio inviato! Ti risponderò a breve.', 'OK', { duration: 3000 });
      this.form.reset();
    } catch {
      this.snack.open('Errore di invio. Riprova più tardi.', 'OK', { duration: 3000 });
    } finally {
      this.loading = false;
    }
  }
}
