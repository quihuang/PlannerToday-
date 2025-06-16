import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  mostrarClave: boolean = false;
  mostrarConfirmacion: boolean = false;
  confirmarClave: string = '';

  usuario: Usuario = {
    nombres: '',
    apellidos: '',
    edad: 0,
    email: '',
    clave: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

 async registrar() {
  const { nombres, apellidos, edad, email, clave } = this.usuario;

  if (!nombres || !apellidos || !edad || !email || !clave || !this.confirmarClave) {
    alert('Todos los campos son obligatorios');
    return;
  }

  if (clave !== this.confirmarClave) {
    alert('Las contraseñas no coinciden');
    return;
  }

  await this.authService.register(this.usuario);
  alert('Usuario registrado con éxito');
  this.router.navigate(['/login']);
}

}