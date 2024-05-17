import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Parte } from '../../interface/parte';

@Component({
  selector: 'app-finpress',
  templateUrl: './finpress.component.html',
  styleUrl: './finpress.component.css'
})
export class FinpressComponent implements OnInit{

  pestania1:boolean=true;
  pestania2:boolean=false;
  //activarPestania:boolean=false;
  //variables para el formulario
  cortesXminuto:number=0;
  pzaRequeridas:number=0;
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
  observaciones:string='';

  //variables para el calculo de la ocupacion de la máquina
  horaSemanaTurno:number=0;
  ensamblesXminuto:number=0;
  ensamblesXhora:number=0;
  requerimientoSem:number=0;
  hrsNcesRequeDiario:number=0;
  tiempoEfecDiario:number=0;
  ensamReqXdia:number=0;
  ensamXdiaMasScrap:number=0;
  proyectadoOcupAnual:number=0;

  //variable que mandara datos al componente padre
  @Input() maquinaSelect: string = '';
  @Input() parteSelect: string = '';
  @Input() idOcupMq!: number;
  @Output() datoEnviado = new EventEmitter<boolean>();

  descripcionNumParte:string='';
  ocupacionTotal: number =0;

  isActiveForm: boolean = true;
  isActiveRegis: boolean = false;
  isActiveDatos: boolean = false;

  //para no mostrar la pestaña del formulario
  verContenedorForm: boolean = true;

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

  idDatosAcalcular!:number;
  ocupacionAll:any[]=[];

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

  //para cambiar la maquina o el numero de parte
  cambio(){
    this.datoEnviado.emit(true);
  }

  verPestania(estado:boolean){
    this.pestania1=estado;
    this.pestania2=!estado;
  }
  //registrar nuevos datos de la ocupacion de la maquina
  registrarDatos(){
    //this.activarPestania=estado;
    let bodyData = {
      "idOcupacionMq" : this.idOcupMq,
      "cortesXminuto" : this.cortesXminuto,
      "pzaRequeridas" : this.pzaRequeridas,
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
      "estatus":'ACTIVO',
      "observaciones" : this.observaciones,
    }
    //console.log(bodyData);
   
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
        this.cortesXminuto = 0;
        this.pzaRequeridas = 0;
        this.requeriAnualAutilizar = 0;
        this.semanasAlaborar = 0;
        this.diasAlaborarSemana = 0;
        this.horasDelTurno = 0;
        this.turnosAlDia = 0;
        this.tiempoSetUp = 0;
        this.tiempoMuertoPlan = 0;
        this.demorasInevitables = 0;
        this.cavidades = 0;
        this.scrapLiberado = 0;
        this.observaciones = '';
      });
  }

  calcularUso(dato:any){
    this.horaSemanaTurno = dato.horasDelTurno * dato.diasAlaborarSemana * dato.turnosAlDia;
    console.log("horas por semana por turno:",this.horaSemanaTurno);

    let ensamblesPorminuto = dato.cortesXminuto / dato.pzaRequeridas; 

    if (ensamblesPorminuto) {
      this.ensamblesXminuto = Number(ensamblesPorminuto.toFixed(3)); 
      console.log("ensambles por minuto:",this.ensamblesXminuto);
    } else {
      this.ensamblesXminuto = 0; 
      console.log("ensambles por minuto:",this.ensamblesXminuto);
    }

    if (ensamblesPorminuto) {
      this.ensamblesXhora = Number((ensamblesPorminuto * 60).toFixed(3));
      console.log("ensambles por hora:",this.ensamblesXhora);
    } else {
      this.ensamblesXhora = 0;
      console.log("ensambles por hora:",this.ensamblesXhora);
    }

    if (dato.requeriAnualAutilizar && dato.semanasAlaborar) {
      this.requerimientoSem = Number((dato.requeriAnualAutilizar / dato.semanasAlaborar).toFixed(3));
      console.log("Requerimiento Semanal:",this.requerimientoSem);
    } else {
      this.requerimientoSem = 0;
      console.log("Requerimiento Semanal:",this.requerimientoSem);
    }

    if (this.requerimientoSem && dato.diasAlaborarSemana) {
      this.ensamReqXdia = Number((this.requerimientoSem / dato.diasAlaborarSemana).toFixed(3));
      console.log("Ensamble requerido por dia:", this.ensamReqXdia);
    } else {
      this.ensamReqXdia = 0;
      console.log("Ensamble requerido por dia:", this.ensamReqXdia);
    }
    
    
    let ensableMasScrap = this.ensamReqXdia * (1+(dato.scrapLiberado/100));
    this.ensamXdiaMasScrap = Number(ensableMasScrap.toFixed(3));
    console.log("Ensamble por dia mas Scrap:",this.ensamXdiaMasScrap);

    let horasRequerimientoDiario = this.ensamXdiaMasScrap / this.ensamblesXhora
    if (horasRequerimientoDiario) {
      this.hrsNcesRequeDiario = Number(horasRequerimientoDiario.toFixed(3));
      console.log("Horas necesarias requerimiento diario:", this.hrsNcesRequeDiario);
    } else {
      this.hrsNcesRequeDiario = 0;
      console.log("Horas necesarias requerimiento diario:", this.hrsNcesRequeDiario);
    }

    this.tiempoEfecDiario = Number(((this.horasDelTurno-((this.demorasInevitables+this.tiempoMuertoPlan+this.tiempoSetUp)/60))*this.turnosAlDia).toFixed(3))
    console.log("tiempo efectivo diario:",this.tiempoEfecDiario);

    let primeroPorcentaje = horasRequerimientoDiario / this.tiempoEfecDiario;
    let segundoPorcentaje = primeroPorcentaje * 100;
    if (segundoPorcentaje) {
      this.proyectadoOcupAnual = Number(segundoPorcentaje.toFixed(2));
      console.log('proyectado de ocupacion anual:', this.proyectadoOcupAnual);
    } else {
      this.proyectadoOcupAnual = 0;
      console.log('proyectado de ocupacion anual:', this.proyectadoOcupAnual);
    }

    this.calcularSumaProyectadoOcupAnual();

    let bodyData = {
      "idDatosAcalcular": this.idDatosAcalcular,
      "horaSemanaTurno": this.horaSemanaTurno,
      "ensamblesXminuto": this.ensamblesXminuto,
      "ensamblesXhora": this.ensamblesXhora,
      "requerimientoSem": this.requerimientoSem,
      "hrsNcesRequeDiario": this.hrsNcesRequeDiario,
      "tiempoEfecDiario": this.tiempoEfecDiario,
      "ensamReqXdia": this.ensamReqXdia,
      "ensamXdiaMasScrap": this.ensamXdiaMasScrap,
      "proyectadoOcupAnual":this.proyectadoOcupAnual,
      "estatus": "ACTIVO"
    }
    //console.log(bodyData);
    this.http.post('http://127.0.0.1:8000/resultadoCalculo/',bodyData).subscribe((resultData:any)=>{
      console.log('registro de los datos correcto');
      this.getOcupacionMq();
    });

  }
  //consulta todos las registros que pertenecen al tipo maquina por su codigo
  getOcupacionMq(){
    this.http.get('http://127.0.0.1:8000/ocupacionMq/encabezado/ACABADO/'+this.maquinaSelect+'/').subscribe((resultData:any)=>{
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
