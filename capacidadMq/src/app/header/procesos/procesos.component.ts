import { Component } from '@angular/core';

@Component({
  selector: 'app-procesos',
  templateUrl: './procesos.component.html',
  styleUrl: './procesos.component.css'
})
export class ProcesosComponent {

  menuAbierto: boolean = false;
  showTooltipMaquina: boolean = false;
  showTooltipPlanta: boolean = false;
  showTooltipDepartamento:boolean=false;
  showTooltipParte:boolean=false;
  showTooltipFuncion:boolean=false;
  showTooltipPanel:Boolean=false;
  showTooltipDatoGral:boolean=false;

  //variables para ver los distintos formularios
  datoGeneral:boolean=true;
  maquinasForm:boolean=false;
  plantasForm:boolean=false;
  departamentosForm:boolean=false;
  parteForm:boolean=false;
  funcionForm:boolean=false;

  toggleMenu() {
    this.menuAbierto = !this.menuAbierto;
  }

  datoGeneralTooltip() {
    this.showTooltipDatoGral = true;
  }

  ocultarDatoTooltip() {
    this.showTooltipDatoGral = false;
  }

  maquinaTooltip() {
    this.showTooltipMaquina = true;
  }

  ocultarMaquinaTooltip() {
    this.showTooltipMaquina = false;
  }
  plantaTooltip() {
    this.showTooltipPlanta = true;
  }

  ocultarPlantaTooltip() {
    this.showTooltipPlanta = false;
  }

  departamentoTooltip() {
    this.showTooltipDepartamento = true;
  }

  ocultarDepartamentoTooltip() {
    this.showTooltipDepartamento = false;
  }

  parteTooltip() {
    this.showTooltipParte = true;
  }

  ocultarParteTooltip() {
    this.showTooltipParte = false;
  }

  funcionTooltip() {
    this.showTooltipFuncion = true;
  }

  ocultarFuncionTooltip() {
    this.showTooltipFuncion= false;
  }

  panelTooltip() {
    this.showTooltipPanel = true;
  }

  ocultarPanelTooltip() {
    this.showTooltipPanel = false;
  }

  datosGenerales(estado:boolean){
    this.datoGeneral   = estado;
    this.maquinasForm = !estado;
    this.plantasForm = !estado;
    this.departamentosForm = !estado;
    this.parteForm = !estado;
    this.funcionForm = !estado;
    this.menuAbierto = !estado;
  }

  catalogoMaquinas(estado:boolean){
    this.datoGeneral   = !estado;
    this.maquinasForm = estado;
    this.plantasForm = !estado;
    this.departamentosForm = !estado;
    this.parteForm = !estado;
    this.funcionForm = !estado;
    this.menuAbierto = !estado;
  }
  catalogoPlantas(estado:boolean){
    this.datoGeneral   = !estado;
    this.maquinasForm = !estado;
    this.plantasForm = estado;
    this.departamentosForm = !estado;
    this.parteForm = !estado;
    this.funcionForm = !estado;
    this.menuAbierto = !estado;
  }
  catalogoDepartamentos(estado:boolean){
    this.datoGeneral   = !estado;
    this.maquinasForm = !estado;
    this.plantasForm = !estado;
    this.departamentosForm = estado;
    this.parteForm = !estado;
    this.funcionForm = !estado;
    this.menuAbierto = !estado;
  }
  catalogoPartes(estado:boolean){
    this.datoGeneral   = !estado;
    this.maquinasForm = !estado;
    this.plantasForm = !estado;
    this.departamentosForm = !estado;
    this.parteForm = estado;
    this.funcionForm = !estado;
    this.menuAbierto = !estado;
  }
  catalogoFunciones(estado:boolean){
    this.datoGeneral   = !estado;
    this.maquinasForm = !estado;
    this.plantasForm = !estado;
    this.departamentosForm = !estado;
    this.parteForm = !estado;
    this.funcionForm = estado;
    this.menuAbierto = !estado;
  }

}
