import { DatePipe } from '@angular/common'; 
import { Component, OnInit } from '@angular/core';
import { TareasService } from '../../services/tareas.service';
import { Tarea } from '../../models/tarea.model';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  providers: [DatePipe] 
})
export class DashboardPage implements OnInit {
  tareasHoy: Tarea[] = [];
  tareasCompletadas: Tarea[] = [];
  tareasPendientes: Tarea[] = [];
  isLoading = true;
  currentDate = new Date();

  constructor(
    private tareasService: TareasService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private datePipe: DatePipe 
  ) {}

  async ngOnInit(): Promise<void> {
    await this.cargarTareas();
  }

  async cargarTareas(): Promise<void> {
    try {
      this.isLoading = true;
      const todasLasTareas = await this.tareasService.getTareas();

      const hoy = this.formatDate(this.currentDate);

      
      this.tareasHoy = todasLasTareas.filter(
        (t) => this.formatDate(new Date(t.fecha)) === hoy
      );

     
      [this.tareasCompletadas, this.tareasPendientes] = this.partition(
        this.tareasHoy,
        (t) => t.completado
      );

      this.ordenarTareasPorPrioridad();
    } catch (error) {
      console.error('Error cargando tareas:', error);
      await this.mostrarToast('Error al cargar las tareas', 'peligros');
    } finally {
      this.isLoading = false;
    }
  }

  private formatDate(date: Date): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd') || '';
  }

  private partition<T>(
    array: T[],
    predicate: (item: T) => boolean
  ): [T[], T[]] {
    const pass: T[] = [];
    const fail: T[] = [];
    array.forEach((item) => (predicate(item) ? pass.push(item) : fail.push(item)));
    return [pass, fail];
  }

  ordenarTareasPorPrioridad(): void {
    const prioridades = { alta: 3, media: 2, baja: 1 };
    this.tareasPendientes.sort(
      (a, b) => prioridades[b.prioridad] - prioridades[a.prioridad]
    );
  }

  async cambiarEstadoTarea(tarea: Tarea): Promise<void> {
    try {
      tarea.completado = !tarea.completado;
      await this.tareasService.updateTarea(tarea);
      await this.cargarTareas();
      await this.mostrarToast(
        `Tarea marcada como ${tarea.completado ? 'completada' : 'pendiente'}`,
        'success'
      );
    } catch (error) {
      console.error('Error actualizando tarea:', error);
      await this.mostrarToast('Error al actualizar la tarea', 'peligros');
    }
  }

  async eliminarTarea(tareaId: string): Promise<void> {
    if (!tareaId) {
      console.error('ID de tarea inválido');
      return;
    }

    const alert = await this.alertCtrl.create({
      header: 'Confirmar',
      message: '¿Estás seguro de eliminar esta tarea?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: async () => {
            try {
              await this.tareasService.deleteTarea(tareaId);
              await this.cargarTareas();
              await this.mostrarToast('Tarea eliminada', 'success');
            } catch (error) {
              console.error('Error eliminando tarea:', error);
              await this.mostrarToast('Error al eliminar la tarea', 'peligros');
            }
          },
        },
      ],
    });

    await alert.present();
  }

  async mostrarToast(mensaje: string, color: string): Promise<void> {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 2000,
      color: color,
      position: 'top',
    });
    await toast.present();
  }

  cambiarDias(dias: number): void {
    const newDate = new Date(this.currentDate);
    newDate.setDate(newDate.getDate() + dias);
    this.currentDate = newDate;
    this.cargarTareas();
  }

  trackByTareaId(index: number, tarea: Tarea): string {
    return tarea.id; 
  }
}
