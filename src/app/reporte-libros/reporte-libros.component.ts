import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Swal from 'sweetalert2';
import { Libro } from '../models/Libro';
import { PersonaFenix } from '../models/PersonaFenix';
import { CarreraService } from '../services/carrera.service';
import { PaginaInicioService } from '../services/pagina-inicio.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { Prestamo } from '../models/Prestamo';
import { Carrera } from '../models/Carrera';
import { PersonaService } from '../services/persona.service';
import { prestamoService } from '../services/prestamo.service';



@Component({
  selector: 'app-reporte-libros',
  templateUrl: './reporte-libros.component.html',
  styleUrls: ['./reporte-libros.component.css']
})
export class ReporteLibrosComponent implements OnInit {


  paginas: Libro[] = [];
  buscar?: boolean;
  listaprestamos: Prestamo[] = [];
  race: Carrera[] = [];
  person: PersonaFenix[] = [];
  recibidos?: boolean;



  constructor(private listCarrera: CarreraService,
    private listPage: PaginaInicioService,
    private ObtCarreraId: CarreraService,
    private prestamoService: prestamoService,
    private router: Router) { }
id:any;


  ngOnInit(): void {
    this.listPage.getLibros().subscribe(
      pagina => this.paginas = pagina);
    this.listCarrera.getCarreras().subscribe(
      carre => this.race = carre); 
      this.recibidos = false;
      this.prestamoService.listarxestado(3).subscribe(
        response => {
          this.listaprestamos = response;
        }
      );   
  }

  listaRecibidos(): void {
    this.prestamoService.listarxestado(3).subscribe(
      response => {
        this.listaprestamos = response;
        console.log("Lista Prestamos: " + this.listaprestamos.length);
      }

    );
    this.recibidos = true;
    this.buscar = false;
  }

  getNombreEstado(numeroEstado: number | undefined): string {
    let nombreEstado = 'Desconocido'; // Valor predeterminado si el número del estado es undefined

    if (numeroEstado !== undefined) {
      switch (numeroEstado) {
        case 1:
          nombreEstado = 'Solicitado';
          break;
        case 2:
          nombreEstado = 'Prestado';
          break;
        case 3:
          nombreEstado = 'Recibido';
          break;

        // Agrega más casos según tus necesidades
      }
    }

    return nombreEstado;
  }



  downloadPDF() {
    Swal.fire({
      title: "¡Generando el reporte!",
      text: "Espera un momento...",
      timer: 2500,
      timerProgressBar: true,
      toast: true,
      position: "center",
    });

    setTimeout(() => {
      const tables: any = document.getElementsByClassName('table');
      const doc = new jsPDF('p', 'pt', 'a4');
      const options = {
        background: 'white',
        scale: 2,
      };

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      let currentY = 0;

      const title = "INSTITUTO UNIVERSITARIO DEL AZUAY";
      const fontSizeTitle = 16;

      const titleWidth = doc.getTextWidth(title);
      const titleX = (pageWidth - titleWidth) / 2;

      doc.setFontSize(fontSizeTitle);
      doc.setTextColor("#023b76");
      doc.setFont('bold');
      doc.text(title, titleX, 20);

      Array.from(tables).forEach((table: any) => {
        html2canvas(table, options).then((canvas: any) => {
          const imgData = canvas.toDataURL('image/png');
          const pdfWidth = pageWidth - 300; // Ancho tabla
          const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

          if (currentY + pdfHeight > pageHeight - 50) {
            doc.addPage();
            currentY = 0;
          }

          const leftMargin = (pageWidth - pdfWidth) / 2; // Margen centrar
          doc.addImage(imgData, 'PNG', leftMargin, currentY + 50, pdfWidth, pdfHeight);
          currentY += pdfHeight + 50;
        });
      });

      const date = this.DateNow();
      const fontSizeDate = 12;
      const dateWidth = doc.getTextWidth(date);
      const dateX = pageWidth - dateWidth - 20; // Alineación a la derecha

      doc.setFontSize(fontSizeDate);
      doc.text(date, dateX, 40);

      setTimeout(() => {
        const filename = `${new Date().toISOString()}_reporte.pdf`;
        const pdfOutput = doc.output('blob');
        const pdfURL = URL.createObjectURL(pdfOutput);

        const link = document.createElement('a');
        link.href = pdfURL;
        link.download = filename;
        link.click();

        setTimeout(() => {
          URL.revokeObjectURL(pdfURL);
        }, 1000);
      }, 1000);
    }, 1000);
  }



  DateNow(): string {
    const fechaActual = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'
    };
    const fechaFormateada = fechaActual.toLocaleDateString('es-ES', options);
    return fechaFormateada;
  }


  form = new FormGroup({
    fechaInicio: new FormControl(),
    fechaFin: new FormControl()
  });

/*   search(busca: string, ciudad: string) {
    this.paginainicioService.buscarLibro(busca).subscribe(
      response => {
        console.log(response);
        if (response == null) {
          Swal.fire({
            title: '<strong>Libro no encontrado</strong>',
            confirmButtonText: 'error',
            confirmButtonColor: '#012844',
            icon: 'error',
          });
          this.ngOnInit();
        } else {
          // Filtra las fechas y la ciudad que coincidan con los valores de búsqueda
          const filteredData = this.paginas.filter((item: any) => {
            const fechaInicio = new Date(item.fechaInicio);
            const fechaFin = new Date(item.fechaFin);
            const fechaBuscada = new Date(busca);
  
            return (
              fechaInicio <= fechaBuscada &&
              fechaFin >= fechaBuscada &&
              item.ciudad.toLowerCase() === ciudad.toLowerCase()
            );
          });
  
          if (filteredData.length > 0) {
            this.paginas = filteredData;
          } else {
            Swal.fire({
              title: '<strong>No se encontraron resultados</strong>',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#012844',
              icon: 'info',
            });
          }
        }
      }
    );
  } */

  bus: boolean = true;
  buscarval: boolean = false;


   buscame(nombre: String) {
    this.bus = false;
    this.listPage.buscarLibro(nombre).subscribe(
      pagina => {
        this.paginas = pagina
        console.log(this.paginas.length);
        this.buscarval = true;
      }
    )
  } 

  
  
    onKeydownEvent(event: KeyboardEvent, titulo: String): void {
      if (titulo == "") {
      this.ngOnInit();
    }
  }


  onChange($event:any){

  }
  

  
  
  
  
  



}
