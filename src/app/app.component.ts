import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { RouterModule } from '@angular/router'; // Necesario para routerLink

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterModule, MatButtonToggleModule, MatIconModule,MatToolbarModule, MatSlideToggleModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'cuentas_personales';
}
