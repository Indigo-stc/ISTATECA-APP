import { Component, OnInit, OnChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Libro } from '../models/Libro';
import { Bibliotecario } from '../models/Bibliotecario_Cargo';
import { FormBuilder, FormGroup, NgForm, Validators, FormControl, NgModel } from '@angular/forms';
import { ListasService } from '../services/listas.service';
import { Tipo } from '../models/Tipo';
import { Autor } from '../models/Autor';
import { RegistroBibliotecarioService } from '../services/registro-bibliotecario.service';
import { Persona } from '../models/Persona';
import Swal from 'sweetalert2';
import { registerLocaleData } from '@angular/common';
import { Observable, catchError, map, throwError } from 'rxjs';
import { ActaDonacionService } from '../services/acta-donacion.service';
import { LibroService } from '../services/libro.service';
import { PersonaService } from '../services/persona.service';


@Component({
  selector: 'app-vista-registro-new',
  templateUrl: './vista-registro-new.component.html',
  styleUrls: ['./vista-registro-new.component.css']
})
export class VistaRegistroNewComponent implements OnInit {

  bibliotecarios: Bibliotecario = {};
  tipo: Tipo = new Tipo;
  file: any;
  reporteV: String = "";
  reporteV2: String = "";
  bibliotecarioE: Bibliotecario = {};
  persona: Persona = {};
  Tipoe: Tipo[] = []
  guardar: boolean = true;
  cedulabiblio?: String = "";

  opcionSeleccionado: string = '0';
  verSeleccion: string = '';

  idb?: number;
  nombreT: string = '';


  libros: Libro[] = [];
  lib: Libro = new Libro;
  bus: boolean = true;
  buscarval: boolean = false;

  public keyword = 'nombre';


  step = 1;
  totalSteps = 8;
  avanzar1() {
    if (this.step < this.totalSteps) {
      this.step++;
    }
  }
  retroceder1() {
    if (this.step > 1) {
      this.step--;
    }
  }



  public previsualizacion?: string
  public PDF?: string
  public archivos: any = []


  // Trabajar con Reactive Froms
  public librosF: FormGroup = new FormGroup({
    codigoDewey: new FormControl(""),
    titulo: new FormControl(""),
    subtitulo: new FormControl(""),
    tipo: new FormControl(
      {
        id: new FormControl(""),
        nombre: new FormControl(""),
        activo: new FormControl("")
      }
    ),
    adquisicion: new FormControl(""),
    anioPublicacion: new FormControl(""),
    editor: new FormControl(""),
    ciudad: new FormControl(""),
    numPaginas: new FormControl(""),
    area: new FormControl(""),
    conIsbn: new FormControl(""),
    idioma: new FormControl(""),
    descripcion: new FormControl(""),
    indiceUno: new FormControl(""),
    indiceDos: new FormControl(""),
    indiceTres: new FormControl(""),
    dimenciones: new FormControl(""),
    estadoLibro: new FormControl(""),
    urlImagen: new FormControl(""),
    activo: new FormControl(""),
    urlDigital: new FormControl(""),
    fechaCreacion: new FormControl(""),
    persona: new FormControl(
      {
        id: new FormControl(""),
        activo: new FormControl(""),
        cedula: new FormControl(""),
        celular: new FormControl(""),
        correo: new FormControl(""),
        nombres: new FormControl(""),
        apellidos: new FormControl(""),
        direccion: new FormControl(""),
        calificacion: new FormControl(""),
        tipo: new FormControl(""),
        password: new FormControl(""),
        fenixId: new FormControl(""),
        authStatus: new FormControl("")
      }
    ),
    disponibilidad: new FormControl(true),
    nombreDonante: new FormControl(''),
    urlActaDonacion: new FormControl('')
  });




  // fon de Reactive Forms

  constructor(
    private sanitizer: DomSanitizer,
    private libroservice: LibroService,
    private rutas: Router,
    private bibliotecarioservice: RegistroBibliotecarioService,
    private ListaT: ListasService,
    private ActaDonacionService: ActaDonacionService,
    private personaservice: PersonaService,
    private formBuilder: FormBuilder
  ) { //this.buildForm(); 
  }

  ngOnInit(): void {
    this.reporteV = localStorage.getItem('bibliotecario') + "";
    this.reporteV2 = localStorage.getItem('nombrebibliotecario') + "";
    console.log("Bibliotecario: " + this.reporteV + " Nombre:" + this.reporteV2);
    this.librosF.controls['disponibilidad'].setValue('0');

    this.ListaT.obtenerTipos().subscribe(
      TipoS => this.Tipoe = TipoS

    );

    this.obtenerAutor()
    this.buscar()

  }
  public dato!: Observable<any['']>;


  obtenerAutor(): void {
    this.dato = this.ListaT.obtenerAutores();
    console.log(this.dato + "Holii");


  }

  //Conseguir capturar tipo de Libro
  seleccionT(e: any) {
    console.log(e.target.value);
    this.nombreT = e.target.value;
    this.ListaT.buscarTiposxnombre2(this.nombreT).subscribe(
      (data) => {
        console.log(data);

        if (Array.isArray(data) && data.length > 0) {
          const tipo = data[0];
          this.librosF.get('tipo')?.patchValue({
            id: tipo.id,
            nombre: tipo.nombre,
            activo: tipo.activo
          });
        }
      }
    );



  }


  OnImprimir(tit: NgModel, publi: NgModel, pag: NgModel, des: NgModel, est: NgModel, edi: NgModel, area: NgModel) {
    const encabezado = ["Titulo", "N° Pag", "Descripcion", "Editor", "Publcacion", "Tipo", "Estado"]

    console.log(tit.value);

    const cuerpo = [
      tit.value,
      pag.value,
      des.value,
      edi.value,
      publi.value,
      area.value,
      est.value
    ]



    this.ActaDonacionService.imprimir(encabezado, cuerpo, "Acta de Donacion", false)
  }


  //Validar URL

  //  private buildForm() {
  //   const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
  //   this.form = this.formBuilder.group({
  //     codigoDewey: ['',  [Validators.required]],
  //     titulo: ['', [Validators.required]],
  //     cod_ISBN: ['', [Validators.required]],
  //     email: ['', [Validators.required, Validators.email]],
  //     anio_publicacion: ['', [Validators.required, Validators.maxLength(4)]],
  //     url_digital: ['', [Validators.required]],
  //     gender: ['', [Validators.required]],
  //   });

  //   this.form.valueChanges
  //   .subscribe(value => {
  //     console.log(value);

  //   });
  // }


  onKeydownEvent(event: KeyboardEvent, titulo: String): void {
    if (titulo == "") {
      this.ngOnInit();
    }
  }

  buscarLibxNomb(nombre: String) {
    this.libroservice.buscarLibro(nombre).subscribe(
      data => {
        this.libros = data;
      }
    )
  }






  capturarArchivo(event: any): any {
    const archivocapturado = event.target.files[0]
    this.extraerBase64(archivocapturado).then((image: any) => {

      console.log(image)
    })


  }

  capturarImagen(event: any): any {
    const archivocapturado = event.target.files[0]
    this.extraerBase64(archivocapturado).then((imagen: any) => {
      this.previsualizacion = imagen.base;
    })

  }





  //Extraer para visualizacion
  extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result

        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };

    } catch (e) {
      console.log("Error al Subir Imagen")
    }
  })
  //Fin de capturar archivos


  //Capturar Persona
  buscar() {

    this.persona = JSON.parse(localStorage.getItem('persona') + "");
    this.cedulabiblio = this.persona.cedula
    console.log(this.cedulabiblio)
    this.personaservice.buscarxcedula(this.cedulabiblio + '').subscribe(
      data => {
        console.log(data);
        const datospersona = {
          id: data.id,
          activo: data.activo,
          cedula: data.cedula,
          celular: data.celular,
          correo: data.correo,
          nombres: data.nombres,
          apellidos: data.apellidos,
          direccion: data.direccion,
          calificacion: data.calificacion,
          tipo: data.tipo,
          password: data.password,
          fenixId: data.fenixId,
          authStatus: data.authStatus
        }
        this.librosF.get('persona')?.patchValue(datospersona)
      }
    )

  }



  // Getter for easy access
  // get s_url() {
  //   return this.form.get('s_url');
  // }

  //Guardar Libro


  public Libro: Libro = new Libro();

  /*disponible?: boolean = this.Libro.disponibilidad;*/

  public crearLibro(/*reg: NgForm*/): void {


    console.log("Se ha realizado un click")


    const librosFCopy = JSON.parse(JSON.stringify(this.librosF.getRawValue()));
    console.log(librosFCopy);

    this.libroservice.create(librosFCopy).subscribe(
      Response => {


        this.Libro
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '<strong>Has registrado un Libro</strong>',
          showConfirmButton: false,
          timer: 1500
        })
        console.log(this.libroservice);
        setTimeout(() => {
          location.reload();
        }, 1000);

      }



    );
    // let campoFaltante = this.validarCampos();
    // if (campoFaltante === '') {

    // } else {
    //   Swal.fire({
    //     position: 'center',
    //     icon: 'info',
    //     title: `El campo ${campoFaltante} es requerido`,
    //     showConfirmButton: false,
    //     timer: 2000
    //   });
    // }


    //reg.reset();

  }



  validarCampos() {
    //  if (!this.Libro.codigoDewey) {
    //     return 'Código Dewey';
    //   } else if (!this.Libro.conIsbn) {
    //     return 'Código ISBN';
    //   } else if (!this.Libro.indiceUno) {
    //     return 'Indice 1';
    //   } else if (!this.Libro.indiceDos) {
    //     return 'Indice 2';
    //   } else if (!this.Libro.indiceTres) {
    //     return 'Indice 3';
    //   } else if (!this.Libro.adquisicion) {
    //     return 'Adquisicion';
    //   } else if (!this.Libro.descripcion) {
    //     return 'Descripción';
    //   } else if (!this.Libro.dimenciones) {
    //     return 'Dimensiones';
    //   } else if (!this.Libro.numPaginas) {
    //     return 'N° de Paginas';
    //   } else if (!this.Libro.idioma) {
    //     return 'Idioma';
    //   } else if (!this.Libro.estadoLibro) {
    //     return 'Estado libro';
    //   } else if (!this.Libro.titulo) {
    //     return 'Titulo del Libro';
    //   } else if (!this.Libro.editor) {
    //     return 'Editor';
    //   } else if (!this.Libro.area) {
    //     return 'Area';
    //   } else if (!this.Libro.anioPublicacion) {
    //     return 'Año de Publicación';
    /*     } else if (!this.Libro.autor) {
          return 'Autor'; */
    /*     } else if (!this.Libro.tipo) {
          return 'Tipo libro'; */
    /*     } else if (!this.Libro.imagen) {
          return 'Imagen'; */
    // } else if (!this.Libro.fechaCreacion) {
    //   return 'Fecha de Creación';
    // }else if (!this.Libro.urlActaDonacion) {
    //   return 'URL Digital';
    // }else if (!this.Libro.ciudad) {
    //   return 'Ciudad';
    // }else if (!this.Libro.disponibilidad) {
    //   return 'Disponibilidad'; 
    // }else if (!this.Libro.nombreDonante) {
    //   return 'Nombre Donante';
    // }else {
    //   return '';
    // }
  }


}
