import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Parte } from '../../interface/parte';

@Component({
  selector: 'app-fluxeadoras',
  templateUrl: './fluxeadoras.component.html',
  styleUrl: './fluxeadoras.component.css'
})
export class FluxeadorasComponent implements OnInit{

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

  //variables que contendran los datos ingresados
  requeriAnualAutilizar:number=0;
  pzaRequeridas:number=0;
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

  /*verPestania(estado:boolean){
    this.pestania1=estado;
    this.pestania2=!estado;
  }*/
  constructor(private http:HttpClient){}
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
    this.http.get('http://127.0.0.1:8000/ocupacionMq/encabezado/FLUXEAR/'+this.maquinaSelect+'/').subscribe((resultData:any)=>{
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
      "pzaRequeridas": this.pzaRequeridas,
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
      "estatus":'ACTIVO',
      "observaciones":this.observaciones,
    }
    //this.activarPestania=estado;
    
    console.log(bodyData);
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
    this.horaSemanaTurno = Number((dato.diasAlaborarSemana * dato.horasDelTurno * dato.turnosAlDia).toFixed(3));
    console.log('Horas por semana por turno:',this.horaSemanaTurno);

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
      this.pzaXhora = Number((((60/((dato.longDePza + dato.espacioEntrePza) / dato.velocidadBanda)) * dato.cavidades) / dato.numLadosAfluxear).toFixed(3))
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
      this.requerimientoSem = Number(((dato.requeriAnualAutilizar * dato.pzaRequeridas)/ dato.semanasAlaborar).toFixed(3)); //el 9 va a cambiar debido a que vendra con el catalogo de las maquinas
      console.log('Requerimiento semanal:',this.requerimientoSem)
    } else {
      this.requerimientoSem = 0; 
      console.log('Requerimiento semanal:',this.requerimientoSem)
    }

    if (this.requerimientoSem && this.pzaXhora) {
      //this.hrsXdiaRequeriSemanal = Number((((this.requerimientoSem*(1+(dato.scrapLiberado/100)))/dato.diasAlaborarSemana)/this.pzaXhora).toFixed(3)); //recortar decimales
      this.hrsXdiaRequeriSemanal = Number((((this.requerimientoSem*(1+(dato.scrapLiberado/100)))/dato.diasAlaborarSemana)/this.pzaXhora).toFixed(3));
      console.log('Horas por dia para requerimiento semanal:',this.hrsXdiaRequeriSemanal);
    } else {
      this.hrsXdiaRequeriSemanal = 0;
      console.log('Horas por dia para requerimiento semanal:',this.hrsXdiaRequeriSemanal);
    }

    this.pzaXturno = Number((this.pzaXhora * this.horasEfectivasXturno).toFixed(3));
    console.log('Piezas por turno:', this.pzaXturno);

    if (this.hrsXdiaRequeriSemanal && this.horasEfectivasXturno) {
      this.proyectadoOcupAnual = Number(((this.hrsXdiaRequeriSemanal / (this.horasEfectivasXturno*dato.turnosAlDia))*100).toFixed(2));
      console.log('proyectado ocupacion anual:', this.proyectadoOcupAnual);
    } else {
      this.proyectadoOcupAnual = 0;
      console.log('proyectado ocupacion anual:', this.proyectadoOcupAnual);
    }

    let bodyData = {
      "idDatosAcalcular": this.idDatosAcalcular,
      "horaSemanaTurno": this.horaSemanaTurno,
      "timeMuertoPrimeraColum": this.timeMuertoPrimeraColum,
      "tiempoCiclo": this.tiempoCiclo,
      "pzaXhora": this.pzaXhora,
      "horasEfectivasXturno": this.horasEfectivasXturno,
      "hrsXdiaRequeriSemanal": this.hrsXdiaRequeriSemanal,
      "pzaXturno": this.pzaXturno,
      "requerimientoSem": this.requerimientoSem,
      "proyectadoOcupAnual": this.proyectadoOcupAnual,
      "estatus": 'ACTIVO'
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
