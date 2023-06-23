import { Component, OnInit } from '@angular/core';
import { RegistroBibliotecarioService } from '../services/registro-bibliotecario.service';
import { Bibliotecario } from '../models/Bibliotecario_Cargo';
import { Persona } from '../models/Persona';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { PersonaP } from '../models/PersonaP';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-bibliotecario',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponentb implements OnInit {
  public bibliotecarios: Bibliotecario = new Bibliotecario();
  persona: Persona = {};
  personaP: PersonaP = {};
  bibliotecarioE:Bibliotecario={};
  idb?:number;

  constructor(private bibliotecarioservice: RegistroBibliotecarioService, private router: Router) { }

  ngOnInit(): void {
  }

  public createbibliotecario(login: NgForm) {

    console.log("ha realizado un clic")
    this.bibliotecarios.persona = this.persona
    this.persona.activo = true;

    this.persona.cedula = this.personaP.cedula
    this.persona.nombres = this.personaP.nombres
    this.persona.correo = this.personaP.correo
    this.persona.celular = this.personaP.celular

    console.log(this.bibliotecarios.persona)
    console.log(this.persona.tipo)
    this.bibliotecarioservice.create(this.bibliotecarios).subscribe(
      response => { this.bibliotecarios 
      Swal.fire({
        title: '<strong>¡Bibliotecario Guardado!</strong>',
        confirmButtonText: 'OK',
        confirmButtonColor: '#012844',
        icon: 'success',
        html:
          '<b>'+this.bibliotecarios.persona?.nombres+'</b><br>'+
          'te has registrado con exito'
      })
    }
    ); login.reset();
  }

  buscarFenix(cedula: string, nombre: string) {
    if (cedula == "") {
      alert('INGRESE UNA CEDULA')
    } else {
      console.log(cedula)
      this.bibliotecarioservice.obtenerPersonasId(cedula).subscribe(
        personaP => this.personaP = personaP


      )
      console.log(this.personaP.cedula);
      if (this.personaP.cedula == undefined) {
        alert('Cedula no registrada')
        //this.router.navigate([''])
      }
    }







  }

}
