import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SucursalService } from '../../../servicios/sucursal.service';
import { Sucursal } from '../../../interfaces/interface';



@Component({
  selector: 'app-edit-sucursal',
  templateUrl: './edit-sucursal.component.html',
  styleUrls: ['./edit-sucursal.component.scss'],
})
export class EditSucursalComponent implements OnInit {
  @Input() sucursal: any;
  constructor(private modalCtrl: ModalController, private sucursalSrv: SucursalService) { }
  textoCard = '';
  nombreSucursal: string;
  ngOnInit() {
    console.log(this.nombreSucursal);
    if (Object.entries(this.sucursal).length === 0){
      this.sucursal.nombre = '';
      this.textoCard = 'Agregar Sucursal';
    }else{
      this.textoCard = 'Editar Sucursal';
    }
  }

  Guardar(){
    if (this.sucursal.id > 0){
      console.log('es actualizacion');
    }else{
      console.log('es insercion');
      console.log(this.sucursal);
      // this.sucursalSrv.guardar(this.sucursal);
    }
  }
  regresar(){
    this.modalCtrl.dismiss();
  }
}
