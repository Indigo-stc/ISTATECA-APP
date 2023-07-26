import { Component } from '@angular/core';
import { Libro } from '../models/Libro';

@Component({
  selector: 'app-libro-completo',
  templateUrl: './libro-completo.component.html',
  styleUrls: ['./libro-completo.component.css']
})
export class LibroCompletoComponent {
  libro: Libro = new Libro();

  step = 1;
  totalSteps = 2;

  disp?:string;
  ngOnInit() {
    let usuarioJSON = localStorage.getItem('LibroCompleto') + "";
    this.libro = JSON.parse(usuarioJSON);
    if(this.libro.disponibilidad==true){
      this.disp="Disponible";
    }else{
      this.disp="No disponible"
    }
  }

  retroceder1() {
    if (this.step > 1) {
      this.step--;
    }
  }


  avanzar1() {
      if (this.step < this.totalSteps) {
        this.step++;
      }
  }

  getNombreEstadoLibro2(numeroEstado: number | undefined): string {
    let nombreEstado = 'Desconocido'; // Valor predeterminado si el número del estado es undefined

    if (numeroEstado !== undefined) {
      switch (numeroEstado) {
        case 1:
          nombreEstado = 'Nuevo';
          break;
        case 2:
          nombreEstado = 'Bueno';
          break;
        case 3:
          nombreEstado = 'Regular';
          break;
        case 4:
          nombreEstado = 'Malo';
          break;
        case 5:
          nombreEstado = 'No Utilizable';
          break;
        // Agrega más casos según tus necesidades
      }
    }

    return nombreEstado;
  }


}
