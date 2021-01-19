import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  // {
  //   path: 'folder/:id',
  //   loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  // },
  {
    path: 'login',
    loadChildren: () => import('./paginas/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'folder/sucursal',
    loadChildren: () => import('./paginas/sucursal/sucursal.module').then( m => m.SucursalPageModule)
  },
  {
    path: 'editar-sucursal/:id',
    loadChildren: () => import('./paginas/editar-sucursal/editar-sucursal.module').then( m => m.EditarSucursalPageModule)
  },
  {
    path: 'usuario',
    loadChildren: () => import('./paginas/usuario/usuario.module').then( m => m.UsuarioPageModule)
  },
  {
    path: 'editar-usuario/:id',
    loadChildren: () => import('./paginas/editar-usuario/editar-usuario.module').then( m => m.EditarUsuarioPageModule)
  },
  {
    path: 'inicio',
    canLoad: [AuthGuard],
    loadChildren: () => import('./paginas/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'producto',
    loadChildren: () => import('./paginas/producto/producto.module').then( m => m.ProductoPageModule)
  },
  {
    path: 'editar-producto/:id',
    loadChildren: () => import('./paginas/editar-producto/editar-producto.module').then( m => m.EditarProductoPageModule)
  },
  {
    path: 'ingreso',
    loadChildren: () => import('./paginas/ingreso/ingreso.module').then( m => m.IngresoPageModule)
  },
  {
    path: 'salida',
    loadChildren: () => import('./paginas/salida/salida.module').then( m => m.SalidaPageModule)
  },
  {
    path: 'reporte',
    loadChildren: () => import('./paginas/reporte/reporte.module').then( m => m.ReportePageModule)
  },
  {
    path: 'grafico',
    loadChildren: () => import('./paginas/grafico/grafico.module').then( m => m.GraficoPageModule)
  },
  {
    path: 'detalle-reporte',
    loadChildren: () => import('./paginas/detalle-reporte/detalle-reporte.module').then( m => m.DetalleReportePageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
