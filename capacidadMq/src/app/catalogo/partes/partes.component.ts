import { Component } from '@angular/core';

@Component({
  selector: 'app-partes',
  templateUrl: './partes.component.html',
  styleUrl: './partes.component.css'
})
export class PartesComponent {

  verTarjeta:boolean=false;

  mostrarTarjeta(){
    this.verTarjeta=!this.verTarjeta;
  }
  ocultarTarjeta(){
    this.verTarjeta=false;
  }

}
