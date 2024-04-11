import { Component } from '@angular/core';

@Component({
  selector: 'app-calcular-capacidad',
  templateUrl: './calcular-capacidad.component.html',
  styleUrl: './calcular-capacidad.component.css'
})
export class CalcularCapacidadComponent {

  datosMaquina:boolean=true;
  formFinPress:boolean=false;

  calcularCapacidad(){
    this.datosMaquina=false;
    this.formFinPress=true;
  }


}
