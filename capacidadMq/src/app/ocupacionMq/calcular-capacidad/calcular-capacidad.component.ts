import { Component } from '@angular/core';

@Component({
  selector: 'app-calcular-capacidad',
  templateUrl: './calcular-capacidad.component.html',
  styleUrl: './calcular-capacidad.component.css'
})
export class CalcularCapacidadComponent {
  pestania1:boolean=true;
  pestania2:boolean=false;
  activarPestania:boolean=false;
  //variables para el formulario
  cortesXminuto:number=0;
  requeriAnualAutilizar:number=0;
  semanasAlaborar:number=0;
  diasAlaborarSemana:number=0;
  horasDelTurno:number=0;
  turnosAlDia:number=0;
  tiempoSetUp:number=0;
  tiempoMuertoPlan:number=0;
  demorasInevitables:number=0;
  cavidades:number=0;
  scrapLiberado:number=0;
  vendedorEncargado:string='';
  estatus:boolean=true;

  //variables para el calculo de la ocupacion de la máquina
  HoraSemanaTurno:number=0;
  ensamblesXminuto:number=0;
  ensamblesXhora:number=0;
  requerimientoSem:number=0;
  hrsNcesRequeDiario:number=0;
  tiempoEfecDiario:number=0;
  ensamReqXdia:number=0;
  ensamXdiaMasScrap:number=0;

  verPestania(estado:boolean){
    this.pestania1=estado;
    this.pestania2=!estado;
  }
  //registrar nuevos datos de la ocupacion de la maquina
  registrarDatos(estado:boolean){
    this.activarPestania=estado;
    let bodyData = {
      "cortesXminuto" : this.cortesXminuto,
      "requeriAnualAutilizar" : this.requeriAnualAutilizar,
      "semanasAlaborar" : this.semanasAlaborar,
      "diasAlaborarSemana" : this.diasAlaborarSemana,
      "horasDelTurno" : this.horasDelTurno,
      "turnosAlDia" : this.turnosAlDia,
      "tiempoSetUp" : this.tiempoSetUp,
      "tiempoMuertoPlan" : this.tiempoMuertoPlan,
      "demorasInevitables" : this.demorasInevitables,
      "cavidades" : this.cavidades,
      "scrapLiberado" : this.scrapLiberado,
      "vendedorEncargado" : this.vendedorEncargado,
      "estatus" : this.estatus
    }
    this.calcularUso(bodyData);
    //console.log(bodyData);
  }

  calcularUso(dato:any){
    this.HoraSemanaTurno = dato.horasDelTurno * dato.diasAlaborarSemana * dato.turnosAlDia;
    console.log("horas por semana por turno:",this.HoraSemanaTurno);

    let ensamblesPorminuto = dato.cortesXminuto / 46;
    this.ensamblesXminuto = Number(ensamblesPorminuto.toFixed(3)); // o Number(ensamblesPorminuto.toFixed(3));
    console.log("ensambles por minuto:",this.ensamblesXminuto);

    let ensamblesPorhora = ensamblesPorminuto * 60;
    this.ensamblesXhora = Number(ensamblesPorhora.toFixed(3));
    console.log("ensambles por hora:",this.ensamblesXhora)

    this.requerimientoSem = dato.requeriAnualAutilizar / dato.semanasAlaborar;
    console.log("Requerimiento Semanal:",this.requerimientoSem);

    this.ensamReqXdia = this.requerimientoSem / dato.diasAlaborarSemana;
    console.log("Ensamble requerido por dia:", this.ensamReqXdia);
    
    let ensableMasScrap = this.ensamReqXdia * (1+dato.scrapLiberado);
    this.ensamXdiaMasScrap = Number(ensableMasScrap.toFixed(3));
    console.log("Ensamble por dia mas Scrap:",this.ensamXdiaMasScrap);

    let horasRequerimientoDiario = this.ensamXdiaMasScrap / this.ensamblesXhora
    this.hrsNcesRequeDiario = Number(horasRequerimientoDiario.toFixed(3));
    console.log("Horas necesarias requerimiento diario:", this.hrsNcesRequeDiario);
    
    let primero = dato.demorasInevitables + dato.tiempoMuertoPlan + dato.tiempoSetUp;
    let segundo = dato.horasDelTurno - primero / 60;
    let resultado = segundo *dato.turnosAlDia;
    this.tiempoEfecDiario = Number(resultado.toFixed(3));
    //(dato.horasDelTurno((dato.demorasInevitables+dato.tiempoMuertoPlan+dato.tiempoSetUp)/60))*dato.turnosAlDia;
    console.log("tiempo efectivo diario:",this.tiempoEfecDiario);
    

  }


}
