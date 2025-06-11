import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home').then(m => m.HomeComponent) },
  { path: 'ajuda', loadComponent: () => import('./pages/help/help').then(m => m.HelpComponent) },
  { path: 'sobre', loadComponent: () => import('./pages/about/about').then(m => m.AboutComponent) },
  { path: 'contato', loadComponent: () => import('./pages/contact/contact').then(m => m.ContactComponent) },
  { path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.Login) },
  { path: 'perfil', loadComponent: () => import('./pages/perfil/perfil.component').then(m => m.PerfilComponent) },
  { path: 'cadastro', loadComponent: () => import('./pages/cadastro/cadastro.component').then(m => m.Cadastro) },
  { path: 'esqueci-senha', loadComponent: () => import('./pages/esqueci-senha/esqueci-senha.component').then(m => m.EsqueciSenha)},
  { path: 'area-do-usuario', loadComponent: () => import('./pages/area-do-usuario/area-do-usuario').then(m => m.AreaDoUsuario)},
  { path: 'lista-perfil', loadComponent: () => import('./pages/lista-perfil/lista-perfil').then(m => m.ListaPerfilComponent)},
  { path: '**', loadComponent: () => import('./pages/notfoundpage/notfoundpage').then(m => m.NotfoundpageComponent)},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
