import { __decorate } from "tslib";
import { Component } from '@angular/core';
let CountriesComponent = class CountriesComponent {
    constructor(dataService) {
        this.dataService = dataService;
        this.countries = [];
        this.totalConfirmed = 0;
        this.totalActive = 0;
        this.totalDeath = 0;
        this.totalRecovered = 0;
    }
    ngOnInit() {
        this.dataService.getGlobalData().subscribe(result => {
            this.data = result;
            this.data.forEach(cs => {
                this.countries.push(cs.country);
            });
        });
    }
    updateValue(country) {
        console.log(country);
        this.data.forEach(cs => {
            if (cs.country == country) {
                this.totalRecovered = cs.recovered;
                this.totalConfirmed = cs.confirmed;
                this.totalDeath = cs.deaths;
                this.totalActive = cs.active;
            }
        });
    }
};
CountriesComponent = __decorate([
    Component({
        selector: 'app-countries',
        templateUrl: './countries.component.html',
        styleUrls: ['./countries.component.css']
    })
], CountriesComponent);
export { CountriesComponent };
//# sourceMappingURL=countries.component.js.map