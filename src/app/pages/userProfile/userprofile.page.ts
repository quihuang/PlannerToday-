import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.page.html',
  styleUrls: ['./userprofile.page.scss'],
})
export class UserProfilePage implements OnInit {
  usuario: Usuario = {
    nombres: '',
    apellidos: '',
    edad: 0,
    email: '',
    clave: ''
  };
verClave: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController // ✅ Agregado aquí
  ) {}

  async ngOnInit() {
    const usuario = await this.authService.getUsuario();
    if (usuario) this.usuario = usuario;
  }

  async actualizarPerfil() {
    await this.authService.updateUsuario(this.usuario);

    const alert = await this.alertController.create({
      header: 'Actualización Exitosa',
      message: 'Actualización de datos confirmada. Por favor, inicia sesión nuevamente.',
      buttons: [{
        text: 'Aceptar',
        handler: () => {
          this.router.navigate(['/login']); // ✅ Redirige al login
        }
      }]
    });

    await alert.present();
  }
}
