import { Component } from '@angular/core';
import { TareaService } from '../../services/tarea.service';
import { Storage } from '@ionic/storage-angular';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
})
export class ConfiguracionPage {
  constructor(private tareasService: TareaService, 
                  private toastService: ToastService,
                  private storage: Storage) {}

  async limpiarTareas() {
    await this.storage.create();
    await this.storage.remove('tareas');
    this.toastService.showToast('Todas las tareas han sido eliminadas','success',2000,'middle');
  }
}