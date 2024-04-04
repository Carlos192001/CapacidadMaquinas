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

@NgModule({
  declarations: [
    AppComponent,
    ProcesosComponent,
    MaquinasComponent,
    PlantasComponent,
    PartesComponent,
    FuncionesComponent,
    DepartamentosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
