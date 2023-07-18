import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Swal from 'sweetalert2';
import { CarreraService } from '../services/carrera.service';
import { Prestamo } from '../models/Prestamo';
import { Carrera } from '../models/Carrera';
import { prestamoService } from '../services/prestamo.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-reporte-libros',
  templateUrl: './reporte-libros.component.html',
  styleUrls: ['./reporte-libros.component.css']
})
export class ReporteLibrosComponent implements OnInit {


  constructor(private listCarrera: CarreraService,
    private prestamoService: prestamoService,
    private router: Router) { }


  ngOnInit(): void {
    this.getCarrera();
    this.popPup();
    this.prestamoService.getPrestamos().subscribe(response => {
      this.listaprestamos = response;
    })
  }


  downloadPDF() {
    Swal.fire({
      icon: "info",
      title: "<span style='color: #007bff; font-size: 24px;'>Generando el reporte</span>",
      html: "<div style='font-size: 18px;'>Por favor, espera un momento...</div>",
      timer: 2500,
      timerProgressBar: true,
      toast: true,
      position: "center",
      showConfirmButton: false,
      background: "#f8f9fa",
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

      //firm
      doc.setFontSize(15);
      doc.setTextColor("#023b76");

      const firstSignatureName = "Firma:______________________________";

      const firstSignatureX = 175;
      const firstSignatureY = pageHeight - 50;

      doc.text(firstSignatureName, firstSignatureX, firstSignatureY);
      doc.setFontSize(12);


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


  getCarrera() {
    this.listCarrera.getCarreras().subscribe(
      carre => this.race = carre);
  }


  listaprestamos: Prestamo[] = [];
  listaprestamosest: Prestamo[] = [];
  listaprestamosdoc: Prestamo[] = [];
  race: Carrera[] = [];


  totalEst: number = 0;
  totalDoc: number = 0;
  total: number = 0;


  startFecha: string = "";
  endFecha: string = "";



  buscars(start: string, end: string): void {
    this.listaprestamosest = [];
    this.listaprestamosdoc = [];
    this.totalEst = 0;
    this.totalDoc = 0;
    this.prestamoService.prestamoconcarrera(start, end, 0).subscribe(
      response => {
        response.forEach(element => {
          this.getCarrera()
          if (element.tipoPrestamo == 1) {
            this.listaprestamosest.push(element);
            this.totalEst = this.listaprestamosest.length;
          } else if (element.tipoPrestamo == 2) {
            this.listaprestamosdoc.push(element);
            this.totalDoc = this.listaprestamosdoc.length;
          }
        });
        this.total = this.totalDoc + this.totalEst;
        console.log(this.total + " " + this.totalDoc + this.totalEst)
      },
      error => {
        console.error(error);
      }
    );
  }


  selectedRace: string = "";
  filteredList: any[] = [];

  filter(e: Event) {
    this.selectedRace = (e.target as HTMLInputElement).value;
    if (this.selectedRace === "All") {
      this.filteredList = this.listaprestamos;
    } else {
      this.filteredList = this.listaprestamos.filter(prestamo => prestamo.carrera?.nombre === this.selectedRace);
    }
  }

  getLibroTitulo(prestamo: any): string {
    return prestamo.libro?.titulo || "";
  }


  popPup() {
    const welcomeMessage = "¿Estás seguro de consultar?";
    const titleColor = "#007bff";

    Swal.fire({
      icon: 'question',
      title: `<span style="color: ${titleColor}; font-size: 24px;">${welcomeMessage}</span>`,
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      customClass: {
        popup: 'swal2-popup-custom',
        icon: 'swal2-icon-custom',
        confirmButton: 'swal2-button-custom swal2-button-confirm',
        cancelButton: 'swal2-button-custom swal2-button-cancel'
      },
    }).then((result) => {
      if (result.isConfirmed) {
        setTimeout(() => {
          this.redirectToConsultarButton();
        }, 100);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.router.navigate(['/']);
      }
    });
  }

  redirectToConsultarButton() {
    const consultarButton = document.getElementById('consultarButton') as HTMLButtonElement;
    if (consultarButton) {
      consultarButton.click();
    }
  }




}
