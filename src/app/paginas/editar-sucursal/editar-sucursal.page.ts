import { Component, OnInit } from '@angular/core';
import { Sucursal } from '../../interfaces/interface';
import { ActivatedRoute, Router } from '@angular/router';
import { SucursalService } from '../../servicios/sucursal.service';
import { UiService } from '../../servicios/ui.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-editar-sucursal',
  templateUrl: './editar-sucursal.page.html',
  styleUrls: ['./editar-sucursal.page.scss'],
})
export class EditarSucursalPage implements OnInit {
  id: number;
  // tslint:disable-next-line: max-line-length
  constructor(private alertController: AlertController, private Act: ActivatedRoute, private sucursalSrv: SucursalService, private route: Router, private uiSrv: UiService) {
    this.sucursal.id = this.Act.snapshot.params.id;
   }
  sucursal: Sucursal = new Sucursal();
  textoCard: string;
  ngOnInit() {
    console.log(this.id);
    if (this.sucursal.id > 0){
      this.textoCard = 'Editar Sucursal';
      this.sucursalSrv.getSucursal(this.sucursal.id)
      .subscribe( (res: any) => {
        if ( res.ok === true){
          this.sucursal = res.sucursal;
        }else{
          this.uiSrv.presentAlert(res.mensaje);
        }
      }, err => {
          console.log(err);
          this.uiSrv.presentAlert('Error de conexion');
      });
    }else{
      this.textoCard = 'Agregar Sucursal';
    }
  }

  Guardar(){
    // console.log(this.sucursal);
    if (this.sucursal.nombre.length === 0){
      this.uiSrv.presentAlert('Complete los campos');
      return;
    }
    if ( this.sucursal.id > 0){
        this.sucursalSrv.actualizar(this.sucursal).subscribe( (res: any) => {
          if (res.ok === true){
            this.uiSrv.presentToast(res.mensaje);
            this.route.navigateByUrl('folder/sucursal');
          }else{
            this.uiSrv.presentAlert(res.mensaje);
          }
        }, err => {
          this.uiSrv.presentAlert('Error de conexión.');
        });
    }else{
      this.sucursalSrv.guardar(this.sucursal)
    .subscribe( (res: any) => {
      console.log(res);
      if (res.ok === true){
        this.uiSrv.presentToast(res.mensaje);
        this.route.navigateByUrl('folder/sucursal');
      }else{
        this.uiSrv.presentAlert(res.mensaje);
      }
    }, err => {
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
            this.sucursalSrv.eliminar(this.sucursal.id)
            .subscribe( (res: any) => {
              if ( res.ok === true){
                this.uiSrv.presentToast(res.mensaje);
                this.route.navigateByUrl('folder/sucursal');
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
