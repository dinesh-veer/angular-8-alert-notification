import { Routes } from '@angular/router';

import { HomeComponent } from './home';
import { MultiAlertsComponent } from './multi-alerts';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'multi-alerts', component: MultiAlertsComponent },
    { path: '**', redirectTo: '' }
];

