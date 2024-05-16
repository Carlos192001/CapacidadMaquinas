import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Parte } from '../../interface/parte';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-inyectoras',
  templateUrl: './inyectoras.component.html',
  styleUrl: './inyectoras.component.css'
})
export class InyectorasComponent implements OnInit{

  //variables que se reciben y se envian
  @Input() maquinaSelect: string = '';
  @Input() parteSelect: string = '';
  @Input() idOcupMq!: number;
  @Output() datoEnviado = new EventEmitter<boolean>();

  descripcionNumParte:string='';
  ocupacionTotal: number =0;
  isActiveForm: boolean = true;
  isActiveRegis: boolean = false;
  isActiveDatos: boolean = false;

  //Para mostrar ayuda de los inputs
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

  verContenedorForm: boolean = true;

  idDatosAcalcular!:number;
  ocupacionAll:any[]=[];

  //variables para activar las pestañas
  /*pestania1:boolean=true;
  pestania2:boolean=false;
  activarPestania:boolean=false;*/
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

  constructor(private http: HttpClient){}
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
  //consulta todos las registros que pertenecen al tipo maquina por su codigo
  getOcupacionMq(){
    this.http.get('http://127.0.0.1:8000/ocupacionMq/encabezado/INYECTAR/'+this.maquinaSelect+'/').subscribe((resultData:any)=>{
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
  
  /*verPestania(estado:boolean){
    this.pestania1=estado;
    this.pestania2=!estado;
  }*/

  registrarDatos() {
    let bodyData = {
      "idOcupacionMq" : this.idOcupMq,
      "tiempoCicloXpza" : this.tiempoCicloXpza,
      "pzaRequeridas" : this.pzaRequeridas,
      "requeriAnualVentas" : this.requeriAnualVentas,
      "semanasAlaborar" : this.semanasAlaborar,
      "diasAlaborarSemana" : this.diasAlaborarSemana,
      "horasDelTurno" : this.horasDelTurno,
      "turnosAlDia" : this.turnosAlDia,
      "tiempoSetUp": this.tiempoSetUp,
      "cambioHerramental" : this.cambioHerramental,
      "numDeCambiosHerra" : this.numDeCambiosHerra,
      "paradasProgramadas" : this.paradasProgramadas,
      "demorasInevitables" : this.demorasInevitables,
      "cavidadesXmolde" : this.cavidadesXmolde,
      "turnoInicial" : this.turnoInicial,
      "turnoConsecutivo" : this.turnoConsecutivo,
      "estatus":'ACTIVO',
      "scrapLiberado" : this.scrapLiberado,
    }
    if (bodyData) {
      // Procesa los datos del formulario
      console.log('Formulario válido, datos:', bodyData);
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
        this.verContenedorForm = false;
        this.isActiveForm = false; //para desaparecer la pestaña del formulario
        this.isActiveRegis = true;
        /*this.pzaRequeridas = 0;
        this.semanasAlaborar = 0;
        this.diasAlaborarSemana = 0;
        this.horasDelTurno = 0;
        this.turnosAlDia = 0;
        this.tiempoSetUp = 0;
        this.demorasInevitables = 0;
        this.scrapLiberado = 0;
        this.observaciones = '';*/
      });
    } else {
      console.log('Datos del Formulario inválido');
    }
  }

  calcularUso(dato:any){
    //console.log(dato);

    this.horaSemanaTurno = dato.diasAlaborarSemana * dato.horasDelTurno * dato.turnosAlDia;
    console.log('horas semanas turno',this.horaSemanaTurno);

    /*let tiempoSetUpSinRedondeo = ((dato.tiempoCicloXpza + 5)*10)/60;
    this.tiempoSetUp = Math.ceil(tiempoSetUpSinRedondeo);
    console.log('tiempo set-up',this.tiempoSetUp);*/

      //el 5 cambiara porque es del catalogo de las maquinas
    let calculorequerimiento = (dato.pzaRequeridas * dato.requeriAnualVentas)/(dato.semanasAlaborar*dato.diasAlaborarSemana)
    if (dato.requeriAnualVentas && dato.semanasAlaborar && dato.diasAlaborarSemana) {
      this.requerimientoDiario = Number(calculorequerimiento.toFixed(3));
      console.log('requerimiento diario:',this.requerimientoDiario);
    } else {
      this.requerimientoDiario = 0;
      console.log('requerimiento diario:',this.requerimientoDiario);
    }

    let calcularTiempoXturno = (dato.horasDelTurno - (((dato.tiempoSetUp + dato.cambioHerramental )/60)*dato.numDeCambiosHerra)) - 
                                ((dato.paradasProgramadas + dato.demorasInevitables)/60);
    this.tiempDispoXturno = Number(calcularTiempoXturno.toFixed(3));
    console.log('tiempo disponible por turno:',this.tiempDispoXturno);

    let calculoPzaTeoricas = (this.tiempDispoXturno/(dato.tiempoCicloXpza/60/60))*dato.cavidadesXmolde;
    if (calculoPzaTeoricas) {
      this.pzaTeoricasXprimerTurno = Math.ceil(calculoPzaTeoricas);
      console.log('piezas teoricas primer turno',this.pzaTeoricasXprimerTurno);
    } else {
      this.pzaTeoricasXprimerTurno = 0;
      console.log('piezas teoricas primer turno',this.pzaTeoricasXprimerTurno);
    }

    let calcularpzaTeoricasSegundo = ((dato.horasDelTurno-((dato.paradasProgramadas+dato.demorasInevitables)/60))/(dato.tiempoCicloXpza/60/60))*dato.cavidadesXmolde;
    if (calcularpzaTeoricasSegundo) {
      this.pzaTeoricasXsegundoTurno = Number(calcularpzaTeoricasSegundo.toFixed(3)); 
      console.log('piezas teoricas segundo turno:',this.pzaTeoricasXsegundoTurno);
    } else {
      this.pzaTeoricasXprimerTurno = 0;
      console.log('piezas teoricas segundo turno:',this.pzaTeoricasXsegundoTurno);
    }
    
    this.numTurnosRequeridos = Number((this.turnoInicial + this.turnoConsecutivo).toFixed(3));                   //Number((this.turnoInicial + this.turnoConsecutivo).toFixed(1));
    console.log('numero de turnos requeridos:',this.numTurnosRequeridos);

    if (this.pzaTeoricasXprimerTurno) {
      let calculoPzaProdEnTurnos = (dato.turnoInicial*calculoPzaTeoricas)+(dato.turnoConsecutivo*this.pzaTeoricasXsegundoTurno)
      this.pzaProdEnTurnos = Number(calculoPzaProdEnTurnos.toFixed(3));
      console.log('pza producidas en turnos:',this.pzaProdEnTurnos);
    } else {
      this.pzaProdEnTurnos=0;
      console.log('pza producidas en turnos:',this.pzaProdEnTurnos);
    }

    if (this.requerimientoDiario) {
      this.requerimientoSem = Number((this.requerimientoDiario * dato.diasAlaborarSemana).toFixed(3));
      console.log('requerimiento semanal:',this.requerimientoSem);
    } else {
      this.requerimientoSem=0;
      console.log('requerimiento semanal:',this.requerimientoSem);
    }

    let calculoProyectadoAnual = this.numTurnosRequeridos / (dato.diasAlaborarSemana * dato.turnosAlDia);
    let calculoConPorcentaje = calculoProyectadoAnual * 100;
    if (this.numTurnosRequeridos) {
      this.proyectadoOcupAnual = Number(calculoConPorcentaje.toFixed(2));
      console.log('proyectado de ocupacion anual:',this.proyectadoOcupAnual);
    } else {
      this.proyectadoOcupAnual=0;
      console.log('proyectado de ocupacion anual:',this.proyectadoOcupAnual);
    }
    this.calcularSumaProyectadoOcupAnual();

    let bodyData ={
      "idDatosAcalcular": this.idDatosAcalcular,
      "horaSemanaTurno": this.horaSemanaTurno,
      "requerimientoDiario": this.requerimientoDiario,
      "tiempDispoXturno": this.tiempDispoXturno,
      "pzaTeoricasXprimerTurno": this.pzaTeoricasXprimerTurno,
      "pzaTeoricasXsegundoTurno": this.pzaTeoricasXsegundoTurno,
      "numTurnosRequeridos": this.numTurnosRequeridos,
      "pzaProdEnTurnos": this.pzaProdEnTurnos,
      "requerimientoSem": this.requerimientoSem,
      "proyectadoOcupAnual":this.proyectadoOcupAnual,
      "estatus": "ACTIVO"
    }
    /*this.http.post('http://127.0.0.1:8000/resultadoCalculo/',bodyData).subscribe((resultData:any)=>{
      console.log('registro de los datos correcto');
      this.getOcupacionMq();
    });*/
    this.http.post('http://127.0.0.1:8000/resultadoCalculo/', bodyData)
      .pipe(
        catchError(error => {
          console.error('Error durante el registro:', error);
          alert('Hubo un error al realizar el cálculo. Por favor, inténtelo de nuevo.');
          return throwError(error);
        })
      )
      .subscribe(
        (resultData: any) => {
          console.log('Registro de los datos correcto');
          this.getOcupacionMq();
        }
      );

  }
  //para cambiar la maquina o el numero de parte
  cambio(){
    this.datoEnviado.emit(true);
  }
  enviarEstado(): void {
    this.datoEnviado.emit(true); // Envía true al componente padre
  }
  clicActiveForm(estado:boolean){
    this.isActiveForm= estado;
    this.isActiveRegis = !estado;
  }
  clicActiveRegis(estado:boolean){
    this.isActiveForm= !estado;
    this.isActiveRegis = estado;
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
