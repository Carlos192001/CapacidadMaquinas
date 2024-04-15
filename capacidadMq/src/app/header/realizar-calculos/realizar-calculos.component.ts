import { Component } from '@angular/core';

@Component({
  selector: 'app-realizar-calculos',
  templateUrl: './realizar-calculos.component.html',
  styleUrl: './realizar-calculos.component.css'
})
export class RealizarCalculosComponent {

  //variables para ver los distintos formularios
  datoGeneral:boolean=true;
  maquinasForm:boolean=false;
  plantasForm:boolean=false;
  departamentosForm:boolean=false;
  parteForm:boolean=false;
  funcionForm:boolean=false;

  datosGenerales(estado:boolean){
    this.datoGeneral   = estado;
    this.maquinasForm = !estado;
    this.plantasForm = !estado;
    this.departamentosForm = !estado;
    this.parteForm = !estado;
    this.funcionForm = !estado;
  }

  catalogoMaquinas(estado:boolean){
    this.datoGeneral   = !estado;
    this.maquinasForm = estado;
    this.plantasForm = !estado;
    this.departamentosForm = !estado;
    this.parteForm = !estado;
    this.funcionForm = !estado;
  }
  catalogoPlantas(estado:boolean){
    this.datoGeneral   = !estado;
    this.maquinasForm = !estado;
    this.plantasForm = estado;
    this.departamentosForm = !estado;
    this.parteForm = !estado;
    this.funcionForm = !estado;
  }
  catalogoDepartamentos(estado:boolean){
    this.datoGeneral   = !estado;
    this.maquinasForm = !estado;
    this.plantasForm = !estado;
    this.departamentosForm = estado;
    this.parteForm = !estado;
    this.funcionForm = !estado;
  }
  catalogoPartes(estado:boolean){
    this.datoGeneral   = !estado;
    this.maquinasForm = !estado;
    this.plantasForm = !estado;
    this.departamentosForm = !estado;
    this.parteForm = estado;
    this.funcionForm = !estado;
  }
  catalogoFunciones(estado:boolean){
    this.datoGeneral   = !estado;
    this.maquinasForm = !estado;
    this.plantasForm = !estado;
    this.departamentosForm = !estado;
    this.parteForm = !estado;
    this.funcionForm = estado;
  }

}
