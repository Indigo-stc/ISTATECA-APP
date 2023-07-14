import { Component, OnInit } from "@angular/core";
import { Persona } from "../models/Persona";
import { Sugerencia } from "../models/Sugerencia";
import { sugerenciaService } from "../services/sugerencia.service";
import { Carrera } from "../models/Carrera";
import { CarreraService } from "../services/carrera.service";

@Component({
    selector: 'app-footer',
    templateUrl:'./footer.component.html',
    styleUrls:['./footer.component.css']

})
export class FooterComponent implements OnInit{
  sugerencia : Sugerencia = new Sugerencia();
  persona: Persona = new Persona();
  carrera: Carrera = new Carrera();
  carreraEst?: string;

  carreras: Carrera[] = [];
  carEst?: boolean;
  car: Carrera = new Carrera;
  idC?: number;

  


  constructor (private sugerenciaService: sugerenciaService, private CarreraService: CarreraService) {}

    ngOnInit(){
     let usuarioJSON = localStorage.getItem('persona') + "";
    this.persona = JSON.parse(usuarioJSON);
    }
    
    seleccionT(e: any) {
      this.idC = e.target.value;
    }
   
   
   
    displayStyle = "none";
  
  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }
}
