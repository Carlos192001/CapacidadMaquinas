import { Component } from '@angular/core';

@Component({
  selector: 'app-inyectoras',
  templateUrl: './inyectoras.component.html',
  styleUrl: './inyectoras.component.css'
})
export class InyectorasComponent {
  //variables para activar las pestañas
  pestania1:boolean=true;
  pestania2:boolean=false;
  activarPestania:boolean=false;
  //variables para los datos a ingresar que serviran para el calculo 
  tiempoCicloXpza:number=0;
  pzaRequeridas:number=0;
  requeriAnualVentas:number=0;
  semanasAlaborar:number=0;
  diasAlaborarSemana:number=0;
  horasDelTurno:number=0;
  turnosAlDia:number=0;
  cambioHerramental:number=0;
  numDeCambiosHerra:number=0;
  paradasProgramadas:number=0;
  demorasInevitables:number=0;
  cavidadesXmolde:number=0;
  turnoInicial:number=0;
  turnoConsecutivo:number=0;
  scrapLiberado:number=0;
  observaciones:string='';
  //variables del resultado de los calculos 
  proyectadoOcupAnual:number=0;
  horaSemanaTurno:number=0;
  tiempoSetUp:number=0;
  requerimientoDiario:number=0;
  tiempDispoXturno:number=0;
  pzaTeoricasXprimerTurno:number=0;
  pzaTeoricasXsegundoTurno:number=0; 
  numTurnosRequeridos:number=0;
  pzaProdEnTurnos:number=0;
  requerimientoSem:number=0;
  estatus:boolean=true;
  
  verPestania(estado:boolean){
    this.pestania1=estado;
    this.pestania2=!estado;
  }

  registrarDatos(estado:boolean){
    this.activarPestania=estado;
    let bodyData = {
      "tiempoCicloXpza" : this.tiempoCicloXpza,
      "pzaRequeridas" : this.pzaRequeridas,
      "requeriAnualVentas" : this.requeriAnualVentas,
      "semanasAlaborar" : this.semanasAlaborar,
      "diasAlaborarSemana" : this.diasAlaborarSemana,
      "horasDelTurno" : this.horasDelTurno,
      "turnosAlDia" : this.turnosAlDia,
      "cambioHerramental" : this.cambioHerramental,
      "numDeCambiosHerra" : this.numDeCambiosHerra,
      "paradasProgramadas" : this.paradasProgramadas,
      "demorasInevitables" : this.demorasInevitables,
      "cavidadesXmolde" : this.cavidadesXmolde,
      "turnoInicial" : this.turnoInicial,
      "turnoConsecutivo" : this.turnoConsecutivo,
      "scrapLiberado" : this.scrapLiberado,
    }
    this.calcularUso(bodyData);
  }

  calcularUso(dato:any){
    //console.log(dato);

    this.horaSemanaTurno = dato.diasAlaborarSemana * dato.horasDelTurno * dato.turnosAlDia;
    console.log(this.horaSemanaTurno);

    let tiempoSetUpSinRedondeo = ((dato.tiempoCicloXpza + 5)*10)/60;
    this.tiempoSetUp = Math.ceil(tiempoSetUpSinRedondeo);
    console.log(this.tiempoSetUp);

      //el 5 cambiara porque es del catalogo de las maquinas
    let calculorequerimiento = (dato.pzaRequeridas * dato.requeriAnualVentas)/(dato.semanasAlaborar*dato.diasAlaborarSemana)
    if (dato.requeriAnualVentas && dato.semanasAlaborar && dato.diasAlaborarSemana) {
      this.requerimientoDiario = Number(calculorequerimiento.toFixed(3));
      console.log(this.requerimientoDiario);
    } else {
      this.requerimientoDiario = 0;
      console.log(this.requerimientoDiario);
    }

    let calcularTiempoXturno = (dato.horasDelTurno - (((this.tiempoSetUp + dato.cambioHerramental )/60)*dato.numDeCambiosHerra)) - 
                                ((dato.paradasProgramadas + dato.demorasInevitables)/60);
    this.tiempDispoXturno = Number(calcularTiempoXturno.toFixed(3));
    console.log(this.tiempDispoXturno);

    let calculoPzaTeoricas = (this.tiempDispoXturno/(dato.tiempoCicloXpza/60/60))*dato.cavidadesXmolde;
    if (calculoPzaTeoricas) {
      this.pzaTeoricasXprimerTurno = Math.ceil(calculoPzaTeoricas);
      console.log('piezas teoricas primer turno',this.pzaTeoricasXprimerTurno);
    } else {
      this.pzaTeoricasXprimerTurno = 0;
      console.log(this.pzaTeoricasXprimerTurno);
    }

    let calcularpzaTeoricasSegundo = ((dato.horasDelTurno-((dato.paradasProgramadas+dato.demorasInevitables)/60))/(dato.tiempoCicloXpza/60/60))*dato.cavidadesXmolde;
    if (calcularpzaTeoricasSegundo) {
      this.pzaTeoricasXsegundoTurno = Number(calcularpzaTeoricasSegundo.toFixed(3)); 
      console.log('piezas teoricas segundo turno:',this.pzaTeoricasXsegundoTurno);
    } else {
      this.pzaTeoricasXprimerTurno = 0;
      console.log(this.pzaTeoricasXsegundoTurno);
    }
    
    this.numTurnosRequeridos = Number((this.turnoInicial + this.turnoConsecutivo).toFixed(3));                   //Number((this.turnoInicial + this.turnoConsecutivo).toFixed(1));
    console.log(this.numTurnosRequeridos);

    if (this.pzaTeoricasXprimerTurno) {
      let calculoPzaProdEnTurnos = (dato.turnoInicial*calculoPzaTeoricas)+(dato.turnoConsecutivo*this.pzaTeoricasXsegundoTurno)
      this.pzaProdEnTurnos = Number(calculoPzaProdEnTurnos.toFixed(3));
      console.log(calculoPzaProdEnTurnos);
    } else {
      this.pzaProdEnTurnos=0;
      console.log(this.pzaProdEnTurnos);
    }

    if (this.requerimientoDiario) {
      this.requerimientoSem = this.requerimientoDiario * dato.diasAlaborarSemana;
      console.log(this.requerimientoSem);
    } else {
      this.requerimientoSem=0;
      console.log(this.requerimientoSem);
    }

    let calculoProyectadoAnual = this.numTurnosRequeridos / (dato.diasAlaborarSemana * dato.turnosAlDia);
    let calculoConPorcentaje = calculoProyectadoAnual * 100;
    if (this.numTurnosRequeridos) {
      this.proyectadoOcupAnual = Number(calculoConPorcentaje.toFixed(2));
    } else {
      this.proyectadoOcupAnual=0;
    }

  }
  getBackgroundColor(): string {
    if (this.proyectadoOcupAnual <= 85) {
      return '#008000'; // Verde
    } else if (this.proyectadoOcupAnual > 85 && this.proyectadoOcupAnual < 90) {
      return '#FFA500'; // Anaranjado
    } else {
      return '#FF0000'; // Rojo
    }
  }
  

}
