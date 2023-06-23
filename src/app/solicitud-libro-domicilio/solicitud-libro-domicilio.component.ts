import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Prestamo } from '../models/Prestamo';
import { CarreraService } from '../services/carrera.service';
import { Carrera } from '../models/Carrera';
import Swal from 'sweetalert2';
import { doch } from '../solicitud-libro/doch';
import { prestamoService } from '../services/prestamo.service';


@Component({
  selector: 'app-solicitud-libro-domicilio',
  templateUrl: './solicitud-libro-domicilio.component.html',
  styleUrls: ['./solicitud-libro-domicilio.component.css']
})
export class SolicitudLibroDomicilioComponent implements OnInit {
  prestamo: Prestamo = new Prestamo();
  carreras:Carrera[]=[];
  mostrar: boolean = false;
  doch: doch[] = []
  variable?: number;
  car: Carrera = new Carrera;
  idC?:number;

  documentos: doch = new doch;
  names?: string[] = [];

  step = 1;
  totalSteps = 2;
  constructor(private carreraService: CarreraService,private PrestamoService: prestamoService) { }
  ngOnInit(): void {
    var solicitudJSONGET = localStorage.getItem("AceptarSolicitud");
    var solicitud = JSON.parse(solicitudJSONGET + "");
    this.prestamo = solicitud;
    console.log(this.prestamo);

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
  seleccionT(e: any) {
    this.idC = e.target.value;
  }


  guardar() {
    this.prestamo.estadoPrestamo=2;
    this.prestamo.carrera = this.car;
    if (this.idC != undefined) {
      this.carreraService.obtenerCarreraId(this.idC).subscribe(
        response => {
          this.prestamo.carrera = response;
          this.PrestamoService.update(this.prestamo).subscribe(
            response => {
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: '<strong>Guardado correctamente</strong>',
                showConfirmButton: false,
                timer: 1500
              })
            }
          );
        }
      );
    }
    

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
