import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Sugerencia } from '../models/Sugerencia';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class sugerenciaService{

  private urlCrearsugerencia: string = 'http://localhost:8080/sugerencia/crear';
  private urlEndPoint: string = 'http://localhost:8080/sugerencia/listar'

  
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })
  constructor(private http: HttpClient) { }

  create(sugerencias: Sugerencia): Observable<Sugerencia> {
    return this.http.post<Sugerencia>(this.urlCrearsugerencia, sugerencias,{headers:this.httpHeaders})

  }

  getSugerencia():Observable<Sugerencia[]> {
    return this.http.get<Sugerencia[]>(this.urlEndPoint);
  }
  
}