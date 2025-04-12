import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { RouterModule } from '@angular/router'; // Necesario para routerLink
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterModule, MatButtonToggleModule, MatIconModule,MatToolbarModule, MatSlideToggleModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Cuentas Personales';
  constructor(private router: Router) {}

  get seccionActual(): string {
    const url = this.router.url;
    if (url.includes('categorias')) return 'Categorias';
    if (url.includes('ingresos')) return 'Ingresos';
    if (url.includes('gastos')) return 'Gastos';
    return 'Inicio';
  }

  
  
}
