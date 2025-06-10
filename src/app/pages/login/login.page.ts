import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  clave: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  async login() {
    const acceso = await this.authService.login(this.email, this.clave);
    if (acceso) {
      alert('Inicio de sesión exitoso');
      this.router.navigate(['/dashboard']);
    } else {
      alert('Credenciales inválidas');
    }
  }
}
