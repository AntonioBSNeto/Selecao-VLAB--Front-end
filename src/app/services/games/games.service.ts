import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  baseUrl = "http://localhost:4123/https://www.freetogame.com/api/";

  constructor(private http: HttpClient) { }

  getGames(params?: any) {
    return this.http.get(this.baseUrl + "games", { params })
  }

  getGameById(id: string) {
    const param = new HttpParams().set('id', id)
    return this.http.get(this.baseUrl + "game", { params: param })
  }

}