import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-maquinas',
  templateUrl: './maquinas.component.html',
  styleUrl: './maquinas.component.css'
})
export class MaquinasComponent {

  deptoArray : any[] = [];
  plantaArray : any[] = [];
  maquinaArray : any[] = [];

  //variables para el formulario
  numDepartamento = '';
  codInternoMq: string ='';
  nombre: string = '';
  codInternoProceso: string = '';
  funcionMaquina: string = '';
  planta: string = '';
  estatus: boolean = true;
  idMaquina = '';
  filtro: string = '';

  //variables para mostrar los botones de actualizar y agregar
  agregar:boolean=false;
  editar:boolean=false;
  verTarjeta:boolean=false;

  constructor(private http: HttpClient){
    this.getAllDeptos();
    this.getAllPlantas();
    this.getAllMaquinas();
  }

  getAllMaquinas(){
    this.http.get("http://10.1.0.186:8090/maquinas/").subscribe((resultData:any)=>{
      this.maquinaArray = resultData;
    });
  }

  getAllDeptos(){
    this.http.get("http://10.1.0.186:8090/deptos/").subscribe((resultData:any)=>{
      this.deptoArray = resultData;
    });
  }
  getAllPlantas(){
    this.http.get("http://10.1.0.186:8090/plantas/").subscribe((resultData:any)=>{
      this.plantaArray = resultData;
    });
  }

   //estatus de los departamentos
   actualizarEstado() {
    if (this.estatus) {
      this.estatus = true; // Si está marcado, establece el valor a true
    } else {
      this.estatus = false; // Si no está marcado, establece el valor a false
    }
  }

  //para guardar un nuevo registro
  saveDatos(){
    let bodyData = {
      "numDepartamento" : this.numDepartamento,
      "codInternoMq" : this.codInternoMq,
      "nombre" : this.nombre,
      "codInternoProceso" : this.codInternoProceso,
      "funcionMaquina" : this.funcionMaquina,
      "planta": this.planta,
      "estatus" : this.estatus,
    }
    console.log(bodyData);
    this.http.post("http://10.1.0.186:8090/maquinas/",bodyData).subscribe((resultData: any)=>{
      alert("Máquina registrada");
      this.getAllMaquinas();
      this.numDepartamento = '';
      this.codInternoMq = '';
      this.nombre = '';
      this.codInternoProceso = '';
      this.funcionMaquina = '';
      this.planta = '';
      this.estatus = true;
    });
  }
  //para actualizar un registro
  dataUpdate(data:any){
    this.numDepartamento = data.numDepartamento;
    this.codInternoMq = data.codInternoMq;
    this.nombre = data.nombre;
    this.codInternoProceso = data.codInternoProceso;
    this.funcionMaquina = data.funcionMaquina;
    this.planta = data.planta;
    this.idMaquina = data.id;
    this.estatus = data.estatus;
    this.verTarjeta = true;
    this.verBotones(false);
  }
  updateDatos(){
    let bodyData = {
      "numDepartamento" : this.numDepartamento,
      "codInternoMq" : this.codInternoMq,
      "nombre" : this.nombre,
      "codInternoProceso" : this.codInternoProceso,
      "funcionMaquina" : this.funcionMaquina,
      "planta": this.planta,
      "estatus" : this.estatus,
    }
    
    this.http.put("http://10.1.0.186:8090/maquinas/"+this.idMaquina+'/',bodyData).subscribe((resulData:any)=>{
      alert("Maquina actualizado");
      this.numDepartamento = '';
      this.codInternoMq = '';
      this.nombre = '';
      this.codInternoProceso = '';
      this.funcionMaquina = '';
      this.planta = '';
      this.estatus = true;
      this.getAllMaquinas();
      this.verTarjeta = false;
    });

  }

  mostrarTarjeta(){
    this.numDepartamento = '';
    this.codInternoMq = '';
    this.nombre = '';
    this.codInternoProceso = '';
    this.funcionMaquina = '';
    this.planta = '';
    this.estatus = true;
    this.verTarjeta=!this.verTarjeta;
    this.verBotones(true);
  }
  ocultarTarjeta(){
    this.verTarjeta=false;
  }

  verBotones(estado:boolean){
    this.agregar = estado;
    this.editar = !estado;
  }

  // Función para filtrar 
  filtrar(): any[] {
    return this.maquinaArray.filter(maquinaItems =>
      maquinaItems.numDepartamento === parseInt(this.filtro, 10) ||
      maquinaItems.codInternoMq.toLowerCase().includes(this.filtro.toLowerCase()) ||
      maquinaItems.nombre.toLowerCase().includes(this.filtro.toLowerCase()) ||
      maquinaItems.funcionMaquina.toLowerCase().includes(this.filtro.toLowerCase()) ||
      maquinaItems.planta.toLowerCase().includes(this.filtro.toLowerCase()) ||
      maquinaItems.estatus.toString().toLowerCase().includes(this.filtro.toLowerCase())
    );
  }

}
