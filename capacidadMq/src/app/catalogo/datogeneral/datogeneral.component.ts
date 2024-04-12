import { Component } from '@angular/core';

@Component({
  selector: 'app-datogeneral',
  templateUrl: './datogeneral.component.html',
  styleUrl: './datogeneral.component.css'
})
export class DatogeneralComponent {

  verTarjeta:boolean=false;

  mostrarTarjeta(){
    this.verTarjeta=!this.verTarjeta;
  }
  ocultarTarjeta(){
    this.verTarjeta=false;
  }

}
