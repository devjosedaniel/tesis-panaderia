import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { NavController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/interface';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  public selectedIndex = 0;
  rol: string;
  public appPages = [
    {
      title: 'Inicio',
      url: '/inicio',
      icon: 'home'
    },
    {
      title: 'Sucursales',
      url: '/folder/sucursal',
      icon: 'home'
    },
    {
      title: 'Usuarios',
      url: '/usuario',
      icon: 'person'
    },
    {
      title: 'Productos',
      url: '/producto',
      icon: 'egg'
    },
    {
      title: 'Reporte',
      url: '/reporte',
      icon: 'copy'
    },
    {
      title: 'Gráfico',
      url: '/grafico',
      icon: 'bar-chart'
    },
  ];
  usuario: Usuario;
  constructor(private authSrv: AuthService, private navCtrol: NavController) {
   }

  async ngOnInit() {
    this.usuario = await this.authSrv.cargarUsuario();
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
    if(this.usuario.idrol ===  2){
      this.rol = 'Encargado';
    }else{
      this.rol = 'Administrador';
    }
  }
  logout(){
    this.authSrv.eliminarusuario();
    this.navCtrol.navigateRoot('login');
  }

}
