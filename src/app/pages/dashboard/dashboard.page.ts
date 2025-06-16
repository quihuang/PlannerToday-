import { Component, OnInit } from '@angular/core';
import { TareasService } from '../../services/tareas.service';
import { Tarea } from '../../models/tarea.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  tareasHoy: Tarea[] = [];

  constructor(private tareasService: TareasService) {}

  async ngOnInit() {
    await this.cargarTareas();
  }

  async cargarTareas() {
    const todas = await this.tareasService.getTareas();
    const hoy = new Date().toISOString().split('T')[0];
    this.tareasHoy = todas.filter(t => t.fecha === hoy);
  }
}