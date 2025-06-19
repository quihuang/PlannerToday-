import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';
import { ModalController } from '@ionic/angular';
import { RecuperarClavePage } from '../recuperar-clave/recuperar-clave.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  nombres = '';
  apellidos = '';
  edad: number | null = null;
  email = '';
  clave = '';
  confirmarClave = '';
  esRegistro = false;
  mostrarClave = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService,
    private modalCtrl: ModalController
  ) {}

  async ionViewDidEnter() {
    const usuario = await this.authService.getUsuario();
    if (usuario) {
      // Si ya hay sesión, ir directo al dashboard
      this.router.navigate(['/tabs/dashboard']);
    }
  }

  async login() {
    if (this.esRegistro) {
      if (!this.nombres || !this.apellidos || !this.edad || !this.email || !this.clave || !this.confirmarClave) {
        this.toastService.showToast('Todos los campos son obligatorios', 'danger', 2000, 'middle');
        return;
      }

      if (this.clave !== this.confirmarClave) {
        this.toastService.showToast('Las contraseñas no coinciden', 'warning', 2000, 'middle');
        return;
      }

      await this.authService.register({
        nombres: this.nombres,
        apellidos: this.apellidos,
        edad: this.edad,
        email: this.email,
        clave: this.clave
      });

      this.toastService.showToast('Registro exitoso. Ahora puedes iniciar sesión.', 'success', 2000, 'middle');
      this.resetCampos();
      this.esRegistro = false;
      return;
    }

    const acceso = await this.authService.login(this.email, this.clave);
    if (acceso) {
      this.router.navigate(['/tabs/dashboard']);
    } else {
      this.toastService.showToast('Credenciales inválidas', 'danger', 2000, 'middle');
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
    this.confirmarClave = '';
  }

  async olvidasteClave() {
    const modal = await this.modalCtrl.create({
      component: RecuperarClavePage,
      breakpoints: [0.5, 0.8],
      initialBreakpoint: 0.6
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();

    if (data?.mensaje) {
      this.toastService.showToast(data.mensaje, data.tipo || 'success', 2000, 'middle');
    }
  }
}
