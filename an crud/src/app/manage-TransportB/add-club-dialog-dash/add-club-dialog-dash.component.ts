import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ClubService } from '../services/club.service'; // ClubService pour l'appel API
import { Club } from '../models/course'; // Modèle `Club`
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
  @ViewChild('fileInput') fileInput: any;
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

  triggerFileInputClick(): void {
    this.fileInput.nativeElement.click();
  }

  resetAvatarImage() {
    this.imageUrl = './assets/images/profile/specDefaultImg.png';
  }

  closeDialog(): void {
    this.addDialogRef.close();
  }

  submitForm(formData: any): void {
    this.isFormSubmited = true;
    const { nomClient, descriptionOrdre, Cin, Num } = formData.value;

    this.clubService
      .addClub({
        id: null, // Initialisé à null
        nomClient,
        descriptionOrdre,
        Cin,
        Num,
      })
      .subscribe({
        next: (res) => {
          console.log('Ordre ajouté avec succès', res);
          this.brandNewClub = res;
        },
        error: (err) => {
          console.log('Erreur lors de l’ajout de l’ordre', err);
        },
        complete: () => {
          this.addDialogRef.close(formData);
        },
      });
  }
}
