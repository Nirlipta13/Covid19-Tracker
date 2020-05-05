import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ag-grid',
  templateUrl: './ag-grid.component.html',
  styleUrls: ['./ag-grid.component.css']
})
export class AgGridComponent implements OnInit {
  columnDefs;

  constructor() { }

  ngOnInit(): void {
  }

}
