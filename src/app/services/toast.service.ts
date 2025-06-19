import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(private toastController: ToastController) {}

  async showToast(
    message: string,
    color: 'success' | 'warning' | 'danger' | 'primary' | 'medium' = 'primary',
    duration: number = 2000,
    position: 'top' | 'middle' | 'bottom' = 'bottom'
  ) {
    const toast = await this.toastController.create({
      message,
      duration,
      color,
      position,
      animated: true
    });
    await toast.present();
  }
}
