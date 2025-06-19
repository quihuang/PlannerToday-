import { Component, OnInit } from '@angular/core';
import { TareaService } from '../../services/tarea.service';
import { Tarea } from '../../models/tarea.model';
import { ChartConfiguration, ChartType } from 'chart.js';

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

  chartTipoDona: ChartType = 'doughnut';
  chartTareas: ChartConfiguration<'doughnut'>['data'] = {
    labels: ['Completadas', 'Pendientes'],
    datasets: [{
      data: [0, 0],
      backgroundColor: ['#2dd36f', '#eb445a']
    }]
  };
  chartTareasOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    }
  };

  // Gráfico de barras para Prioridades
  chartTipoBarras: ChartType = 'bar';
  chartPrioridades: ChartConfiguration<'bar'>['data'] = {
    labels: ['Alta', 'Media', 'Baja'],
    datasets: [{
      data: [0, 0, 0],  // valores iniciales
      backgroundColor: ['#eb445a', '#ffc409', '#2dd36f'], // colores
    }]
  };
  chartPrioridadesOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: false,  // No mostrar leyenda en gráfico de barras
      },
      tooltip: {
        enabled: true, // Habilitar tooltips en el gráfico
      }
    },
    scales: {
      y: {
        beginAtZero: true, // Empieza desde cero
      },
    },
  };

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

    // Actualiza los datos del gráfico de tareas
    this.chartTareas = {
      labels: ['Completadas', 'Pendientes'],
      datasets: [{
        data: [this.completadas, this.pendientes],
        backgroundColor: ['#2dd36f', '#eb445a']
      }]
    };

    // Actualiza el gráfico de barras con las prioridades
    this.chartPrioridades.datasets[0].data = [this.prioridadAlta, this.prioridadMedia, this.prioridadBaja];
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
    if (event) event.target.complete();
  }
}

