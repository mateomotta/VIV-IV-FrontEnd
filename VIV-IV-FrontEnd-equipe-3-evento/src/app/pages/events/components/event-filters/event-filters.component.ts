import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-event-filters',
  templateUrl: './event-filters.component.html',
  styleUrls: ['./event-filters.component.css']
})
export class EventFiltersComponent {
  filterText: string = '';

  @Output() filterChanged = new EventEmitter<string>();

  onFilterChange(): void {
    this.filterChanged.emit(this.filterText);
  }
}