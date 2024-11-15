import {
  Component,
  ViewChildren,
  ElementRef,
  AfterViewInit,
  QueryList,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClubService } from './../../manage-club/services/club.service';

@Component({
  selector: 'app-pub',
  templateUrl: './pub.component.html',
  styleUrls: ['./pub.component.scss'],
})
export class PubComponent implements AfterViewInit {
  @ViewChildren('star') starElements!: QueryList<ElementRef>;
  @ViewChild('output') outputElement!: ElementRef;
  private idCourse: string;

  constructor(
    private clubService: ClubService,
    private route: ActivatedRoute
  ) {}

  ngAfterViewInit(): void {
    this.initializeStars();
  }

  initializeStars(): void {
    this.starElements.forEach((star) => {
      star.nativeElement.classList.add('star');
    });
  }

  setRating(n: number): void {
    this.starElements.forEach((star, index) => {
      star.nativeElement.classList.remove(
        'one',
        'two',
        'three',
        'four',
        'five'
      );
      if (index < n) {
        star.nativeElement.classList.add(this.getStarClass(n));
      }
    });

    if (this.outputElement) {
      this.outputElement.nativeElement.innerText = `Rating is: ${n}/5`;
    }

    this.route.paramMap.subscribe((params) => {
      const idCourse = params.get('id');
    });
  }

  getStarClass(n: number): string {
    switch (n) {
      case 1:
        return 'one';
      case 2:
        return 'two';
      case 3:
        return 'three';
      case 4:
        return 'four';
      case 5:
        return 'five';
      default:
        return '';
    }
  }
}
