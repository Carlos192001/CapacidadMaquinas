import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaquinasComponent } from './catalogo/maquinas/maquinas.component';

const routes: Routes = [
  {path:'catalogo/maquinas',component:MaquinasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
