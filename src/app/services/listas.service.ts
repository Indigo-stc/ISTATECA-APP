import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Autor } from '../models/Autor';
import { Tipo } from '../models/Tipo';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListasService {
  private urlendpoint:string='http://localhost:8080/autor/listar';
  private urlendpoint1:string='http://localhost:8080/tipo/listar';
  private urlendpointAutor:string='http://localhost:8080/autor/crear';
  private urlendpointBuscarAutor:string='http://localhost:8080/autor/listarautoresxnombre';
  private urlendpointBuscarTipo:string='http://localhost:8080/tipo/buscarxnombre';
  private urlendpointTipo:string='http://localhost:8080/tipo/crear';
  
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http:HttpClient) { }

  obtenerAutores(): Observable<Autor[]> {
    return this.http.get<Autor[]>(this.urlendpoint);
  }
  obtenerTipos(): Observable<Tipo[]> {
    return this.http.get<Tipo[]>(this.urlendpoint1);
  }

  createTipo(tipo:Tipo):Observable<Tipo>{
    return this.http.post<Tipo>(this.urlendpointTipo, tipo, {headers: this.httpHeaders})
  }

  createAutor(autor:Autor):Observable<Autor>{
    return this.http.post<Autor>(this.urlendpointAutor, autor, {headers: this.httpHeaders})
  }

  
  listarautoresxnombre(nombre: string)
    : Observable<Autor[]> {
    let res = this.urlendpointBuscarAutor + "/"+nombre;
    return this.http.get<Autor[]>(res);
  }
  buscarTiposxnombre(nombre: string)
    : Observable<Tipo[]> {
    let res = this.urlendpointBuscarTipo+"?nombre="+nombre;
    return this.http.get<Tipo[]>(res);
  }
  buscarTiposxnombre2(nombre: string)
    {
    let res = this.urlendpointBuscarTipo+"?nombre="+nombre;
    return this.http.get<Tipo>(res);
  }


}
