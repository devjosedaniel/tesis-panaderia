import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../../servicios/producto.service';
import { Producto } from 'src/app/interfaces/interface';
import { UiService } from '../../servicios/ui.service';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.page.html',
  styleUrls: ['./editar-producto.page.scss'],
})
export class EditarProductoPage implements OnInit {

  id: number;
  // tslint:disable-next-line: max-line-length
  constructor(private alertController: AlertController, private Act: ActivatedRoute, private productoSrv: ProductoService, private route: Router, private uiSrv: UiService) {
    this.producto.id = this.Act.snapshot.params.id;
   }
  producto: Producto = new Producto();
  textoCard: string;
  ngOnInit() {
    // this.producto = new Producto();
    console.log(this.id);
    if (this.producto.id > 0){
      this.textoCard = 'Editar Producto';
      this.productoSrv.getProducto(this.producto.id)
      .subscribe( (res: any) => {
        if ( res.ok === true){
          this.producto = res.producto;
        }else{
          this.uiSrv.presentAlert(res.mensaje);
        }
      }, err => {
          console.log(err);
          this.uiSrv.presentAlert('Error de conexion');
      });
    }else{
      this.producto = new Producto();
      this.textoCard = 'Agregar Producto';
    }
  }

  Guardar(){
    // tslint:disable-next-line: triple-equals
    if (this.producto.nombre.length === 0 || this.producto.precio == 0){
      this.uiSrv.presentAlert('Complete los campos');
      return;
    }
    // console.log(this.sucursal);
    if ( this.producto.id > 0){
        this.productoSrv.actualizar(this.producto).subscribe( (res: any) => {
          if (res.ok === true){
            this.uiSrv.presentToast(res.mensaje);
            this.route.navigateByUrl('producto');
          }else{
            this.uiSrv.presentAlert(res.mensaje);
          }
        }, err => {
          this.uiSrv.presentAlert('Error de conexión.');
        });
    }else{
      this.productoSrv.guardar(this.producto)
    .subscribe( (res: any) => {
      console.log(res);
      if (res.ok === true){
        this.uiSrv.presentToast(res.mensaje);
        this.route.navigateByUrl('producto');
      }else{
        this.uiSrv.presentAlert(res.mensaje);
      }
    }, err => {
      console.log(err);
      this.uiSrv.presentAlert('Error de conexión.');
    });
    }
  }

  async eliminar(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmación!',
      message: 'Se eliminará!!!',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            // console.log('Se eliminará!!!');
          }
        }, {
          text: 'Ok',
          handler: () => {
            this.productoSrv.eliminar(this.producto.id)
            .subscribe( (res: any) => {
              if ( res.ok === true){
                this.uiSrv.presentToast(res.mensaje);
                this.route.navigateByUrl('producto');
              }
            }, err => {
              this.uiSrv.presentAlert('Error de conexión.');
            });
          }
        }
      ]
    });

    await alert.present();
  }

}
