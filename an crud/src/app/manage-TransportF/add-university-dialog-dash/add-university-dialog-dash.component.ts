import { Component, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-university-dialog-dash',
  templateUrl: './add-university-dialog-dash.component.html',
  styleUrls: ['./add-university-dialog-dash.component.scss'],
})
export class AddUniversityDialogDashComponent {
  constructor(
    public addDialogRef: MatDialogRef<AddUniversityDialogDashComponent>
  ) {}

  imageUrl: string | ArrayBuffer | null = './assets/images/profile/user-1.jpg'; // To store the URL of the selected image
  @ViewChild('fileInput') fileInput: any;
  // @Output() addFormSubmit: EventEmitter<any> = new EventEmitter<any>();

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // Read the selected image file and update the preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  triggerFileInputClick(): void {
    this.fileInput.nativeElement.click();
  }

  resetAvatarImage() {
    this.imageUrl = './assets/images/profile/user-1.jpg';
  }

  closeDialog(): void {
    this.addDialogRef.close();
  }

  submitForm(formData: any): void {
    // console.log('Form Data:', formData);
    // Emit the form data when the form is submitted
    // this.addFormSubmit.emit(formData);
    // Close the dialog
    // formData.userImage = this.imageUrl;
    this.addDialogRef.close(formData);
  }
}
