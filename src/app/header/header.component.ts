import { Component, OnInit, DoCheck, Input } from "@angular/core";
import { InicioSesionComponent } from "../inicio-sesion/inicio-sesion.component";
import { Router } from '@angular/router';
import { NotificacionesService } from "../services/notificaciones.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements DoCheck {
    reporteV: string = "";
    reporteN: string = "";
    
    mostrar: boolean = false;
    mostrarr: boolean = false;
    mostrar1: boolean = false;
    mostrar2: boolean = false;
    mostrar3: boolean = false;
    constructor(private router1: Router,private notificacionesService: NotificacionesService) { }
    get nuevosRegistros() {
        
        return this.notificacionesService.nuevosRegistros;
        

        
      }

    public ocultar(){
        this.notificacionesService.nuevosRegistros=0;

    }
    ngDoCheck(): void {
       /* this.reporteV=JSON.parse(localStorage.getItem('rol')+"");
        console.log("Rol del Usuario: "+this.reporteV+"")
        if (parseInt(this.reporteV) == 0) {
            this.mostrar = true;
            this.mostrarr = true;
            this.mostrar2 = true;
            this.mostrar3=false;
        } else if (parseInt(this.reporteV) ==9) {
            this.mostrar = false;
            this.mostrar3=true;
        } else if (parseInt(this.reporteV)== 2) {
            this.mostrar = true;
            this.mostrar2 = false;
            this.mostrarr = false;
            this.mostrar3=false;
        } else if (parseInt(this.reporteV) == 1) {
            this.mostrar = true;
            this.mostrar2 = true;
            this.mostrarr = false;
            this.mostrar3=false;
        }

        this.reporteN= InicioSesionComponent.nomb
        */
    }

    ngOnInit(): void {
       
    }
    iniciarSesion(){
        this.router1.navigate(['']);
    }
    cerrarSesion() {
        this.router1.navigate(['']);
        localStorage.removeItem('persona'); 
    }


}



