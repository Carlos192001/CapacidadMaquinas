import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-capacidad-mq',
  templateUrl: './capacidad-mq.component.html',
  styleUrl: './capacidad-mq.component.css'
})
export class CapacidadMqComponent implements OnInit{

  token: string = '';
  userId = '';
  nombre: string = '';
  apellido: string = '';

  constructor(private http: HttpClient, private router: Router ){}


  ngOnInit(): void {
    // Obtener el token del almacenamiento local al inicializar el componente
    this.token = localStorage.getItem('token') || '';
    // Puedes hacer cualquier otra lógica con el token aquí
    //console.log('Token:',this.token);
    // Realizar la solicitud HTTP GET al backend con el token
    this.http.get(`http://10.1.0.186:8090/descifrar/${this.token}`).subscribe({
      next: (resultData: any) => {
        //console.log('Token descifrado:', resultData);
        this.nombre=resultData.nombre;
        //console.log("NOMBRE:", this.nombre);
        this.apellido=resultData.apellido;
        //console.log('Apellido:',this.apellido);
        this.userId=resultData.usuario_id;
        //console.log("USER ID:", this.userId);
        // Puedes hacer cualquier otra lógica con el token descifrado aquí
      },
      error: (error: any) => {
        console.error('Error al descifrar el token:', error);
      }
    });
  }

  cerrarSesion(){
    localStorage.removeItem('token');
    //console.log('token destruido')
    this.router.navigate(['/capacidadMq/login']);
  }

}
