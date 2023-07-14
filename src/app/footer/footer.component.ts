import { Component, OnInit } from "@angular/core";
import { Persona } from "../models/Persona";
import { Sugerencia } from "../models/Sugerencia";
import { sugerenciaService } from "../services/sugerencia.service";
import { Carrera } from "../models/Carrera";
import { CarreraService } from "../services/carrera.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']

})
export class FooterComponent implements OnInit {
  sugerencia: Sugerencia = new Sugerencia();
  persona: Persona = new Persona();
  carrera: Carrera = new Carrera();
  carreraEst?: string;

  carreras: Carrera[] = [];
  carEst?: boolean;
  car: Carrera = new Carrera;




  constructor(private sugerenciaService: sugerenciaService, private CarreraService: CarreraService) { }

  ngOnInit() {
    let usuarioJSON = localStorage.getItem('persona') + "";
    this.persona = JSON.parse(usuarioJSON);
    this.CarreraService.getCarreras().subscribe(
      response => {
        this.carreras = response;
        console.log
      }
    );
  }

  seleccionT(e: any) {
    this.car = e.target.value;
  }



  displayStyle = "none";

  openPopup() {
    this.displayStyle = "block";
  }
  
 
  GuardarSuger(){
    this.sugerencia.carrera = this.car;
    this.sugerencia.estado = true;
    this.sugerenciaService.create(this.sugerencia).subscribe(
      (data:Sugerencia)=>{
        console.log(data);
        this.displayStyle = "none";
        Swal.fire(' Guardado',' Guardado con exito en el sistema','success');

      }, (error) => {
        console.log(error);
        Swal.fire('Error', 'Nose Guardo ', 'error');
      }
    )
  }

}
