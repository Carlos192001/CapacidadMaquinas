import { Component } from '@angular/core';

@Component({
  selector: 'app-fluxeadoras',
  templateUrl: './fluxeadoras.component.html',
  styleUrl: './fluxeadoras.component.css'
})
export class FluxeadorasComponent {
  //variables para activar las pestañas
  pestania1:boolean=true;
  pestania2:boolean=false;
  activarPestania:boolean=false;

  //variables que contendran los datos ingresados
  requeriAnualAutilizar:number=0;
  longTrabajoBanda:number=0;
  velocidadBanda:number=0;
  longDePza:number=0;
  espacioEntrePza:number=0;
  semanasAlaborar:number=0;
  diasAlaborarSemana:number=0;
  horasDelTurno:number=0;
  turnosAlDia:number=0;
  cavidades:number=0;
  tiempoSetUp:number=0;
  paradasProgramadas:number=0;
  demorasInevitables:number=0;
  numLadosAfluxear:number=0;
  scrapLiberado:number=0;
  estatus:boolean=true;
  observaciones:string='';

  //variables que contendran los resultados de los calculos
  proyectadoOcupAnual:number=0;
  horaSemanaTurno:number=0;
  timeMuertoPrimeraColum:number=0;
  tiempoCiclo:number=0;
  pzaXhora:number=0;
  horasEfectivasXturno:number=0;
  hrsXdiaRequeriSemanal:number=0;
  pzaXturno:number=0;
  requerimientoSem:number=0;

  verPestania(estado:boolean){
    this.pestania1=estado;
    this.pestania2=!estado;
  }
  registrarDatos(estado:boolean){
    let bodyData = {
      "requeriAnualAutilizar":this.requeriAnualAutilizar,
      "longTrabajoBanda":this.longTrabajoBanda,
      "velocidadBanda":this.velocidadBanda,
      "longDePza":this.longDePza,
      "espacioEntrePza":this.espacioEntrePza,
      "semanasAlaborar":this.semanasAlaborar,
      "diasAlaborarSemana":this.diasAlaborarSemana,
      "horasDelTurno":this.horasDelTurno,
      "turnosAlDia":this.turnosAlDia,
      "cavidades":this.cavidades,
      "tiempoSetUp":this.tiempoSetUp,
      "paradasProgramadas":this.paradasProgramadas,
      "demorasInevitables":this.demorasInevitables,
      "numLadosAfluxear":this.numLadosAfluxear,
      "scrapLiberado":this.scrapLiberado,
      "estatus":true,
      "observaciones":this.observaciones,
    }
    this.activarPestania=estado;
    this.calcularUso(bodyData);
  }
  calcularUso(dato:any){
    //console.log(dato);
    this.horaSemanaTurno = dato.diasAlaborarSemana * dato.horasDelTurno * dato.turnosAlDia;
    console.log('Horas por semana por turno:',this.horasDelTurno);

    if (dato.velocidadBanda != 0) {
      this.timeMuertoPrimeraColum = Number((dato.longTrabajoBanda / dato.velocidadBanda).toFixed(3));
      console.log('Tiempo muerto primera columna de pza:',this.timeMuertoPrimeraColum);
    } else {
      this.timeMuertoPrimeraColum = 0;
      console.log('Tiempo muerto primera columna de pza:',this.timeMuertoPrimeraColum);
    }

    if (dato.velocidadBanda !=0) {
      this.tiempoCiclo = Number(((dato.longDePza + dato.espacioEntrePza)/dato.velocidadBanda).toFixed(3));
      console.log('Tiempo ciclo:',this.tiempoCiclo);
    } else {
      this.tiempoCiclo = 0;
    console.log('Tiempo ciclo:',this.tiempoCiclo);
    }

    if (dato.velocidadBanda !=0) {
      this.pzaXhora =  Number((((60 / ((dato.longDePza + dato.espacioEntrePza) / dato.velocidadBanda)) * dato.cavidades) / dato.numLadosAfluxear).toFixed(3));
      console.log('Piezas por hora:', this.pzaXhora);
    } else {
      this.pzaXhora =  0;
      console.log('Piezas por hora:', this.pzaXhora);
    }

    if (dato.horasDelTurno) {
      this.horasEfectivasXturno = Number(((((dato.horasDelTurno*60)-dato.tiempoSetUp - this.timeMuertoPrimeraColum - dato.paradasProgramadas - dato.demorasInevitables)/60)).toFixed(3));
      console.log('Horas efectivas por turno:',this.horasEfectivasXturno); //***** */
    } else {
      this.horasEfectivasXturno = 0;
      console.log('Horas efectivas por turno:',this.horasEfectivasXturno);
    }

    if (dato.semanasAlaborar !=0) {
      this.requerimientoSem = (dato.requeriAnualAutilizar * 9)/ dato.semanasAlaborar; //el 9 va a cambiar debido a que vendra con el catalogo de las maquinas
      console.log('Requerimiento semanal:',this.requerimientoSem)
    } else {
      this.requerimientoSem = 0; 
      console.log('Requerimiento semanal:',this.requerimientoSem)
    }

    if (this.requerimientoSem && this.pzaXhora) {
      this.hrsXdiaRequeriSemanal = Number((((this.requerimientoSem*(1+(dato.scrapLiberado/100)))/dato.diasAlaborarSemana)/this.pzaXhora).toFixed(3)); //recortar decimales
      console.log('Horas por dia para requerimiento semanal:',this.hrsXdiaRequeriSemanal);
    } else {
      this.hrsXdiaRequeriSemanal = 0;
      console.log('Horas por dia para requerimiento semanal:',this.hrsXdiaRequeriSemanal);
    }

    this.pzaXturno = Number((this.pzaXhora * this.horasEfectivasXturno).toFixed(3));
    console.log('Piezas por turno:', this.pzaXturno);

    if (this.hrsXdiaRequeriSemanal && this.horasEfectivasXturno) {
      this.proyectadoOcupAnual = Number(((this.hrsXdiaRequeriSemanal / (this.horasEfectivasXturno*dato.turnosAlDia))*100).toFixed(2));
    } else {
      this.proyectadoOcupAnual = 0;
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
