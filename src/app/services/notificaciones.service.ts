import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Notificacion } from '../models/Notificacion';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {
  nuevosRegistros: number = 0;
  nuevosRegistrosEst: number = 0;
  private urlendpointnotificacionblib: string = 'http://localhost:8080/notificacion/notificacionesbibliotecarios';
  private urlendpointnotificacionper: string = 'http://localhost:8080/notificacion/notificacionesxpersona';
  private urlendpointeditarnot: string = 'http://localhost:8080/notificacion/editar';
  public notificationlista: any[]=[];
  public notificationlistaest:any[]=[];

  constructor(private http: HttpClient) { }

  actualizarConteo(cantidad: number) {
    this.nuevosRegistros += cantidad;
  }

  actualizarConteoEst(cantidad: number) {
    this.nuevosRegistrosEst += cantidad;
  }

  getNotificacionBibliotecario(): Observable<Notificacion[]> {
    return this.http.get<Notificacion[]>(this.urlendpointnotificacionblib);
  }

  

  getNotificacionPersona(idSolicitante: number): Observable<Notificacion[]> {
    return this.http.get<Notificacion[]>(this.urlendpointnotificacionper+ "?idsolicitante=" + idSolicitante);
  }

  public getNotificationLista(): any[] {
    return this.notificationlista;
  }
  updateVisto(notificacion: Notificacion) {
    return this.http.put<Notificacion>(this.urlendpointeditarnot + "/" + notificacion.id, notificacion);
  }
}