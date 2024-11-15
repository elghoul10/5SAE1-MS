import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ClubService } from '../../manage-club/services/club.service';
import { Club } from '../../manage-club/models/course';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { UserService } from './../../services/user.service';
import { User } from './../../models/user';
import { AddClubDialogDashComponent } from './../../manage-club/add-club-dialog-dash/add-club-dialog-dash.component';

@Component({
  selector: 'app-university-list',
  templateUrl: './university-list.component.html',
  styleUrls: ['./university-list.component.scss'],
})
export class UniversityListComponent implements OnInit, AfterViewInit {
  filtredClubsList: Club[];
  searchInput: string = '';

  user: any = {};
  isEditMode: boolean = false;

  constructor(
    private addClubDialog: MatDialog,
    private clubService: ClubService,
    private ac: ActivatedRoute,

    private updateClubDialog: MatDialog,
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) {}

  dataSource = new MatTableDataSource<Club>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    const userId = this.authService.getUserIdFromToken();
    if (userId) {
      this.loadUser(userId);
    } else {
      console.error('User ID not found in token or token is missing.');
      // Handle the case when user ID is not available
    }

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

        clubs.forEach((club) => {
          // Vérifier si club.idCourse est non null avant d'appeler getAverageRatingForClub
        });
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

  onSearchChange(searchInput: string): void {
    if (!searchInput) {
      this.refreshClubList();
      return;
    }

    this.dataSource = new MatTableDataSource(this.filtredClubsList);
    this.dataSource.paginator = this.paginator;
  }

  onCategoryChange(): void {
    const checkboxes: NodeListOf<HTMLInputElement> =
      document.querySelectorAll('.m-check-input');

    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener('change', () => {
        const selectedCategories: string[] = [];

        checkboxes.forEach((checkbox) => {
          if (checkbox.checked) {
            selectedCategories.push(checkbox.id);
          }
        });

        this.dataSource = new MatTableDataSource(this.filtredClubsList);
        this.dataSource.paginator = this.paginator;
      });
    });
  }

  logout() {
    this.authService.logout();
    // Appelle la méthode de déconnexion
    this.router.navigate(['/uikit/user/login']);
  }

  loadUser(username: string): void {
    // Call your userService method to get the user ID from the username
    this.userService.getUserIdFromUsername(username).subscribe(
      (userId: any) => {
        if (userId) {
          // If user ID is retrieved, load the user using the user ID
          this.userService.getUserById(userId).subscribe(
            (user: User) => {
              user = user;
              this.isEditMode = true; // Set edit mode to true when user data is loaded
              console.log(user);
            },
            (error) => {
              console.error('Error fetching user data:', error);
            }
          );
        } else {
          console.error('User ID not found for username:', username);
          // Handle the case when user ID is not available
        }
      },
      (error) => {
        console.error('Error fetching user ID:', error);
      }
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
}
