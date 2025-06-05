import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.Login) },
  { path: 'cadastro', loadComponent: () => import('./pages/cadastro/cadastro.component').then(m => m.Cadastro) },
  { path: 'esqueci-senha', loadComponent: () => import('./pages/esqueci-senha/esqueci-senha.component').then(m => m.EsqueciSenha) }
];