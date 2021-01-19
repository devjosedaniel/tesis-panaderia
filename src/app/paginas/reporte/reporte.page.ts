import { Component, OnInit } from '@angular/core';
import { ReporteService } from '../../servicios/reporte.service';
import { UiService } from '../../servicios/ui.service';
import { LoadingController, ModalController } from '@ionic/angular';
import { DetalleReportePage } from '../detalle-reporte/detalle-reporte.page';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.page.html',
  styleUrls: ['./reporte.page.scss'],
})
export class ReportePage implements OnInit {

  // tslint:disable-next-line: max-line-length
  constructor(private modalController: ModalController, private loadingController: LoadingController, private reporteSrv: ReporteService, private uiSrv: UiService) { }
  fecha: string;
  reportes: any[] = [];
  ngOnInit() {
  }
  async generar() {
    this.reportes = [];
    // console.log(this.fecha);
    if (this.fecha && this.fecha.length > 0) {
      await this.presentLoading();
      this.reporteSrv.consultar(this.fecha)
        .subscribe((res: any) => {
          console.log(res);
          this.loadingController.dismiss();
          if (res.ok === true) {
            this.reportes.push(...res.reporte);
          } else {
            this.uiSrv.presentAlert(res.mensaje);
          }
        }, err => {
          console.log(err);
          this.loadingController.dismiss();
          this.uiSrv.presentAlert('Error de conexión');
        });
    } else {
      this.uiSrv.presentAlert('Seleccione una fecha');
    }
  }
  async presentModal(idsucursal, turno) {
    // console.log('sucursal', idsucursal);
    // console.log('turno', turno);
    const modal = await this.modalController.create({
      component: DetalleReportePage,
      cssClass: 'my-custom-class',
      componentProps: {
        idsucursal,
        turno,
        fecha: this.fecha
      }
    });
    return await modal.present();
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
