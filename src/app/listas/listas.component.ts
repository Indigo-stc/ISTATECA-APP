import { Component, OnInit } from '@angular/core';
import { ListasService } from '../services/listas.service';
import { Autor } from '../models/Autor';
import { Tipo } from '../models/Tipo';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.css']
})
export class ListasComponent implements OnInit {
  Autores:Autor[]=[];
  ttipos:Tipo[]=[];

  constructor(private  listaservice: ListasService) { }

  ngOnInit(): void {
    this.listaservice.obtenerAutores().subscribe(
      Autores=> this.Autores=Autores
    );
    this.listaservice.obtenerTipos().subscribe(
      ttipos=>this.ttipos=ttipos
    );
  }

}
