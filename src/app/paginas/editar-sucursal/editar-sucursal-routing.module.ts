import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarSucursalPage } from './editar-sucursal.page';

const routes: Routes = [
  {
    path: '',
    component: EditarSucursalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarSucursalPageRoutingModule {}
