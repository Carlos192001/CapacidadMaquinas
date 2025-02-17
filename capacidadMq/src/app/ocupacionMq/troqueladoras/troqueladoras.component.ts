import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Parte } from '../../interface/parte';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-troqueladoras',
  templateUrl: './troqueladoras.component.html',
  styleUrl: './troqueladoras.component.css'
})
export class TroqueladorasComponent implements OnInit{
  @Input() maquinaSelect: string = '';
  @Input() parteSelect: string = '';
  @Input() idOcupMq!: number;
  @Output() datoEnviado = new EventEmitter<boolean>();

  //variables para los datos a ingresar
  requeriAnualAutilizar:number=0;
  golpesXminutos:number=0;
  pzaRequeridas:number=0;
  semanasAlaborar:number=0;
  diasAlaborarSemana:number=0;
  horasDelTurno:number=0;
  turnosAlDia:number=0;
  tiempoSetUp:number=0;
  cambioHerramental:number=0;
  numDeCambiosHerra:number=0;
  paradasProgramadas:number=0;
  demorasInevitables:number=0;
  cavidades:number=0;
  turnoInicial:number=0;
  turnoConsecutivo:number=0;
  scrapLiberado:number=0;
  observaciones:string='';
  //pertenecen a otra maquina
  cortesXminuto:number=0;
  tiempoCicloXpza:number=0;
  longTrabajoBanda:number=0;
  longTotalBanda:number=0;
  longEfectivoBanda:number=0;
  velocidadBanda:number=0;
  longDePza:number=0;
  espacioEntrePza:number=0;
  numLadosAfluxear:number=0;
  cantidadDummys:number=0;
  longitudDummy:number=0;
  longitudEntreDummys:number=0;
  longitudJig:number=0;
  longitudEntreJigs:number=0;
  filasDummysSimultaneas:number=0;
  filasJigsSimultaneas:number=0;
  numCambiosReceta:number=0;


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
  ocupacionTotal:number=0;
  idDatosAcalcular!:number;
  //variables de los calculos de otras maquinas
  ensamblesXminuto:number=0;
  ensamblesXhora:number=0;
  tiempDispoXturno:number=0;
  hrsNcesRequeDiario:number=0;
  tiempoEfecDiario:number=0;
  ensamReqXdia:number=0;
  ensamXdiaMasScrap:number=0;
  timeMuertoPrimeraColum:number=0;
  tiempoCiclo:number=0;
  pzaXhora:number=0;
  hrsXdiaRequeriSemanal:number=0;
  pzaXturno:number=0;
  longTotalJigDummy:number=0;
  longTotalJigProducto:number=0;
  numColDummys:number=0;
  numColJigProducto:number=0;
  tiempDisponibleHornoAlDia:number=0;
  horneadoXpzaPrimerDummy:number=0;
  horneadoXpzaRestoDummys:number=0;
  horneadoXpzaProducto:number=0;
  tiempRecorriPrimerDummy:number=0;
  tiempRecorriRestoDummys:number=0;
  tiempRecorridoProducto:number=0;
  ocupacionPrimerDummy:number=0;
  ocupacionRestoDummys:number=0;
  ocupacionProducto:number=0;


  //Para mostrar 
  showDescription1: boolean = false;
  showDescription2: boolean = false;
  showDescription3: boolean = false;
  showDescription4: boolean = false;
  showDescription5: boolean = false;
  showDescription6: boolean = false;
  showDescription7: boolean = false;
  showDescription8: boolean = false;
  showDescription9: boolean = false;
  showDescription10: boolean = false;
  showDescription11: boolean = false;
  showDescription12: boolean = false;
  showDescription13: boolean = false;
  showDescription14: boolean = false;
  showDescription15: boolean = false;
  showDescription16: boolean = false;
  showDescription17: boolean = false;

  //arreglo que contendra las partes ingresadas en las máquinas
  partes:any[] = [];
  descripcionNumParte:string='';
  ocupacionAll:any[]=[];
  isActiveForm: boolean = true;
  isActiveRegis: boolean = false;
  isActiveDatos: boolean = false;

  //ver el boton de calcular
  verBtnCalcular: boolean = true;

  constructor( private http:HttpClient){}

  ngOnInit(): void {
    this.http.get<Parte[]>('http://10.1.0.186:8090/partes/filtrar-numparte/' + this.parteSelect + '/')
    .subscribe((res: Parte[]) => {
      if (res.length > 0) {
        this.descripcionNumParte = res[0].descripcion;
      } else {
        alert('No se encontró ninguna descripción para el número de parte:'+this.parteSelect);
      }
    }, error => {
      console.error('Error al obtener la descripción:', error);
    });
    this.getOcupacionMq();
  }

  //para cambiar la maquina o el numero de parte
  cambio(){
    this.datoEnviado.emit(true);
  }

  //
  clicActiveForm(estado:boolean){
    this.isActiveForm= estado;
    this.isActiveRegis = !estado;
    this.isActiveDatos = !estado
  }
  clicActiveRegis(estado:boolean){
    this.isActiveForm= !estado;
    this.isActiveRegis = estado;
    this.isActiveDatos = !estado
  }
  /*clicActiveDatos(estado:boolean){
    this.isActiveForm= !estado;
    this.isActiveRegis = !estado;
    this.isActiveDatos = estado
  }*/

  registrarDatos(estado:boolean){
    //this.activarPestania=estado;
    let bodyData = {
      "idOcupacionMq" : this.idOcupMq,
      "requeriAnualAutilizar" : this.requeriAnualAutilizar,
      "golpesXminutos" : this.golpesXminutos,
      "pzaRequeridas" : this.pzaRequeridas,
      "semanasAlaborar" : this.semanasAlaborar,
      "diasAlaborarSemana" : this.diasAlaborarSemana,
      "horasDelTurno" : this.horasDelTurno,
      "turnosAlDia" : this.turnosAlDia,
      "tiempoSetUp" : this.tiempoSetUp,
      "cambioHerramental" : this.cambioHerramental,
      "numDeCambiosHerra" : this.numDeCambiosHerra,
      "paradasProgramadas" : this.paradasProgramadas,
      "demorasInevitables" : this.demorasInevitables,
      "cavidades" : this.cavidades,
      "turnoInicial" : this.turnoInicial,
      "turnoConsecutivo" : this.turnoConsecutivo,
      "scrapLiberado" : this.scrapLiberado,
      "estatus":'ACTIVO',
      "observaciones" : this.observaciones,


      "cortesXminuto":this.cortesXminuto,
      "tiempoCicloXpza":this.tiempoCicloXpza,
      "longTrabajoBanda": this.longTrabajoBanda,
      "longTotalBanda" : this.longTotalBanda,
      "longEfectivoBanda" : this.longEfectivoBanda,
      "velocidadBanda" : this.velocidadBanda,
      "longDePza" : this.longDePza,
      "espacioEntrePza" : this.espacioEntrePza,
      "numLadosAfluxear" : this.numLadosAfluxear,
      "cantidadDummys" : this.cantidadDummys,
      "longitudDummy" : this.longitudDummy,
      "longitudEntreDummys" : this.longitudEntreDummys,
      "longitudJig" : this.longitudJig,
      "longitudEntreJigs" : this.longitudEntreJigs,
      "filasDummysSimultaneas" : this.filasDummysSimultaneas,
      "filasJigsSimultaneas" : this.filasJigsSimultaneas,
      "numCambiosReceta" : this.numCambiosReceta
    }
    this.http.post('http://127.0.0.1:8000/datosAcalcular/', bodyData)
      .pipe(
        catchError(error => {
          console.error('Error durante el registro:', error);
          alert('Hubo un error al realizar el cálculo. Por favor, inténtelo de nuevo.');
          return throwError(error);
        })
      )
      .subscribe((resultData: any) => {
        console.log('Se realizó el REGISTRO, con este ID:', resultData.id);
        alert('Cálculo realizado con éxito');
        this.idDatosAcalcular = resultData.id;
        this.calcularUso(bodyData);
        this.isActiveForm = false; //para desaparecer la pestaña del formulario
        this.isActiveRegis = true;
        this.verBtnCalcular = false; //para que el btn de calcular no deje calcular de nuevo el valor
        this.requeriAnualAutilizar = 0;
        this.golpesXminutos = 0;
        this.pzaRequeridas = 0;
        this.semanasAlaborar = 0;
        this.diasAlaborarSemana = 0;
        this.horasDelTurno = 0;
        this.turnosAlDia = 0;
        this.tiempoSetUp = 0;
        this.cambioHerramental = 0;
        this.numDeCambiosHerra = 0;
        this.paradasProgramadas = 0;
        this.demorasInevitables = 0;
        this.cavidades = 0;
        this.turnoInicial = 0;
        this.turnoConsecutivo = 0;
        this.scrapLiberado = 0;
        this.observaciones = '';
      });
    
  }

  calcularUso(dato:any){
    this.horaSemanaTurno = dato.diasAlaborarSemana*dato.horasDelTurno*dato.turnosAlDia;
    console.log('Horas por semana por turno:',this.horaSemanaTurno);

    /*let calculorequerimiento = (dato.pzaRequeridas*dato.requeriAnualAutilizar)/(dato.semanasAlaborar*dato.diasAlaborarSemana);
    this.requerimientoDiario = Number(calculorequerimiento.toFixed(3));
    console.log('requerimiento diario:',this.requerimientoDiario);*/
    if (dato.semanasAlaborar && dato.diasAlaborarSemana) {
      this.requerimientoDiario = Number(((dato.pzaRequeridas*dato.requeriAnualAutilizar)/(dato.semanasAlaborar*dato.diasAlaborarSemana)).toFixed(3));
      console.log('requerimiento diario:',this.requerimientoDiario);
    } else {
      this.requerimientoDiario = 0;
      console.log('requerimiento diario:',this.requerimientoDiario);
    }

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
      this.pzaTeoricasXprimerTurno = Number(((this.hrsEfectivasXturno/(this.timeCicloXgolpe/60/60))*dato.cavidades).toFixed(3));
      console.log('piezas teoricas por primer turno:',this.pzaTeoricasXprimerTurno);
    } else {
      this.pzaTeoricasXprimerTurno = 0;
      console.log('piezas teoricas por primer turno:',this.pzaTeoricasXprimerTurno);
    }

    if (this.timeCicloXgolpe && this.cavidades) {
      this.pzaTeoricasXsegundoTurno = Number((((dato.horasDelTurno-((dato.paradasProgramadas+dato.demorasInevitables)/60))/(this.timeCicloXgolpe/60/60))*this.cavidades).toFixed(3));
      console.log('piezas teoricas por segundo turno',this.pzaTeoricasXsegundoTurno); //chececar
    } else {
      this.pzaTeoricasXsegundoTurno =0;
      console.log('piezas teoricas por segundo turno',this.pzaTeoricasXsegundoTurno);
    }

    this.numTurnosRequeridos = Number((dato.turnoInicial + dato.turnoConsecutivo).toFixed(3));
    console.log('Numero de turnos requeridos:',this.numTurnosRequeridos); //recortar 3 

    if (this.pzaTeoricasXprimerTurno && this.pzaTeoricasXsegundoTurno) {
      this.pzaProdEnTurnos = Number(((dato.turnoInicial*this.pzaTeoricasXprimerTurno)+(dato.turnoConsecutivo*this.pzaTeoricasXsegundoTurno)).toFixed(3));
      console.log('piezas producidas en turnos:',this.pzaProdEnTurnos);
    } else {
      this.pzaProdEnTurnos = 0;
      console.log('piezas producidas en turnos:',this.pzaProdEnTurnos);  //checar
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
      this.proyectadoOcupAnual = Number(((this.numTurnosRequeridos / (dato.turnosAlDia * dato.diasAlaborarSemana))*100).toFixed(2));
    } else {
      this.proyectadoOcupAnual = 0;
    }

    this.calcularSumaProyectadoOcupAnual();

    let bodyData = {
      "idDatosAcalcular": this.idDatosAcalcular,
      "horaSemanaTurno":this.horaSemanaTurno,
      "requerimientoDiario": this.requerimientoDiario,
      "timeCicloXgolpe": this.timeCicloXgolpe,
      "hrsEfectivasXturno": this.hrsEfectivasXturno,
      "pzaTeoricasXprimerTurno": this.pzaTeoricasXprimerTurno,
      "pzaTeoricasXsegundoTurno": this.pzaTeoricasXsegundoTurno,
      "numTurnosRequeridos": this.numTurnosRequeridos,
      "pzaProdEnTurnos": this.pzaProdEnTurnos,
      "requerimientoSem": this.requerimientoSem,
      "proyectadoOcupAnual": this.proyectadoOcupAnual,

      "ensamblesXminuto": this.ensamblesXminuto,
      "ensamblesXhora":this.ensamblesXhora,
      "tiempDispoXturno":this.tiempDispoXturno,
      "hrsNcesRequeDiario": this.hrsNcesRequeDiario,
      "tiempoEfecDiario": this.tiempoEfecDiario,
      "ensamReqXdia": this.ensamReqXdia,
      "ensamXdiaMasScrap": this.ensamXdiaMasScrap,
      "timeMuertoPrimeraColum": this.timeMuertoPrimeraColum,
      "tiempoCiclo": this.tiempoCiclo,
      "pzaXhora": this.pzaXhora,
      "hrsXdiaRequeriSemanal": this.hrsXdiaRequeriSemanal,
      "pzaXturno": this.pzaXturno,
      "longTotalJigDummy": this.longTotalJigDummy,
      "longTotalJigProducto": this.longTotalJigProducto,
      "numColDummys": this.numColDummys,
      "numColJigProducto": this.numColJigProducto,
      "tiempDisponibleHornoAlDia": this.tiempDisponibleHornoAlDia,
      "horneadoXpzaPrimerDummy": this.horneadoXpzaPrimerDummy,
      "horneadoXpzaRestoDummys": this.horneadoXpzaRestoDummys,
      "horneadoXpzaProducto": this.horneadoXpzaProducto,
      "tiempRecorriPrimerDummy": this.tiempRecorriPrimerDummy,
      "tiempRecorriRestoDummys": this.tiempRecorriRestoDummys,
      "tiempRecorridoProducto": this.tiempRecorridoProducto,
      "ocupacionPrimerDummy": this.ocupacionPrimerDummy,
      "ocupacionRestoDummys": this.ocupacionRestoDummys,
      "ocupacionProducto": this.ocupacionProducto,
      "estatus":'ACTIVO'
    }
    this.http.post('http://127.0.0.1:8000/resultadoCalculo/',bodyData).subscribe((resultData:any)=>{
      console.log('resgitro de los datos correcto');
      this.getOcupacionMq();
    });
  }
  getOcupacionMq(){
    this.http.get('http://127.0.0.1:8000/ocupacionMq/encabezado/TROQUELAR/'+this.maquinaSelect+'/').subscribe((resultData:any)=>{
      this.ocupacionAll = resultData;
      this.calcularSumaProyectadoOcupAnual();
    });
  }
  calcularSumaProyectadoOcupAnual(): void {
    const suma = this.ocupacionAll.reduce((sum, item) => {
      return sum + parseFloat(item.proyectadoOcupAnual);
    }, 0);
    this.ocupacionTotal = Number(suma.toFixed(2));
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
  getBackgroundColorTotal(): string {
    if (this.ocupacionTotal <= 85) {
      return '#008000'; // Verde
    } else if (this.ocupacionTotal > 85 && this.ocupacionTotal < 90) {
      return '#FFA500'; // Anaranjado
    } else {
      return '#FF0000'; // Rojo
    }
  }

}
