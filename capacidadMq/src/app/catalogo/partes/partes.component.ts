import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-partes',
  templateUrl: './partes.component.html',
  styleUrl: './partes.component.css'
})
export class PartesComponent {

  //Variables para el formulario
  numParte:string = '';
  descripcion:string = '';
  tipo:string = '';
  cliente = '';
  funcionMaquina = '';
  estatus:boolean = true;
  parteArray: any[] = [];
  clienteArray: any[] = [];
  idParte = '';
  filtro: string = '';

  verTarjeta:boolean=false;
  //variables para mostrar los botones de actualizar y agregar
  agregar:boolean=false;
  editar:boolean=false;

  constructor(private http: HttpClient){
    this.getAllPartes();
    this.getAllClientes();
  }

  getAllPartes(){
    this.http.get("http://10.1.0.186:8090/partes/").subscribe((resultData:any)=>{
      this.parteArray = resultData;
    });
  }
  getAllClientes(){
    this.http.get("http://10.1.0.186:8090/clientes/").subscribe((resultData:any)=>{
      this.clienteArray = resultData;
    });
  }

  //estatus 
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
      "numParte" : this.numParte,
      "descripcion" : this.descripcion,
      "tipo" : this.tipo,
      "cliente" : this.cliente,
      "funcionMaquina" : this.funcionMaquina,
      "estatus" : this.estatus,
    }
    this.http.post("http://10.1.0.186:8090/partes/",bodyData).subscribe((resultData: any)=>{
      alert("Parte registrado");
      this.getAllPartes();
      this.numParte = '';
      this.descripcion = '';
      this.tipo = '';
      this.cliente = '';
      this.funcionMaquina = '';
      this.estatus = true;
    });
  }
  //para actualizar un registro
  dataUpdate(data:any){
    this.numParte = data.numParte;
    this.descripcion = data.descripcion;
    this.tipo = data.tipo;
    this.cliente = data.cliente;
    this.funcionMaquina = data.funcionMaquina;
    this.estatus = data.estatus;
    this.verTarjeta = true;
    this.idParte = data.id;
    this.verBotones(false);
  }
  updateDatos(){
    let bodyData = {
      "numParte" : this.numParte,
      "descripcion" : this.descripcion,
      "tipo" : this.tipo,
      "cliente" : this.cliente,
      "funcionMaquina" : this.funcionMaquina,
      "estatus" : this.estatus,
    }
    this.http.put("http://10.1.0.186:8090/partes/"+this.idParte+'/',bodyData).subscribe((resulData:any)=>{
      alert("Parte actualizado");
      this.numParte = '';
      this.descripcion = '';
      this.tipo = '';
      this.cliente = '';
      this.funcionMaquina = '';
      this.estatus = true;
      this.getAllPartes();
      this.verTarjeta = false;
    });

  }

  mostrarTarjeta(){
    this.numParte = '';
    this.descripcion = '';
    this.tipo = '';
    this.cliente = '';
    this.funcionMaquina = '';
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
    return this.parteArray.filter(parteItems =>
      parteItems.numParte.toLowerCase().includes(this.filtro.toLowerCase()) ||
      parteItems.descripcion.toLowerCase().includes(this.filtro.toLowerCase()) ||
      parteItems.cliente.toLowerCase().includes(this.filtro.toLowerCase()) ||
      parteItems.tipo.toLowerCase().includes(this.filtro.toLowerCase()) ||
      parteItems.estatus.toString().toLowerCase().includes(this.filtro.toLowerCase())
    );
  }

}
