import { Component } from '@angular/core';

@Component({
  selector: 'app-section-card',
  standalone: true,
  template: `<section class="card"><ng-content/></section>`,
  styles: [``]
})
export class SectionCardComponent {}