import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DirectivaComponent } from './directiva/directiva.component';
import { DevolverLibroComponent } from './devolver-libro/devolver-libro.component';
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';
import { ReporteSugerenciasComponent } from './reporte-sugerencias/reporte-sugerencias.component';
import { ReporteLibrosComponent } from './reporte-libros/reporte-libros.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
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

const routes: Routes = [
  {path: 'app-directiva', component: DirectivaComponent},
      {path: 'app-devolver-libro', component: DevolverLibroComponent},
      {path: 'app-registro-usuario', component: RegistroUsuarioComponent},
      {path: 'app-reporte-sugerencias', component: ReporteSugerenciasComponent},
      {path: 'app-reporte-libros', component: ReporteLibrosComponent},
      {path: '', component: InicioSesionComponent, pathMatch:'full'},
      {path: 'app-form', component: FormComponent},
      {path: 'app-form-bibliotecario', component: FormComponentb},
      {path: 'app-form-editBibliotecario', component: FormEditBComponent},
      {path: 'app-form-editUsuario', component: FormEditComponent},
      {path: 'app-home', component: HomeComponent},
      {path: 'app-registro-bibliotecario', component: RegistroBibliotecarioComponent},
      {path: 'app-lista-bibliotecarios', component: ListaBibliotecariosComponent},
      {path: 'app-listas', component: ListasComponent},
      {path: 'app-lista-solicitudes-pendientes', component: ListaSolicitudesPendientesComponent},
      {path: 'app-solicitud-libro', component: SolicitudLibroComponent},
      {path: 'app-solicitud-libro-domicilio', component: SolicitudLibroDomicilioComponent},
      {path: 'app-vista-registro-new', component: VistaRegistroNewComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
