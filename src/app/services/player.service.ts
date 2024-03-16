import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../envirenment/envirenment';
import { Player } from '../models/Player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  createPlayer(player: Player): Observable<Player> {
    return this.http.post<Player>(`${this.apiUrl}/player/add`, player);
  }
  getAllPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(`${this.apiUrl}/player/getAll`);
  }
  updatePlayer(playerId: number, player: Player): Observable<Player> {
    return this.http.put<Player>(`${this.apiUrl}/player/update/${playerId}`, player);

  }
  deletePlayer(playerId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/player/delete/${playerId}`);
  }
}
