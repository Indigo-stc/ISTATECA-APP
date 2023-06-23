import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Autor } from '../models/Autor';
import { Tipo } from '../models/Tipo';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListasService {
  private urlendpoint:string='http://localhost:8080/api/listarautor';
  private urlendpoint1:string='http://localhost:8080/tipo/listar';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http:HttpClient) { }

  obtenerAutores(): Observable<Autor[]> {
    return this.http.get<Autor[]>(this.urlendpoint);
  }
  obtenerTipos(): Observable<Tipo[]> {
    return this.http.get<Tipo[]>(this.urlendpoint1);
  }

}
