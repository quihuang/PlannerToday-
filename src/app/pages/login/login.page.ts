import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  nombres: string = '';
  apellidos: string = '';
  edad: number | null = null;
  email: string = '';
  clave: string = '';
  esRegistro: boolean = false;
  mostrarClave: boolean = false;
  confirmarClave: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  async login() {
    if (this.esRegistro) {
      if (!this.nombres || !this.apellidos || !this.edad || !this.email || !this.clave || !this.confirmarClave) {
        alert('Todos los campos son obligatorios');
        return;
      }

      if (this.clave !== this.confirmarClave) {
        alert('Las contraseñas no coinciden');
        return;
      }

      await this.authService.register({
        nombres: this.nombres,
        apellidos: this.apellidos,
        edad: this.edad,
        email: this.email,
        clave: this.clave
      });

      alert('Registro exitoso. Ahora puedes iniciar sesión.');
      this.resetCampos();
      this.esRegistro = false;
      return;
    }
    
    const acceso = await this.authService.login(this.email, this.clave);
    if (acceso) {
      this.router.navigate(['/dashboard']);
    } else {
      alert('Credenciales inválidas');
    }
  }

  toggleModo() {
    this.esRegistro = !this.esRegistro;
  }

  resetCampos() {
    this.nombres = '';
    this.apellidos = '';
    this.edad = null;
    this.email = '';
    this.clave = '';
  }
}