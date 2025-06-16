import { Component } from '@angular/core';
import { TareasService } from '../../services/tareas.service';
import { Tarea } from '../../models/tarea.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nueva-tarea',
  templateUrl: './nueva-tarea.page.html',
  styleUrls: ['./nueva-tarea.page.scss'],
})
export class NuevaTareaPage {
  tarea: Tarea = {
    id: '',
    titulo: '',
    categoria: 'personal',
    prioridad: 'media',
    fecha: '',
    hora: '',
    completado: false
  };

  constructor(private tareasService: TareasService, private router: Router) {}

  async guardarTarea() {
    if (this.tarea.titulo && this.tarea.fecha && this.tarea.hora) {
      await this.tareasService.addTarea(this.tarea);
      alert('Tarea guardada');
      this.router.navigate(['/dashboard']);
    } else {
      alert('Por favor, completa todos los campos obligatorios');
    }
  }
}