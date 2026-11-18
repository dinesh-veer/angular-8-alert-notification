import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AlertService } from '../_alert';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './home.component.html'
})
export class HomeComponent {
    options = {
        autoClose: false,
        keepAfterRouteChange: false
    };

    constructor(public alertService: AlertService) { }
}
