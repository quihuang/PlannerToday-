import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { IonicStorageModule } from '@ionic/storage-angular';

// Importar todas las páginas
import { LoginPage } from './pages/login/login.page';
import { RegisterPage } from './pages/register/register.page';
import { DashboardPage } from './pages/dashboard/dashboard.page';
import { NuevaTareaPage } from './pages/nueva-tarea/nueva-tarea.page';
import { PlanificadorPage } from './pages/planificador/planificador.page';
import { EstadisticasPage } from './pages/estadisticas/estadisticas.page';
import { ConfiguracionPage } from './pages/configuracion/configuracion.page';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPage },
  { path: 'register', component: RegisterPage },
  { path: 'dashboard', component: DashboardPage },
  { path: 'nueva-tarea', component: NuevaTareaPage },
  { path: 'planificador', component: PlanificadorPage },
  { path: 'estadisticas', component: EstadisticasPage },
  { path: 'configuracion', component: ConfiguracionPage }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginPage,
    RegisterPage,
    DashboardPage,
    NuevaTareaPage,
    PlanificadorPage,
    EstadisticasPage,
    ConfiguracionPage
  ],
  imports: [
    BrowserModule,
    FormsModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }