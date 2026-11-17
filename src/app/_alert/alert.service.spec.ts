import { TestBed } from '@angular/core/testing';
import { AlertService } from './alert.service';
import { Alert, AlertType } from './alert.model';

describe('AlertService', () => {
    let service: AlertService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(AlertService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should emit success alert with default id', () => {
        let emittedAlert: Alert | undefined;
        service.onAlert().subscribe(alert => emittedAlert = alert);

        service.success('Operation succeeded');

        expect(emittedAlert).toBeDefined();
        expect(emittedAlert?.message).toBe('Operation succeeded');
        expect(emittedAlert?.type).toBe(AlertType.Success);
        expect(emittedAlert?.id).toBe('default-alert');
    });

    it('should emit error alert with custom options', () => {
        let emittedAlert: Alert | undefined;
        service.onAlert().subscribe(alert => emittedAlert = alert);

        service.error('An error occurred', { autoClose: true, keepAfterRouteChange: true });

        expect(emittedAlert).toBeDefined();
        expect(emittedAlert?.message).toBe('An error occurred');
        expect(emittedAlert?.type).toBe(AlertType.Error);
        expect(emittedAlert?.autoClose).toBe(true);
        expect(emittedAlert?.keepAfterRouteChange).toBe(true);
    });

    it('should emit info alert', () => {
        let emittedAlert: Alert | undefined;
        service.onAlert().subscribe(alert => emittedAlert = alert);

        service.info('Info note');

        expect(emittedAlert?.type).toBe(AlertType.Info);
        expect(emittedAlert?.message).toBe('Info note');
    });

    it('should emit warning alert', () => {
        let emittedAlert: Alert | undefined;
        service.onAlert().subscribe(alert => emittedAlert = alert);

        service.warn('Warning notice');

        expect(emittedAlert?.type).toBe(AlertType.Warning);
        expect(emittedAlert?.message).toBe('Warning notice');
    });

    it('should support alerts targeted to specific id', () => {
        let defaultAlert: Alert | undefined;
        let customAlert: Alert | undefined;

        service.onAlert('default-alert').subscribe(alert => defaultAlert = alert);
        service.onAlert('custom-box').subscribe(alert => customAlert = alert);

        service.success('Custom message', { id: 'custom-box' });

        expect(defaultAlert).toBeUndefined();
        expect(customAlert).toBeDefined();
        expect(customAlert?.message).toBe('Custom message');
        expect(customAlert?.id).toBe('custom-box');
    });

    it('should send clear command for specified id', () => {
        let receivedAlert: Alert | undefined;
        service.onAlert('test-id').subscribe(alert => receivedAlert = alert);

        service.clear('test-id');

        expect(receivedAlert).toBeDefined();
        expect(receivedAlert?.id).toBe('test-id');
        expect(receivedAlert?.message).toBeUndefined();
    });

    it('should send clear command for default id when no id provided', () => {
        let receivedAlert: Alert | undefined;
        service.onAlert().subscribe(alert => receivedAlert = alert);

        service.clear();

        expect(receivedAlert).toBeDefined();
        expect(receivedAlert?.id).toBe('default-alert');
        expect(receivedAlert?.message).toBeUndefined();
    });
});

