import { Routes } from '@angular/router';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { IngresosComponent } from './components/ingresos/ingresos.component';
import { GastosComponent } from './components/gastos/gastos.component';
import { HomeComponent } from './components/home/home.component';

export const adminRoutes: Routes = [
  { path: 'categorias', component: CategoriasComponent },
  { path: 'ingresos', component: IngresosComponent },
  { path: 'gastos', component: GastosComponent },
  { path: 'inicio', component: HomeComponent },
  { path: '**', redirectTo: 'inicio' },
];
