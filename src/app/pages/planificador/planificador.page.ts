import { Component, OnInit } from '@angular/core';
import { TareasService } from '../../services/tareas.service';
import { Tarea } from '../../models/tarea.model';

@Component({
  selector: 'app-planificador',
  templateUrl: './planificador.page.html',
  styleUrls: ['./planificador.page.scss'],
})
export class PlanificadorPage implements OnInit {
  tareas: Tarea[] = [];
  bloques = {
    manana: [] as Tarea[],
    tarde: [] as Tarea[],
    noche: [] as Tarea[]
  };

  constructor(private tareasService: TareasService) {}

  async ngOnInit() {
    await this.cargarTareas();
  }

  async cargarTareas() {
    const todas = await this.tareasService.getTareas();
    this.bloques.manana = todas.filter(t => t.hora < '12:00');
    this.bloques.tarde = todas.filter(t => t.hora >= '12:00' && t.hora < '18:00');
    this.bloques.noche = todas.filter(t => t.hora >= '18:00');
  }
}