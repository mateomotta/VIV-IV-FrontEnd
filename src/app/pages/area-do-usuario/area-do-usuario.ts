import { Component } from '@angular/core';

@Component({
  selector: 'app-area-do-usuario',
  templateUrl: './area-do-usuario.html',
  styleUrls: ['./area-do-usuario.css']
})
export class AreaDoUsuario {
  selectedTab: 'perfis' | 'eventos' | 'inscricoes' = 'perfis';

  selectTab(tab: 'perfis' | 'eventos' | 'inscricoes') {
    this.selectedTab = tab;
  }
}