import { Injectable } from '@angular/core';

declare var gapi: any;

@Injectable({
  providedIn: 'root',
})
export class AdSenseService {
  private API_KEY = 'AIzaSyBLlgg2pLtecrC5J8pUoNEic2IqwZrGWUQ';
  private CLIENT_ID =
    '486900094600-gp1k8f4epf177l5gov2p5rr7k1nkal3e.apps.googleusercontent.com';
  private SCOPE = 'https://www.googleapis.com/auth/adsense';
  private discoveryDocs = [
    'https://www.googleapis.com/discovery/v1/apis/adsense/v1/rest',
  ];

  constructor() {}

  initializeApi(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      gapi.load('client:auth2', () => {
        gapi.client
          .init({
            apiKey: this.API_KEY,
            clientId: this.CLIENT_ID,
            discoveryDocs: this.discoveryDocs,
            scope: this.SCOPE,
          })
          .then(
            () => {
              console.log('Google AdSense API initialized');
              resolve();
            },
            (error: any) => {
              console.error('Error initializing Google AdSense API', error);
              reject(error);
            }
          );
      });
    });
  }

  getAdSenseAccounts(): Promise<any[]> {
    return gapi.client.adsense.accounts
      .list()
      .then((response: any) => response.result.items)
      .catch((error: any) => {
        console.error('Error fetching AdSense accounts', error);
        return [];
      });
  }
}
