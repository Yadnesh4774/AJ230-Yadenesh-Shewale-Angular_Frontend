import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private apiUrl = 'http://localhost:8080/api/players';

  constructor(private http: HttpClient) {}

  getAllPlayers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  getPlayerById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  addPlayer(player: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, player);
  }

  updatePlayer(id: number, player: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, player);
  }

  deletePlayer(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getPlayersByNameEndingWith(suffix: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/ends-with/${suffix}`);
  }
  
}
