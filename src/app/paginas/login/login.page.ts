import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../interfaces/interface';
import { UiService } from '../../servicios/ui.service';
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private uiSrv: UiService, private authSrv: AuthService) { }
  usuario: Usuario = new Usuario();
  ngOnInit() {
  }


  login(){
    if (!this.usuario.nombre && !this.usuario.password){
      this.uiSrv.presentAlert('Ingresa usuario y contraseña');
      return;
    }
    this.authSrv.autenticar(this.usuario);
  }
}
