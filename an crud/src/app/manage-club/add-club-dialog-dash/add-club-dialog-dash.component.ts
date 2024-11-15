import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ClubService } from '../services/club.service';
import { Club } from '../models/course';
import { UniversiteTempService } from '../services/universiteTemp.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-add-club-dialog-dash',
  templateUrl: './add-club-dialog-dash.component.html',
  styleUrls: ['./add-club-dialog-dash.component.scss'],
})
export class AddClubDialogDashComponent implements OnInit {
  universites: any;
  imageFile: File | undefined;
  pdfFile: File | undefined;
  @ViewChild('fileInput') fileInput: any;
  @ViewChild('pdfInput') pdfInput: any;
  isFormSubmited = false;
  brandNewClub: Club;
  imageUrl: string | ArrayBuffer | null =
    './assets/images/profile/specDefaultImg.png';

  constructor(
    public addDialogRef: MatDialogRef<AddClubDialogDashComponent>,
    private clubService: ClubService,
    private universiteService: UniversiteTempService
  ) {}

  ngOnInit(): void {
    this.universiteService.getAllUniversites().subscribe((universites: any) => {
      this.universites = universites;
    });
  }

  onFileSelected(event: any): void {
    this.imageFile = event.target.files[0];
    if (this.imageFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(this.imageFile);
    }
  }

  onPdfSelected(event: any): void {
    this.pdfFile = event.target.files[0];
  }

  triggerFileInputClick(): void {
    this.fileInput.nativeElement.click();
  }

  triggerPdfInputClick(): void {
    this.pdfInput.nativeElement.click();
  }

  resetAvatarImage() {
    this.imageUrl = './assets/images/profile/specDefaultImg.png';
  }

  closeDialog(): void {
    this.addDialogRef.close();
  }

  submitForm(formData: any): void {
    this.isFormSubmited = true;
    const { nom, diplome, description } = formData.value;

    this.clubService
      .addClubWithFile(
        nom,
        diplome,
        description,
        this.imageFile || null,
        this.pdfFile || null
      )
      .subscribe({
        next: (res) => {
          console.log('Client ajouté avec succès', res);
          this.brandNewClub = res;
        },
        error: (err) => {
          console.log('Erreur lors de l’ajout du client', err);
        },
        complete: () => {
          this.addDialogRef.close(formData);
        },
      });
  }
}
