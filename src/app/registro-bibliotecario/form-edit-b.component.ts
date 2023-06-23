import { Component, OnInit } from '@angular/core';
import { Bibliotecario } from '../models/Bibliotecario_Cargo';
import { RegistroBibliotecarioService } from '../services/registro-bibliotecario.service';
import { Router } from '@angular/router';
import { Persona } from '../models/Persona';
import { PersonaP } from '../models/PersonaP';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-editBibliotecario',
  templateUrl: './form-edit-b.component.html',
  styleUrls: ['./form-edit-b.component.css']
})
export class FormEditBComponent implements OnInit {
  public reporteV: String = "";
  public bibliotecarios: Bibliotecario = new Bibliotecario();
  persona: Persona = {};
  personaP: PersonaP = {};
  bibliotecarioE: Bibliotecario = {};
  idb?: number;
  public  estado?:string;
  rols?:number;
  public tipob?:string;
  RadioAdmin: any = document.getElementById('admin');
  RadioBibliotecario: any = document.getElementById('biblioteca');


  constructor(public bibliotecarioservice: RegistroBibliotecarioService, private router: Router) { }

  ngOnInit(): void {
    this.reporteV = localStorage.getItem('bibliotecario') + "";
    console.log("Bibliotecario: " + this.reporteV + "")
    this.buscar(this.reporteV + "");

  }

  onKeydownEvent(event: KeyboardEvent, cedula: string): void {
    if (cedula == "") {
      alert('INGRESE UN ID')
      window.location.reload();
    }

    if (cedula !== "") {
      this.buscar(this.reporteV + "");
    }

  }

  actualizarBibliotecario(bibliotecarios: Bibliotecario) {
    Swal.fire({
      title: '¿Quieres guardar los cambios?',
      text: "¡No puede revertir los datos!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#012844',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Si, modificalo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.bibliotecarios.persona = this.persona
        this.bibliotecarios.id = this.bibliotecarioE.id
        this.persona.id = this.bibliotecarioE.persona?.id
        this.persona.activo = true;


        this.bibliotecarioservice.update(bibliotecarios)
          .subscribe(data => {
            this.bibliotecarios = data;
          })
          Swal.fire({
            title: '<strong>¡Bibliotecario Actualizado!</strong>',
              confirmButtonText: 'OK',
              confirmButtonColor: '#012844',
              icon: 'success',
              html:
              
                'El bibliotecario<br><b>'+this.bibliotecarios.persona?.nombres+'</b><br>'+
                'ha sido actualizado correctamente'
            
           }
           
          )
          this.router.navigate(['app-pagina-inicio'])



      }
    })
    


  

}

  buscar(idss: string) {

    this.idb = Number.parseInt(idss)

    this.bibliotecarioservice.obtenerBibliotecarioId(this.idb).subscribe(
      bibliotecarioE => {
        this.bibliotecarioE = bibliotecarioE, this.persona.cedula = bibliotecarioE.persona?.cedula, this.persona.nombres = bibliotecarioE.persona?.nombres, this.persona.celular = bibliotecarioE.persona?.celular
        , this.persona.correo = bibliotecarioE.persona?.correo, this.persona.tipo = bibliotecarioE.persona?.tipo
        if(bibliotecarioE.activoBibliotecario==true){
          this.estado="Activo"


        }else if(bibliotecarioE.activoBibliotecario==false){
          this.estado="Inactivo"

        }

        if(bibliotecarioE.persona?.tipo==1){
          this.tipob="Bibliotecario"
          
        }else if(bibliotecarioE.persona?.tipo==0){
          this.tipob="Administrador"
          
        }
      }
    )
  }
  tipoBibliotecario(rol:string){
    this.rols=Number.parseInt(rol)
    if(this.rols==0){
      alert("Admin")
    }else if(this.rols==1){
      alert("bibliotecario")
    }
  }

}
