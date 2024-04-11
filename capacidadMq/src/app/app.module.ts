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

@NgModule({
  declarations: [
    AppComponent,
    ProcesosComponent,
    MaquinasComponent,
    PlantasComponent,
    PartesComponent,
    FuncionesComponent,
    DepartamentosComponent,
    CalcularCapacidadComponent,
    InyectorasComponent,
    TroqueladorasComponent,
    HornosComponent,
    FluxeadorasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
