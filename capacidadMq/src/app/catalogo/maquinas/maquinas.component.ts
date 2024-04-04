import { Component } from '@angular/core';

@Component({
  selector: 'app-maquinas',
  templateUrl: './maquinas.component.html',
  styleUrl: './maquinas.component.css'
})
export class MaquinasComponent {

  verTarjeta:boolean=false;

  mostrarTarjeta(){
    this.verTarjeta=!this.verTarjeta;
  }
  ocultarTarjeta(){
    this.verTarjeta=false;
  }

}
