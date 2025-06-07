import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notfoundpage',
  templateUrl: './notfoundpage.html',
  styleUrls: ['./notfoundpage.css']
})
export class NotfoundpageComponent {
  constructor(private router: Router) {}

  // Método para redirecionar para a página inicial
  redirectToHome() {
    this.router.navigate(['/']);
  }

  // Método para verificar se a página atual é a 404
  is404Page(): boolean {
    return this.router.url === '/404' || !this.router.url.startsWith('/');
  }
}