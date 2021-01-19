import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../servicios/producto.service';
import { Producto } from 'src/app/interfaces/interface';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements OnInit {

  constructor( private  productoSrv: ProductoService) { }
  productos: Producto[] = [];
  ngOnInit() {

  }

  ionViewDidEnter(){
    // console.log('reentre');
    this.productoSrv.getProductos()
        .subscribe( (res: any) => {
          // console.log(res);
          this.productos = [];
          this.productos.push(... res.productos);
        }, err => {
          console.log('error:', err);
        });
  }
}
