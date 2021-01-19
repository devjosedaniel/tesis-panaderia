import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../servicios/usuario.service';
import { Usuario } from '../../interfaces/interface';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage implements OnInit {

  constructor(private usuarioSrv: UsuarioService) { }
  usuarios: Usuario[] = [];
  ngOnInit() {
  }
  ionViewDidEnter(){

    this.usuarioSrv.getUsuarios()
        .subscribe( (res: any) => {
          this.usuarios = [];
          this.usuarios.push(... res.usuarios);
        }, err => {
          console.log(err);
        });
  }
}
