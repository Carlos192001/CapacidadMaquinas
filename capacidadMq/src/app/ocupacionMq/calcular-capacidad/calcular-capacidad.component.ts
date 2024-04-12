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
  manejarNuevoCalculo(evento: boolean): void {
    this.formFinPress = !evento; // Actualiza el estado en el componente padre
    this.datosMaquina = evento;

    console.log('ESTE ESTADO RECIBI DE MI HIJO:', evento);
  }


}
