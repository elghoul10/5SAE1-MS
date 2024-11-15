import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.scss'],
})
export class YoutubeComponent {
  searchQuery: string;
  videoId: string;
  videoDetails: any;
  videoUrl: SafeResourceUrl;

  apiKey = 'AIzaSyBg6KqOnNETpyStbVy31Cer3Xt38rXWnoM';

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  searchVideo(): void {
    const apiUrl = `https://www.googleapis.com/youtube/v3/search?key=${this.apiKey}&part=snippet&type=video&q=${this.searchQuery}&maxResults=1`;

    this.http.get<any>(apiUrl).subscribe((data) => {
      if (data.items && data.items.length > 0) {
        this.videoId = data.items[0].id.videoId;
        this.fetchVideoDetails();
      } else {
        console.log(
          'Aucune vidéo trouvée pour la recherche : ',
          this.searchQuery
        );
      }
    });
  }

  fetchVideoDetails(): void {
    const url = `https://www.googleapis.com/youtube/v3/videos?id=${this.videoId}&key=${this.apiKey}&part=snippet,contentDetails,statistics`;

    this.http.get<any>(url).subscribe((data) => {
      this.videoDetails = data.items[0];
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        `https://www.youtube.com/embed/${this.videoId}`
      );
    });
  }
}
