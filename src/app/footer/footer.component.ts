import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'app-footer',
    templateUrl:'./footer.component.html',
    styleUrls:['./footer.component.css']

})
export class FooterComponent implements OnInit{
    ngOnInit(): void {
       // throw new Error("Method not implemented.");
    }
    autor: any = {nombre: 'Johann', apellido: 'Arizaga'}

    displayStyle = "none";
  
  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }
}
