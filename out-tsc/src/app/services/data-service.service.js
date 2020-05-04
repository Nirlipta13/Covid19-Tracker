import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
let DataServiceService = class DataServiceService {
    constructor(http) {
        this.http = http;
        this.globalDataUrl = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/04-28-2020.csv";
    }
    getGlobalData() {
        return this.http.get(this.globalDataUrl, { responseType: 'text' }).pipe(map(result => {
            let data = [];
            let raw = {};
            let rows = result.split('\n');
            rows.splice(0, 1);
            rows.forEach(row => {
                let cols = row.split(/,(?=\S)/);
                let cs = {
                    country: cols[3],
                    confirmed: +cols[7],
                    deaths: +cols[8],
                    recovered: +cols[9],
                    active: +cols[10]
                };
                let temp = raw[cs.country];
                if (temp) {
                    temp.active = cs.active + temp.active;
                    temp.confirmed = cs.confirmed + temp.confirmed;
                    temp.recovered = cs.recovered + temp.recovered;
                    temp.deaths = cs.deaths + temp.deaths;
                    raw[cs.country] = temp;
                }
                else {
                    raw[cs.country] = cs;
                }
            });
            return Object.values(raw);
        }));
    }
};
DataServiceService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], DataServiceService);
export { DataServiceService };
//# sourceMappingURL=data-service.service.js.map