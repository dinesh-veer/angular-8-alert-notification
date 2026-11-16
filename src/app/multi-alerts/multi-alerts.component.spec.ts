import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { MultiAlertsComponent } from './multi-alerts.component';
import { AlertService } from '../_alert/alert.service';

describe('MultiAlertsComponent', () => {
    let component: MultiAlertsComponent;
    let fixture: ComponentFixture<MultiAlertsComponent>;
    let alertService: AlertService;

    beforeEach(async () => {
        const routerMock = {
            events: new Subject().asObservable()
        };

        await TestBed.configureTestingModule({
            imports: [MultiAlertsComponent],
            providers: [
                AlertService,
                { provide: Router, useValue: routerMock }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(MultiAlertsComponent);
        component = fixture.componentInstance;
        alertService = TestBed.inject(AlertService);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should trigger alertService.success with id alert-1', () => {
        const spy = vi.spyOn(alertService, 'success');
        const compiled = fixture.nativeElement as HTMLElement;
        const leftCol = compiled.querySelectorAll('.col')[0];
        const btnSuccess = leftCol.querySelector('.btn-success') as HTMLButtonElement;

        btnSuccess.click();

        expect(spy).toHaveBeenCalledWith('Success on the left!!', { id: 'alert-1' });
    });

    it('should trigger alertService.error with id alert-2', () => {
        const spy = vi.spyOn(alertService, 'error');
        const compiled = fixture.nativeElement as HTMLElement;
        const rightCol = compiled.querySelectorAll('.col')[1];
        const btnError = rightCol.querySelector('.btn-danger') as HTMLButtonElement;

        btnError.click();

        expect(spy).toHaveBeenCalledWith('Error on the right :(', { id: 'alert-2' });
    });

    it('should clear alerts for alert-1 independently', () => {
        const spy = vi.spyOn(alertService, 'clear');
        const compiled = fixture.nativeElement as HTMLElement;
        const leftCol = compiled.querySelectorAll('.col')[0];
        const btnClear = leftCol.querySelector('.btn-outline-dark') as HTMLButtonElement;

        btnClear.click();

        expect(spy).toHaveBeenCalledWith('alert-1');
    });

    it('should clear alerts for alert-2 independently', () => {
        const spy = vi.spyOn(alertService, 'clear');
        const compiled = fixture.nativeElement as HTMLElement;
        const rightCol = compiled.querySelectorAll('.col')[1];
        const btnClear = rightCol.querySelector('.btn-outline-dark') as HTMLButtonElement;

        btnClear.click();

        expect(spy).toHaveBeenCalledWith('alert-2');
    });
});

