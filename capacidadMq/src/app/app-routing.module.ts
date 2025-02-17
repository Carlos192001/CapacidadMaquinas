import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaquinasComponent } from './catalogo/maquinas/maquinas.component';
import { ProcesosComponent } from './header/procesos/procesos.component';
import { CalcularCapacidadComponent } from './ocupacionMq/calcular-capacidad/calcular-capacidad.component';
import { InyectorasComponent } from './ocupacionMq/inyectoras/inyectoras.component';
import { TroqueladorasComponent } from './ocupacionMq/troqueladoras/troqueladoras.component';
import { HornosComponent } from './ocupacionMq/hornos/hornos.component';
import { FluxeadorasComponent } from './ocupacionMq/fluxeadoras/fluxeadoras.component';
import { FinpressComponent } from './ocupacionMq/finpress/finpress.component';
import { PartesComponent } from './catalogo/partes/partes.component';
import { PlantasComponent } from './catalogo/plantas/plantas.component';
import { FuncionesComponent } from './catalogo/funciones/funciones.component';
import { DepartamentosComponent } from './catalogo/departamentos/departamentos.component';
import { ClienteComponent } from './catalogo/cliente/cliente.component';
import { DatogeneralComponent } from './catalogo/datogeneral/datogeneral.component';
import { CapacidadMqComponent } from './panels/capacidad-mq/capacidad-mq.component';
import { RealizarCalculosComponent } from './header/realizar-calculos/realizar-calculos.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path:'capacidadMq/login',component:LoginComponent},
  {path: '', redirectTo: 'capacidadMq/login', pathMatch: 'full'},
  {path:'maquinas',component:MaquinasComponent},
  {path:'partes',component:PartesComponent},
  {path:'plantas',component:PlantasComponent},
  {path:'funciones', component:FuncionesComponent},
  {path:'departamento',component:DepartamentosComponent},
  {path:'cliente',component:ClienteComponent},
  {path:'datos',component:DatogeneralComponent},
  {path:'datos-maquinas',component:ProcesosComponent, canActivate: [AuthGuard]},
  {path:'calcular',component:CalcularCapacidadComponent},
  {path:'finpress',component:FinpressComponent},
  {path:'inyectoras',component:InyectorasComponent},
  {path:'troqueladoras',component:TroqueladorasComponent},
  {path:'hornos',component:HornosComponent},
  {path:'fluxeadoras',component:FluxeadorasComponent},
  {path:'panel-principal',component:CapacidadMqComponent, canActivate: [AuthGuard]},
  {path:'calcular-capacidad',component:RealizarCalculosComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
