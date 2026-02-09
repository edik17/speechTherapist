import { provideAnimations } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule }  from '@angular/material/button';
import { MatIconModule }    from '@angular/material/icon';
import { MatListModule }    from '@angular/material/list';
import { MatCardModule }    from '@angular/material/card';
import { MatInputModule }   from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule }  from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule }   from '@angular/material/chips';

export function provideMaterial() {
  return [
    provideAnimations(),
    importProvidersFrom(
      MatToolbarModule, MatButtonModule, MatIconModule, MatListModule,
      MatCardModule, MatInputModule, MatFormFieldModule, MatSelectModule,
      MatSnackBarModule, MatExpansionModule, MatChipsModule
    ),
  ];
}
