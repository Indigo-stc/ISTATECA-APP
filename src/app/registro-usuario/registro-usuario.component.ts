import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RegistroUsuarioService } from '../services/registro-usuario.service';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})
export class RegistroUsuarioComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  valid(){
    this.router.navigate(['/app-inicio-sesion'])
  }

}
