import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html'
})
export class DirectivaComponent{
lenguajes: string[] = ['php','c#','java','typescript','html','javascript','c++'];
listatemas1: string[] = ['El manual de Typescript','Los basicos','Tipos de objetos'];
listatemas2: string[] = ['Comprendiendo los frameworks JavaScript de lado del cliente','Estructuras de datos en JavaScript'];
listatemas3: string[] = ['Creacion de un proyecto','Errores Sintacticos y logicos'];
habilitar: boolean = true;  
constructor() { }

setHabilitar():void{
  this.habilitar=(this.habilitar==true)? false: true;
}
}
