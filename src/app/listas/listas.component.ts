import { Component, OnInit } from '@angular/core';
import { ListasService } from '../services/listas.service';
import { Autor } from '../models/Autor';
import { Tipo } from '../models/Tipo';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.css']
})
export class ListasComponent implements OnInit {
  Autores:Autor[]=[];
  ttipos:Tipo[]=[];
  buscarA?:boolean;
  buscarT?:boolean;
  tipoEdit:Tipo=new Tipo();
  estado:string="";

  constructor(private  listaservice: ListasService, private router: Router) { }

  ngOnInit(): void {
    this.buscarA=false;
    this.buscarT=false;
    
    this.obtenerTipos();
    this.obtenerAutores();
  }
  obtenerTipos(){
    this.listaservice.obtenerTipos().subscribe(
      ttipos=>this.ttipos=ttipos
    );
  }

  obtenerAutores(){
    this.listaservice.obtenerAutores().subscribe(
      Autores=> this.Autores=Autores
    );
  }

  registroAutor(){
    this.router.navigate(['/app-registro-autor']);
  }

  resgistroTipo(){
    this.router.navigate(['/app-registro-tipo']);
  }

  onKeydownEvent(event: KeyboardEvent, buscar2: string): void {
    if (buscar2 == "") {
      this.ngOnInit();
    }

     
    
  }

  buscarAutor(buscar2:string){
    this.listaservice.listarautoresxnombre(buscar2).subscribe(
      response => {
        console.log(response);
        if (response == null) {
          Swal.fire({
            title: '<strong>Autor no encontrado</strong>',
            confirmButtonText: 'error',
            confirmButtonColor: '#012844',
            icon: 'error',
          })
          this.ngOnInit();
        } else {
          this.Autores = response;
          this.buscarA=true;
        }
      }
    );
  }
  buscarTipo(buscar2:string){
    this.listaservice.buscarTiposxnombre(buscar2).subscribe(
      response => {
        console.log(response);
        if (response == null) {
          Swal.fire({
            title: '<strong>Tipo no encontrado</strong>',
            confirmButtonText: 'error',
            confirmButtonColor: '#012844',
            icon: 'error',
          })
          this.ngOnInit();
        } else {
          this.ttipos = response;
          this.buscarT=true;
        }
      }
    );
  }

  getNombreEstado(estado: boolean | undefined): string {
    let nombreEstado = 'Desconocido'; // Valor predeterminado si el número del estado es undefined

    if (estado !== undefined) {
      if (estado == true) {
        nombreEstado = "Activo";
      }else{
        nombreEstado="Inactivo"
      }
    }

    return nombreEstado;
  }

  AbrirTipo(tipo:Tipo) {
    var overlay = document.getElementById('overlay96');
    overlay?.classList.add('active');
    this.tipoEdit=tipo;
    this.estado=this.getNombreEstado(this.tipoEdit.activo);

  }

  cerrarpopup2() {
    this.tipoEdit=new Tipo;
    this.estado="";
    var overlay = document.getElementById('overlay96');
    overlay?.classList.remove('active');
  }

  EditarTipo(tipo:Tipo) {
    if(tipo.id !=undefined){
    this.listaservice.editarTipo(tipo.id,tipo).subscribe(
      response=>{
        console.log(response)
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '<strong>Modificado correctamente</strong>',
          showConfirmButton: false,
          timer: 1500
        })
        var overlay = document.getElementById('overlay96');
        overlay?.classList.remove('active');
      }
    );
    this.obtenerTipos();
    }
  }
}
