import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { UiService } from '../../servicios/ui.service';
import { UsuarioService } from '../../servicios/usuario.service';
import { Usuario, Sucursal } from '../../interfaces/interface';
import { SucursalService } from '../../servicios/sucursal.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.page.html',
  styleUrls: ['./editar-usuario.page.scss'],
})
export class EditarUsuarioPage implements OnInit {

  id: number;
  // tslint:disable-next-line: max-line-length
  constructor(private sucursalSrv: SucursalService, private alertController: AlertController, private Act: ActivatedRoute, private usuarioSrv: UsuarioService, private route: Router, private uiSrv: UiService) {
    this.usuario.id = this.Act.snapshot.params.id;
    this.sucursalSrv.getSucursales()
      .subscribe(async (res: any) => {
        this.sucursales = [];
        await this.sucursales.push(...res);
        // console.log(this.sucursales);
      }, err => {
        console.log(err);
        this.uiSrv.presentAlert('Error de conexión');
      });
  }
  usuario: Usuario = new Usuario();
  sucursales: Sucursal[] = [];
  textoCard: string;
  ngOnInit() {
    console.log(this.id);
    if (this.usuario.id > 0) {
      this.textoCard = 'Editar Usuario';
      this.usuarioSrv.getUsuario(this.usuario.id)
        .subscribe((res: any) => {
          if (res.ok === true) {
            this.usuario = res.usuario;
          } else {
            this.uiSrv.presentAlert(res.mensaje);
          }
        }, err => {
          console.log(err);
          this.uiSrv.presentAlert('Error de conexion');
        });
    } else {
      this.textoCard = 'Agregar Usuario';
    }

  }

  Guardar() {
    // console.log(this.sucursal);
    if (this.usuario.id > 0) {
      if (!this.usuario.idsucursal && !this.usuario.nombre) {
        this.uiSrv.presentAlert('Complete los campos');
        return;
      }
      this.usuarioSrv.actualizar(this.usuario).subscribe((res: any) => {
        if (res.ok === true) {
          this.uiSrv.presentToast(res.mensaje);
          this.route.navigateByUrl('usuario');
        } else {
          this.uiSrv.presentAlert(res.mensaje);
        }
      }, err => {
        this.uiSrv.presentAlert('Error de conexión.');
      });
    } else {
      // tslint:disable-next-line: triple-equals
      if (!this.usuario.idsucursal || !this.usuario.nombre || !this.usuario.password || this.usuario.password.length == 0) {
        this.uiSrv.presentAlert('Complete los campos');
        return;
      }
      this.usuarioSrv.guardar(this.usuario)
        .subscribe((res: any) => {
          console.log(res);
          if (res.ok === true) {
            this.uiSrv.presentToast(res.mensaje);
            this.route.navigateByUrl('usuario');
          } else {
            this.uiSrv.presentAlert(res.mensaje);
          }
        }, err => {
          console.log('error: ', err);
          this.uiSrv.presentAlert('Error de conexión.');
        });
    }
  }

  async eliminar() {
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
            this.usuarioSrv.eliminar(this.usuario.id)
              .subscribe((res: any) => {
                if (res.ok === true) {
                  this.uiSrv.presentToast(res.mensaje);
                  this.route.navigateByUrl('usuario');
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
