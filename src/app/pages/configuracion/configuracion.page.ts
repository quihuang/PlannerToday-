import { Component } from '@angular/core';
import { TareaService } from '../../services/tarea.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
})
export class ConfiguracionPage {
  constructor(private tareasService: TareaService, private storage: Storage) {}

  async limpiarTareas() {
    await this.storage.create();
    await this.storage.remove('tareas');
    alert('Todas las tareas han sido eliminadas');
  }
}