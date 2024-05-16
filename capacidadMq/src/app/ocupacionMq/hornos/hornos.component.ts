import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Parte } from '../../interface/parte';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-hornos',
  templateUrl: './hornos.component.html',
  styleUrl: './hornos.component.css'
})
export class HornosComponent implements OnInit{

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
  showDescription18: boolean = false;
  showDescription19: boolean = false;

  verContenedorForm: boolean = true;

  idDatosAcalcular!:number;
  ocupacionAll:any[]=[];

  //variables para activar las pestañas
  //pestania1:boolean=true;
  //pestania2:boolean=false;
  //activarPestania:boolean=false;

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

  /*verPestania(estado:boolean){
    this.pestania1=estado;
    this.pestania2=!estado;
  }*/
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
    this.http.get('http://127.0.0.1:8000/ocupacionMq/encabezado/HORNEAR/'+this.maquinaSelect+'/').subscribe((resultData:any)=>{
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

  registrarDatos(){
    let bodyData = {
      "idOcupacionMq" : this.idOcupMq,
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
      "estatus":'ACTIVO',
      "observaciones":this.observaciones,
    }
    console.log(bodyData);
    //this.activarPestania=estado;
    //this.calcularUso(bodyData);
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
        //alert('Cálculo realizado con éxito');
        this.idDatosAcalcular = resultData.id;
        this.calcularUso(bodyData);
        this.verContenedorForm = false;
        this.isActiveForm = false; //para desaparecer la pestaña del formulario
        this.isActiveRegis = true;
      });
    } else {
      console.log('Datos del Formulario inválido');
    }
  }
  calcularUso(dato:any){
    //console.log(dato);

    this.horaSemanaTurno = Number((dato.horasDelTurno * dato.diasAlaborarSemana * dato.turnosAlDia).toFixed(3));
    console.log('Horas semanas turno:',this.horaSemanaTurno);

    this.longTotalJigDummy = Number((dato.longitudDummy + dato.longitudEntreDummys).toFixed(3));
    console.log('Longitud total jig dummy:',this.longTotalJigDummy);

    this.longTotalJigProducto = Number((dato.longitudEntreJigs + dato.longitudJig).toFixed(3));
    console.log('Longitud total Jig producto:',this.longTotalJigProducto);

    if (dato.semanasAlaborar != 0) {
      this.requerimientoSem = Number((dato.requeriAnualAutilizar / dato.semanasAlaborar).toFixed(3));
      console.log('Requerimiento semanal:',this.requerimientoSem);
    } else {
      this.requerimientoSem = 0;
      console.log('Requerimiento semanal:',this.requerimientoSem);
    }

    if (this.requerimientoSem) {
      this.requerimientoDiario = Number((this.requerimientoSem / dato.diasAlaborarSemana).toFixed(3));
      console.log('Requerimiento Diario:',this.requerimientoDiario);
    } else {
      this.requerimientoDiario = 0;
      console.log('Requerimiento Diario:',this.requerimientoDiario);
    }

    if (dato.cantidadDummys === 0) {
      this.numColDummys = 0;
      console.log('Numero columnas Dummys:',this.numColDummys);
    } else {
      this.numColDummys = Number(((dato.cantidadDummys / dato.filasDummysSimultaneas) - 1).toFixed(3));
      console.log('Numero columnas Dummys:',this.numColDummys);
    }

    if (this.requerimientoDiario) {
      this.numColJigProducto = Number((this.requerimientoDiario/ dato.filasJigsSimultaneas).toFixed(3));
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
    console.log('proyectado anual:',this.proyectadoOcupAnual);

    let bodyData ={
      "idDatosAcalcular": this.idDatosAcalcular,
      "horaSemanaTurno": this.horaSemanaTurno,
      "longTotalJigDummy": this.longTotalJigDummy,
      "longTotalJigProducto": this.longTotalJigProducto,
      "requerimientoSem": this.requerimientoSem,
      "requerimientoDiario": this. requerimientoDiario,
      "numColDummys": this.numColDummys,
      "numColJigProducto": this.numColJigProducto,
      "timeDisponibleHornoAlDia": this.timeDisponibleHornoAlDia,
      "horneadoXpzaPrimerDummy": this.horneadoXpzaPrimerDummy,
      "horneadoXpzaRestoDummys": this.horneadoXpzaRestoDummys,
      "horneadoXpzaProducto": this.horneadoXpzaProducto,
      "timeRecorriPrimerDummy": this.timeRecorriPrimerDummy,
      "timeRecorriRestoDummys": this.timeRecorriRestoDummys,
      "timeRecorridoProducto": this.timeRecorridoProducto,
      "ocupacionPrimerDummy": this.ocupacionPrimerDummy,
      "OcupacionRestoDummys": this.OcupacionRestoDummys,
      "ocupacionProducto": this.ocupacionProducto,
      "proyectadoOcupAnual":this.proyectadoOcupAnual,
      "estatus": "ACTIVO"
    }
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
          alert('Cálculo realizado con éxito');
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
