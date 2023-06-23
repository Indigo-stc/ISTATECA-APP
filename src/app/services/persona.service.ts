import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpResponse, HttpUserEvent } from '@angular/common/http';
import { Persona } from "../models/Persona";
import { map, Observable } from 'rxjs';
import { Bibliotecario } from '../models/Bibliotecario_Cargo';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  private urlendpoint: string = 'http://localhost:8080/api/validarLogin';
  private urlendpoint1: string = 'http://localhost:8080/api/num_rol';
  private urlendpoint2: string = 'http://localhost:8080/api/validarPersona';
  private urlendpoint3: string = 'http://localhost:8080/api/tipocliente';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })
  constructor(private http: HttpClient) { }
  validarLogin(usuario: String, clave: String):Observable<boolean>{
    let res=this.urlendpoint+"?usuario="+usuario+"&clave="+clave;
    return this.http.get<boolean>(res);
  }
  num_rol(usuario: String):Observable<number>{
    let res=this.urlendpoint1+"?usuario="+usuario;
    return this.http.get<number>(res);
  }
  val_persona(usuario:String, clave:String):Observable<Persona>{
    let res=this.urlendpoint2+"?usuario="+usuario+"&clave="+clave;
    return this.http.get<Persona>(res);
  }
 /* tipo_usuario(id_persona:number, rol:number):Observable<Usuario>{
    let res=this.urlendpoint3+"?id_persona="+id_persona+"&rol="+rol;
    return this.http.get<Usuario>(res);
  }
  tipo_biblitecario(id_persona:number, rol:number):Observable<Bibliotecario>{
    let res=this.urlendpoint3+"?id_persona="+id_persona+"&rol="+rol;
    return this.http.get<Bibliotecario>(res);
  }*/
  
}
