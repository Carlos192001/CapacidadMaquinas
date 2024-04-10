import { Component } from '@angular/core';

@Component({
  selector: 'app-hornos',
  templateUrl: './hornos.component.html',
  styleUrl: './hornos.component.css'
})
export class HornosComponent {

  //variables para activar las pestañas
  pestania1:boolean=true;
  pestania2:boolean=false;
  activarPestania:boolean=false;

  //variebles que contendran los datos ingresados
  requeriAnualAutilizar:number=0;
  longTotalBanda:number=0;
  longEfectivoBanda:number=0;
  velocidadBanda:number=0;
  semanasAlaborar:number=0;
  diasAlaborarSemana:number=0;
  horasDelTurno:number=0;
  turnosAlDia:number=0;
  paradasProgramadas:number=0;
  demorasInevitables:number=0;
  cantidadDummys:number=0;
  longitudDummy:number=0;
  longitudEntreDummys:number=0;
  longitudJig:number=0;
  longitudEntreJigs:number=0;
  filasDummysSimultaneas:number=0;
  filasJigsSimultaneas:number=0;
  cavidadesEnBanda:number=0;
  numCambiosReceta:number=0;
  estatus:boolean=true;

  //variables que contendran los resultados de los calculos 
  proyectadoOcupAnual:number=0;
  horaSemanaTurno:number=0;
  longTotalJigDummy:number=0;
  longTotalJigProducto:number=0;
  requerimientoSem:number=0;
  requerimientoDiario:number=0;
  numColDummys:number=0;
  numColJigProducto:number=0;
  timeDisponibleHornoAlDia:number=0;
  horneadoXpzaPrimerDummy:number=0;
  horneadoXpzaRestoDummys:number=0;
  horneadoXpzaProducto:number=0;
  timeRecorriPrimerDummy:number=0;
  timeRecorriRestoDummys:number=0;
  timeRecorridoProducto:number=0;
  ocupacionPrimerDummy:number=0;
  OcupacionRestoDummys:number=0;
  ocupacionProducto:number=0;
  observaciones:string='';

  verPestania(estado:boolean){
    this.pestania1=estado;
    this.pestania2=!estado;
  }

  registrarDatos(estado: boolean){
    let bodyData = {
      "requeriAnualAutilizar":this.requeriAnualAutilizar,
      "longTotalBanda":this.longTotalBanda,
      "longEfectivoBanda":this.longEfectivoBanda,
      "velocidadBanda":this.velocidadBanda,
      "semanasAlaborar":this.semanasAlaborar,
      "diasAlaborarSemana":this.diasAlaborarSemana,
      "horasDelTurno":this.horasDelTurno,
      "turnosAlDia":this.turnosAlDia,
      "paradasProgramadas":this.paradasProgramadas,
      "demorasInevitables":this.demorasInevitables,
      "cantidadDummys":this.cantidadDummys,
      "longitudDummy":this.longitudDummy,
      "longitudEntreDummys":this.longitudEntreDummys,
      "longitudJig":this.longitudJig,
      "longitudEntreJigs":this.longitudEntreJigs,
      "filasDummysSimultaneas":this.filasDummysSimultaneas,
      "filasJigsSimultaneas":this.filasJigsSimultaneas,
      "cavidadesEnBanda":this.cavidadesEnBanda,
      "numCambiosReceta":this.numCambiosReceta,
      "estatus":true,
      "observaciones":this.observaciones,
    }
    this.activarPestania=estado;
    this.calcularUso(bodyData);
  }
  calcularUso(dato:any){
    console.log(dato);

    this.horaSemanaTurno = dato.horasDelTurno * dato.diasAlaborarSemana * dato.turnosAlDia;

    this.longTotalJigDummy = dato.longitudDummy + dato.longitudEntreDummys;

    this.longTotalJigProducto = dato.longitudEntreJigs + dato.longitudJig;

    this.requerimientoSem = dato.requeriAnualAutilizar / dato.semanasAlaborar;

    if (this.requerimientoSem) {
      this.requerimientoDiario = this.requerimientoSem / dato.diasAlaborarSemana;
    } else {
      this.requerimientoDiario = 0;
    }

    if (dato.cantidadDeDummysAUsar === 0) {
      this.numColDummys = 0;
    } else {
      this.numColDummys = (dato.cantidadDeDummysAUsar / dato.filasDeDummysSimultaneas) - 1;
    }

    if (this.requerimientoDiario) {
      this.numColJigProducto = this.requerimientoDiario/ dato.filasJigsSimultaneas;
    } else {
      this.numColJigProducto = 0;
    }

    this.timeDisponibleHornoAlDia = (dato.horasDelTurno-dato.paradasProgramadas-dato.demorasInevitables)*dato.turnosAlDia;

    if (dato.longitudDummy) {
      this.horneadoXpzaPrimerDummy = dato.longEfectivoBanda / dato.velocidadBanda;
    } else {
      this.horneadoXpzaPrimerDummy = 0;
    }

    if (this.longTotalJigDummy) {
      this.horneadoXpzaRestoDummys = this.longTotalJigDummy / dato.velocidadBanda;
    } else {
      this.horneadoXpzaRestoDummys = 0;
    }

    if (this.longTotalJigProducto) {
      this.horneadoXpzaProducto = this.longTotalJigProducto / dato.velocidadBanda;
    } else {
      this.horneadoXpzaProducto = 0;
    }

    if (this.longTotalJigDummy) {
      this.timeRecorriPrimerDummy = (this.horneadoXpzaPrimerDummy / 60) * dato.numCambiosReceta;
    } else {
      this.timeRecorriPrimerDummy = 0;
    }

    if (this.longTotalJigDummy) {
      this.timeRecorriRestoDummys = (this.horneadoXpzaRestoDummys * this.numColDummys / 60) * dato.numCambiosReceta;
    } else {
      this.timeRecorriRestoDummys = 0;
    }

  }

}
