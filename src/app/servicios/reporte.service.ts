import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
const URL = environment.url;
const headers = new HttpHeaders({
  'Content-Type': 'application/x-www-form-urlencoded'
});
@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  constructor(private http: HttpClient) { }

  guardar(cantidades, ids, tipo: number, idsucursal: number, turno: number){
    console.log(cantidades);
    return this.http.post(`${URL}/reporte`, `turno=${turno}&idsucursal=${idsucursal}&tipo=${tipo}&cantidades=${JSON.stringify(cantidades)}&ids=${JSON.stringify(ids)}`, { headers});
  }
  consultarInicio(turno: number, idsucursal: number){
    return this.http.get(`${URL}/reporte?turno=${turno}&idsucursal=${idsucursal}`, { headers });
  }
  consultar(fecha: string ){
    return this.http.get(`${URL}/reporte/${fecha}`, { headers});
  }
  detalle(fecha: string, turno: number, idsucursal: number){
    return this.http.get(`${URL}/reportedetalle?fecha=${fecha}&turno=${turno}&idsucursal=${idsucursal}`);
  }
  graficar(fecha: string, tipo: string , idsucursal: string){
    return this.http.get(`${URL}/grafica/${fecha}?tipo=${tipo}&idsucursal=${idsucursal}`, { headers});
  }
  sobrantes(idsucursal){
    return this.http.get(`${URL}/sobrantes/${idsucursal}`, {headers});
  }
}
