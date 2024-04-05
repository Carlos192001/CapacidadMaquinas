import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaquinasComponent } from './catalogo/maquinas/maquinas.component';
import { ProcesosComponent } from './header/procesos/procesos.component';
import { CalcularCapacidadComponent } from './ocupacionMq/calcular-capacidad/calcular-capacidad.component';

const routes: Routes = [
  {path:'catalogo/maquinas',component:MaquinasComponent},
  {path:'header',component:ProcesosComponent},
  {path:'calcular',component:CalcularCapacidadComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
