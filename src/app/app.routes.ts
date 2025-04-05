import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  { path: 'admin', loadChildren: () => import('./Admin/admin.routes').then(m => m.adminRoutes) },
  { path: '**', redirectTo: 'admin' },
];
