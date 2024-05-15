import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { Account } from '../interfaces/account.interface';
import { UtilityService } from '../utility/utility.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AccountFormComponent } from '../account-form/account-form.component';

@Component({
  selector: 'app-accounts-list',
  standalone: true,
  imports: [MatListModule, MatTableModule, MatButtonModule],
  templateUrl: './accounts-list.component.html',
  styleUrl: './accounts-list.component.scss'
})
export class AccountsListComponent implements OnInit, OnDestroy {
  _clientId!: string;
  @Input() set clientId(value: string) {
    console.log('value', value);
    this._clientId = value;
    this.getAccounts(value)
}
  accounts: Account[] = [];
  displayedColumns: string[] = ['accountNumber', 'clientNumber', 'accountType', 'currency', 'status', 'actions'];

  constructor(
    private utilityService: UtilityService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.utilityService.accountUpdated.subscribe(clientId => this.getAccounts(clientId) );
  }

  ngOnDestroy(): void {
    this.utilityService.accountUpdated.unsubscribe();
  }

  getAccounts(customClientId: string) {
    this.utilityService.getData<Account[]>(`accounts?clientNumber=${customClientId}`).subscribe(res => {
      this.accounts = res;
    })
  }

  addAccount() {
    const dialogRef = this.dialog.open(AccountFormComponent, {
      data: {
        clientId: this._clientId
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  closeAccount(account: Account) {
    if (account.status === 'open') {
      this.utilityService.patchData(`accounts/${account.id}`, {status: "closed"}).subscribe(() => this.getAccounts(this._clientId))
    }
  }


}
