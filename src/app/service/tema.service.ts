import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';

@Injectable({
  providedIn: 'root'
})
export class TemaService {

  constructor(
    private http: HttpClient
  ) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  refreshToken() {
    this.token = {
      headers: new HttpHeaders().set('Authorization', environment.token)
    }
  }

  // PEGA TODOS
  getAllTema(): Observable<Tema[]> {
    return this.http.get<Tema[]>(`${environment.uri}/temas`, this.token)
  }

  // PEGA POR ID
  getById(id: number): Observable<Tema> {
    return this.http.get<Tema>(`${environment.uri}/temas/${id}`, this.token)
  }

  // PEGA POR SERIE
  getBySerie(serie: number): Observable<Tema[]> {
    return this.http.get<Tema[]>(`${environment.uri}/temas/serie/${serie}`, this.token)
  }

  // POST
  postTema(tema: Tema): Observable<Tema> {
    return this.http.post<Tema>(`${environment.uri}/temas`, tema, this.token)
  }

  // ATUALIZAR(PUT)
  putTema(tema: Tema): Observable<Tema> {
    return this.http.put<Tema>(`${environment.uri}/temas`, tema, this.token)
  }

  // DELETAR
  deleteTema(id: number) {
    return this.http.delete(`${environment.uri}/temas/${id}`, this.token)
  }

}
