import { Component, OnInit } from '@angular/core';
import { GoogleChartInterface } from 'ng2-google-charts';
import { UiService } from '../../servicios/ui.service';
import { ReporteService } from '../../servicios/reporte.service';
import { LoadingController } from '@ionic/angular';
import { Sucursal } from '../../interfaces/interface';
import { SucursalService } from '../../servicios/sucursal.service';
@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.page.html',
  styleUrls: ['./grafico.page.scss'],
})
export class GraficoPage implements OnInit {
  public columnChart1: GoogleChartInterface;
  public columnChart2: GoogleChartInterface;
  public pieChart: GoogleChartInterface;
  public barChart: GoogleChartInterface;
  // tslint:disable-next-line: max-line-length
  constructor(private sucursalSrv: SucursalService, private uiSrv: UiService, private reporteSrv: ReporteService, private loadingController: LoadingController) { }
  fecha: string;
  data: any[] = [];
  tipo: string;
  sucursales: Sucursal[] = [];
  idSucursal = '';
  // ionViewDidEnter() {
  //   this.loadColumnChart();
  // }
  ngOnInit() {
    this.sucursalSrv.getSucursales()
      .subscribe((res: any) => {
        this.sucursales = [];
        this.sucursales.push(...res);
      }, err => {
        this.uiSrv.presentAlert('Error al cargar las sucursales');
        console.log(err);
      });
  }
  async gafricar() {
    if (this.fecha && this.fecha.length > 0 && this.tipo.length > 0) {
      if (this.tipo === '2') {
        if (this.idSucursal.length === 0) {
          this.uiSrv.presentAlert('Seleccione una sucursal');
          return;
        }
      }
      this.data = [];
      await this.presentLoading();
      this.reporteSrv.graficar(this.fecha, this.tipo, this.idSucursal).subscribe((res: any) => {
        console.log('correcto', res);
        // console.log('levanta graf tipo 1', this.tipo);
        this.loadingController.dismiss();
        if (res.ok === true) {
          this.data.push(...res.datos);
          if (this.tipo === '1') {
            console.log('es 1');
            this.loadColumnChart(this.data);
          } else {
            this.loadPieChart(this.data);
          }

        } else {
          this.uiSrv.presentAlert(res.mensaje);
        }
      }, err => {
        console.log('error', err);
        this.loadingController.dismiss();
      });
    } else {
      this.uiSrv.presentAlert('Ingrese una fecha y tipo de reporte');
    }
  }
  loadPieChart(datos: any[]) {
    const nuevoArray = [];
    for (const d of datos) {
      nuevoArray.push([d.producto, parseFloat(d.cantidad)]);
    }
    this.pieChart = {
      chartType: 'PieChart',
      dataTable: [
        ['Sucursales', 'Valores'],
        ...nuevoArray
        // ['Chicago, IL', 2695000],
        // ['Houston, TX', 2099000],
        // ['Philadelphia, PA', 1526000]
      ],
      // opt_firstRowIsData: true,
      options: {
        title: 'Top productos',
        height: 600,
        // chartArea: { height: '400' },
        // hAxis: {
        //   title: 'Sucursales',
        //   minValue: 0
        // },
        // vAxis: {
        //   title: 'Ventas'
        // }
      },
    };

  }
  loadColumnChart(datos: any[]) {
    const nuevoArray = [];
    for (const d of datos) {
      nuevoArray.push([d.nombre, parseFloat(d.total)]);
    }
    console.log(datos);
    this.columnChart1 = {
      chartType: 'ColumnChart',
      dataTable: [
        ['Sucursales', 'Valores'],
        ...nuevoArray
        // ['Chicago, IL', 2695000],
        // ['Houston, TX', 2099000],
        // ['Philadelphia, PA', 1526000]
      ],
      // opt_firstRowIsData: true,
      options: {
        title: 'Ventas por sucursales',
        height: 600,
        chartArea: { height: '400' },
        hAxis: {
          title: 'Sucursales',
          minValue: 0
        },
        vAxis: {
          title: 'Ventas'
        }
      },
    };
  }

  onChange(){
    this.data = [];
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
