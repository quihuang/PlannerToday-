import { Component, OnInit } from '@angular/core';
import { TareaService } from '../../services/tarea.service';
import { Tarea } from '../../models/tarea.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  tareasPendientes: Tarea[] = [];
  tareasCompletadas: Tarea[] = [];

  total = 0;
  completadas = 0;
  pendientes = 0;
  mostrarCompletadas = false;
  prioridadAlta = 0;
  prioridadMedia = 0;
  prioridadBaja = 0;


  constructor(private tareaService: TareaService) {}

  async ngOnInit() {
    await this.cargarTareas();
  }

  async cargarTareas() {
     const tareas = await this.tareaService.obtenerTareas();
    this.tareasPendientes = tareas.filter(t => !t.completada);
    this.tareasCompletadas = tareas.filter(t => t.completada);

    this.prioridadAlta = tareas.filter(t => t.prioridad?.toLowerCase() === 'alta').length;
    this.prioridadMedia = tareas.filter(t => t.prioridad?.toLowerCase() === 'media').length;
    this.prioridadBaja = tareas.filter(t => t.prioridad?.toLowerCase() === 'baja').length;

    this.total = tareas.length;
    this.completadas = this.tareasCompletadas.length;
    this.pendientes = this.tareasPendientes.length;
  }

  getColor(prioridad: string): string {
  switch (prioridad?.toLowerCase()) {
    case 'alta': return 'danger';
    case 'media': return 'warning';
    case 'baja': return 'success';
    default: return 'medium';
    }
  }

  async completarTarea(tarea: Tarea) {
    tarea.completada = true;
    await this.tareaService.actualizarTarea(tarea);
    await this.cargarTareas();
  }

  async refrescar(event?: any) {
  await this.cargarTareas();

  if (event) {
    event.target.complete();
  }
}

}
