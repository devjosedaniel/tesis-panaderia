import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GraficoPageRoutingModule } from './grafico-routing.module';

import { GraficoPage } from './grafico.page';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GraficoPageRoutingModule,
    Ng2GoogleChartsModule
  ],
  declarations: [GraficoPage]
})
export class GraficoPageModule {}
