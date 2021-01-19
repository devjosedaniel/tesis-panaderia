import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Producto } from '../interfaces/interface';
import { environment } from 'src/environments/environment';
const URL = environment.url;
const headers = new HttpHeaders({
  'Content-Type': 'application/x-www-form-urlencoded'
});
@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http: HttpClient) { }
  getProductos(){
    return this.http.get(`${URL}/producto`);
  }
  getProducto(id: number){
    console.log('idsucursal', id);
    return this.http.get(`${URL}/producto/${id}`);
  }
  guardar(producto: Producto){
    return this.http.post(`${URL}/producto`, `producto=${producto.nombre}&precio=${producto.precio}`, { headers});
  }
  eliminar(id: number){
    return this.http.delete(`${URL}/producto/${id}`, { headers});
  }
  actualizar(producto: Producto){
    return this.http.put(`${URL}/producto/${producto.id}`, `producto=${producto.nombre}&precio=${producto.precio}`, { headers});
  }
}
