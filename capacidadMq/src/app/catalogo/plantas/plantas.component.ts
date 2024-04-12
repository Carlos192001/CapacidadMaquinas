import { Component } from '@angular/core';

@Component({
  selector: 'app-plantas',
  templateUrl: './plantas.component.html',
  styleUrl: './plantas.component.css'
})
export class PlantasComponent {

  verTarjeta:boolean=false;

  mostrarTarjeta(){
    this.verTarjeta=!this.verTarjeta;
  }
  ocultarTarjeta(){
    this.verTarjeta=false;
  }

}
