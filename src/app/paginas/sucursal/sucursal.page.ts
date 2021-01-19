import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EditSucursalComponent } from './edit-sucursal/edit-sucursal.component';
import {SucursalService} from '../../servicios/sucursal.service';
import { Sucursal } from '../../interfaces/interface';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-sucursal',
  templateUrl: './sucursal.page.html',
  styleUrls: ['./sucursal.page.scss'],
})
export class SucursalPage implements OnInit {

  constructor(private modalCtrl: ModalController, private  sucursalSrv: SucursalService) { }
  sucursales: Sucursal[] = [];
  ngOnInit() {

  }

  ionViewDidEnter(){
    console.log('reentre');
    this.sucursalSrv.getSucursales()
        .subscribe( (res: any) => {
          this.sucursales = [];
          this.sucursales.push(... res);
        }, err => {
          console.log(err);
        });
  }
  // async detalle(sucursal:any = null){
  //   const modal = await this.modalCtrl.create({
  //     component: EditSucursalComponent,
  //     cssClass: 'my-custom-class',
  //     componentProps: {
  //       'sucursal' : sucursal
  //     }
  //   });
  //   return await modal.present();
  // }

}
