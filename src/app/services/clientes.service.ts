import { Injectable } from '@angular/core';
//import{CLIENTES} from './clientes.json';
import { Observable,of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private urlendpoint:string='http://localhost:8080/api/clientes';
  constructor(private http:HttpClient) { }
 /* obtenerClientes(): Observable < Cliente[]>{
    //return of (CLIENTES);
    return this.http.get<Cliente[]>(this.urlendpoint);
  }*/
}
