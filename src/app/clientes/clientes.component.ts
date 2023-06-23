import { Component, OnInit } from '@angular/core';
import { Cliente } from '../models/Cliente';
import { ClienteService } from '../services/clientes.service';
@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {
  clientes:Cliente[]=[];
  constructor(
    private clienteService: ClienteService
    ) {}

  ngOnInit(): void {
    this.clienteService.obtenerClientes().subscribe(
      clientes=>this.clientes=clientes
    );
  }

}
