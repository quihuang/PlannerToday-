import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Tarea } from '../models/tarea.model';
import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'tareas';

@Injectable({
  providedIn: 'root'
})
export class TareasService {
  private storageReady = this.storage.create();

  constructor(private storage: Storage) {}

  async getTareas(): Promise<Tarea[]> {
    await this.storageReady;
    return await this.storage.get(STORAGE_KEY) || [];
  }

  async addTarea(tarea: Tarea): Promise<void> {
    await this.storageReady;
    const tareas = await this.getTareas();
    tarea.id = uuidv4();
    tareas.push(tarea);
    await this.storage.set(STORAGE_KEY, tareas);
  }

  async updateTarea(updatedTarea: Tarea): Promise<void> {
    await this.storageReady;
    const tareas = await this.getTareas();
    const index = tareas.findIndex(t => t.id === updatedTarea.id);
    if (index > -1) {
      tareas[index] = updatedTarea;
      await this.storage.set(STORAGE_KEY, tareas);
    }
  }

  async deleteTarea(id: string): Promise<void> {
    await this.storageReady;
    const tareas = await this.getTareas();
    const newTareas = tareas.filter(t => t.id !== id);
    await this.storage.set(STORAGE_KEY, newTareas);
  }
}