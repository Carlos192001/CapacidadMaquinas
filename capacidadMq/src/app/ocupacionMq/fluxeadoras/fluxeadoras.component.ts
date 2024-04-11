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
  HoraSemanaTurno:number=0;
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
    
  }

}
