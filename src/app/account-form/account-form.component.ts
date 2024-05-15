import { Component, Inject } from '@angular/core';
import { Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UtilityService } from '../utility/utility.service';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from '../common-components/error/error.component';
import { AccountTypes, Currencies } from '../interfaces/account.interface';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-account-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ErrorComponent, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
  templateUrl: './account-form.component.html',
  styleUrl: './account-form.component.scss'
})
export class AccountFormComponent {
  accTypes = AccountTypes;
  currencies = Currencies;
  accountForm = this.formBuilder.group({
    accountNumber: [0, [Validators.required, Validators.pattern("^[0-9]*$")]],
    clientNumber: [{value: this.data.clientId, disabled: true}, [Validators.required, Validators.pattern("^[0-9]*$")]],
    accountType: ['', Validators.required],
    currency: ['', Validators.required],
    status: ['open'],
  })

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private utilityService: UtilityService,
    public dialogRef: MatDialogRef<any>,
    private formBuilder: FormBuilder) {
  }

  onSubmit() {
    this.utilityService.addData('accounts', this.accountForm.getRawValue()).subscribe(() => {
      this.utilityService.accountUpdated.next(this.data.clientId);
      this.dialogRef.close()
    })
  }

  getField(fieldName: string) {
    return this.accountForm.get(fieldName);
  }

}
