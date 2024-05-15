import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { ErrorMessages } from '../../utility/error-messages';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [],
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss'
})
export class ErrorComponent {
  @Input() message: string ='';
  @Input() fieldName: string ='';
  @Input() field!: AbstractControl | null;
  

  generateMessage(): string {
    if (this.field?.hasError('required')) {
      return ErrorMessages.required
    }
    if (this.field?.hasError('minlength')) {
      return ErrorMessages.minlength
    }
    if (this.field?.hasError('maxlength')) {
      return ErrorMessages.maxlength
    }
    if (this.field?.hasError('pattern')) {
      return ErrorMessages.pattern
    }
    return 'error has occured';
  }

}
