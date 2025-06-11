import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  clave: string = '';
  mostrarClave: boolean = false;

  constructor(
    private authService: AuthService,
    @Inject(ToastService) private toastService: ToastService,
    private router: Router
  ) {}

  toggleMostrarClave() {
    this.mostrarClave = !this.mostrarClave;
  }

  async login() {
    if (!this.email || !this.clave) {
      this.toastService.showToast('Por favor, ingresa tu correo y contraseña', 'warning');
      return;
    }

    const acceso = await this.authService.login(this.email, this.clave);
    if (acceso) {
      this.toastService.showToast('Inicio de sesión exitoso', 'success');
      this.router.navigate(['/dashboard']);
    } else {
      this.toastService.showToast('Credenciales inválidas', 'danger');
    }
  }

  olvidasteClave() {
    this.router.navigate(['/recuperar-clave']);
  }
}
