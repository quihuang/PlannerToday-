import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Tarea } from '../models/tarea.model';
import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'tareas';

@Injectable({ providedIn: 'root' })
export class TareaService {
  private storageReady = this.storage.create();

  constructor(private storage: Storage) {}

  async obtenerTareas(): Promise<Tarea[]> {
    await this.storageReady;
    return (await this.storage.get(STORAGE_KEY)) || [];
  }

  async guardarTarea(tarea: Omit<Tarea, 'id'>): Promise<void> {
    await this.storageReady;
    const tareas = await this.obtenerTareas();
    tareas.push({ ...tarea, id: uuidv4(), completada: false });
    await this.storage.set(STORAGE_KEY, tareas);
  }

  async eliminarTarea(id: string): Promise<void> {
    await this.storageReady;
    const tareas = await this.obtenerTareas();
    const filtradas = tareas.filter(t => t.id !== id);
    await this.storage.set(STORAGE_KEY, filtradas);
  }

  async actualizarTarea(tareaActualizada: Tarea): Promise<void> {
  await this.storageReady;
  const tareas: Tarea[] = await this.obtenerTareas();
  const index = tareas.findIndex(t => t.id === tareaActualizada.id);
  if (index !== -1) {
    tareas[index] = tareaActualizada;
    await this.storage.set('tareas', tareas);
  }
}

}