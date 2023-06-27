import { Component, OnInit } from '@angular/core';
import { RegistroBibliotecarioService } from '../services/registro-bibliotecario.service';
import { Bibliotecario } from '../models/Bibliotecario_Cargo';
import { Persona } from '../models/Persona';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import Swal from 'sweetalert2';
import { RegistroUsuarioService } from '../services/registro-usuario.service';

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

  constructor(private usuarioservice: RegistroUsuarioService,private bibliotecarioservice: RegistroBibliotecarioService, private router: Router) { }

  ngOnInit(): void {
  }

  public create(): void {
    console.log("ha realizado un clic")
    //this.usuario=this.persona
    this.persona.activo = true;
    
    



    console.log(this.persona)

    if(this.persona.celular==="" ){
      Swal.fire({
        title: '<strong>Verifique su Cedula!</strong>',
        confirmButtonText: 'OK',
        confirmButtonColor: '#012844',
        icon: 'warning'
      })
    }else{
    this.usuarioservice.createPersona(this.persona).subscribe(
      
      response => {var personaJSONSET = JSON.stringify(response);
        localStorage.setItem("persona", personaJSONSET),console.log(response),this.bibliotecarios.persona = response
       /*,this.router.navigate([''])*/
        //Swal.fire('Usuario Guardado','Te damos la bienvenida "'+this.usuario.persona?.nombres+'" te has registrado con exito','success')
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
    this.usuarioservice.updatePersona(persona).subscribe(
      response=>{
        console.log(response)
        this.bibliotecarios.persona=response
      }
    )
  }

  public createbibliotecario() {
    

    console.log("ha realizado un clic")
    
    this.persona.activo = true;

    

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
    );
  }

  buscarFenix(cedula: string) {


    if (cedula == "") {
      alert('INGRESE UNA CEDULA')
    } else {
      if (cedula.length === 10) {
        this.usuarioservice.obtenerPersonasCedula(cedula).subscribe(
          response =>( this.persona = response,this.persona.fenixId=response.alumno_docenteId)


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
