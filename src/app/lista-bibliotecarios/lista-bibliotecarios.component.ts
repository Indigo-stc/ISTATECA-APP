import { Component, OnInit } from '@angular/core';
import { RegistroBibliotecarioService } from '../services/registro-bibliotecario.service';
import { Bibliotecario } from '../models/Bibliotecario_Cargo';
import { Persona } from '../models/Persona';
@Component({
  selector: 'app-lista-bibliotecarios',
  templateUrl: './lista-bibliotecarios.component.html',
  styleUrls: ['./lista-bibliotecarios.component.css']
})
export class ListaBibliotecariosComponent implements OnInit {
  bibliotecarios: Bibliotecario[] = [];
  bibli: Bibliotecario = new Bibliotecario;
  val: String = "";
  bus: boolean = true;
  buscarval: boolean = false;

  constructor(private bibliotecarioservice: RegistroBibliotecarioService) { }

  ngOnInit(): void {
    this.bibliotecarioservice.obtenerBibliotecarios().subscribe(
      bibliotecarios => this.bibliotecarios = bibliotecarios
    );
    this.buscarval = false;
    this.bus = true;
  }
  onKeydownEvent(event: KeyboardEvent, cedula:String): void {
    if(cedula==""){
     this.ngOnInit();
    }

 }

  buscar(cedula: String) {
    console.log("Cedula: "+cedula);
    this.bus = false;
      this.bibliotecarioservice.buscarBibliotecarios(cedula).subscribe(data => {
        this.bibli = data;
        this.buscarval = true;
      });
  }

 

}
