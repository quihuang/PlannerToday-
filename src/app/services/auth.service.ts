import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Usuario } from '../models/usuario.model';

const STORAGE_KEY = 'usuario_actual';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private storageReady = this.storage.create();

  constructor(private storage: Storage) {}

  async register(usuario: Usuario): Promise<void> {
    await this.storageReady;
    await this.storage.set(STORAGE_KEY, usuario);
  }

  async login(email: string, clave: string): Promise<boolean> {
    await this.storageReady;
    const usuario = await this.storage.get(STORAGE_KEY);
    if (usuario && usuario.email === email && usuario.clave === clave) {
      return true;
    }
    return false;
  }

  async logout(): Promise<void> {
    await this.storageReady;
    await this.storage.remove(STORAGE_KEY);
  }

  async getUsuario(): Promise<Usuario | null> {
    await this.storageReady;
    return await this.storage.get(STORAGE_KEY);
  }
}