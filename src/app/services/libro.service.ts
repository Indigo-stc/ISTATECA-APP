import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Libro } from '../models/Libro';
import { Autor } from '../models/Autor';

@Injectable({
  providedIn: 'root'
})
export class LibroService {
  private urlendpoint: string = 'http://localhost:8080/libro/crear';
  private urlendpoint1: string = 'http://localhost:8080/libro/listar';
  private urlBuscarLibro: string = 'http://localhost:8080/libro/listarlibrosxnombre';
  private urlListarAutor: string = 'http://localhost:8080/autor/listar';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient) { }

  create(libro: any): Observable<Libro> {
    return this.http.post<Libro>(this.urlendpoint, libro, { headers: this.httpHeaders })
  }
  obtenerLibros(): Observable<Libro[]> {
    return this.http.get<Libro[]>(this.urlendpoint1);
  }
  buscarLibro(nombre: String)
    : Observable<Libro[]> {
    let res = this.urlBuscarLibro + '/' + nombre;
    return this.http.get<Libro[]>(res);
  }
}

