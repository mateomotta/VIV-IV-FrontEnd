import { Component } from '@angular/core';
import { EventCalendarComponent } from "./components/event-calendar/event-calendar.component";
import { EventListComponent } from "./components/event-list/event-list.component";
import { EventFiltersComponent } from "./components/event-filters/event-filters.component";

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
  imports: [EventCalendarComponent, EventListComponent, EventFiltersComponent]
})
export class EventsComponent {
  viewMode: 'list' | 'calendar' = 'list';
  filterText: string = '';

  switchView(mode: 'list' | 'calendar') {
    this.viewMode = mode;
  }

  onFilterChanged(value: string): void {
    this.filterText = value;
  }
}
