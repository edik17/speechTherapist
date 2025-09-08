import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn:'root'})
export class ContactService {
  constructor(private http: HttpClient) {}

  // Esempio: POST verso un endpoint serverless (Netlify/Firebase) che invia email
  send(payload: {name:string; email:string; phone?:string; message:string}) {
    // Per ora mock: restituisco una Promise risolta
    // Sostituisci con: return this.http.post('https://.../api/contact', payload).toPromise();
    return Promise.resolve({ ok:true });
  }
}
