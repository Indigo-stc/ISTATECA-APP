import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Autor } from '../models/Autor';
import { Tipo } from '../models/Tipo';
import { Observable} from 'rxjs';
import { LibroEtiqueta } from '../models/LibroEtiqueta';
import { Etiqueta } from '../models/Etiqueta';
import { environment } from 'src/environments/environment';
//import { EtiquetaLibro } from '../models/EtiquetaLibro';


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
  private listarEtiqueta:string='http://localhost:8080/etiqueta/listar';
  private seleccionarEti:string='http://localhost:8080/etiqueta/buscar';
  private crearetiqueta:string='http://localhost:8080/tags/crear';
  private buscaretiqueta:string='http://localhost:8080/tags/etiquetasxlibro';

  
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
  buscarTiposxnombre2(nombre: string) {
    let res = this.urlendpointBuscarTipo+"?nombre="+nombre;
    return this.http.get<Tipo>(res);
  }

  buscarEtiquetas(id: number): Observable<LibroEtiqueta[]> {
    let res = this.buscaretiqueta + "?parametro="+id;
    return this.http.get<LibroEtiqueta[]>(res);
  }

  obteneEtiquetas(): Observable<Etiqueta[]> {
    return this.http.get<Etiqueta[]>(this.listarEtiqueta);
  }
  SeleccionarEti(id:number): Observable<Etiqueta> {
    let res = this.seleccionarEti + "/"+id;
    return this.http.get<Etiqueta>(res);
  }

  createEtiqueta(tipo:LibroEtiqueta):Observable<LibroEtiqueta>{
    return this.http.post<LibroEtiqueta>(this.crearetiqueta, tipo, {headers: this.httpHeaders})
  }

  eliminarEtiqueta(parametro: number): Observable<any> {
    const url = environment.rooturl+'/tags/eliminaretiqueta?parametro=' + parametro;
    return this.http.delete<any>(url,{
      responseType: 'text' as 'json', // Establece el tipo de respuesta como texto plano
      observe: 'response' // Importante para obtener la respuesta completa, incluyendo el status y headers
    });
  }

}
