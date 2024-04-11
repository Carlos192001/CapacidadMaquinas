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
    //console.log(dato);

    this.horaSemanaTurno = dato.horasDelTurno * dato.diasAlaborarSemana * dato.turnosAlDia;
    console.log('Horas semanas turno:',this.horaSemanaTurno);

    this.longTotalJigDummy = dato.longitudDummy + dato.longitudEntreDummys;
    console.log('Longitud total jig dummy:',this.longTotalJigDummy);

    this.longTotalJigProducto = dato.longitudEntreJigs + dato.longitudJig;
    console.log('Longitud total Jig producto:',this.longTotalJigProducto);

    if (dato.semanasAlaborar != 0) {
      this.requerimientoSem = dato.requeriAnualAutilizar / dato.semanasAlaborar;
      console.log('Requerimiento semanal:',this.requerimientoSem);
    } else {
      this.requerimientoSem = 0;
      console.log('Requerimiento semanal:',this.requerimientoSem);
    }

    if (this.requerimientoSem) {
      this.requerimientoDiario = this.requerimientoSem / dato.diasAlaborarSemana;
      console.log('Requerimiento Diario:',this.requerimientoDiario);
    } else {
      this.requerimientoDiario = 0;
      console.log('Requerimiento Diario:',this.requerimientoDiario);
    }

    if (dato.cantidadDummys === 0) {
      this.numColDummys = 0;
      console.log('Numero columnas Dummys:',this.numColDummys);
    } else {
      this.numColDummys = (dato.cantidadDummys / dato.filasDummysSimultaneas) - 1;
      console.log('Numero columnas Dummys:',this.numColDummys);
    }

    if (this.requerimientoDiario) {
      this.numColJigProducto = this.requerimientoDiario/ dato.filasJigsSimultaneas;
      console.log('Numero columnas Jig producto:',this.numColJigProducto);
    } else {
      this.numColJigProducto = 0;
      console.log('Numero columnas Jig producto:',this.numColJigProducto);
    }

    this.timeDisponibleHornoAlDia = Number(((dato.horasDelTurno-dato.paradasProgramadas-dato.demorasInevitables)*dato.turnosAlDia).toFixed(3));
    console.log('Tiempo disponible del horno al día:', this.timeDisponibleHornoAlDia); 

    if (dato.longitudDummy) {
      this.horneadoXpzaPrimerDummy = Number((dato.longEfectivoBanda / dato.velocidadBanda).toFixed(3));
      console.log('Tiempo de horneado por pza 1er Dummy:',this.horneadoXpzaPrimerDummy);
    } else {
      this.horneadoXpzaPrimerDummy = 0;
      console.log('Tiempo de horneado por pza 1er Dummy:',this.horneadoXpzaPrimerDummy);
    }

    if (this.longTotalJigDummy) {
      this.horneadoXpzaRestoDummys = Number((this.longTotalJigDummy / dato.velocidadBanda).toFixed(3));
      console.log('Tiempo de horneado por pza resto dummys:', this.horneadoXpzaRestoDummys);
    } else {
      this.horneadoXpzaRestoDummys = 0;
      console.log('Tiempo de horneado por pza resto dummys:', this.horneadoXpzaRestoDummys);
    }

    if (this.longTotalJigProducto) {
      this.horneadoXpzaProducto = Number((this.longTotalJigProducto / dato.velocidadBanda).toFixed(3));
      console.log('Tiempo de horneado por pza producto:',this.horneadoXpzaProducto); 
    } else {
      this.horneadoXpzaProducto = 0;
      console.log('Tiempo de horneado por pza producto:',this.horneadoXpzaProducto);
    }

    if (this.longTotalJigDummy) {
      this.timeRecorriPrimerDummy = Number(((this.horneadoXpzaPrimerDummy / 60) * dato.numCambiosReceta).toFixed(3));
      console.log('Tiempo recorrido del 1er Dummy',this.timeRecorriPrimerDummy); 
    } else {
      this.timeRecorriPrimerDummy = 0;
      console.log('Tiempo recorrido del 1er Dummy',this.timeRecorriPrimerDummy);
    }

    if (this.longTotalJigDummy) {
      this.timeRecorriRestoDummys = Number(((this.horneadoXpzaRestoDummys * this.numColDummys / 60) * dato.numCambiosReceta).toFixed(3));
      console.log('Tiempo recorrido resto Dummys:',this.timeRecorriRestoDummys); 
    } else {
      this.timeRecorriRestoDummys = 0;
      console.log('Tiempo recorrido resto Dummys:',this.timeRecorriRestoDummys);
    }

    if (this.numColJigProducto && this.horneadoXpzaProducto) {
      this.timeRecorridoProducto = Number(((this.numColJigProducto / dato.cavidadesEnBanda)*(this.horneadoXpzaProducto/60)).toFixed(3)); //
      console.log('Tiempo del recorrido de producto:',this.timeRecorridoProducto);
    } else {
      this.timeRecorridoProducto = 0;
      console.log('Tiempo del recorrido de producto:',this.timeRecorridoProducto);
    }

    if (this.longTotalJigDummy) {
      this.ocupacionPrimerDummy = Number(((this.timeRecorriPrimerDummy / this.timeDisponibleHornoAlDia)*100).toFixed(2)); //da: 0.03925791327366131 y en el excel:3.93%
      console.log('Ocupacion 1er Dummy:', this.ocupacionPrimerDummy);
    } else {
      this.ocupacionPrimerDummy = 0;
      console.log('Ocupacion 1er Dummy:', this.ocupacionPrimerDummy);
    }

    if (this.longTotalJigDummy) {
      this.OcupacionRestoDummys = Number(((this.timeRecorriRestoDummys / this.timeDisponibleHornoAlDia)*100).toFixed(2)); //da:  0.004486618659847007 en el excel: 0.45%
      console.log('Ocupacion resto Dummy:',this.OcupacionRestoDummys);
    } else {
      this.OcupacionRestoDummys = 0;
      console.log('Ocupacion resto Dummy:',this.OcupacionRestoDummys);
    }

    if (this.timeRecorridoProducto && this.timeDisponibleHornoAlDia) {
      this.ocupacionProducto = Number(((this.timeRecorridoProducto / this.timeDisponibleHornoAlDia)*100).toFixed(2)); //me da: 0.0001794647463938803 y en el excel:1.79%
      console.log('Ocupacion producto:', this.ocupacionProducto);
    } else {
      this.ocupacionProducto = 0;
      console.log('Ocupacion producto:', this.ocupacionProducto);
    }

    this.proyectadoOcupAnual = Number((this.ocupacionProducto + this.OcupacionRestoDummys + this.ocupacionPrimerDummy).toFixed(2));

  }

}
