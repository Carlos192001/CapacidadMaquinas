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


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';

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
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
