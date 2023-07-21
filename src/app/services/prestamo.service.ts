import { Injectable } from '@angular/core';
import { Prestamo } from '../models/Prestamo';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Libro } from '../models/Libro';

@Injectable({
  providedIn: 'root'
})
export class prestamoService {

  private urlEndPoint: string = 'http://localhost:8080/prestamo/listar';
  private urlEndPoint1: string = 'http://localhost:8080/prestamo/listarxestado'
  private urlEndPointVerifi: string = 'http://localhost:8080/prestamo/listaractivosxcedula'
  private urlEndPoint2: string = 'http://localhost:8080/prestamo/listarxcedula'
  private urlEditar: string = 'http://localhost:8080/prestamo/editar';
  private urlEndPointCrearPrestamo: string = 'http://localhost:8080/prestamo/crear';
  private urlEndPointFechas: string = 'http://localhost:8080/prestamo/reporteprestamos';
  private urlEndPointFechas2: string = 'http://localhost:8080/prestamo/prestamoconcarrera';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })
  constructor(private http: HttpClient) { }

  getPrestamos(): Observable<Prestamo[]> {
    return this.http.get<Prestamo[]>(this.urlEndPoint);
  }

  create(prestamos: Prestamo): Observable<Prestamo> {
    return this.http.post<Prestamo>(this.urlEndPointCrearPrestamo, prestamos, { headers: this.httpHeaders })
  }

  update(prestamo: Prestamo) {
    return this.http.put<Prestamo>(this.urlEditar + "/" + prestamo.id, prestamo);

  }

  listarxestado(estado_prestamo: number): Observable<Prestamo[]> {
    let res = this.urlEndPoint1 + '?parametro=' + estado_prestamo;
    return this.http.get<Prestamo[]>(res);
  }

  buscarPrestamo(cedula: String): Observable<Prestamo[]> {
    let res = this.urlEndPoint2 + '?cedula=' + cedula;
    return this.http.get<Prestamo[]>(res);
  }

  entreFechas(inicio: String, fin: String): Observable<Prestamo[]> {
    let res = this.urlEndPointFechas + '?inicio=' + inicio + '?fin=' + fin;
    return this.http.get<Prestamo[]>(res);
  }
  prestamoconcarrera(inicio: String, fin: String, idC: number): Observable<Prestamo[]> {
    let res = this.urlEndPointFechas2 + '?carreraId=' + idC + '&inicio=' + inicio + '&fin=' + fin;
    return this.http.get<Prestamo[]>(res);
  }

  verificardeudas(cedula: string): Observable<Prestamo[]> {
    let res = this.urlEndPointVerifi + '?cedula=' + cedula;
    return this.http.get<Prestamo[]>(res);
  }


}
