import { TestBed } from '@angular/core/testing';
import { DataServiceService } from './data-service.service';
describe('DataServiceService', () => {
    let service;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(DataServiceService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=data-service.service.spec.js.map