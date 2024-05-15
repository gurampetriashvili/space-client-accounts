import { Routes } from '@angular/router';
import { ClientComponent } from './client/client.component';
import { ClientDetailsComponent } from './client-details/client-details.component';
import { clientResolver } from './utility/client-info-resolver';

export const routes: Routes = [
    {
        path: 'clients',
        component: ClientComponent,
        children: [
            { path: 'details', component: ClientDetailsComponent, resolve: { clientDetails: clientResolver } },
        ]
    },
    { path: '', redirectTo: '/clients', pathMatch: 'full' },
];
