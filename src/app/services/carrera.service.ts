import { Injectable } from '@angular/core';
import { Carrera } from '../models/Carrera';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarreraService {
    private urlEndPoint: string='http://localhost:8080/carrera/listar';
    private urlEndPointBuscarId: string='http://localhost:8080/carrera/buscar';
  constructor(private http: HttpClient) { }
  getCarreras(): Observable <Carrera[]>{
    return this.http.get<Carrera[]>(this.urlEndPoint);
  }
  obtenerCarreraId(id:number) : Observable<Carrera>{
    //return of(CLIENTES)
    return this.http.get<Carrera>(this.urlEndPointBuscarId+"/"+id);
  }
}