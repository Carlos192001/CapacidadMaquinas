import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-calcular-capacidad',
  templateUrl: './calcular-capacidad.component.html',
  styleUrl: './calcular-capacidad.component.css'
})
export class CalcularCapacidadComponent {

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
    console.log(this.maquinaSelect);
    console.log(this.parteSelect);
    if (this.maquinaSelect && this.parteSelect) {
      this.saberCualMostrar(this.maquinaSelect, this.parteSelect);
      
    } else {
      alert('Selecione una maquina y un número de parte');
    }
  }
  //para el filtro de las maquinas
  handleChange(event: any) {
    this.radioSeleccionado = event.target.value;
    console.log('Radio seleccionado:', this.radioSeleccionado);
    // Aquí puedes hacer lo que necesites con el radio seleccionado
  }

  saberCualMostrar(maquina: string, parte: string){
    switch(true) {
        /*case maquina.toLowerCase() === parte.toLowerCase():
            // Realiza una acción si maquina y parte son iguales (ignorando mayúsculas y minúsculas)
            console.log("Maquina y parte son iguales.");
            break;*/
        case maquina.toLowerCase().includes("finpress") && parte.toLowerCase().includes("finpress"):
            // Realiza una acción si maquina y parte contienen "palabra1"
            this.verFinPress(true);
            console.log("Maquina y parte contienen 'finpress'.");
            break;
        case maquina.toLowerCase().includes("inyectoras") && parte.toLowerCase().includes("inyectoras"):
            // Realiza una acción si maquina y parte contienen "palabra2"
            this.verInyectoras(true);
            console.log("Maquina y parte contienen 'inyectoras'.");
            break;
        case maquina.toLowerCase().includes("troqueladoras") && parte.toLowerCase().includes("troqueladoras"):
            // Realiza una acción si maquina y parte contienen "palabra2"
            this.verTroqueladoras(true);
            console.log("Maquina y parte contienen 'troqueladoras'.");
            break;
        case maquina.toLowerCase().includes("hornos") && parte.toLowerCase().includes("hornos"):
            // Realiza una acción si maquina y parte contienen "palabra2"
            this.verHornos(true);
            console.log("Maquina y parte contienen 'hornos'.");
            break;
        case maquina.toLowerCase().includes("fluxeadoras") && parte.toLowerCase().includes("fluxeadoras"):
            // Realiza una acción si maquina y parte contienen "palabra2"
            this.verFluxeadoras(true);
            console.log("Maquina y parte contienen 'fluxeadoras'.");
            break;
        default:
            // Realiza una acción por defecto si no se cumple ningún caso anterior
            console.log("Maquina y parte no coinciden con ningún caso específico.");
            break;
    }
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



}
