import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, NavigationStart } from '@angular/router';
import { Subject } from 'rxjs';

import { AlertComponent } from './alert.component';
import { AlertService } from './alert.service';
import { Alert, AlertType } from './alert.model';

describe('AlertComponent', () => {
    let component: AlertComponent;
    let fixture: ComponentFixture<AlertComponent>;
    let alertService: AlertService;
    let routerEventsSubject: Subject<any>;

    beforeEach(async () => {
        routerEventsSubject = new Subject();
        const routerMock = {
            events: routerEventsSubject.asObservable()
        };

        await TestBed.configureTestingModule({
            imports: [AlertComponent],
            providers: [
                AlertService,
                { provide: Router, useValue: routerMock }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(AlertComponent);
        component = fixture.componentInstance;
        alertService = TestBed.inject(AlertService);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        expect(component.id).toBe('default-alert');
        expect(component.fade).toBe(true);
        expect(component.alerts.length).toBe(0);
    });

    it('should display received alert matching component id', () => {
        alertService.success('Hello world');
        fixture.detectChanges();

        expect(component.alerts.length).toBe(1);
        expect(component.alerts[0].message).toBe('Hello world');
        expect(component.alerts[0].type).toBe(AlertType.Success);

        const compiled = fixture.nativeElement as HTMLElement;
        const alertEl = compiled.querySelector('.alert');
        expect(alertEl).toBeTruthy();
        expect(alertEl?.textContent).toContain('Hello world');
    });

    it('should ignore alerts destined for other ids', () => {
        alertService.success('Hello other', { id: 'other-id' });
        fixture.detectChanges();

        expect(component.alerts.length).toBe(0);
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector('.alert')).toBeNull();
    });

    it('should return correct CSS classes for each alert type', () => {
        const successAlert = new Alert({ type: AlertType.Success, fade: false });
        expect(component.cssClass(successAlert)).toContain('alert alert-dismissable alert-success');

        const errorAlert = new Alert({ type: AlertType.Error, fade: false });
        expect(component.cssClass(errorAlert)).toContain('alert-danger');

        const infoAlert = new Alert({ type: AlertType.Info, fade: false });
        expect(component.cssClass(infoAlert)).toContain('alert-info');

        const warnAlert = new Alert({ type: AlertType.Warning, fade: false });
        expect(component.cssClass(warnAlert)).toContain('alert-warning');

        const fadingAlert = new Alert({ type: AlertType.Success, fade: true });
        expect(component.cssClass(fadingAlert)).toContain('fade');
    });

    it('should remove alert immediately when fade is false', () => {
        component.fade = false;
        alertService.success('Fast remove');
        fixture.detectChanges();

        expect(component.alerts.length).toBe(1);
        const alert = component.alerts[0];

        component.removeAlert(alert);
        fixture.detectChanges();

        expect(component.alerts.length).toBe(0);
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector('.alert')).toBeNull();
    });

    it('should fade out and remove alert after timeout when fade is true', () => {
        vi.useFakeTimers();
        try {
            component.fade = true;
            alertService.success('Fading alert');
            fixture.detectChanges();

            expect(component.alerts.length).toBe(1);
            const alert = component.alerts[0];

            component.removeAlert(alert);
            expect(alert.fade).toBe(true);
            expect(component.alerts.length).toBe(1);

            vi.advanceTimersByTime(250);
            fixture.detectChanges();

            expect(component.alerts.length).toBe(0);
        } finally {
            vi.useRealTimers();
        }
    });

    it('should auto-close alert after 3 seconds when autoClose option is true', () => {
        vi.useFakeTimers();
        try {
            alertService.success('Auto closing', { autoClose: true });
            fixture.detectChanges();

            expect(component.alerts.length).toBe(1);

            vi.advanceTimersByTime(3000); // Trigger removeAlert
            vi.advanceTimersByTime(250);  // Trigger fade timeout
            fixture.detectChanges();

            expect(component.alerts.length).toBe(0);
        } finally {
            vi.useRealTimers();
        }
    });

    it('should clear alerts when empty alert is received via alertService.clear', () => {
        alertService.success('Alert 1');
        alertService.info('Alert 2');
        fixture.detectChanges();

        expect(component.alerts.length).toBe(2);

        alertService.clear();
        fixture.detectChanges();

        expect(component.alerts.length).toBe(0);
    });

    it('should retain alerts with keepAfterRouteChange on clear and delete the flag', () => {
        alertService.success('Keep this', { keepAfterRouteChange: true });
        alertService.error('Discard this');
        fixture.detectChanges();

        expect(component.alerts.length).toBe(2);

        alertService.clear();
        fixture.detectChanges();

        expect(component.alerts.length).toBe(1);
        expect(component.alerts[0].message).toBe('Keep this');
        expect(component.alerts[0].keepAfterRouteChange).toBeUndefined();

        // On next clear, it should be removed
        alertService.clear();
        fixture.detectChanges();
        expect(component.alerts.length).toBe(0);
    });

    it('should clear alerts on router NavigationStart', () => {
        alertService.success('To be cleared by navigation');
        fixture.detectChanges();

        expect(component.alerts.length).toBe(1);

        routerEventsSubject.next(new NavigationStart(1, '/multi-alerts'));
        fixture.detectChanges();

        expect(component.alerts.length).toBe(0);
    });

    it('should remove alert when close button is clicked in the template', () => {
        alertService.success('Dismissible Alert');
        fixture.detectChanges();

        const compiled = fixture.nativeElement as HTMLElement;
        const closeBtn = compiled.querySelector('a.close') as HTMLAnchorElement;
        expect(closeBtn).toBeTruthy();

        vi.useFakeTimers();
        try {
            closeBtn.click();
            vi.advanceTimersByTime(250);
            fixture.detectChanges();

            expect(component.alerts.length).toBe(0);
        } finally {
            vi.useRealTimers();
        }
    });
});
