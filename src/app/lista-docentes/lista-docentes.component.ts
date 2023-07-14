import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Libro } from '../models/Libro';
import { Persona } from '../models/Persona';
import { Prestamo } from '../models/Prestamo';
import { LibroService } from '../services/libro.service';
import { NotificacionesService } from '../services/notificaciones.service';
import { RegistroUsuarioService } from '../services/registro-usuario.service';
import { setDate } from 'date-fns';

@Component({
  selector: 'app-lista-docentes',
  templateUrl: './lista-docentes.component.html',
  styleUrls: ['./lista-docentes.component.css']
})
export class ListaDocentesComponent implements OnInit{
  prestamos: Prestamo = new Prestamo();
  persona: Persona = new Persona();
  libros: Libro[] = [];
  personasTipo2: Persona[] = [];
  personasTipo2b: Persona = new Persona();
  listapersonavalida: Persona[] = [];
  reporteV: string = "";
  datos: string = "";
  datoslibro: string = "";
  buscar: boolean = true;
  normal: boolean = false;

  constructor(private libroService: LibroService, private router: Router, private router1: Router, private notificacionesService: NotificacionesService,private usuarioService:RegistroUsuarioService) { }

  ngOnInit(): void {
    this.usuarioService.obtenerUsuarios().subscribe(
      personas => (this.validarDocente(personas))
    );

    this.buscar = false;
    this.normal = true;
    let usuarioJSON = localStorage.getItem('persona') + "";
    this.persona = JSON.parse(usuarioJSON);


  }

  validarDocente(personas:Persona[]){
    console.log(personas.length)
    for (let index = 0; index < personas.length; index++) {
      if (personas[index].tipo == 2) {
        this.personasTipo2 = personas.filter(persona => persona.tipo === 2);
        console.log(this.personasTipo2)
      }
      
    }
    
  }


  

  onKeydownEvent(event: KeyboardEvent, cedula: String): void {
    this.normal = false;
    if (cedula == "") {
      this.ngOnInit();
    }else{
      this.usuarioService.obtenerCedula(cedula+"").subscribe(
        response=>(
          console.log(response),this.personasTipo2b=response,
          this.buscar = true
        ),(error)=>(
          console.log("Error al obtener datos del servidor")
        )
      )
    }
  }

  


  Editar(persona: Persona) {
    if(persona.activo===true){
      persona.activo=false;
      this.usuarioService.updatePersona(persona).subscribe(
        response=>{
          Swal.fire({
            confirmButtonColor: '#012844',
            icon: 'success',
            title: 'Actualizado',
            text: '¡Se ha cambiado el estado ha no disponible!'
    
          })
        }
      )
    }else if(persona.activo===false){
      persona.activo=true;
      this.usuarioService.updatePersona(persona).subscribe(
        response=>{
          Swal.fire({
            confirmButtonColor: '#012844',
            icon: 'success',
            title: 'Actualizado',
            text: '¡Se ha cambiado el estado ha disponible!'
    
          })
        }
      )
    }
    
  }
  

  cerrarpopup() {
    var overlay = document.getElementById('overlay');
    overlay?.classList.remove('active');
  }



  public crearPrestamo(paginacrear: any) {
    
  }
  public notificar(){
    this.notificacionesService.getNotificacionBibliotecario().subscribe(
        response =>(console.log(response),this.notificacionesService.notificationlista=response,console.log(this.notificacionesService.notificationlista))
    )
}
  confirmar(paginacrear: Libro) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '¿Confirme la solicitud?',
      text: "Este paso es irreversible esta seguro!!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, acepto!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.crearPrestamo(paginacrear);
        swalWithBootstrapButtons.fire(
          'Confirmado!',



        )
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado!'


        )
      }
    })
  }
}
