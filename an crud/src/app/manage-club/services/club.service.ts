import { Injectable } from '@angular/core';
import { Club } from '../models/course';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClubService {
  private base = 'http://localhost:8083/clients';

  constructor(private http: HttpClient) {}

  // Obtenir tous les clients
  getAllClubs(): Observable<Club[]> {
    return this.http.get<Club[]>(`${this.base}`);
  }

  // Obtenir un client par son ID
  getClub(id: any): Observable<Club> {
    return this.http.get<Club>(`${this.base}/${id}`);
  }

  // Ajouter un nouveau client
  addClub(data: any): Observable<Club> {
    return this.http.post<Club>(this.base, data);
  }

  // Mettre à jour un client
  updateClub(data: any): Observable<Club> {
    return this.http.put<Club>(this.base, data);
  }

  // Supprimer un client par son ID
  deleteClub(id: any): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }

  // Télécharger une image pour un client
  uploadImage(id: any, file: File): Observable<Club> {
    const formData: FormData = new FormData();
    formData.append('fileImage', file);
    return this.http.post<Club>(`${this.base}/uploadImage/${id}`, formData);
  }

  // Télécharger un fichier PDF pour un client
  uploadPdf(id: any, file: File): Observable<Club> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post<Club>(`${this.base}/uploadPdf/${id}`, formData);
  }

  // Ajouter un client avec des fichiers (image et PDF)
  addClubWithFile(
    nom: string,
    diplome: string,
    description: string,
    image: File | null,
    pdf: File | null
  ): Observable<Club> {
    const formData: FormData = new FormData();
    formData.append('nom', nom);
    formData.append('diplome', diplome);
    formData.append('description', description);

    if (image) formData.append('imageUrl', image);
    if (pdf) formData.append('pdf', pdf);

    return this.http.post<Club>(`${this.base}/addWithFile`, formData);
  }
}
