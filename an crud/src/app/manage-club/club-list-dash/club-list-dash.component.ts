import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ClubService } from '../services/club.service';
import { Club } from '../models/course';
import { ActivatedRoute, Router } from '@angular/router';
import { AddClubDialogDashComponent } from '../add-club-dialog-dash/add-club-dialog-dash.component';
import { DialogRef } from '@angular/cdk/dialog';
import { UpdateClubDialogDashComponent } from '../update-club-dialog-dash/update-club-dialog-dash.component';

@Component({
  selector: 'app-club-list-dash',
  templateUrl: './club-list-dash.component.html',
  styleUrls: ['./club-list-dash.component.scss'],
})
export class ClubListDashComponent implements AfterViewInit {
  ELEMENT_DATA: any = [];
  filtredClubsList: Club[];
  searchInput: string = '';

  constructor(
    private addClubDialog: MatDialog,
    private clubService: ClubService,
    private ac: ActivatedRoute,
    private router: Router,
    private updateClubDialog: MatDialog
  ) {}

  dataSource: MatTableDataSource<Club> = new MatTableDataSource<Club>();
  displayedColumns: string[] = ['name', 'description', 'universite', 'action'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.refreshClubList();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  refreshClubList(): void {
    this.clubService.getAllClubs().subscribe(
      (clubs) => {
        this.dataSource.data = clubs;
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.error(
          "Une erreur s'est produite lors de la récupération des clubs:",
          error
        );
      }
    );
  }

  onDeleteClub(id: any): void {
    this.clubService.deleteClub(id).subscribe(
      () => {
        this.refreshClubList();
      }
      // handle errors...
    );
  }

  openAddClubDialog(): void {
    const dialogRef = this.addClubDialog.open(AddClubDialogDashComponent, {
      width: '550px', // Set the width as per your design
      // Add any other dialog configuration options here
    });

    dialogRef.afterClosed().subscribe((result) => {
      // Handle the result after the dialog is closed (if needed)
      if (result) {
        console.log('The dialog save pressed', result);
        this.refreshClubList();
      } else {
        console.log('The dialog was closed', result);
      }
    });
  }

  openUpdateDialog(clubId: any): void {
    this.clubService.getClub(clubId).subscribe(
      (clubData) => {
        const dialogRef = this.updateClubDialog.open(
          UpdateClubDialogDashComponent,
          {
            width: '550px',
            data: clubData,
          }
        );

        // Vous pouvez également écouter la fermeture du dialogue si nécessaire
        dialogRef.afterClosed().subscribe((result) => {
          this.refreshClubList();
          console.log('Dialog closed with result:', result);
        });
      },
      (error) => {
        console.error('Error fetching club data:', error);
      }
    );
  }

  onSearchChange(searchInput: string): void {
    if (!searchInput.trim()) {
      // Si la saisie est vide, rafraîchir la liste complète
      this.refreshClubList();
      return;
    }

    const searchTerm = searchInput.toLowerCase().trim();

    // Filtrer les données en fonction de la recherche

    // Réaffecter les données filtrées au MatTableDataSource
    this.dataSource = new MatTableDataSource(this.filtredClubsList);
    this.dataSource.paginator = this.paginator;
  }
}
