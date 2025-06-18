import { Component, OnInit } from '@angular/core';

interface User {
  id: number;
  name: string;
  email: string;
  status: string;
}

interface PendingItem {
  id: number;
  type: 'Perfil' | 'Evento';
  name: string;
  description: string;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  // Estatísticas fictícias
  totalUsers = 150;
  pendingEvents = 8;
  pendingProfiles = 5;

  // Itens pendentes para aprovação
  pendingItems: PendingItem[] = [
    { id: 1, type: 'Perfil', name: 'João Silva', description: 'Empresa de TI' },
    { id: 2, type: 'Evento', name: 'Inova Summit', description: 'Evento de tecnologia' }
  ];

  // Lista de usuários para gestão
  users: User[] = [
    { id: 1, name: 'Maria Souza', email: 'maria@email.com', status: 'Ativo' },
    { id: 2, name: 'Carlos Lima', email: 'carlos@email.com', status: 'Bloqueado' }
  ];

  constructor() { }

  ngOnInit(): void { }

  approveItem(itemId: number): void {
    console.log(`Item ${itemId} aprovado`);
    this.pendingItems = this.pendingItems.filter(item => item.id !== itemId);
  }

  rejectItem(itemId: number, reason: string): void {
    console.log(`Item ${itemId} rejeitado por: ${reason}`);
    this.pendingItems = this.pendingItems.filter(item => item.id !== itemId);
  }

  blockUser(userId: number): void {
    console.log(`Usuário ${userId} bloqueado`);
    this.users = this.users.map(user => user.id === userId ? { ...user, status: 'Bloqueado' } : user);
  }

  promoteUser(userId: number): void {
    console.log(`Usuário ${userId} promovido`);
    // Aqui poderia ir lógica real de promoção
  }
}
