import { __decorate } from "tslib";
import { Component } from '@angular/core';
let HomeComponent = class HomeComponent {
    constructor(dataService) {
        this.dataService = dataService;
        this.totalConfirmed = 0;
        this.totalActive = 0;
        this.totalDeath = 0;
        this.totalRecovered = 0;
        this.pieChart = {
            chartType: 'PieChart'
        };
        this.columnChart = {
            chartType: 'ColumnChart'
        };
    }
    initChart(caseType) {
        let datatable = [];
        datatable.push(["Country", "Cases"]);
        this.globalData.forEach(cs => {
            let value;
            if (caseType == 'active') {
                value = cs.active;
            }
            if (caseType == 'confirmed') {
                value = cs.confirmed;
            }
            if (caseType == 'death') {
                value = cs.deaths;
            }
            if (caseType == 'recovered') {
                value = cs.recovered;
            }
            datatable.push([
                cs.country, value
            ]);
        });
        console.log(datatable);
        this.pieChart = {
            chartType: 'PieChart',
            dataTable: datatable,
            //firstRowIsData: true,
            options: {
                height: 500
            },
        };
        this.columnChart = {
            chartType: 'ColumnChart',
            dataTable: datatable,
            //firstRowIsData: true,
            options: {
                height: 500,
                width: 500
            },
        };
    }
    updateChart(input) {
        //console.log(input)
        this.initChart(input.value);
    }
    ngOnInit() {
        this.dataService.getGlobalData()
            .subscribe({
            next: (result) => {
                console.log(result);
                this.globalData = result;
                result.forEach(cs => {
                    if (!Number.isNaN(cs.confirmed)) {
                        this.totalActive += cs.active;
                        this.totalConfirmed += cs.confirmed;
                        this.totalDeath += cs.deaths;
                        this.totalRecovered += cs.recovered;
                    }
                });
                this.initChart('confirmed');
            }
        });
    }
};
HomeComponent = __decorate([
    Component({
        selector: 'app-home',
        templateUrl: './home.component.html',
        styleUrls: ['./home.component.css']
    })
], HomeComponent);
export { HomeComponent };
//# sourceMappingURL=home.component.js.map