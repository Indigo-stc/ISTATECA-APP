import { Component, OnInit } from "@angular/core";
import { Persona } from "../models/Persona";
import { Sugerencia } from "../models/Sugerencia";
import { sugerenciaService } from "../services/sugerencia.service";

@Component({
    selector: 'app-footer',
    templateUrl:'./footer.component.html',
    styleUrls:['./footer.component.css']

})
export class FooterComponent implements OnInit{
  sugerencia : Sugerencia = new Sugerencia();
  persona: Persona = new Persona();


  constructor (private sugerenciaService: sugerenciaService) {}

    ngOnInit(){
      let usuarioJSON = localStorage.getItem('persona') + "";
    this.persona = JSON.parse(usuarioJSON);
    }
    autor: any = {nombre: 'Johann', apellido: 'Arizaga'}

   
   
   
    displayStyle = "none";
  
  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }
}
