import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

import { AlertComponent } from './_alert';

@Component({
    selector: 'app',
    standalone: true,
    imports: [RouterOutlet, RouterLink, AlertComponent],
    templateUrl: './app.component.html'
})
export class AppComponent { }
