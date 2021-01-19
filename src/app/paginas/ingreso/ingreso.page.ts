import { Component, OnInit } from '@angular/core';
import { Producto, Usuario } from '../../interfaces/interface';
import { ProductoService } from '../../servicios/producto.service';
import { LoadingController } from '@ionic/angular';
import { ReporteService } from '../../servicios/reporte.service';
import { UiService } from '../../servicios/ui.service';
import { Router } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.page.html',
  styleUrls: ['./ingreso.page.scss'],
})
export class IngresoPage implements OnInit {

  // tslint:disable-next-line: max-line-length
  constructor(private authSrv: AuthService, private route: Router, private uiSrv: UiService, private productoSrv: ProductoService, private loadingController: LoadingController, private reporteSrv: ReporteService) { }
  productos: Producto[] = [];
  idsProductos = [];
  cantidades = [];
  turno: number;
  usuario: Usuario;
  sobrantes: any[] = [];
  async ngOnInit() {
    this.usuario = await this.authSrv.cargarUsuario();
    await this.presentLoading();
    this.productoSrv.getProductos()
      .subscribe((res: any) => {
        this.loadingController.dismiss();
        // console.log(res);
        this.productos = [];
        this.productos.push(...res.productos);
        if (this.productos) {
          for (let i = 0; i < this.productos.length; i++) {
            this.idsProductos[i] = this.productos[i].id;
            this.cantidades[i] = 0;
            // console.log(this.productos[i].id);
          }
        }
      }, err => {
        this.loadingController.dismiss();
        console.log('error:', err);
      });
  }
  registrar() {
    // console.log('cantidades', this.cantidades);
    // console.log('idproductos', this.idsProductos);
    if (this.turno || this.turno > 0) {
      this.reporteSrv.guardar(this.cantidades, this.idsProductos, 1, this.usuario.idsucursal, this.turno)
        .subscribe((res: any) => {
          if (res.ok === true) {
            this.uiSrv.presentToast(res.mensaje);
            this.route.navigateByUrl('inicio');
          } else {
            this.uiSrv.presentAlert(res.mensaje);
          }
        }, err => {
          console.log(err);
          this.uiSrv.presentAlert('Error de conexion');
        });
    } else {
      this.uiSrv.presentAlert('Seleccione un turno de trabajo');
    }
  }
  onChange() {
    // const t: string = '' + 2;
    // tslint:disable-next-line: triple-equals
    if (this.turno == 2) {
      console.log(this.turno);
      this.reporteSrv.sobrantes(this.usuario.idsucursal)
        .subscribe((res: any) => {
          if (res.ok === true) {
            this.sobrantes.push(... res.datos);
            console.log(res);
          } else {

          }
        }, err => {
          console.log(err);
          this.uiSrv.presentAlert('Error al buscar sobrantes');
        });
    }
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cargando productos...',
      mode: 'ios',
      animated: true
    });
    await loading.present();
  }


}
