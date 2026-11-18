import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { AlertService } from '../_alert/alert.service';

describe('HomeComponent', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;
    let alertService: AlertService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HomeComponent, FormsModule],
            providers: [AlertService]
        }).compileComponents();

        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        alertService = TestBed.inject(AlertService);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        expect(component.options.autoClose).toBe(false);
        expect(component.options.keepAfterRouteChange).toBe(false);
    });

    it('should call alertService.success on Success button click', () => {
        const spy = vi.spyOn(alertService, 'success');
        const compiled = fixture.nativeElement as HTMLElement;
        const btn = compiled.querySelector('.btn-success') as HTMLButtonElement;

        btn.click();

        expect(spy).toHaveBeenCalledWith('Success!!', component.options);
    });

    it('should call alertService.error on Error button click', () => {
        const spy = vi.spyOn(alertService, 'error');
        const compiled = fixture.nativeElement as HTMLElement;
        const btn = compiled.querySelector('.btn-danger') as HTMLButtonElement;

        btn.click();

        expect(spy).toHaveBeenCalledWith('Error :(', component.options);
    });

    it('should call alertService.info on Info button click', () => {
        const spy = vi.spyOn(alertService, 'info');
        const compiled = fixture.nativeElement as HTMLElement;
        const btn = compiled.querySelector('.btn-info') as HTMLButtonElement;

        btn.click();

        expect(spy).toHaveBeenCalledWith('Some info....', component.options);
    });

    it('should call alertService.warn on Warn button click', () => {
        const spy = vi.spyOn(alertService, 'warn');
        const compiled = fixture.nativeElement as HTMLElement;
        const btn = compiled.querySelector('.btn-warning') as HTMLButtonElement;

        btn.click();

        expect(spy).toHaveBeenCalledWith('Warning: ...', component.options);
    });

    it('should call alertService.clear on Clear button click', () => {
        const spy = vi.spyOn(alertService, 'clear');
        const compiled = fixture.nativeElement as HTMLElement;
        const btn = compiled.querySelector('.btn-outline-dark') as HTMLButtonElement;

        btn.click();

        expect(spy).toHaveBeenCalled();
    });

    it('should update options when checkboxes are toggled', async () => {
        const compiled = fixture.nativeElement as HTMLElement;
        const autoCloseInput = compiled.querySelector('#autoClose') as HTMLInputElement;
        const keepInput = compiled.querySelector('#keepAfterRouteChange') as HTMLInputElement;

        autoCloseInput.click();
        keepInput.click();
        fixture.detectChanges();
        await fixture.whenStable();

        expect(component.options.autoClose).toBe(true);
        expect(component.options.keepAfterRouteChange).toBe(true);
    });
});

