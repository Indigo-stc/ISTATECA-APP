import { Component, OnInit } from '@angular/core';
import { Prestamo } from '../models/Prestamo';

@Component({
  selector: 'app-devolver-libro',
  templateUrl: './devolver-libro.component.html',
  styleUrls: ['./devolver-libro.component.css']
})
export class DevolverLibroComponent implements OnInit {
  prestamo: Prestamo = new Prestamo();
  step = 1;
  totalSteps = 2;

  constructor() { }

  ngOnInit(): void {
    var solicitudJSONGET = localStorage.getItem("AceptarSolicitud");
    var solicitud = JSON.parse(solicitudJSONGET + "");
    this.prestamo = solicitud;
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

  guardar(){

  }
}
