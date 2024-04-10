import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaquinasComponent } from './catalogo/maquinas/maquinas.component';
import { ProcesosComponent } from './header/procesos/procesos.component';
import { CalcularCapacidadComponent } from './ocupacionMq/calcular-capacidad/calcular-capacidad.component';
import { InyectorasComponent } from './ocupacionMq/inyectoras/inyectoras.component';
import { TroqueladorasComponent } from './ocupacionMq/troqueladoras/troqueladoras.component';
import { HornosComponent } from './ocupacionMq/hornos/hornos.component';

const routes: Routes = [
  {path:'catalogo/maquinas',component:MaquinasComponent},
  {path:'header',component:ProcesosComponent},
  {path:'calcular',component:CalcularCapacidadComponent},
  {path:'inyectoras',component:InyectorasComponent},
  {path:'troqueladoras',component:TroqueladorasComponent},
  {path:'hornos',component:HornosComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
