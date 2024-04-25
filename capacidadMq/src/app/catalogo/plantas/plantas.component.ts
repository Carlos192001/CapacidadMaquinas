import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-plantas',
  templateUrl: './plantas.component.html',
  styleUrl: './plantas.component.css'
})
export class PlantasComponent {

  plantaArray : any[] = [];
  planta : string = '';
  base : string = '';
  estatus : boolean = true;
  idPlanta = '';
  filtro: string = '';

  verTarjeta:boolean=false;

  //variables para mostrar los botones de actualizar y agregar
  agregar:boolean=false;
  editar:boolean=false;

  constructor(private http: HttpClient){
    this.getAllPlantas();
  }

  //obtener todo el listado de las plantas
  getAllPlantas(){
    this.http.get("http://10.1.0.186:8090/plantas/").subscribe((resultData:any)=>{
      this.plantaArray = resultData;
    });
  }

//estatus de la plantas
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
      "planta" : this.planta,
      "base" : this.base,
      "estatus" : this.estatus,
    }
    this.http.post("http://10.1.0.186:8090/plantas/",bodyData).subscribe((resultData: any)=>{
      alert("Planta registrada");
      this.getAllPlantas();
      this.planta = '';
      this.base = '';
      this.estatus = true;
    });
  }

  //para actualizar un registro
  dataUpdate(data:any){
    this.planta = data.planta;
    this.base = data.base;
    this.estatus = data.estatus;
    this.idPlanta = data.id;
    this.verTarjeta = true;
    this.verBotones(false);
  }
  updateDatos(){
    let bodyData = {
      "planta" : this.planta,
      "base" : this.base,
      "estatus" : this.estatus,
    }
    this.http.put("http://10.1.0.186:8090/plantas/"+this.idPlanta+'/',bodyData).subscribe((resulData:any)=>{
      alert("Planta actualizada");
      this.planta = '';
      this.base = '';
      this.estatus = true;
      this.getAllPlantas();
      this.verTarjeta = false;
    });

  }

  mostrarTarjeta(){
    this.planta = '';
    this.base = '';
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
    return this.plantaArray.filter(plantaItems =>
      plantaItems.planta.toLowerCase().includes(this.filtro.toLowerCase()) ||
      plantaItems.base.toLowerCase().includes(this.filtro.toLowerCase()) ||
      plantaItems.estatus.toString().toLowerCase().includes(this.filtro.toLowerCase())
    );
  }
  

}
