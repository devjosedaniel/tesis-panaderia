import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ReporteService } from '../../servicios/reporte.service';
import { UiService } from '../../servicios/ui.service';

@Component({
  selector: 'app-detalle-reporte',
  templateUrl: './detalle-reporte.page.html',
  styleUrls: ['./detalle-reporte.page.scss'],
})
export class DetalleReportePage implements OnInit {
  @Input() idsucursal;
  @Input() turno;
  @Input() fecha;
  data: any[] = [];
  constructor(private modalController: ModalController, private reporteSrv: ReporteService, private uiSrv: UiService) {

   }
  ngOnInit() {
    // console.log('idsucursal', this.idsucursal);
    // console.log('turno', this.turno);
    // console.log('fecha', this.fecha);
    this.reporteSrv.detalle(this.fecha, this.turno, this.idsucursal)
    .subscribe( (res: any) => {
      console.log(res);
      if ( res.ok === true){
        this.data.push(...res.datos);
      }else{
        this.uiSrv.presentAlert(res.mensaje);
      }
    }, err => {
      console.log(err);
      this.uiSrv.presentAlert('Error de conexión');
    });
  }
  atras(){
    this.modalController.dismiss();
  }
}
