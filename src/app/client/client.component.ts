import { Component } from '@angular/core';
import { ClientsListComponent } from '../clients-list/clients-list.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [ClientsListComponent, RouterModule],
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss'
})
export class ClientComponent {

}
