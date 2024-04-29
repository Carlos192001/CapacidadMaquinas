import { Component, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-funciones',
  templateUrl: './funciones.component.html',
  styleUrl: './funciones.component.css'
})
export class FuncionesComponent {

  constructor() { }
  dropdownMenuVisible: boolean = false;

  ngOnInit(): void {
  }

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
  
  verTarjeta:boolean=false;

  mostrarTarjeta(){
    this.verTarjeta=!this.verTarjeta;
  }
  ocultarTarjeta(){
    this.verTarjeta=false;
  }

}
