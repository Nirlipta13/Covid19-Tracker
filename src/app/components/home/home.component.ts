import { GlobalDataSummary } from './../../models/global-data';
import { DataServiceService } from './../../services/data-service.service';
import { Component, OnInit } from '@angular/core';
import { ConditionalExpr } from '@angular/compiler';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // public gridApi;
  // public gridColumnApi;
  // public columnDefs;
  // public sortingOrder;
   public rowData;


  totalConfirmed = 0;
  totalActive = 0;
  totalDeath = 0;
  totalRecovered = 0;
  globalData: GlobalDataSummary[];
  loading = true;
  datatable = [];
  countries: any = [];

  columnDefs = [
    {headerName: 'COUNTRY', field: 'country',  sortable: true, filter: true },
    {headerName: 'CONFIRMED', field: 'confirmed',  sortable: true, filter: true },
    {headerName: 'RECOVERED', field: 'recovered',  sortable: true, filter: true},
    {headerName: 'ACTIVE', field: 'active',  sortable: true, filter: true},
    {headerName: 'DECEASED', field: 'deaths',  sortable: true, filter: true}
];

  rowdata = this.dataService.getGlobalData().subscribe({
      next: (result) => {
        result.splice(-1, 1);
        this.rowData = result;
      },
      complete: () => {
        this.loading = false;
      }
    });

  chart = {
    PieChart: 'PieChart',
    ColumnChart: 'ColumnChart',
    height: 500,
    options: {
      animation: {
        duration: 1000,
        easing: 'out'
      },
      is3D: true
    }
  };

  constructor(private dataService: DataServiceService) {
  }

  initChart(caseType: string){

    this.datatable = [];
    // this.datatable.push(["Country","Cases"]);

    this.globalData.forEach(cs => {
      let value: number;
      // tslint:disable-next-line: triple-equals
      if (caseType == 'active'){
          value = cs.active;
      }

      // tslint:disable-next-line: triple-equals
      if (caseType == 'confirmed'){
        value = cs.confirmed;
      }

      // tslint:disable-next-line: triple-equals
      if (caseType == 'death'){
        value = cs.deaths;
      }

      // tslint:disable-next-line: triple-equals
      if (caseType == 'recovered'){
        value = cs.recovered;
      }

      this.datatable.push([
        cs.country, value
      ]);
    });

  }

  updateChart(input: HTMLInputElement){
    this.initChart(input.value);
  }

  ngOnInit(): void {
    this.dataService.getGlobalData()
    .subscribe(
      {
        next: (result) => {
          this.globalData = result;
          this.globalData.splice(-1, 1);

          result.forEach(cs => {

            if (!Number.isNaN(cs.confirmed)){
              this.totalActive += cs.active;
              this.totalConfirmed += cs.confirmed;
              this.totalDeath += cs.deaths;
              this.totalRecovered += cs.recovered;
            }
          });
          this.initChart('confirmed');
        },
        complete: () => {
          this.loading = false;
        }
      });

  }
}
