import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { Parte } from '../../interface/parte';

@Component({
  selector: 'app-calcular-capacidad',
  templateUrl: './calcular-capacidad.component.html',
  styleUrl: './calcular-capacidad.component.css'
})
export class CalcularCapacidadComponent implements OnInit{

  datosMaquina: boolean = true;
  formFinPress: boolean = false;
  formInyectoras: boolean = false;
  formTroqueladoras: boolean = false;
  formHornos: boolean = false;
  formFluxeadoras: boolean = false;
  loader: boolean = false;
  loaderParte: boolean = false;

  /*variables para saber lo que se tiene seleccionado*/
  maquinaSelect: string = '';
  parteSelect: string = '';
  radioSeleccionado: string = ''; // Valor por defecto
  maquinaArray:any[]=[];
  //partesArray:Parte[]=[];
  parteArrayCodMq: Parte[] = [];
  idOcupMq!:number;

  constructor(private http:HttpClient){}

  ngOnInit(): void {
    
  }

  /*calcularCapacidad(){ //este nose porque esta aqui, tal vez sirva para algo
    this.datosMaquina=false;
    this.formFinPress=true;
  }*/
  manejarNuevoCalculo(evento: boolean): void {
    this.datosMaquina = evento;
    this.formFinPress = !evento; // Actualiza el estado en el componente padre
    this.formInyectoras = !evento;
    this.formTroqueladoras = !evento;
    this.formHornos = !evento;
    this.formFluxeadoras = !evento;

    console.log('ESTE ESTADO RECIBI DE MI HIJO:', evento);
  }

  elementosSelecionados(){
    //console.log('este es el tipo:',this.radioSeleccionado);
    if (this.maquinaSelect && this.parteSelect) {
      let bodyData = {
        "codInternoMq": this.maquinaSelect,
        "numParte": this.parteSelect,
        "estatus": true,
        "funcion": this.radioSeleccionado,
      }
      console.log(bodyData);
      //this.saberCualMostrar(this.radioSeleccionado);
      this.http.post('http://127.0.0.1:8000/ocupacionMq/',bodyData).subscribe((resulData:any)=>{
        console.log('Registro realizado, id del registro',resulData.id);
        this.idOcupMq = resulData.id;
        console.log('idOcupMq se igualo a:', this.idOcupMq);
        this.saberCualMostrar(this.radioSeleccionado);
      })
    } else {
      alert('Selecione una máquina y un número de parte');
    }
  }
  //para el filtro de las maquinas siempre se ejecuta cada que se cambia de tipo
  handleChange(event: any) {
    this.radioSeleccionado = event.target.value;
    //console.log('Radio seleccionado:', this.radioSeleccionado);
    if (this.radioSeleccionado) {
      this.getFiltroMaquinas(this.radioSeleccionado);
    } 
  }
  //para saber cual maquina fue seleccionada
  onSelectChange() {
    console.log(this.maquinaSelect);
    this.loaderParte=true;
    // Realizar la solicitud HTTP para obtener las partes
    this.http.get('http://10.1.0.186:8090/partes/filtrar-codMaquina/' + this.maquinaSelect + '/')
      .pipe(
        delay(1000) // Agregar un retraso de 1 segundos
      )
      .subscribe((resultData: any) => {
        this.parteArrayCodMq = resultData;
        // console.log(this.partesArray);
      }, error => {
        console.error('Error al obtener las partes:', error);
      }, () => {
        // Esta función se ejecuta cuando la solicitud HTTP se completa con éxito
        this.loaderParte = false; // Ocultar el loader después de que la solicitud se complete
      });
  }
  /*getTodasMaquinasPartes(){
    this.http.get('http://10.1.0.186:8090/maquinas/').subscribe((resultData:any)=>{
      this.maquinaArray = resultData;
      //console.log(this.maquinaArray);
    });
    this.http.get('http://10.1.0.186:8090/partes/').subscribe((resultData:any)=>{
      this.partesArray = resultData;
      //console.log(this.partesArray);
    });
  }*/
  getFiltroMaquinas(funcion: string) {
    this.maquinaSelect = '';
    this.parteSelect = '';
    this.loader = true; // Mostrar el loader antes de la solicitud HTTP
    this.parteArrayCodMq = [];
    // Realizar la solicitud HTTP para obtener las máquinas
    this.http.get('http://10.1.0.186:8090/maquinas-filtrar-funcion/' + funcion + '/')
      .pipe(
        delay(1000) // Agregar un retraso de 1 segundos
      )
      .subscribe((resultData: any) => {
        this.maquinaArray = resultData;
        // console.log(this.maquinaArray);
      }, error => {
        console.error('Error al obtener las máquinas:', error);
      }, () => {
        this.loader = false; // Ocultar el loader después de que la solicitud se complete
      });
  
    // Realizar la solicitud HTTP para obtener las partes
    /*this.http.get('http://10.1.0.186:8090/partes-filtrar-funcion/' + funcion + '/')
      .pipe(
        delay(1000) // Agregar un retraso de 1 segundos
      )
      .subscribe((resultData: any) => {
        this.partesArray = resultData;
        // console.log(this.partesArray);
      }, error => {
        console.error('Error al obtener las partes:', error);
      }, () => {
        // Esta función se ejecuta cuando la solicitud HTTP se completa con éxito
        this.loader = false; // Ocultar el loader después de que la solicitud se complete
      });*/
  }


  verFinPress(estado:boolean){
    this.datosMaquina = !estado;
    this.formFinPress = estado;
    this.formInyectoras = !estado;
    this.formTroqueladoras = !estado;
    this.formHornos = !estado;
    this.formFluxeadoras = !estado;
  }
  verInyectoras(estado:boolean){
    this.datosMaquina = !estado;
    this.formFinPress = !estado;
    this.formInyectoras = estado;
    this.formTroqueladoras = !estado;
    this.formHornos = !estado;
    this.formFluxeadoras = !estado;
  }
  verTroqueladoras(estado:boolean){
    this.datosMaquina = !estado;
    this.formFinPress = !estado;
    this.formInyectoras = !estado;
    this.formTroqueladoras = estado;
    this.formHornos = !estado;
    this.formFluxeadoras = !estado;
  }
  verHornos(estado:boolean){
    this.datosMaquina = !estado;
    this.formFinPress = !estado;
    this.formInyectoras = !estado;
    this.formTroqueladoras = !estado;
    this.formHornos = estado;
    this.formFluxeadoras = !estado;
  }
  verFluxeadoras(estado:boolean){
    this.datosMaquina = !estado;
    this.formFinPress = !estado;
    this.formInyectoras = !estado;
    this.formTroqueladoras = !estado;
    this.formHornos = !estado;
    this.formFluxeadoras = estado;
  }

  saberCualMostrar(mostrar:string){
    switch(true) {
        case mostrar === 'ACABADO':
            this.verFinPress(true);
            console.log("Maquina y parte contienen 'finpress'.");
            break;
        case mostrar === 'INYECTAR':
            this.verInyectoras(true);
            console.log("Maquina y parte contienen 'inyectoras'.");
            break;
        case mostrar === 'TROQUELAR':
            this.verTroqueladoras(true);
            console.log("Maquina y parte contienen 'troqueladoras'.");
            break;
        case mostrar === 'HORNEAR':
            this.verHornos(true);
            console.log("Maquina y parte contienen 'hornos'.");
            break;
        case mostrar === 'FLUXEAR':
            this.verFluxeadoras(true);
            console.log("Maquina y parte contienen 'fluxeadoras'.");
            break;
        default:
            // Realiza una acción por defecto si no se cumple ningún caso anterior
            console.log("Maquina y parte no coinciden con ningún caso específico.");
            break;
    }
  }
  



}
