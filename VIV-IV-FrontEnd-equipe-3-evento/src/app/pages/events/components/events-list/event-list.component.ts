import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent {
  @Input() filter: string = '';

  events = [
    { id: 1, title: 'Evento A', date: '2025-06-20', status: 'confirmado' },
    { id: 2, title: 'Evento B', date: '2025-06-22', status: 'cancelado' },
    { id: 3, title: 'Evento C', date: '2025-06-25', status: 'pendente' }
  ];

  get filteredEvents() {
    if (!this.filter) return this.events;
    return this.events.filter(event =>
      event.title.toLowerCase().includes(this.filter.toLowerCase())
    );
  }
}