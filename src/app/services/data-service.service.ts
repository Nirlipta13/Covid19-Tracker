import { DateWiseData } from './../models/datewise-data';
import { GlobalDataSummary } from './../models/global-data';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, first} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  private globalDataUrl = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/06-04-2020.csv';
  private dateWiseData = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv';

  constructor(private http: HttpClient) { }

  getDateWiseData(){
    return this.http.get(this.dateWiseData, {responseType: 'text'})
    .pipe(map(result => {
      const rows = result.split('\n');
      const mainData = {};
      const header = rows[0];
      const dates = header.split(',');
      dates.splice(0, 4);
      rows.splice(0, 1);

      rows.forEach(row => {
        const cols = row.split(',');
        const country = cols[1];
        cols.splice(0, 4);
        mainData[country] = [];
        cols.forEach((value, index) => {
          const dateWise: DateWiseData = {
            cases: +value,
            country,
            date: new Date(Date.parse(dates[index]))
          };
          mainData[country].push(dateWise);
        });

      });

      return mainData;

    }));
  }

  getGlobalData(){
    return this.http.get(this.globalDataUrl, {responseType: 'text'}).pipe(
      map(result => {
        const data: GlobalDataSummary[] = [];
        const raw = {};
        const rows = result.split('\n');

        rows.splice(0, 1);
        rows.forEach(row => {
         const cols = row.split(/,(?=\S)/);

         const cs = {
          country: cols[3],
          confirmed: +cols[7],
          deaths: +cols[8],
          recovered: +cols[9],
          active: +cols[10]
         };

         const temp: GlobalDataSummary = raw[cs.country];
         if (temp){
           temp.active = cs.active + temp.active;
           temp.confirmed = cs.confirmed + temp.confirmed;
           temp.recovered = cs.recovered + temp.recovered;
           temp.deaths = cs.deaths + temp.deaths;
           raw[cs.country] = temp;
         }else{
           raw[cs.country] = cs;
         }
        });
        return  Object.values(raw) as GlobalDataSummary[];
      })
    );
  }
}
