import { Component, OnInit, DoCheck, Input } from "@angular/core";
import { InicioSesionComponent } from "../inicio-sesion/inicio-sesion.component";
import { Router } from '@angular/router';
import { NotificacionesService } from "../services/notificaciones.service";
import { AuthService, User } from "@auth0/auth0-angular";
import { LoginService } from "../services/login.service";
import { Persona } from "../models/Persona";
import { getCookie } from "typescript-cookie";
import { catchError, throwError } from "rxjs";
import jwt_decode from 'jwt-decode';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements DoCheck, OnInit {
    reporteV: string = "";
    reporteN: string = "";

    mostrar: boolean = false;
    mostrarr: boolean = false;
    mostrar1: boolean = false;
    mostrar2: boolean = false;
    mostrar3: boolean = false;

    constructor(private router: Router, private notificacionesService: NotificacionesService,
        public auth: AuthService,
        private logSer: LoginService) { }



    get nuevosRegistros() {

        return this.notificacionesService.nuevosRegistros;



    }

    public ocultar() {
        this.notificacionesService.nuevosRegistros = 0;

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

    iniciarSesion() {
        this.router.navigate(['']);
    }
    cerrarSesion() {
        this.router.navigate(['']);
        localStorage.removeItem('persona');
    }

    user?: User = new User;
    usuario = new Persona();

    ngOnInit(): void {
        this.auth.isAuthenticated$.subscribe(
            (isAuthenticaed) => {
                if (isAuthenticaed) {
                    this.auth.user$.subscribe(user => {
                        if (user?.email && user?.name) {
                            this.usuario.correo = user.email;
                            this.usuario.password = user.name + user.email;
                            this.verificar(user.email, user.name)
                        }
                        //this.validateUser(this.usuario)
                    });
                }
            }
        )
    }

    verificar(email: string, nombres: string) {
        this.logSer.verificar(email, nombres).subscribe({
            next: response => {
                console.log('HOLAAAAA');
            },
            error: error => {
                if (error.status === 200) {
                    this.validateUser(this.usuario)
                }
            }
        });
    }

    validateUser(model: Persona) {
        this.logSer.validateLoginDetails(this.usuario).pipe(
            catchError(error => {
                if (error.status === 401) {
                    console.log('BAD CREDENTIALS')
                    //this.toastr.error('Credenciales incorrectas', 'Error de autenticación');
                }
                return throwError(error);
            })
        ).subscribe(
            responseData => {
                const authorizationHeader = responseData.headers.get('Authorization');
                if (authorizationHeader) {
                    window.sessionStorage.setItem('Authorization', authorizationHeader);
                    const decodedToken: any = jwt_decode(authorizationHeader); // Decode the JWT
                    const role = decodedToken.authorities; // Assuming the role is stored in the 'role' field of the JWT payload
                    localStorage.setItem("roles", role)

                    this.usuario = <any>responseData.body;
                    this.usuario.authStatus = 'AUTH';
                    window.sessionStorage.setItem('userdetails', JSON.stringify(this.usuario));
                    const xsrf = getCookie('XSRF-TOKEN')!;
                    if (xsrf !== undefined) {
                        window.sessionStorage.setItem("XSRF-TOKEN", xsrf);
                    } //Arreglar que cuando ingrese con un segundo intento se cree el xsrf

                    if (sessionStorage.getItem('userdetails')) {
                        this.usuario = JSON.parse(sessionStorage.getItem('userdetails')!);
                        const role = localStorage.getItem('roles');
                        switch (role) {
                            case 'ROLE_STUD':
                                this.router.navigate(['/director-carrera']);
                                break;
                            case 'ROLE_ADMIN':
                                this.router.navigate(['/sup-admin']);
                                break;
                            case 'ROLE_ADMIN':
                                this.router.navigate(['/sup-admin']);
                                break;
                            default:
                                this.router.navigate(['../login']);
                                console.log('Selected role is unknown.');
                                break;
                        }
                        console.log(role);
                    }
                }
            }
        );
    }



}


