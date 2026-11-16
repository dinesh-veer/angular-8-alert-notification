import { Component } from '@angular/core';

import { AlertComponent } from '../_alert/alert.component';
import { AlertService } from '../_alert/alert.service';

@Component({
    selector: 'app-multi-alerts',
    standalone: true,
    imports: [AlertComponent],
    templateUrl: './multi-alerts.component.html'
})
export class MultiAlertsComponent {
    constructor(public alertService: AlertService) { }
}
