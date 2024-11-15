import { Component, OnInit } from '@angular/core';
import { ClubService } from '../services/club.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-delete-club',
  templateUrl: './delete-club.component.html',
  styleUrls: ['./delete-club.component.scss'],
})
export class DeleteClubComponent implements OnInit {
  id: any;
  constructor(
    private productService: ClubService,
    private activatedroute: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.id = this.activatedroute.snapshot.params['id'];
    this.productService.deleteClub(this.id).subscribe(
      () => {
        // ici je vais fair l'appel à this.refreshClubList();
        // alert('next');
      },
      (err) => {
        console.log('test', err.status);
      }
    );
  }
}
