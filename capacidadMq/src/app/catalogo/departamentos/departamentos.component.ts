import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.component.html',
  styleUrl: './departamentos.component.css'
})
export class DepartamentosComponent {

  deptoArray : any[] = [];
  numero: string = '';
  nombre: string = '';
  encargado: string = '';
  tipo: string = '';
  estatus: boolean = true;
  idDepto = '';

  verTarjeta:boolean=false;

  //variables para mostrar los botones de actualizar y agregar
  agregar:boolean=false;
  editar:boolean=false;

  constructor(private http: HttpClient){
    this.getAllDeptos();
  }

  //estatus de los departamentos
  actualizarEstado() {
    if (this.estatus) {
      this.estatus = true; // Si está marcado, establece el valor a true
    } else {
      this.estatus = false; // Si no está marcado, establece el valor a false
    }
  }

  getAllDeptos(){
    this.http.get("http://127.0.0.1:8000/deptos/").subscribe((resultData:any)=>{
      this.deptoArray = resultData;
    });
  }

  //para guardar un nuevo registro
  saveDatos(){
    let bodyData = {
      "numero" : this.numero,
      "nombre" : this.nombre,
      "encargado" : this.encargado,
      "tipo" : this.tipo,
      "estatus" : this.estatus,
    }
    this.http.post("http://127.0.0.1:8000/deptos/",bodyData).subscribe((resultData: any)=>{
      alert("Departamento registrado");
      this.getAllDeptos();
      this.numero = '';
      this.nombre = '';
      this.encargado = '';
      this.tipo = '';
      this.estatus = true;
    });
  }
  //para actualizar un registro
  dataUpdate(data:any){
    this.numero = data.numero;
    this.nombre = data.nombre;
    this.encargado = data.encargado;
    this.tipo = data.encargado;
    this.estatus = data.estatus;
    this.idDepto = data.id;
    this.verTarjeta = true;
    this.verBotones(false);
  }
  updateDatos(){
    let bodyData = {
      "numero" : this.numero,
      "nombre" : this.nombre,
      "encargado" : this.encargado,
      "tipo" : this.tipo,
      "estatus" : this.estatus,
    }
    this.http.put("http://127.0.0.1:8000/deptos/"+this.idDepto+'/',bodyData).subscribe((resulData:any)=>{
      alert("Departamento actualizado");
      this.numero = '';
      this.nombre = '';
      this.encargado = '';
      this.tipo = '';
      this.estatus = true;
      this.getAllDeptos();
      this.verTarjeta = false;
    });

  }

  mostrarTarjeta(){
    this.numero = '';
      this.nombre = '';
      this.encargado = '';
      this.tipo = '';
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


}
