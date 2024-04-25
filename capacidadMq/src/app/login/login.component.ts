import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  user:string = '';
  password:string = '';
  showPassword: boolean = false;

  constructor(private http: HttpClient,private router: Router){}

  PasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  logueo() {
    let bodyData ={
      "user": this.user,
      "password": this.password
    }
    this.http.post("http://10.1.0.186:8090/tocken/", bodyData).subscribe({
      next: (resultData: any) => {
        //console.log(resultData.token);
        // Verificar si la respuesta es un token válido
        if (resultData.token) {
          // Guardar el token en el almacenamiento local o de sesión
          localStorage.setItem('token', resultData.token);
          
          // Navegar al componente 'personal'
          this.router.navigate(['/panel-principal']);
        } else {
          // En caso de que el servidor no devuelva un token, mostrar un mensaje de error
          alert("Error: No se recibió un token válido");
        }
      },
      error: (error: any) => {
        //console.error(error);
        // Mostrar un mensaje de alerta en caso de credenciales incorrectas
        alert("Credenciales inválidas");
      }
    });
  }

}
