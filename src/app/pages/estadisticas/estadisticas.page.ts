import { Component, OnInit } from '@angular/core';
import { TareaService } from '../../services/tarea.service';
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

  constructor(private tareasService: TareaService) {}

   async ngOnInit() {
    const tareas = await this.tareasService.obtenerTareas();
    this.total = tareas.length;
    this.completadas = tareas.filter(t => t.completada).length;
    this.porcentaje = this.total > 0 ? Math.round((this.completadas / this.total) * 100) : 0;
  }
}