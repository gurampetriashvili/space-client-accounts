import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Client } from '../interfaces/client.interface';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { UtilityService } from '../utility/utility.service';
import {MatTabsModule} from '@angular/material/tabs';
import { AccountsListComponent } from '../accounts-list/accounts-list.component';

@Component({
  selector: 'app-client-details',
  standalone: true,
  imports: [CommonModule, MatListModule, MatDividerModule, MatTabsModule, AccountsListComponent],
  templateUrl: './client-details.component.html',
  styleUrl: './client-details.component.scss'
})
export class ClientDetailsComponent implements OnInit, OnDestroy {

  client!: Client;
  subscription: any;

  constructor(private route: ActivatedRoute, private utilityService: UtilityService) { }

  getClientInfo(clientId: string) {
    console.log('subject triggered', clientId);
    this.utilityService.getData<Client>(`clients/${clientId}`).subscribe(res => this.client = res)
  }

  ngOnInit(): void {
    this.route.data.subscribe(res => {
      console.log('clientDetails', res);
      this.client = res['clientDetails']
    })
    this.utilityService.clientUpdated.subscribe(res => {
      if (res === this.client?.id) {
        this.getClientInfo(res);
      }
    })
  }

  ngOnDestroy(): void {
    this.utilityService.clientUpdated.unsubscribe();
  }

}
