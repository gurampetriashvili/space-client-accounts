import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { UtilityService } from '../utility/utility.service';
import { Client } from '../interfaces/client.interface';
import { ActivatedRoute, Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { ClientFormComponent } from '../client-form/client-form.component';
import { ActionNames } from '../interfaces/actions';
import { ClientDetailsComponent } from '../client-details/client-details.component';


@Component({
  selector: 'app-clients-list',
  standalone: true,
  imports: [MatTableModule, MatButtonModule],
  templateUrl: './clients-list.component.html',
  styleUrl: './clients-list.component.scss'
})
export class ClientsListComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['name', 'lastName', 'sex', 'pin', 'actions'];
  dataSource: Client[] = [];

  constructor(
    private utilityService: UtilityService, 
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {

  }

  ngOnInit(): void {
    this.getClients();
    this.utilityService.clientUpdated.subscribe(res => this.getClients())
  }

  ngOnDestroy(): void {
    this.utilityService.clientUpdated.unsubscribe();
  }

  addData() {
    const dialogRef = this.dialog.open(ClientFormComponent, {
      data: {
        action: ActionNames.Add
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  editClient(clientId: number) {
    const dialogRef = this.dialog.open(ClientFormComponent, {
      data: {
        action: ActionNames.Edit,
        id: clientId
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  removeData() {
    console.log('remove');
  }

  getClients() {
    this.utilityService.getData<Client[]>('clients').subscribe(res => {
      console.log('res', res);
      this.dataSource = res;
    })
  }

  openDetails(clientId: number) {
    this.router.navigate(['./details', { id: clientId } ], { relativeTo: this.route })
  }

  async deleteClient(clientId: number) {
    this.utilityService.deleteData(`clients/${clientId}`).subscribe(() => 
      {
        this.router.navigate(['../'], { relativeTo: this.route })
        this.getClients();
      });
  }

}
