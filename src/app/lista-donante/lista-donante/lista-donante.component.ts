import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Donante } from 'src/app/models/Donante';
import { ListasService } from 'src/app/services/listas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-donante',
  templateUrl: './lista-donante.component.html',
  styleUrls: ['./lista-donante.component.css']
})
export class ListaDonanteComponent implements OnInit {

  Donantes: Donante[] = [];
  buscarD?: boolean;


  constructor(private listaservice: ListasService, private router: Router) { }

  ngOnInit(): void {
    this.buscarD = false;
    this.listaservice.listarDonate().subscribe(
      Donantes => this.Donantes = Donantes
    );
  }
  registroDonante() {
    this.router.navigate(['/app-registro-donante']);
  }

  onKeydownEvent(event: KeyboardEvent, buscar2: string): void {
    if (buscar2 == "") {
      this.ngOnInit();
    } else {
      this.buscarDonante(buscar2);
    }
  }

  buscarDonante(buscar2: string) {
    this.listaservice.listarxnombre(buscar2).subscribe(
      response => {
        console.log(response);
        if (response == null) {
          Swal.fire({
            title: '<strong>Donante no encontrado</strong>',
            confirmButtonText: 'error',
            confirmButtonColor: '#012844',
            icon: 'error',
          })
          this.ngOnInit();
        } else {
          this.Donantes = response;
          this.buscarD = true;
        }
      }
    );
  }


}
