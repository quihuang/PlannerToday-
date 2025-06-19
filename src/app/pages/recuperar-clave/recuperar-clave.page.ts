import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-recuperar-clave',
  templateUrl: './recuperar-clave.page.html',
  styleUrls: ['./recuperar-clave.page.scss'],
})
export class RecuperarClavePage {
  email: string = '';

  constructor(
    private authService: AuthService,
    private toastService: ToastService,
    public modalCtrl: ModalController
  ) {}

  private esEmailValido(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  async recuperarClave() {
    if (!this.email) {
      this.toastService.showToast('Debes ingresar tu correo electrónico', 'warning', 2000, 'middle');
      return;
    }

    if (!this.esEmailValido(this.email)) {
      this.toastService.showToast('Correo electrónico inválido', 'danger', 2000, 'middle');
      return;
    }

    const enviado = await this.authService.recuperarClave(this.email);

    if (enviado) {
      await this.modalCtrl.dismiss({ mensaje: 'Correo de recuperación enviado', tipo: 'success' });
    } else {
      this.toastService.showToast('Error al enviar el correo', 'danger', 2000, 'middle');
    }
  }

  async cerrarModal() {
    await this.modalCtrl.dismiss();
  }
}
