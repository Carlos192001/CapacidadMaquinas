import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css'
})
export class ClienteComponent {

  clienteArray: any[] = [];
  nombre: string = '';
  estatus: boolean = true;
  idCliente = '';
  filtro: string='';

  verTarjeta:boolean=false;

  //variables para mostrar los botones de actualizar y agregar
  agregar:boolean=false;
  editar:boolean=false;

  constructor(private http: HttpClient){
    this.getAllClientes();
  }

  getAllClientes(){
    this.http.get("http://127.0.0.1:8000/clientes/").subscribe((resultData:any)=>{
      this.clienteArray = resultData;
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

  dataUpdate(data:any){
    this.nombre = data.nombre;
    this.estatus = data.estatus;
    this.verTarjeta = true;
    this.idCliente = data.id;
    this.verBotones(false);
  }
  saveDatos(){
    let bodyData = {
      "nombre" : this.nombre,
      "estatus" : this.estatus,
    }
    this.http.post("http://127.0.0.1:8000/clientes/",bodyData).subscribe((resultData: any)=>{
      alert("Cliente registrado");
      this.getAllClientes();
      this.nombre = '';
      this.estatus = true;
    });
  }
  updateDatos(){
    let bodyData = {
      "nombre" : this.nombre,
      "estatus" : this.estatus,
    }
    this.http.put("http://127.0.0.1:8000/clientes/"+this.idCliente+'/',bodyData).subscribe((resulData:any)=>{
      alert("Cliente actualizado");
      this.nombre = '';
      this.estatus = true;
      this.getAllClientes();
      this.verTarjeta = false;
    });

  }

  mostrarTarjeta(){
    this.nombre = '';
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
    return this.clienteArray.filter(clienteItems =>
      clienteItems.nombre.toLowerCase().includes(this.filtro.toLowerCase()) ||
      clienteItems.estatus.toString().toLowerCase().includes(this.filtro.toLowerCase())
    );
  }

}
