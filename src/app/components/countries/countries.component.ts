import { map } from 'rxjs/operators';
import { DateWiseData } from './../../models/datewise-data';
import { GlobalDataSummary } from './../../models/global-data';
import { DataServiceService } from './../../services/data-service.service';
import { Component, OnInit } from '@angular/core';
import { merge } from 'rxjs';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  data:GlobalDataSummary[];
  countries:string[]=[];
  totalConfirmed=0;
  totalActive=0;
  totalDeath=0;
  totalRecovered=0;
  selectedCountryData:DateWiseData[];
  loading=true;
  dateWiseData;
  datatable=[];
  countryDisplay;
  chart={
    LineChart:"LineChart",
    height:500,
    options:{
      animation:{
        duration:1000,
        easing:'out'
      },
      is3D:true
    }
  }
  constructor(private dataService:DataServiceService) { }

  ngOnInit(): void {

    merge(
      this.dataService.getDateWiseData().pipe(
        map(result=>{
        this.dateWiseData=result;
      })
      ),
      this.dataService.getGlobalData().pipe(map(result=>{
        this.data=result;
        this.data.forEach(cs=>{
        this.countries.push(cs.country);
      })
    }))
    ).subscribe(
      {
        complete: ()=>{
          this.updateValue('India')
          this.loading=false;
        }
      }
    )
  }

  updateChart(){
    this.datatable=[];
    //this.datatable.push(['Cases','Date']);
    this.selectedCountryData.forEach(cs=>{
      this.datatable.push([cs.date,cs.cases])
    })

  }

  updateValue(country:string){
    this.data.forEach(cs=>{
      if(cs.country==country){
        this.totalRecovered=cs.recovered
        this.totalConfirmed=cs.confirmed
        this.totalDeath=cs.deaths
        this.totalActive=cs.active
      }
    })
    
    this.selectedCountryData = this.dateWiseData[country];
    console.log(this.selectedCountryData);
    
    this.updateChart();
    
  }

}
