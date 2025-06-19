import { Component, OnInit } from '@angular/core';
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

  constructor(private authService: AuthService, private router: Router) {}

  async ngOnInit() {
    const usuario = await this.authService.getUsuario();
    if (usuario) this.usuario = usuario;
  }

  async actualizarPerfil() {
    await this.authService.updateUsuario(this.usuario);
    this.router.navigate(['/tabs/dashboard']);
  }
}

