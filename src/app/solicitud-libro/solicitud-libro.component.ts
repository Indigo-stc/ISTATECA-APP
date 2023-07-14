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
import { format } from 'date-fns';


@Component({
  selector: 'app-solicitud-libro',
  templateUrl: './solicitud-libro.component.html',
  styleUrls: ['./solicitud-libro.component.css']
})
export class SolicitudLibroComponent implements OnInit {
  prestamo: Prestamo = new Prestamo();
  prestamo2: Prestamo = new Prestamo();
  persona: Persona = new Persona();
  carreraEstu: Carrera = new Carrera();
  carreraEst?: string;
  carreras: Carrera[] = [];
  car: Carrera = new Carrera;
  reporteV: string = "";
  mostrar: boolean = false;
  doch: doch[] = []
  variable?: number
  documentoH?: number;

  fechaHoy?: string;
  modificar?: boolean;
  carEst?: boolean;
  documentos: doch = new doch;
  names?: string[] = [];
  idC?: number;
  step = 1;
  totalSteps = 2;
  constructor(private router: Router, private carreraService: CarreraService, private PrestamoService: prestamoService) { }
  ngOnInit(): void {
    let prestamoJSON = localStorage.getItem('prestamo') + "";
    this.prestamo2 = JSON.parse(prestamoJSON);
    if (this.prestamo2 == undefined || this.prestamo2 == null) {
      this.modificar = false;

      let usuarioJSON = localStorage.getItem('persona') + "";
      this.persona = JSON.parse(usuarioJSON);

      var solicitudJSONGET = localStorage.getItem("AceptarSolicitud");
      var solicitud = JSON.parse(solicitudJSONGET + "");
      const fecha = new Date(Date.now());
      this.fechaHoy = format(fecha, 'dd/MM/yyyy');

      this.prestamo = solicitud;
      console.log(this.prestamo)

      this.prestamo.fechaEntrega = fecha;
      this.prestamo.fechaMaxima = fecha;
      if (this.prestamo.idSolicitante?.cedula != undefined && this.prestamo.tipoPrestamo == 1) {
        this.carreraService.carreraest(this.prestamo.idSolicitante?.cedula).subscribe(
          respose => {
            this.carreraEst = respose.nombre;
            this.carreraEstu = respose;
            this.carEst = true;
          }
        );
      } else {
        this.carreraService.getCarreras().subscribe(
          response => {
            this.carreras = response;
            this.carEst = false;
          }
        );
      }
    } else {
      this.modificar = true;

      if (this.prestamo2.idSolicitante?.cedula != undefined && this.prestamo2.tipoPrestamo == 1) {
        this.carreraService.carreraest(this.prestamo2.idSolicitante?.cedula).subscribe(
          respose => {
            this.carreraEst = respose.nombre;
            this.carEst = true;
          }
        );
      } else {
        this.carreraService.getCarreras().subscribe(
          response => {
            this.carreras = response;
            this.carEst = false;
          }
        );
      }
    }

  }

  retroceder1() {
    if (this.step > 1) {
      this.step--;
    }
  }


  avanzar1() {
    if (this.idC != undefined || this.carreraEst != undefined) {
      if (this.step < this.totalSteps) {
        this.step++;
      }
    } else {
      Swal.fire({
        confirmButtonColor: '#012844',
        icon: 'warning',
        title: 'Ups...',
        text: 'Seleccione una Carrera'
      })
    }
  }

  avanzar() {
    if (this.step < this.totalSteps) {
      this.step++;
    }
  }


  guardar() {
    this.prestamo.estadoPrestamo = 2;
    this.prestamo.carrera = this.car;
    this.prestamo.idEntrega = this.persona;
    if (this.prestamo.fechaEntrega == this.prestamo.fechaMaxima) {
      if (this.idC != undefined || this.documentoH != undefined) {
        this.prestamo.documentoHabilitante = this.documentoH;
        if (this.idC != undefined) {
          this.carreraService.obtenerCarreraId(this.idC).subscribe(
            response => {
              this.prestamo.carrera = response;
            }
          );
        }

        if (this.carreraEst != undefined) {
          this.prestamo.carrera = this.carreraEstu;
        }
console.log(this.prestamo)
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
      } else {
        Swal.fire({
          confirmButtonColor: '#012844',
          icon: 'warning',
          title: 'Ups...',
          text: 'Seleccione un documento habilitante'
        })
      }
    } else {
      Swal.fire({
        confirmButtonColor: '#012844',
        icon: 'warning',
        title: 'Ups...',
        text: 'La fecha de devolucion debe ser hoy mismo'
      })
    }

  }

  guardar2() {
    this.PrestamoService.update(this.prestamo2).subscribe(
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

  seleccionT(e: any) {
    this.idC = e.target.value;
  }
  seleccionD(e: any) {
    this.documentoH = e.target.value;
    console.log(this.documentoH)
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
