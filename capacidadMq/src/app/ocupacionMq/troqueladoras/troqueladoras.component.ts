import { Component } from '@angular/core';

@Component({
  selector: 'app-troqueladoras',
  templateUrl: './troqueladoras.component.html',
  styleUrl: './troqueladoras.component.css'
})
export class TroqueladorasComponent {
  //variables para activar las pestañas
  pestania1:boolean=true;
  pestania2:boolean=false;
  activarPestania:boolean=false;

  //variables para los datos a ingresar
  requeriAnualAutilizar:number=0;
  golpesXminutos:number=0;
  semanasAlaborar:number=0;
  diasAlaborarSemana:number=0;
  horasDelTurno:number=0;
  turnosAlDia:number=0;
  tiempoSetUp:number=0;
  cambioHerramental:number=0;
  numDeCambiosHerra:number=0;
  paradasProgramadas:number=0;
  demorasInevitables:number=0;
  cavidadesXgolpe:number=0;
  turnoInicial:number=0;
  turnoConsecutivo:number=0;
  scrapLiberado:number=0;
  estatus:boolean=true;
  observaciones:string='';

  //variables que contendran los calculos 
  proyectadoOcupAnual:number=0;
  horaSemanaTurno:number=0;
  requerimientoDiario:number=0;
  timeCicloXgolpe:number=0;
  hrsEfectivasXturno:number=0;
  pzaTeoricasXprimerTurno:number=0;
  pzaTeoricasXsegundoTurno:number=0;
  numTurnosRequeridos:number=0;
  pzaProdEnTurnos:number=0;
  requerimientoSem:number=0;

  //
  verPestania(estado:boolean){
    this.pestania1=estado;
    this.pestania2=!estado;
  }

  registrarDatos(estado:boolean){
    this.activarPestania=estado;
    let bodyData = {
      "requeriAnualAutilizar" : this.requeriAnualAutilizar,
      "golpesXminutos" : this.golpesXminutos,
      "semanasAlaborar" : this.semanasAlaborar,
      "diasAlaborarSemana" : this.diasAlaborarSemana,
      "horasDelTurno" : this.horasDelTurno,
      "turnosAlDia" : this.turnosAlDia,
      "tiempoSetUp" : this.tiempoSetUp,
      "cambioHerramental" : this.cambioHerramental,
      "numDeCambiosHerra" : this.numDeCambiosHerra,
      "paradasProgramadas" : this.paradasProgramadas,
      "demorasInevitables" : this.demorasInevitables,
      "cavidadesXgolpe" : this.cavidadesXgolpe,
      "turnoInicial" : this.turnoInicial,
      "turnoConsecutivo" : this.turnoConsecutivo,
      "scrapLiberado" : this.scrapLiberado,
      "estatus":true,
      "observaciones" : this.observaciones,
    }
    //console.log(bodyData);
    this.calcularUso(bodyData);
  }

  calcularUso(dato:any){
    this.horaSemanaTurno = dato.diasAlaborarSemana*dato.horasDelTurno*dato.turnosAlDia;
    console.log('Horas por semana por turno:',this.horaSemanaTurno);

    let calculorequerimiento = (1*dato.requeriAnualAutilizar)/(dato.semanasAlaborar*dato.diasAlaborarSemana);
    this.requerimientoDiario = Number(calculorequerimiento.toFixed(3));
    console.log('requerimiento diario:',this.requerimientoDiario);

    if (dato.golpesXminutos) {
      this.timeCicloXgolpe = 60/dato.golpesXminutos;
      console.log('tiempo ciclo por golpe:',this.timeCicloXgolpe);
    } else {
      this.timeCicloXgolpe = 0;
      console.log('tiempo ciclo por golpe:',this.timeCicloXgolpe);
    }

    this.hrsEfectivasXturno = dato.horasDelTurno-(((dato.cambioHerramental+dato.tiempoSetUp)/60)*dato.numDeCambiosHerra)-(dato.paradasProgramadas+dato.demorasInevitables)/60;
    console.log('horas efectivas por turno:',this.hrsEfectivasXturno);

    if (this.timeCicloXgolpe) {
      this.pzaTeoricasXprimerTurno = (this.hrsEfectivasXturno/(this.timeCicloXgolpe/60/60))*dato.cavidadesXgolpe;
      console.log('piezas teoricas por primer turno:',this.pzaTeoricasXprimerTurno);
    } else {
      this.pzaTeoricasXprimerTurno = 0;
      console.log('piezas teoricas por primer turno:',this.pzaTeoricasXprimerTurno);
    }

    if (this.timeCicloXgolpe && this.cavidadesXgolpe) {
      this.pzaTeoricasXsegundoTurno = (dato.horasDelTurno-(dato.paradasProgramadas+dato.demorasInevitables)/60) / ((this.timeCicloXgolpe/60/60)*this.cavidadesXgolpe);
      console.log('piezas teoricas por segundo turno',this.pzaTeoricasXsegundoTurno);
    } else {
      this.pzaTeoricasXsegundoTurno =0;
      console.log('piezas teoricas por segundo turno',this.pzaTeoricasXsegundoTurno);
    }

    this.numTurnosRequeridos = dato.turnoInicial + dato.turnoConsecutivo;
    console.log('turnos consecutivos:',this.numTurnosRequeridos);

    if (this.pzaTeoricasXprimerTurno && this.pzaTeoricasXsegundoTurno) {
      this.pzaProdEnTurnos = (dato.turnoInicial*this.pzaTeoricasXprimerTurno)+(dato.turnoConsecutivo*this.pzaTeoricasXsegundoTurno);
      console.log('piezas producidas en turnos:',this.pzaProdEnTurnos);
    } else {
      this.pzaProdEnTurnos = 0;
      console.log('piezas producidas en turnos:',this.pzaProdEnTurnos);
    }
    
    if (this.requerimientoDiario) {
      let calculorequerimientoSem = this.requerimientoDiario*dato.diasAlaborarSemana;
      this.requerimientoSem = Number(calculorequerimientoSem.toFixed(3));
      console.log('requerimiento semanal:',this.requerimientoSem);
    } else {
      this.requerimientoSem = 0;
      console.log('requerimiento semanal:',this.requerimientoSem);
    }

    if (this.numTurnosRequeridos) {
      this.proyectadoOcupAnual = (this.numTurnosRequeridos / (dato.turnosAlDia * dato.diasAlaborarSemana))*100;
    } else {
      this.proyectadoOcupAnual = 0;
    }
  }

}
