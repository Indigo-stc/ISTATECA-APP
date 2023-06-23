import { Injectable } from '@angular/core';
import { map, Observable,of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Libro } from '../models/Libro';
import { Autor } from '../models/Autor';

@Injectable({
  providedIn: 'root'
})
export class RegistroLibroService {
  private urlendpoint:string='http://localhost:8080/libro/crear';
  private urlendpoint1:string='http://localhost:8080/api/listarlibros';
  private urlBuscarLibro: string ='http://localhost:8080/api/listarlibrosxnombre';
  private urlListarAutor: string = 'http://localhost:8080/api/listarautor';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http:HttpClient) { }

  create(libro:Libro):Observable<Libro>{
    return this.http.post<Libro>(this.urlendpoint, libro, {headers: this.httpHeaders})
  }

  obtenerAutores(): Observable<Autor[]> {
    return this.http.get<Autor[]>(this.urlListarAutor);
  }
  obtenerLibro(nombre: String): Observable<Libro[]> {
   return this.http.get<Libro[]>(this.urlendpoint1);
  }

  buscarLibro (nombre:String)
  :Observable<Libro>{
    let res=this.urlBuscarLibro+'/'+nombre;
    return this.http.get<Libro>(res);
  }
}

