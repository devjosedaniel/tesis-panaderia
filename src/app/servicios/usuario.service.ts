import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Usuario } from '../interfaces/interface';
import { environment } from 'src/environments/environment';
const URL = environment.url;
const headers = new HttpHeaders({
  'Content-Type': 'application/x-www-form-urlencoded'
});
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  getUsuarios(){
    return this.http.get(`${URL}/usuario`);
  }
  getUsuario(id: number){
    // console.log('idsucursal', id);
    return this.http.get(`${URL}/usuario/${id}`);
  }
  guardar(usuario: Usuario){
    return this.http.post(`${URL}/usuario`, `usuario=${JSON.stringify(usuario)}`, { headers});
  }
  eliminar(id: number){
    return this.http.delete(`${URL}/usuario/${id}`, { headers});
  }
  actualizar(usuario: Usuario){
    return this.http.put(`${URL}/usuario/${usuario.id}`, `usuario=${JSON.stringify(usuario)}`, { headers});
  }
}
