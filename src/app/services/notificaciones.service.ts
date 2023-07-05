import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Notificacion } from '../models/Notificacion';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {
  nuevosRegistros: number = 0;
  private urlendpointnotificacionblib: string = 'http://localhost:8080/notificacion/notificacionesbibliotecarios';
  private urlendpointnotificacionper: string = 'http://localhost:8080/notificacion/notificacionesxpersona';
  public notificationlista: any[]=[];

  constructor(private http: HttpClient) { }

  actualizarConteo(cantidad: number) {
    this.nuevosRegistros += cantidad;
  }

  getNotificacionBibliotecario(): Observable<Notificacion[]> {
    return this.http.get<Notificacion[]>(this.urlendpointnotificacionblib);
  }

  getNotificacionPersona(): Observable<Notificacion[]> {
    return this.http.get<Notificacion[]>(this.urlendpointnotificacionper);
  }

  public getNotificationLista(): any[] {
    return this.notificationlista;
  }
}