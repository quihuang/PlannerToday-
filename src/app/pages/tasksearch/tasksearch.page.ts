import { Component, OnInit } from '@angular/core';
import { TareaService } from '../../services/tarea.service';
import { Tarea } from '../../models/tarea.model';

@Component({
  selector: 'app-tasksearch',
  templateUrl: './tasksearch.page.html',
  styleUrls: ['./tasksearch.page.scss'],
})
export class TaskSearchPage implements OnInit {
  tareas: Tarea[] = [];
  tareasFiltradas: Tarea[] = [];
  filtro: string = '';

  total: number = 0;
  completadas: number = 0;
  pendientes: number = 0;
  prioridadAlta: number = 0;
  prioridadMedia: number = 0;
  prioridadBaja: number = 0;

  constructor(private tareaService: TareaService) {}

  async ngOnInit() {
    await this.cargarTareas();
  }

  async cargarTareas() {
    this.tareas = await this.tareaService.getTareas();
    this.aplicarEstadisticas();
    this.tareasFiltradas = [...this.tareas];
  }

  aplicarEstadisticas() {
    this.total = this.tareas.length;
    this.completadas = this.tareas.filter(t => t.completada).length;
    this.pendientes = this.total - this.completadas;
    this.prioridadAlta = this.tareas.filter(t => t.prioridad === 'alta').length;
    this.prioridadMedia = this.tareas.filter(t => t.prioridad === 'media').length;
    this.prioridadBaja = this.tareas.filter(t => t.prioridad === 'baja').length;
  }

  filtrarTareas(event?: any) {
    const texto = event?.target?.value?.toLowerCase() || this.filtro.toLowerCase();
    if (!texto.trim()) {
      this.tareasFiltradas = [...this.tareas];
      return;
    }

    this.tareasFiltradas = this.tareas.filter(t =>
      t.titulo.toLowerCase().includes(texto) ||
      (t.descripcion && t.descripcion.toLowerCase().includes(texto)) ||
      (t.prioridad && t.prioridad.toLowerCase().includes(texto))
    );
  }

  async refrescar(event: any) {
    await this.cargarTareas();
    event.target.complete();
  }
}

