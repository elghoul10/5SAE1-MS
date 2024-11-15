import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-form-handler',
  templateUrl: './error-form-handler.component.html',
  styleUrls: ['./error-form-handler.component.scss'],
})
export class ErrorFormHandlerComponent {
  @Input() fieldIn: any;
  @Input() isFormSubmitedIn: boolean;
}
