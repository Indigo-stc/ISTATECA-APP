import { Component, OnInit } from '@angular/core';
import { RegistroBibliotecarioService } from '../services/registro-bibliotecario.service';
import { Bibliotecario } from '../models/Bibliotecario_Cargo';
import { Persona } from '../models/Persona';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import Swal from 'sweetalert2';
import { RegistroUsuarioService } from '../services/registro-usuario.service';
import { PersonaService } from '../services/persona.service';

@Component({
  selector: 'app-form-bibliotecario',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponentb implements OnInit {
  public bibliotecarios: Bibliotecario = new Bibliotecario();
  persona: Persona = {};

  bibliotecarioE:Bibliotecario={};
  idb?:number;
  step = 1;
  totalSteps = 2;
  constructor(private usuarioservice: RegistroUsuarioService,private bibliotecarioservice: RegistroBibliotecarioService, private router: Router, private personaServices:PersonaService) { }

  ngOnInit(): void {
  }
  avanzar1() {
    if (this.step < this.totalSteps) {
      this.step++;
    }else{
      this.create();
    }
  }
  retroceder1() {
    if (this.step > 1) {
      this.step--;
    }
  }

  public create(): void {
    this.persona.activo = true;
    if(this.persona.celular==="" ){
      Swal.fire({
        title: '<strong>Verifique su Cedula!</strong>',
        confirmButtonText: 'OK',
        confirmButtonColor: '#012844',
        icon: 'warning'
      })
    }else{
    this.usuarioservice.createPersonaFuncion(this.persona).subscribe(
      response => {
        Swal.fire({
          title: '<strong>¡Usuario Guardado!</strong>',
          confirmButtonText: 'OK',
          confirmButtonColor: '#012844',
          icon: 'success',
          html:
            '<b>' + response.nombres + '</b><br>' +
            'te has registrado con exito'
        });
        this.createbibliotecario()
      },error=>(
        this.usuarioservice.obtenerCedula(this.persona.cedula+"").subscribe(
          response=>(
            alert(response.nombres),this.editarPersona(response)
          )
        )
      )
    )
    }

  }

  editarPersona(persona:Persona){
    persona.tipo=this.persona.tipo
    persona.correo=this.persona.correo
    this.personaServices.updatePersona(persona).subscribe(
      response=>{
        console.log(response)
        this.bibliotecarios.persona=response
      }
    )
  }

  public createbibliotecario() {
    this.persona.activo = true;
    this.bibliotecarioservice.create(this.bibliotecarios).subscribe(
      response => { this.bibliotecarios 
      Swal.fire({
        title: '<strong>¡Bibliotecario Guardado!</strong>',
        confirmButtonText: 'OK',
        confirmButtonColor: '#012844',
        icon: 'success',
        html:
          '<b>'+this.bibliotecarios.persona?.nombres+' '+this.bibliotecarios.persona?.apellidos+'</b><br>'+
          'te has registrado con exito'
      })
      this.router.navigate([''])
    }
    );
    
  }

  buscarFenix(cedula: string) {


    if (cedula == "") {
      Swal.fire({
        confirmButtonColor: '#012844',
        icon: 'warning',
        title: 'Ups...',
        text: 'Ingrese la cédula'
      })
    } else {
      if (cedula.length === 10) {
        this.usuarioservice.obtenerPersonasFuncion(cedula).subscribe(
          response =>( this.persona = response)


        )
        console.log(this.persona.cedula);
        if (this.persona.cedula == undefined) {

          
        }
      }else{

        this.persona.nombres=""
        this.persona.apellidos=""
        this.persona.celular=""
      }

    }



  }

}
