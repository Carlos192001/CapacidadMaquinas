import { Component } from '@angular/core';

@Component({
  selector: 'app-funciones',
  templateUrl: './funciones.component.html',
  styleUrl: './funciones.component.css'
})
export class FuncionesComponent {

  verTarjeta:boolean=false;

  mostrarTarjeta(){
    this.verTarjeta=!this.verTarjeta;
  }
  ocultarTarjeta(){
    this.verTarjeta=false;
  }

}
