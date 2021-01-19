import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import { Sucursal } from '../interfaces/interface';
const URL = environment.url;
const headers = new HttpHeaders({
  'Content-Type': 'application/x-www-form-urlencoded'
});
@Injectable({
  providedIn: 'root'
})
export class SucursalService {

  constructor(private http: HttpClient) { }
  getSucursales(){
    return this.http.get(`${URL}/sucursal`);
  }
  getSucursal(id: number){
    console.log('idsucursal', id);
    return this.http.get(`${URL}/sucursal/${id}`);
  }
  guardar(sucursal: Sucursal){
    return this.http.post(`${URL}/sucursal`, `sucursal=${sucursal.nombre}`, { headers});
  }
  eliminar(id: number){
    return this.http.delete(`${URL}/sucursal/${id}`, { headers});
  }
  actualizar(sucursal: Sucursal){
    return this.http.put(`${URL}/sucursal/${sucursal.id}`, `sucursal=${sucursal.nombre}`, { headers});
  }
}
