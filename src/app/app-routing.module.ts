import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DevolverLibroComponent } from './devolver-libro/devolver-libro.component';
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';
import { ReporteSugerenciasComponent } from './reporte-sugerencias/reporte-sugerencias.component';
import { ReporteLibrosComponent } from './reporte-libros/reporte-libros.component';
import { FormComponent } from './registro-usuario/form.component';
import { FormComponentb } from './registro-bibliotecario/form.component';
import { FormEditBComponent } from './registro-bibliotecario/form-edit-b.component';
import { FormEditComponent } from './registro-usuario/form-edit.component';
import { HomeComponent } from './home/home/home.component';
import { RegistroBibliotecarioComponent } from './registro-bibliotecario/registro-bibliotecario.component';
import { ListaBibliotecariosComponent } from './lista-bibliotecarios/lista-bibliotecarios.component';
import { ListasComponent } from './listas/listas.component';
import { ListaSolicitudesPendientesComponent } from './lista-solicitudes-pendientes/lista-solicitudes-pendientes.component';
import { SolicitudLibroComponent } from './solicitud-libro/solicitud-libro.component';
import { SolicitudLibroDomicilioComponent } from './solicitud-libro-domicilio/solicitud-libro-domicilio.component';
import { VistaRegistroNewComponent } from './vista-registro-new/vista-registro-new.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { RegistroSolicitudComponent } from './registro-solicitud/registro-solicitud.component';
import { RegistroAutorComponent } from './registro-autor/registro-autor.component';
import { RegistroTipoComponent } from './registro-tipo/registro-tipo.component';
import { RegistroSolicitudTercerapersonaComponent } from './registro-solicitud-tercerapersona/registro-solicitud-tercerapersona.component';

const routes: Routes = [
      {path: 'app-devolver-libro', component: DevolverLibroComponent, canActivate: [AuthGuard], data: { expectedRoles: ['ROLE_STUD'] } },
      {path: 'app-registro-usuario', component: RegistroUsuarioComponent},
      {path: 'app-reporte-sugerencias', component: ReporteSugerenciasComponent},
      {path: 'app-reporte-libros', component: ReporteLibrosComponent},
      {path: 'app-form', component: FormComponent},
      {path: 'app-form-bibliotecario', component: FormComponentb},
      {path: 'app-form-editBibliotecario', component: FormEditBComponent},
      {path: 'app-form-editUsuario', component: FormEditComponent},
      {path: 'app-registro-solicitud', component: RegistroSolicitudComponent},
      {path: '', component: HomeComponent},
      {path: 'app-registro-bibliotecario', component: RegistroBibliotecarioComponent},
      {path: 'app-lista-bibliotecarios', component: ListaBibliotecariosComponent},
      {path: 'app-listas', component: ListasComponent},
      {path: 'app-lista-solicitudes-pendientes', component: ListaSolicitudesPendientesComponent},
      {path: 'app-solicitud-libro', component: SolicitudLibroComponent},
      {path: 'app-solicitud-libro-domicilio', component: SolicitudLibroDomicilioComponent},
      {path: 'app-vista-registro-new', component: VistaRegistroNewComponent},
      {path: 'app-registro-solicitud-tercerapersona', component: RegistroSolicitudTercerapersonaComponent},
      {path: 'app-registro-autor', component: RegistroAutorComponent},
      {path: 'app-registro-tipo', component: RegistroTipoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
