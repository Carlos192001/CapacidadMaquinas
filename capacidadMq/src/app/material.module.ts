import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatTableModule} from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports: [
    MatTableModule,
    MatProgressSpinnerModule,
  ]
})
export class MaterialModule { }
