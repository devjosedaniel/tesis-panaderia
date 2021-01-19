import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IngresoPageRoutingModule } from './ingreso-routing.module';

import { IngresoPage } from './ingreso.page';
import { SobrantePipe } from '../../pipes/sobrante.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IngresoPageRoutingModule
  ],
  declarations: [IngresoPage, SobrantePipe]
})
export class IngresoPageModule {}
