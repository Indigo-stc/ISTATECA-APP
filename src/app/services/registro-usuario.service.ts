import { Injectable } from '@angular/core';
//import { Usuario } from '../models/Usuario';
import { Persona } from '../models/Persona';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Bibliotecario } from '../models/Bibliotecario_Cargo';
import { PersonaP } from '../models/PersonaP'; import { Usuario } from '../models/Usuario';
;
@Injectable({
  providedIn: 'root'
})
export class RegistroUsuarioService {
  private urlendpoint: string = 'http://localhost:8080/api/crearusuario';
  private urlendpointcrearpers: string = 'http://localhost:8080/persona/crear';
  private urlendpointeditarpers: string = 'http://localhost:8080/persona/editar';
  private urlendpoint2: string = 'http://localhost:8080/usuariofenix/buscarusuario';
  private urlendpoint3: string = 'http://localhost:8080/api/editarusuario';
  private urlendpoint4: string = 'http://localhost:8080/persona/buscar';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })
  constructor(private http: HttpClient) { }

  /* create(usuario:Usuario):Observable<Usuario>{
    return this.http.post<Usuario>(this.urlendpoint, usuario, {headers: this.httpHeaders})
  } */
  createPersona(persona: Persona): Observable<Persona> {
    return this.http.post<Persona>(this.urlendpointcrearpers, persona, { headers: this.httpHeaders })
  }
  updatePersona(persona: Persona) {
    return this.http.put<Persona>(this.urlendpointeditarpers + "/" + persona.id, persona);
  }
  obtenerPersonasCedula(cedula: string): Observable<Persona> {
    //return of(CLIENTES)
    return this.http.get<Persona>(this.urlendpoint2 + "/" + cedula);

  }
  obtenerPersonasId(id: number) {
    return this.http.get<Persona>(this.urlendpoint4 + "/" + id)
  }
  obtenerUsuarios(): Observable<Usuario[]> {
    //return of(CLIENTES)
    return this.http.get<Usuario[]>(this.urlendpoint);
  }

  update(usuario: Usuario) {
    return this.http.put<Usuario>(this.urlendpoint3 + "/" + usuario.per_id, usuario);
  }
  obtenerUsuariosId(id: number) {
    return this.http.get<Usuario>(this.urlendpoint4 + "/" + id)
  }
}
