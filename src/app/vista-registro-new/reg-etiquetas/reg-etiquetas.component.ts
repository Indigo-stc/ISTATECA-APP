import { Component, OnInit } from '@angular/core';
import { Etiqueta } from 'src/app/models/Etiqueta';
import { ListasService } from 'src/app/services/listas.service';

@Component({
  selector: 'app-reg-etiquetas',
  templateUrl: './reg-etiquetas.component.html',
  styleUrls: ['./reg-etiquetas.component.css']
})
export class RegEtiquetasComponent implements OnInit{

etiquetas: Etiqueta[]=[]
  

  constructor(private listaservice: ListasService){

  }

  ngOnInit(): void {
    this.listaservice.obteneEtiquetas().subscribe(
      eti=> this.etiquetas = eti
    )
  }


}
