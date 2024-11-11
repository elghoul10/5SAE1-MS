import { Component, ViewChild, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClubService } from '../services/club.service';
import { ActivatedRoute } from '@angular/router';
import { UniversiteTempService } from '../services/universiteTemp.service';
import { Club } from '../models/course';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-update-club-dialog-dash',
  templateUrl: './update-club-dialog-dash.component.html',
  styleUrls: ['./update-club-dialog-dash.component.scss'],
})
export class UpdateClubDialogDashComponent implements OnInit {
  clubData: any;
  clubId: any;
  universites: any;
  imageFile: File | undefined;
  @ViewChild('fileInput') fileInput: any;
  isFormSubmited = false;
  brandNewClub: Club;

  constructor(
    public updateDialogRef: MatDialogRef<UpdateClubDialogDashComponent>,
    private clubService: ClubService,
    private universiteService: UniversiteTempService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    console.log('tesssssst', this.data);
    this.universiteService.getAllUniversites().subscribe((universites: any) => {
      this.universites = universites;
    });
  }

  uploadUrl = 'http://localhost:8081/upload-directory/';
  imageUrl = `${this.uploadUrl}/${this.data.imgUrl}`;

  onFileSelected(event: any): void {
    this.imageFile = event.target.files[0];
    if (this.imageFile) {
      // Read the selected image file and update the preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(this.imageFile);
    }
  }

  triggerFileInputClick(): void {
    this.fileInput.nativeElement.click();
  }

  resetAvatarImage() {
    this.imageUrl = `${this.uploadUrl}/${this.data.imgUrl}`;
    this.imageFile = undefined;
  }

  closeDialog(): void {
    this.updateDialogRef.close();
  }

  submitForm(formData: any): void {
    console.log('testUpdate');

    console.log(formData.value);
    this.isFormSubmited = true;
    // if (formData.valid) {
    if (!this.imageFile) {
      formData.value.imgUrl = 'specDefaultImg.png';
    }

    formData.value.idCourse = this.data.idCourse;
    this.clubService.updateClub(formData.value).subscribe({
      next: (res) => {
        console.log(res);
        this.brandNewClub = res;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        let imageUploadCompleted = new Subject();

        if (this.imageFile) {
          this.clubService
            .uploadImage(this.brandNewClub.nom, this.imageFile)
            .subscribe({
              next: (res) => {
                console.log('1_image upload********************');
                console.log(res);
              },
              error: (err) => {
                // console.log(err);
              },
              complete: () => {
                imageUploadCompleted.next(null);
                imageUploadCompleted.complete();
              },
            });
        } else {
          imageUploadCompleted.next(null);
          imageUploadCompleted.complete();
        }
        this.updateDialogRef.close(formData);
      },
    });
    // }
  }
}
