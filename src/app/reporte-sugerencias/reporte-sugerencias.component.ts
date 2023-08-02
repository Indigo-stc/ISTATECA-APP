import { Component, OnInit } from '@angular/core'
import { Sugerencia } from '../models/Sugerencia';
import jspdf from "jspdf";
import { sugerenciaService } from '../services/sugerencia.service';


@Component({
  selector: 'app-reporte-sugerencias',
  templateUrl: './reporte-sugerencias.component.html',
  styleUrls: ['./reporte-sugerencias.component.css']
})
export class ReporteSugerenciasComponent implements OnInit {

  
  sugerencias:Sugerencia[]=[];

  constructor(private sugerenciasService:sugerenciaService) { }

  ngOnInit(): void {
    this.sugerenciasService.getSugerencia().subscribe(
      response =>{
        this.sugerencias=response
        console.log("problemas"+response.length)
      } 
    );
  }


  downloadPDF() {
    const doc = new jspdf();

    const title = "FORMATO PARA SOLICITUD DE ADQUISION DE MATERIAL BIBLIOGRAFICO";
    const fontSizeTitle = 16;
    const titleX = 105;

  }
}
