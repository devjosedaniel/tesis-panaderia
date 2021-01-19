import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Usuario } from '../interfaces/interface';
import { Storage } from '@ionic/storage';
import { NavController, LoadingController } from '@ionic/angular';
import { UiService } from './ui.service';
const URL = environment.url;
const headers = new HttpHeaders({
  'Content-Type': 'application/x-www-form-urlencoded'
});
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  usuario: Usuario;
  // tslint:disable-next-line: max-line-length
  constructor(private uiSrv: UiService, private http: HttpClient, private storage: Storage, private navCtrl: NavController, private loadingController: LoadingController) { }
  autenticar(usuario: Usuario){
    this.presentLoading();
    this.http.post(`${URL}/auth`, `usuario=${JSON.stringify(usuario)}`, { headers})
    .subscribe( async (res: any) => {
      console.log(res);
      this.loadingController.dismiss();
      if (res.ok === true){
        await this.guardarUsuario(res.usuario);
        this.navCtrl.navigateRoot('inicio');
      }else{
        // console.log('error');
        this.uiSrv.presentAlert(res.mensaje);
      }
    }, err => {
      this.loadingController.dismiss();
      console.log(err);
    });
  }


  guardarUsuario(usuario: Usuario){
    this.storage.set('usuario', usuario);
  }
  async cargarUsuario() {
    this.usuario = await this.storage.get('usuario') || null;
    return this.usuario;
  }
  async validaExisteUsuario(): Promise<boolean> {
    await this.cargarUsuario();
    return new Promise<boolean>(resolve => {
      if (this.usuario) {
        resolve(true);
      } else {
        this.navCtrl.navigateRoot('/login');
        resolve(false);
        console.log('no existe usuario en la local bd');
      }

    });
  }
  eliminarusuario(){
    this.storage.remove('usuario');
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Validando información',
      duration: 2000,
      mode: 'ios'
    });
    await loading.present();

    // const { role, data } = await loading.onDidDismiss();
    // console.log('Loading dismissed!');
  }

}
