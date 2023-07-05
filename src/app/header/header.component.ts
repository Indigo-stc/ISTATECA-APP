import { Component, OnInit, DoCheck, Input } from "@angular/core";
import { Router } from '@angular/router';
import { NotificacionesService } from "../services/notificaciones.service";
import { AuthService, User } from "@auth0/auth0-angular";
import { LoginService } from "../services/login.service";
import { Persona } from "../models/Persona";
import { getCookie } from "typescript-cookie";
import { catchError, throwError } from "rxjs";
import jwt_decode from 'jwt-decode';
import Swal from 'sweetalert2';
import { Notificacion } from "../models/Notificacion";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements DoCheck, OnInit {
    persona: Persona = new Persona();
    reporteN: string = "";
    sinSesion: boolean = false;
    estudiante: boolean = false;
    bibliotecario: boolean = false;
    admin: boolean = false;
    usu: boolean = true;
    notificacionmensaje:string=""
    notificationlista: Notificacion[] = [];
    notificaciones: any[] | undefined;
    constructor(private router: Router, private notificacionesService: NotificacionesService, public auth: AuthService, private logSer: LoginService) { 
        
    }
    


    get nuevosRegistros() { return this.notificacionesService.nuevosRegistros; }

    ngOnInit(): void {

        this.notificar();
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


    ngDoCheck(): void {
        this.notificaciones = this.notificacionesService.getNotificationLista();
        
        this.persona = JSON.parse(localStorage.getItem('persona') + "");
        if (this.persona != null) {
            if (this.persona.tipo == 1 || this.persona.tipo == 2) {
                //estudiante
                this.sinSesion = false;
                this.estudiante = true;
                this.sinSesion
            } else if (this.persona.tipo == 3) {
                //bibliotecario
                this.sinSesion = false;
                this.bibliotecario = true;
                this.admin = false
            } else if (this.persona.tipo == 4) {
                //administrador
                this.sinSesion = false;
                this.admin = true;
                this.bibliotecario = false
            }
        } else {
            this.sinSesion = true
        }
    }
    alerta(men:string){
        alert("hola"+men)
    }
    public ocultar() {
        this.notificacionesService.nuevosRegistros = 0;
        console.log(this.notificaciones)

    }
    user?: User = new User;
    usuario = new Persona();


    verificar(email: string, nombres: string) {
        this.logSer.verificar(email, nombres).subscribe({
            next: response => {
                console.log('HOLAAAAA');
            },
            error: error => {
                if (error.status === 400) {
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: '<strong> Credenciales Incorrectas</strong><br>  Verifica tu cuenta',
                        showConfirmButton: false,
                        timer: 3000
                    })
                }
                
                if (error.status === 200) {
                    this.validateUser(this.usuario)
                }
            }
        });
    }

    public notificar(){
        this.notificacionesService.getNotificacionBibliotecario().subscribe(
            response =>(console.log(response),this.notificacionesService.notificationlista=response,console.log(this.notificacionesService.notificationlista))
        )
    }

    validateUser(model: Persona) {
        this.logSer.validateLoginDetails(this.usuario).pipe(
            catchError(error => {
                if (error.status === 401) {
                    console.log('BAD CREDENTIALS')
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: '<strong> Credenciales Incorrectas</strong><br>  Verifica tu cuenta',
                        showConfirmButton: false,
                        timer: 3000
                    })
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
                        let usuarioJSON = JSON.stringify(this.usuario);
                        localStorage.setItem('persona', usuarioJSON);

                        switch (role) {
                            case 'ROLE_STUD':
                                this.router.navigate(['/']);

                                break;
                            case 'ROLE_ADMIN':
                                this.router.navigate(['/']);
                                break;
                            case 'ROLE_ADMIN':
                                this.router.navigate(['/']);
                                break;
                            default:
                                this.router.navigate(['../']);
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



