import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
  standalone: true // Se for um componente standalone
})
export class NavbarComponent {
  appName = 'Joinville Inova Conectada';
  isLoggedIn = false;
  hasAvatar = false;
  userInitials = 'JD';

  toggleLogin() {
    this.isLoggedIn = !this.isLoggedIn;

    if (this.isLoggedIn) {
      this.userInitials = 'US'; // Iniciais do usuário (pode ser dinâmico)
    }
  }
}