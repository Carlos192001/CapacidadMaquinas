import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProcesosComponent } from './header/procesos/procesos.component';
import { MaquinasComponent } from './catalogo/maquinas/maquinas.component';
import { PlantasComponent } from './catalogo/plantas/plantas.component';
import { PartesComponent } from './catalogo/partes/partes.component';
import { FuncionesComponent } from './catalogo/funciones/funciones.component';
import { DepartamentosComponent } from './catalogo/departamentos/departamentos.component';
import { CalcularCapacidadComponent } from './ocupacionMq/calcular-capacidad/calcular-capacidad.component';
import { FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InyectorasComponent } from './ocupacionMq/inyectoras/inyectoras.component';
import { TroqueladorasComponent } from './ocupacionMq/troqueladoras/troqueladoras.component';
import { HornosComponent } from './ocupacionMq/hornos/hornos.component';
import { FluxeadorasComponent } from './ocupacionMq/fluxeadoras/fluxeadoras.component';
import { FinpressComponent } from './ocupacionMq/finpress/finpress.component';
import { ClienteComponent } from './catalogo/cliente/cliente.component';
import { DatogeneralComponent } from './catalogo/datogeneral/datogeneral.component';
import { CapacidadMqComponent } from './panels/capacidad-mq/capacidad-mq.component';
import { RealizarCalculosComponent } from './header/realizar-calculos/realizar-calculos.component';
import { LoginComponent } from './login/login.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    AppComponent,
    ProcesosComponent,
    MaquinasComponent,
    PlantasComponent,
    PartesComponent,
    DepartamentosComponent,
    CalcularCapacidadComponent,
    InyectorasComponent,
    TroqueladorasComponent,
    HornosComponent,
    FluxeadorasComponent,
    FinpressComponent,
    ClienteComponent,
    DatogeneralComponent,
    CapacidadMqComponent,
    RealizarCalculosComponent,
    LoginComponent,
    FuncionesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
