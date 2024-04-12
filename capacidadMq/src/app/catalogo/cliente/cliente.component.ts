import { Component } from '@angular/core';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css'
})
export class ClienteComponent {

  verTarjeta:boolean=false;

  mostrarTarjeta(){
    this.verTarjeta=!this.verTarjeta;
  }
  ocultarTarjeta(){
    this.verTarjeta=false;
  }

}
