import { Component, HostListener, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
  standalone: true
})
export class NavbarComponent implements OnDestroy {
  appName = 'Joinville Inova Conectada';
  isLoggedIn = false;
  hasAvatar = false;
  mobileMenuOpen: boolean = false;
  userInitials = 'JD';

  constructor(private router: Router) {}

  // Listener para cliques fora do menu
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (!this.mobileMenuOpen) return;
    
    const target = event.target as HTMLElement;
    const menu = document.querySelector('.mobile-menu');
    const hamburger = document.querySelector('.hamburger-menu');
    
    // Fecha o menu se o clique foi fora do menu e do ícone hamburguer
    if (menu && !menu.contains(target) && hamburger && !hamburger.contains(target)) {
      this.mobileMenuOpen = false;
    }
  }

  // Remove o listener quando o componente é destruído
  ngOnDestroy() {
    // O HostListener é automaticamente removido pelo Angular
  }

  toggleLogin() {
    this.router.navigate(['/login']);

  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }
}