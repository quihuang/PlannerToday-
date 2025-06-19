// auth.service.ts actualizado con soporte para múltiples usuarios y sesión persistente

import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Usuario } from '../models/usuario.model';

const USUARIOS_KEY = 'usuarios';
const USUARIO_ACTUAL_KEY = 'usuario_actual';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private storageReady = this.storage.create();

  constructor(private storage: Storage) {}

  async register(usuario: Usuario): Promise<void> {
    await this.storageReady;
    const usuarios: Usuario[] = (await this.storage.get(USUARIOS_KEY)) || [];
    usuarios.push(usuario);
    await this.storage.set(USUARIOS_KEY, usuarios);
    await this.storage.set(USUARIO_ACTUAL_KEY, usuario);
  }

  async login(email: string, clave: string): Promise<boolean> {
    await this.storageReady;
    const usuarios: Usuario[] = (await this.storage.get(USUARIOS_KEY)) || [];
    const usuario = usuarios.find(u => u.email === email && u.clave === clave);
    if (usuario) {
      await this.storage.set(USUARIO_ACTUAL_KEY, usuario);
      return true;
    }
    return false;
  }

  async logout(): Promise<void> {
    await this.storageReady;
    await this.storage.remove(USUARIO_ACTUAL_KEY);
  }

  async getUsuario(): Promise<Usuario | null> {
    await this.storageReady;
    return await this.storage.get(USUARIO_ACTUAL_KEY);
  }

  async updateUsuario(usuarioActualizado: Usuario): Promise<void> {
    await this.storageReady;
    const usuarioActual = await this.getUsuario(); // obtiene el que está en sesión

    if (!usuarioActual) return;

    let usuarios: Usuario[] = (await this.storage.get(USUARIOS_KEY)) || [];

    // busca y actualiza por el email original
    usuarios = usuarios.map(u =>
      u.email === usuarioActual.email ? usuarioActualizado : u
    );

    await this.storage.set(USUARIOS_KEY, usuarios);
    await this.storage.set(USUARIO_ACTUAL_KEY, usuarioActualizado);
  }


  async recuperarClave(email: string): Promise<boolean> {
    await this.storageReady;
    const usuarios: Usuario[] = (await this.storage.get(USUARIOS_KEY)) || [];
    return usuarios.some(u => u.email === email);
  }
}


