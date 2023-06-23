import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NgForm } from '@angular/forms';
import { RegistroUsuarioService } from '../services/registro-usuario.service';
import { Usuario } from '../models/Usuario';
import { Persona } from '../models/Persona';
import { InicioSesionComponent } from '../inicio-sesion/inicio-sesion.component';
import { RouterLink } from '@angular/router';
import { PersonaP } from '../models/PersonaP';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  public usuario: Usuario = new Usuario();
  persona: Persona = {};
  personaP: PersonaP = {};


  constructor(private usuarioservice: RegistroUsuarioService, private router: Router) { }


  ngOnInit(): void {
  }






  public create(): void {
    console.log("ha realizado un clic")
    //this.usuario=this.persona
    this.persona.activo = true;
    this.persona.tipo = 2;



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
        localStorage.setItem("persona", personaJSONSET),console.log(response)
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
        })
        this.router.navigate([''])
      }
      
    )
    }

  }
  //////VALIDAR CLAVE//////
  public validar(): void {
    const clave1 = document.getElementById('clave1') as HTMLInputElement;
    const clave2 = document.getElementById('clave2') as HTMLInputElement;
    const alertaClave1 = document.getElementById('alertaClave1') as HTMLSpanElement;
    const alertaClave2 = document.getElementById('alertaClave2') as HTMLSpanElement;
    const botonEnviar = document.getElementById('botonEnviar') as HTMLButtonElement;
    if (clave1.value === clave2.value) {
      alertaClave1.innerText = '';
      alertaClave2.innerText = '';
      botonEnviar.disabled = false;
    } else {
      alertaClave1.innerText = 'Las contraseñas no coinciden';
      alertaClave2.innerText = 'Las contraseñas no coinciden';
      botonEnviar.disabled = true;
    }
  }



  buscarFenix(cedula: string) {


    if (cedula == "") {
      alert('INGRESE UNA CEDULA')
    } else {
      if (cedula.length === 10) {
        this.usuarioservice.obtenerPersonasCedula(cedula).subscribe(
          response =>( this.persona = response)


        )
        console.log(this.persona.cedula);
        if (this.persona.cedula == undefined) {

          this.router.navigate([''])
        }
      }else{

        this.persona.nombres=""
        this.persona.apellidos=""
        this.persona.celular=""
      }

    }



  }

}
