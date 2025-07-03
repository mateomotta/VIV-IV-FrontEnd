import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-calendar',
  templateUrl: './event-calendar.component.html',
  styleUrls: ['./event-calendar.component.scss']
})
export class EventCalendarComponent implements OnInit {
  events = [
    { id: 1, title: 'Evento A', date: '2025-06-20', status: 'confirmado' },
    { id: 2, title: 'Evento B', date: '2025-06-22', status: 'cancelado' },
    { id: 3, title: 'Evento C', date: '2025-06-25', status: 'pendente' },
  ];

  ngOnInit(): void {}

  getStatusColor(status: string): string {
    switch (status) {
      case 'confirmado': return 'green';
      case 'cancelado': return 'red';
      case 'pendente': return 'orange';
      default: return 'gray';
    }
  }
}
