import { Component, Inject, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormGroup, FormControl, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from '../common-components/error/error.component';
import { ActionNames } from '../interfaces/actions';
import { UtilityService } from '../utility/utility.service';
import { Client } from '../interfaces/client.interface';
import { MatButtonModule } from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatCheckboxModule, ReactiveFormsModule, CommonModule, ErrorComponent],
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.scss'
})
export class ClientFormComponent implements OnInit {
  factAddressDisabled: boolean = false;


  clientForm = this.formBuilder.group({
    name: ['', [Validators.pattern(/^([a-zA-Z]+|[\u10D0-\u10F0]+)$/),
    Validators.pattern('([a-zA-Z]+|[\\u10D0-\\u10F0]+)'), Validators.minLength(2), Validators.maxLength(50), Validators.required]],
    lastName: ['', [Validators.pattern(/^([a-zA-Z]+|[\u10D0-\u10F0]+)$/),
    Validators.pattern('([a-zA-Z]+|[\\u10D0-\\u10F0]+)'), Validators.minLength(2), Validators.maxLength(50), Validators.required]],
    sex: [''],
    pin: [0, [Validators.required, Validators.pattern('^[0-9]{11}$') ]],
    phone: [0, [Validators.required, Validators.pattern('^[0-9]{9}$') ]],
    jurAddress: this.formBuilder.group({
      country: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required],
    }),
    factAddress: this.formBuilder.group({
      country: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required],
    })
  })
  
  constructor(
  @Inject(MAT_DIALOG_DATA) public data: any, 
  private utilityService: UtilityService, 
  public dialogRef: MatDialogRef<any>,
  private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.getClientInfo();
  }

  getClientInfo() {
    if (this.data?.action === ActionNames.Edit && this.data?.id) {
      this.utilityService.getData<Client>(`clients/${this.data?.id}`).subscribe(client => {
        console.log('client', client)
        this.clientForm.patchValue(client);
      })
    }
  }

  getField(fieldName: string) {
    return this.clientForm.get(fieldName);
  }

  onSubmit() {
    console.log('submiting');
    if (!this.clientForm.valid) return;
    if (this.data?.action === ActionNames.Edit) {
      this.utilityService.updateData(`clients/${this.data?.id}`, this.clientForm.value).subscribe(() => 
        this.utilityService.clientUpdated.next(this.data?.id)
    );
    }

    if (this.data?.action === ActionNames.Add) {
      this.utilityService.addData<Client>('clients', this.clientForm.value).subscribe((res: Client) => {
        console.log('res add', res);
        this.utilityService.clientUpdated.next(res.id)
      })
    }

    this.dialogRef.close();
  }

  checkAddress(event: any) {
    console.log('event', event)
    this.factAddressDisabled = event;
    if (event) {
      this.clientForm.get('factAddress')?.patchValue(this.getField('jurAddress')?.value);
    } else {
      this.clientForm.get('factAddress')?.reset();
    }

  }

}
