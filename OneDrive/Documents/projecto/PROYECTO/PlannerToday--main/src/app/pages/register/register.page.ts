import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  usuario: Usuario = {
    nombre: '',
    email: '',
    clave: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  async registrar() {
    if (this.usuario.email && this.usuario.clave) {
      await this.authService.register(this.usuario);
      alert('Usuario registrado con éxito');
      this.router.navigate(['/login']);
    } else {
      alert('Todos los campos son obligatorios');
    }
  }
}