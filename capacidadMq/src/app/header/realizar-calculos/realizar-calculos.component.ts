import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-realizar-calculos',
  templateUrl: './realizar-calculos.component.html',
  styleUrl: './realizar-calculos.component.css'
})
export class RealizarCalculosComponent {

  //variables para ver los distintos formularios
  datoGeneral:boolean=true;
  maquinasForm:boolean=false;
  plantasForm:boolean=false;
  departamentosForm:boolean=false;
  parteForm:boolean=false;
  funcionForm:boolean=false;
  dropdownMenuVisible: boolean = false;

  constructor(private router: Router){}

  
  @HostListener('document:click', ['$event'])
  toggleDropdown(event: Event) {
    const clickedElement = event.target as HTMLElement;
    const dropdownMenu = document.getElementById('dropdownMenu');
    const dropdownButton = document.getElementById('dropdownButton');

    if (dropdownMenu && dropdownButton) {
      if (clickedElement === dropdownButton || dropdownButton.contains(clickedElement)) {
        this.dropdownMenuVisible = !this.dropdownMenuVisible;
      } else if (!dropdownMenu.contains(clickedElement)) {
        this.dropdownMenuVisible = false;
      }
    }
  }
  

  toggleMenu() {
    const dropdownMenu = document.getElementById('dropdownMenu');
    if (dropdownMenu) {
      dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
    }
  }

  cerrarSesion(){
    localStorage.removeItem('token');
    //console.log('token destruido')
    this.router.navigate(['/capacidadMq/login']);
  }


  /*datosGenerales(estado:boolean){
    this.datoGeneral   = estado;
    this.maquinasForm = !estado;
    this.plantasForm = !estado;
    this.departamentosForm = !estado;
    this.parteForm = !estado;
    this.funcionForm = !estado;
  }

  catalogoMaquinas(estado:boolean){
    this.datoGeneral   = !estado;
    this.maquinasForm = estado;
    this.plantasForm = !estado;
    this.departamentosForm = !estado;
    this.parteForm = !estado;
    this.funcionForm = !estado;
  }
  catalogoPlantas(estado:boolean){
    this.datoGeneral   = !estado;
    this.maquinasForm = !estado;
    this.plantasForm = estado;
    this.departamentosForm = !estado;
    this.parteForm = !estado;
    this.funcionForm = !estado;
  }
  catalogoDepartamentos(estado:boolean){
    this.datoGeneral   = !estado;
    this.maquinasForm = !estado;
    this.plantasForm = !estado;
    this.departamentosForm = estado;
    this.parteForm = !estado;
    this.funcionForm = !estado;
  }
  catalogoPartes(estado:boolean){
    this.datoGeneral   = !estado;
    this.maquinasForm = !estado;
    this.plantasForm = !estado;
    this.departamentosForm = !estado;
    this.parteForm = estado;
    this.funcionForm = !estado;
  }
  catalogoFunciones(estado:boolean){
    this.datoGeneral   = !estado;
    this.maquinasForm = !estado;
    this.plantasForm = !estado;
    this.departamentosForm = !estado;
    this.parteForm = !estado;
    this.funcionForm = estado;
  }*/

}
