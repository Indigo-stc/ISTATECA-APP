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
    notificacionmensaje: string = ""
    notificationlista: Notificacion[] = [];
    notificationlistaest: Notificacion[] = [];
    notificaciones: Notificacion[] = [];
    tipoMensaje: number | undefined;
    personatraida: Persona = new Persona();
    constructor(private router: Router, private notificacionesService: NotificacionesService, public auth: AuthService, private logSer: LoginService) {

    }



    get nuevosRegistros() { return this.notificacionesService.nuevosRegistros; }
    get nuevosRegistrosEst() { return this.notificacionesService.nuevosRegistrosEst; }

    ngOnInit(): void {

        var personaJSONGET = localStorage.getItem("persona");
        this.persona = JSON.parse(personaJSONGET + "");

        if (this.persona != null) {
            this.notificarEst(this.persona.id!);
            
            console.log(this.persona)
        } else {
            console.log(this.persona)

        }

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
        // this.notificationlistaest = this.notificacionesService.getNotificationLista();
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
    alerta(men: Notificacion) {
        this.clear();
        console.log(men)
        const objetoString = JSON.stringify(men);
        localStorage.setItem("Dato", objetoString);
        men.visto = true
        alert("blib")
        this.router.navigate(['/app-lista-solicitudes-pendientes'])
    }
    alertaestudiante(men: Notificacion) {
        this.clear();
        console.log(men)
        const objetoString = JSON.stringify(men);
        localStorage.setItem("Dato", objetoString);
        men.visto = true
        this.editarNotificacion(men);
        alert("estudiante")
        this.router.navigate([''])
    }
    editarNotificacion(notificacion: Notificacion) {
        this.notificacionesService.updateVisto(notificacion).subscribe(
            response => (
                console.log(response)
            )
        )
    }
    public ocultar() {
        this.notificacionesService.nuevosRegistros = 0;



    }
    public clear() {
        this.notificacionesService.nuevosRegistrosEst = 0;



    }
    user?: User = new User;
    usuario = new Persona();


    verificar(email: string, nombres: string) {
        this.logSer.verificar(email, nombres).subscribe({
            next: response => {

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

    public notificar() {
        this.notificacionesService.getNotificacionBibliotecario().subscribe(
            response => (this.notificationlista = response, this.validarconteoB())
        )

    }
    public notificarEst(id: number) {
        this.notificacionesService.getNotificacionPersona(id).subscribe(
            response => (this.notificationlistaest = response, this.validarconteo())
        )


    }
    validarconteo() {
        if(this.notificationlistaest!=null){
            this.notificationlistaest.forEach(element => {
                if (element.visto == false && element.mensaje === 3 || element.mensaje === 5 || element.mensaje === 6 || element.mensaje === 7) {
                    this.notificacionesService.actualizarConteoEst(1)
                }
            });
        }else{
            
        }
        
    }
    validarconteoB() {
        if(this.notificationlista!=null){
            this.notificationlista.forEach(element => {
                if (element.visto == false && element.mensaje === 1 || element.mensaje === 4) {
                    this.notificacionesService.actualizarConteo(1)
                }
            });
        }else{
            
        }
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
                        if (this.usuario.celular == undefined || this.usuario.celular == null  && this.usuario.direccion==undefined || this.usuario.direccion==null) {
                            Swal.fire({
                                confirmButtonColor: '#012844',
                                icon: 'warning',
                                title: 'Llene todos los campos',
                              })
                            this.router.navigate(['/app-form-editUsuario']);
                        } else {
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
            }
        );
    }



}



