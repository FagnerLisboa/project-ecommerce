import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  searchTerm : string = '';

  @Output() searchTermChange = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onSearch() {
    this.searchTermChange.emit(this.searchTerm);
  }
}
