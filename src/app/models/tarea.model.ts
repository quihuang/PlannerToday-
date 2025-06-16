export interface Tarea {
  id: string;
  titulo: string;
  descripcion: string;
  fecha: string;    
  hora: string;
  categoria: string;
  prioridad: 'alta' | 'media' | 'baja';
  completada: boolean;
}
