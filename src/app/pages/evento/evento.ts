import { Component } from '@angular/core';

@Component({
  selector: 'app-evento',
  imports: [],
  templateUrl: './evento.html',
  styleUrl: './evento.css'
})
export class Evento {
  curtido = false;

  toggleCurtida() {
    this.curtido = !this.curtido;
  }

  voltar() {
  window.history.back();
}
}
