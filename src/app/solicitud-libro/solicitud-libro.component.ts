import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Prestamo } from '../models/Prestamo';
import { Carrera } from '../models/Carrera';
import { CarreraService } from '../services/carrera.service';
import { prestamoService } from '../services/prestamo.service';
import { doch } from './doch';
import Swal from 'sweetalert2';
import { Persona } from '../models/Persona';
import { Router } from '@angular/router';


@Component({
  selector: 'app-solicitud-libro',
  templateUrl: './solicitud-libro.component.html',
  styleUrls: ['./solicitud-libro.component.css']
})
export class SolicitudLibroComponent implements OnInit {
  prestamo: Prestamo = new Prestamo();
  persona: Persona= new Persona();
  carreras: Carrera[] = [];
  car: Carrera = new Carrera;
  reporteV: string = "";
  mostrar: boolean = false;
  doch: doch[] = []
  variable?: number
  documentoH?:number;

  documentos: doch = new doch;
  names?: string[] = [];
  idC?: number;
  step = 1;
  totalSteps = 2;
  constructor(private router: Router,private carreraService: CarreraService, private PrestamoService: prestamoService) { }
  ngOnInit(): void {
    this.reporteV = localStorage.getItem('persona') + "";
    let usuarioJSON = localStorage.getItem('persona') + "";
    this.persona = JSON.parse(usuarioJSON);
    var solicitudJSONGET = localStorage.getItem("AceptarSolicitud");
    var solicitud = JSON.parse(solicitudJSONGET + "");
    this.prestamo = solicitud;
    this.carreraService.getCarreras().subscribe(
      respose => {
        this.carreras = respose;
      }
    );

  }

  avanzar1() {
    if (this.step < this.totalSteps) {
      this.step++;
    }
  }
  retroceder1() {
    if (this.step > 1) {
      this.step--;
    }
  }


  guardar() {
    
    this.prestamo.estadoPrestamo=2;
    this.prestamo.carrera = this.car;
    this.prestamo.idEntrega=this.persona;
    
    if (this.idC != undefined && this.documentoH!=undefined) {
      this.prestamo.documentoHabilitante=this.documentoH;
      this.carreraService.obtenerCarreraId(this.idC).subscribe(
        response => {
          this.prestamo.carrera = response;
          console.log(this.prestamo.carrera);
          this.PrestamoService.update(this.prestamo).subscribe(
            response => {
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: '<strong>Guardado correctamente</strong>',
                showConfirmButton: false,
                timer: 1500
              })
              this.router.navigate(['/app-lista-solicitudes-pendientes']);
            }
          );
        }
      );
    }
    

  }

  seleccionT(e: any) {
    this.idC = e.target.value;
  }
  seleccionD(e: any) {
    this.documentoH = e.target.value;
  }


  activarDoc() {
    this.mostrar = true
  }
  desactivarDoc() {
    this.mostrar = false
  }
  guardarDoc(doc: string, reg: NgForm) {
    if (doc == "") {
      alert("Ingrese un tipo de documento")
    } else {
      this.variable = this.doch.length + 1;


      this.names?.push(doc)
      console.log(this.names)




    }


    reg.reset();


  }



}
