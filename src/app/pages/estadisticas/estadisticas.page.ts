import { Component, OnInit } from '@angular/core';
import { TareasService } from '../../services/tareas.service';
import { Tarea } from '../../models/tarea.model';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.page.html',
  styleUrls: ['./estadisticas.page.scss'],
})
export class EstadisticasPage implements OnInit {
  total = 0;
  completadas = 0;
  porcentaje = 0;

  constructor(private tareasService: TareasService) {}

  async ngOnInit() {
    const tareas = await this.tareasService.getTareas();
    this.total = tareas.length;
    this.completadas = tareas.filter(t => t.completado).length;
    this.porcentaje = this.total > 0 ? Math.round((this.completadas / this.total) * 100) : 0;
  }
}