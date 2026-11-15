import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { AppComponent } from './app.component';
import { AlertService } from './_alert/alert.service';

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AppComponent],
            providers: [
                AlertService,
                provideRouter([])
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the app', () => {
        expect(component).toBeTruthy();
    });

    it('should render navigation links', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        const links = compiled.querySelectorAll('a.btn-link');

        expect(links.length).toBe(2);
        expect(links[0].textContent).toContain('Single Alert');
        expect(links[1].textContent).toContain('Multiple Alerts');
    });

    it('should render alert component container and router outlet', () => {
        const compiled = fixture.nativeElement as HTMLElement;

        expect(compiled.querySelector('alert')).toBeTruthy();
        expect(compiled.querySelector('router-outlet')).toBeTruthy();
    });
});

