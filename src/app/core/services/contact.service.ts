import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn:'root'})
export class ContactService {
  constructor(private http: HttpClient) {}

send(payload: {name:string; email:string; phone?:string; message:string}) {
  return fetch('/.netlify/functions/contact', {
    method: 'POST',
    headers: { 'Content-Type':'application/json' },
    body: JSON.stringify(payload)
  }).then(async r => {
    const txt = await r.text();
    if (!r.ok) throw new Error(txt || `HTTP ${r.status}`);
    try { return JSON.parse(txt) } catch { return { ok:true } }
  });
}

}
