import { GlobalDataSummary } from './../../models/global-data';
import { DataServiceService } from './../../services/data-service.service';
import { Component, OnInit } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  gridApi;
  gridColumnApi;
  totalConfirmed=0;
  totalActive=0;
  totalDeath=0;
  totalRecovered=0;
  globalData:GlobalDataSummary[];
  loading=true;
  datatable=[];
  countries:any=[];
  columnDefs;
  rowData;
  
  chart={
    PieChart:"PieChart",
    ColumnChart:"ColumnChart",
    height:500,
    options:{
      animation:{
        duration:1000,
        easing:'out'
      },
      is3D:true
    }
  }
  
  constructor(private dataService:DataServiceService) { 
    this.columnDefs=[
      {
      headerName:"Country",
      field:"country",
      width:150,
      sortable:true,
      filter:true
    },
    {
      headerName:"Confirmed",
      field:"confirmed",
      width:150,
      sortable:true,
      filter:true
    },
    {
      headerName:"Active",
      field:"active",
      width:150,
      sortable:true,
      filter:true
    },
    {
      headerName:"Recovered",
      field:"recovered",
      width:150,
      sortable:true,
      filter:true
    },
    {
      headerName:"Deceased",
      field:"deaths",
      width:150,
      sortable:true,
      filter:true
    },
  ]
  }

  onGridReady(params){
    this.gridApi=params.api;
    this.gridColumnApi=params.columnApi;
    let datatable=this.globalData;
    params.api.setRowData(datatable);

  }

  initChart(caseType:string){
    
    this.datatable=[];
    //this.datatable.push(["Country","Cases"]);

    this.globalData.forEach(cs=>{
      let value:number;
      if(caseType=='active'){
          value=cs.active;
      }

      if(caseType=='confirmed'){
        value=cs.confirmed;
      }

      if(caseType=='death'){
        value=cs.deaths;
      }

      if(caseType=='recovered'){
        value=cs.recovered;
      }

      this.datatable.push([
        cs.country,value
      ])
    })
    
  }

  updateChart(input: HTMLInputElement){
    this.initChart(input.value);
  }

  ngOnInit(): void {
    this.dataService.getGlobalData()
    .subscribe(
      {
        next:(result)=>{
          this.globalData=result;
          this.globalData.splice(-1,1);
          
          result.forEach(cs=>{
            
            if(!Number.isNaN(cs.confirmed)){
              this.totalActive+=cs.active
              this.totalConfirmed+=cs.confirmed
              this.totalDeath+=cs.deaths
              this.totalRecovered+=cs.recovered
            }
          })
          this.initChart('confirmed');
        },
        complete: ()=>{
          this.loading=false;
        }
      })
  }
}
