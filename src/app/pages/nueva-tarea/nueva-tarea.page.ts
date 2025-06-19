import { Component, OnInit } from '@angular/core';
import { TareaService } from '../../services/tarea.service';
import { Tarea } from '../../models/tarea.model';
import { ToastService } from '../../services/toast.service';

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
  categoria = 'personal';
  prioridad: 'alta' | 'media' | 'baja' = 'media';

  constructor(
    private tareaService: TareaService,
    private toastService: ToastService
  ) {}

  async ngOnInit() {
    this.tareas = await this.tareaService.obtenerTareas();
  }

  async agregarTarea() {
    if (!this.titulo || !this.fecha) {
      this.toastService.showToast('Título y fecha son requeridos', 'warning', 2000, 'middle');
      return;
    }

    await this.tareaService.guardarTarea({
      titulo: this.titulo,
      descripcion: this.descripcion,
      fecha: this.fecha,
      hora: this.hora,
      categoria: this.categoria,
      prioridad: this.prioridad,
      completada: false
    });

    this.toastService.showToast('Tarea agregada exitosamente', 'success', 2000, 'bottom');
    this.limpiarFormulario();
    this.tareas = await this.tareaService.obtenerTareas();
  }

  async eliminar(id: string) {
    await this.tareaService.eliminarTarea(id);
    this.toastService.showToast('Tarea eliminada', 'danger', 2000, 'bottom');
    this.tareas = await this.tareaService.obtenerTareas();
  }

  limpiarFormulario() {
    this.titulo = '';
    this.descripcion = '';
    this.fecha = '';
    this.hora = '';
    this.categoria = 'personal';
    this.prioridad = 'media';
  }

  getIconoCategoria(categoria: string): string {
    switch (categoria) {
      case 'personal': return 'person-outline';
      case 'trabajo': return 'briefcase-outline';
      case 'estudio': return 'school-outline';
      default: return 'document-outline';
    }
  }
}

