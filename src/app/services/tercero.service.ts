import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Sugerencia } from '../models/Sugerencia';
import { Observable } from 'rxjs';
import { Tercero } from '../models/Tercero';
import { TerceroPrestamo } from '../models/TerceroPrestamo';

@Injectable({
  providedIn: 'root'
})
export class terceroService {

  private urlEndPoint: string = 'http://localhost:8080/tercero/terceroxcedula';
  private urlEndPointCrear: string = 'http://localhost:8080/tercero/crear';
  private urlEndPointCrear1: string = 'http://localhost:8080/terceroprestamo/crear';
  private urlEndPointListar: string = 'http://localhost:8080/tercero/listar';
  private urlEndPointEditar: string = 'http://localhost:8080/tercero/editar';


  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })
  constructor(private http: HttpClient) { }


  create(tercero: Tercero): Observable<Tercero> {
    return this.http.post<Tercero>(this.urlEndPointCrear, tercero, { headers: this.httpHeaders })
  }

  createTerPres(terceroprestamo: TerceroPrestamo): Observable<TerceroPrestamo> {
    return this.http.post<TerceroPrestamo>(this.urlEndPointCrear1, terceroprestamo, { headers: this.httpHeaders })
  }

  terceroxcedula(cedula: string) {
    return this.http.get<Tercero>(this.urlEndPoint + "/" + cedula);
  }

  obtenerTerceros(): Observable<Tercero[]> {
    //return of(CLIENTES)
    return this.http.get<Tercero[]>(this.urlEndPointListar);
  }
  updateTercero(tercero: Tercero) {
    return this.http.put<Tercero>(this.urlEndPointEditar + "/" + tercero.id, tercero);
  }
}