import { Injectable } from '@angular/core';
import { Bibliotecario } from '../models/Bibliotecario_Cargo';
import { Observable,of } from 'rxjs';
import { PersonaP } from '../models/PersonaP';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class RegistroBibliotecarioService {
  private urlendpoint:string='http://localhost:8080/api/crearbibliotecario';
  private urlendpoint1:string='http://localhost:8080/api/listarbibliotecario';
  private urlendpoint2:string='http://localhost:8080/api/bibliotecario_x_cedula';
  private urlendpoint4:string='http://localhost:8080/api/fenix_docente';
  private urlendpoint5:string='http://localhost:8080/api/editarbibliotecario';
  private urlendpoint6:string='http://localhost:8080/api/bibliotecario';

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http:HttpClient) { }

  create(bibliotecario:Bibliotecario):Observable<Bibliotecario>{
    return this.http.post<Bibliotecario>(this.urlendpoint, bibliotecario, {headers: this.httpHeaders})
  }
  obtenerBibliotecarios(): Observable<Bibliotecario[]> {
    //return of(CLIENTES)
    return this.http.get<Bibliotecario[]>(this.urlendpoint1);
  }

  obtenerPersonasId(ced:string) : Observable<PersonaP>{
    //return of(CLIENTES)
    return this.http.get<PersonaP>(this.urlendpoint4+"?ced="+ced);
  }

  buscarBibliotecarios(cedula:String):Observable<Bibliotecario>{
    let res=this.urlendpoint2+"?ced="+cedula;
    return this.http.get<Bibliotecario>(res);
  }

  update(bibliotecario:Bibliotecario){
    return this.http.put<Bibliotecario>(this.urlendpoint5+"/"+bibliotecario.id,bibliotecario);
      
  }

  obtenerBibliotecarioId(id:number){
    return this.http.get<Bibliotecario>(this.urlendpoint6+"/"+id)
  }
}
