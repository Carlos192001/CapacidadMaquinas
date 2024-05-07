import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';

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

  /*variables para saber lo que se tiene seleccionado*/
  maquinaSelect: string = '';
  parteSelect: string = '';
  radioSeleccionado: string = 'Todos'; // Valor por defecto
  maquinaArray:any[]=[];
  partesArray:any[]=[];

  constructor(private http:HttpClient){
    this.getTodasMaquinasPartes();
  }
  ngOnInit(): void {
    
  }

  calcularCapacidad(){
    this.datosMaquina=false;
    this.formFinPress=true;
  }
  manejarNuevoCalculo(evento: boolean): void {
    this.formFinPress = !evento; // Actualiza el estado en el componente padre
    this.datosMaquina = evento;

    console.log('ESTE ESTADO RECIBI DE MI HIJO:', evento);
  }

  elementosSelecionados(){
    if (this.maquinaSelect && this.parteSelect) {
      /*console.log(this.maquinaSelect);
      console.log(this.parteSelect);
      console.log(this.radioSeleccionado);*/
      this.saberCualMostrar(this.radioSeleccionado);
    } else {
      alert('Selecione una maquina y un número de parte');
    }
  }
  //para el filtro de las maquinas
  handleChange(event: any) {
    this.radioSeleccionado = event.target.value;
    console.log('Radio seleccionado:', this.radioSeleccionado);
    if (this.radioSeleccionado === 'Todos') {
      this.getTodasMaquinasPartes();
    } else {
      this.getFiltroMaquinasPartes(this.radioSeleccionado);
    }
  }
  getTodasMaquinasPartes(){
    this.http.get('http://10.1.0.186:8090/maquinas/').subscribe((resultData:any)=>{
      this.maquinaArray = resultData;
      //console.log(this.maquinaArray);
    });
    this.http.get('http://10.1.0.186:8090/partes/').subscribe((resultData:any)=>{
      this.partesArray = resultData;
      //console.log(this.partesArray);
    });
  }
  getFiltroMaquinasPartes(funcion:string){
    this.http.get('http://10.1.0.186:8090/maquinas-filtrar-funcion/'+funcion+'/').subscribe((resultData:any)=>{
      this.maquinaArray = resultData;
      //console.log(this.maquinaArray);
    });
    this.http.get('http://10.1.0.186:8090/partes-filtrar-funcion/'+funcion+'/').subscribe((resultData:any)=>{
      this.partesArray = resultData;
      //console.log(this.partesArray);
    });
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
