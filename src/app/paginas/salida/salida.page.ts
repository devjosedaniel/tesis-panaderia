import { Component, OnInit } from '@angular/core';
import { ReporteService } from '../../servicios/reporte.service';
import { LoadingController } from '@ionic/angular';
import { Usuario, Producto } from '../../interfaces/interface';
import { AuthService } from '../../servicios/auth.service';
import { UiService } from '../../servicios/ui.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-salida',
  templateUrl: './salida.page.html',
  styleUrls: ['./salida.page.scss'],
})
export class SalidaPage implements OnInit {
  turno: number;
  usuario: Usuario;
  productos: Producto[] = [];
  cantidades: number[] = [];
  idsProductos = [];
  // tslint:disable-next-line: max-line-length
  constructor(private route: Router, private uiSrv: UiService , private reporteSrv: ReporteService, private loadingController: LoadingController, private authSrv: AuthService) { }

  async ngOnInit() {
    this.usuario = await this.authSrv.cargarUsuario();
  }
  async onChange($event) {
    await this.presentLoading();
    this.reporteSrv.consultarInicio(this.turno, this.usuario.idsucursal)
    .subscribe( (res: any) => {
      this.loadingController.dismiss();
      if (res.ok === true){
        // this.uiSrv.presentToast(res.mensaje);
        console.log(res);
        this.productos = [];
        this.productos.push( ... res.productos);
        if ( this.productos){
          for (let i = 0; i < this.productos.length; i++){
            this.idsProductos[i] = this.productos[i].idproducto;
            this.cantidades[i] = 0;
            // console.log(this.productos[i].id);
          }
        }
      }else{
        this.uiSrv.presentAlert(res.mensaje);
      }
    }, err => {
      this.loadingController.dismiss();
      this.uiSrv.presentAlert('Error de conexión');
    });
  }
  registrar(){
    // console.log(this.idsProductos);
    // console.log(this.cantidades);
    if (this.turno || this.turno > 0){
      this.reporteSrv.guardar(this.cantidades, this.idsProductos, 2, this.usuario.idsucursal, this.turno)
      .subscribe( (res: any) => {
        if (res.ok === true){
          this.uiSrv.presentToast(res.mensaje);
          this.route.navigateByUrl('inicio');
        }else{
          this.uiSrv.presentAlert(res.mensaje);
        }
      }, err => {
        console.log(err);
        this.uiSrv.presentAlert('Error de conexion');
      });
     }else{
       this.uiSrv.presentAlert('Seleccione un turno de trabajo');
     }
  }
  validarMax(event, max){
    // tslint:disable-next-line: radix
    const valor = parseInt(event.target.value) ;
    if (valor > max){
      this.uiSrv.presentAlert('El valor ingresado sobrepasa el numero máximo del producto');
      event.target.value = 0;
    }
    return;
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cargando información...',
      mode: 'ios',
      animated: true
    });
    await loading.present();
  }
}
