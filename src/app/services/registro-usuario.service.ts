import { Injectable } from '@angular/core';
//import { Usuario } from '../models/Usuario';
import { Persona } from '../models/Persona';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Bibliotecario } from '../models/Bibliotecario_Cargo';
import { PersonaP } from '../models/PersonaP'; import { Usuario } from '../models/Usuario';
import { PersonaFenix } from '../models/PersonaFenix';
;
@Injectable({
  providedIn: 'root'
})
export class RegistroUsuarioService {
  private urlendpointlistarpersonas: string = 'http://localhost:8080/persona/listar';
  private urlendpointcrearpers: string = 'http://localhost:8080/persona/crear';
  private urlendpointeditarpers: string = 'http://localhost:8080/persona/editar';
  private urlendpointbuscar: string = 'http://localhost:8080/persona/personaxcedula';
  private urlendpointbuscarfuncion: string = 'http://localhost:8080/persona/personadocente';
  private urlendpoint2: string = 'http://localhost:8080/usuariofenix/buscarusuario';
  private urlendpoint3: string = 'http://localhost:8080/api/editarusuario';
  private urlendpoint4: string = 'http://localhost:8080/persona/registrardocenteadmin';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })
  constructor(private http: HttpClient) { }

  /* create(usuario:Usuario):Observable<Usuario>{
    return this.http.post<Usuario>(this.urlendpoint, usuario, {headers: this.httpHeaders})
  } */
  createPersona(persona: Persona): Observable<Persona> {
    return this.http.post<Persona>(this.urlendpointcrearpers, persona, { headers: this.httpHeaders })
  }

  createPersonaFuncion(persona: Persona,rol:string): Observable<any> {
    return this.http.post<Persona>(this.urlendpoint4+"?rol="+rol, persona, {responseType: 'text' as 'json',observe: 'response'})
  }

  updatePersona(persona: Persona) {
    return this.http.put<Persona>(this.urlendpointeditarpers + "/" + persona.id, persona);
  }

  obtenerCedula(cedula: string): Observable<Persona> {
    //return of(CLIENTES)
    return this.http.get<Persona>(this.urlendpointbuscar + "/" + cedula);

  }
  obtenerPersonasCedula(cedula: string): Observable<PersonaFenix> {
    //return of(CLIENTES)
    return this.http.get<Persona>(this.urlendpoint2 + "/" + cedula);

  }
  obtenerPersonasFuncion(cedula: string): Observable<Persona> {
    //return of(CLIENTES)
    return this.http.get<Persona>(this.urlendpointbuscarfuncion + "/" + cedula);

  }
  obtenerPersonasId(id: number) {
    return this.http.get<Persona>(this.urlendpoint4 + "/" + id)
  }
  obtenerUsuarios(): Observable<Persona[]> {
    //return of(CLIENTES)
    return this.http.get<Persona[]>(this.urlendpointlistarpersonas);
  }

  update(usuario: Usuario) {
    return this.http.put<Usuario>(this.urlendpoint3 + "/" + usuario.per_id, usuario);
  }
  obtenerUsuariosId(id: number) {
    return this.http.get<Usuario>(this.urlendpoint4 + "/" + id)
  }
}
