import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-zoom-component-view',
  templateUrl: './zoom-component-view.component.html',
  styleUrls: ['./zoom-component-view.component.scss'],
})
export class ZoomComponentViewComponent implements OnInit {
  urlVar: string; // Variable to store the dynamic URL part
  url: SafeResourceUrl;

  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    // Subscribe to the route parameter changes to get the dynamic 'var' value
    this.route.params.subscribe((params) => {
      if (params['var']) {
        this.urlVar = params['var'];

        // Construct the URL dynamically using the retrieved 'var' value
        const baseUrl = 'https://meet.jit.si/';
        const fullUrl = baseUrl + this.urlVar;

        // Sanitize and assign the dynamically constructed URL to 'url'
        this.url = this.sanitizer.bypassSecurityTrustResourceUrl(fullUrl);
      }
    });
  }
}
