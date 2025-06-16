import { Component, OnInit } from '@angular/core';
import { TareaService } from '../../services/tarea.service';
import { Tarea } from '../../models/tarea.model';

@Component({
  selector: 'app-nueva-tarea',
  templateUrl: './nueva-tarea.page.html',
  styleUrls: ['./nueva-tarea.page.scss'],
})
export class NuevaTareaPage implements OnInit {
  tareas: Tarea[] = [];

  titulo = '';
  descripcion = '';
  fecha = '';
  hora = '';
  categoria = '';
  prioridad: 'alta' | 'media' | 'baja' = 'media';

  constructor(private tareaService: TareaService) {}

  async ngOnInit() {
    this.tareas = await this.tareaService.obtenerTareas();
  }

  async agregarTarea() {
    if (!this.titulo || !this.fecha) return alert('Campos requeridos');

    await this.tareaService.guardarTarea({
      titulo: this.titulo,
      descripcion: this.descripcion,
      fecha: this.fecha,
      hora: this.hora,
      categoria: this.categoria,
      prioridad: this.prioridad,
      completada: false
    });

    this.limpiarFormulario();
    this.tareas = await this.tareaService.obtenerTareas();
  }

  async eliminar(id: string) {
    await this.tareaService.eliminarTarea(id);
    this.tareas = await this.tareaService.obtenerTareas();
  }

  limpiarFormulario() {
    this.titulo = '';
    this.descripcion = '';
    this.fecha = '';
    this.categoria = '';
    this.prioridad = 'media';
  }
}