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
  public gridApi;
  public gridColumnApi;
  public columnDefs;
  public sortingOrder;
  public rowData;


  totalConfirmed = 0;
  totalActive = 0;
  totalDeath = 0;
  totalRecovered = 0;
  globalData: GlobalDataSummary[];
  loading = true;
  datatable = [];
  countries: any = [];

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
    this.columnDefs = [
      {
        headerName: 'Country',
        field: 'country'
      },
      {
        headerName: 'Confirmed',
        field: 'confirmed'
        
      },
      {
        headerName: 'Active',
        field: 'active'
        
      },
      {
        headerName: 'Recovered',
        field: 'recovered'
        
      }, {
        headerName: 'Deceased',
        field: 'deaths'
        
      }
    ];
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

    this.rowData = this.dataService.getGlobalData();
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    // this.dataService.getGlobalData()
    // .subscribe(
    //   {
    //     next: (result) => {
    //       this.rowData=result;
    //       console.log(result);
    //     },
    //     complete: () => {
    //       this.loading = false;
    //     }
    //   });
  }
}
