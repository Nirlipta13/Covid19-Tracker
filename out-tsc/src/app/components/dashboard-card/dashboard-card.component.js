import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
let DashboardCardComponent = class DashboardCardComponent {
    constructor() { }
    ngOnInit() {
    }
};
__decorate([
    Input('totalConfirmed')
], DashboardCardComponent.prototype, "totalConfirmed", void 0);
__decorate([
    Input('totalRecovered')
], DashboardCardComponent.prototype, "totalRecovered", void 0);
__decorate([
    Input('totalActive')
], DashboardCardComponent.prototype, "totalActive", void 0);
__decorate([
    Input('totalDeath')
], DashboardCardComponent.prototype, "totalDeath", void 0);
DashboardCardComponent = __decorate([
    Component({
        selector: 'dashboard-card',
        templateUrl: './dashboard-card.component.html',
        styleUrls: ['./dashboard-card.component.css']
    })
], DashboardCardComponent);
export { DashboardCardComponent };
//# sourceMappingURL=dashboard-card.component.js.map