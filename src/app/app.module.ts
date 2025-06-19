import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IonicStorageModule } from '@ionic/storage-angular';

import { AppComponent } from './app.component';

// Páginas
import { LoginPage } from './pages/login/login.page';
import { RegisterPage } from './pages/register/register.page';
import { DashboardPage } from './pages/dashboard/dashboard.page';
import { NuevaTareaPage } from './pages/nueva-tarea/nueva-tarea.page';
import { PlanificadorPage } from './pages/planificador/planificador.page';
import { EstadisticasPage } from './pages/estadisticas/estadisticas.page';
import { ConfiguracionPage } from './pages/configuracion/configuracion.page';
import { TabsPage } from './pages/tabs/tabs.page';
import { RecuperarClavePage } from './pages/recuperar-clave/recuperar-clave.page';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPage },
  { path: 'register', component: RegisterPage },
  { path: 'recuperar-clave', component: RecuperarClavePage },

  {
    path: 'tabs',
    component: TabsPage,
    children: [
      { path: 'dashboard', component: DashboardPage },
      { path: 'nueva-tarea', component: NuevaTareaPage },
      { path: 'planificador', component: PlanificadorPage },
      { path: 'estadisticas', component: EstadisticasPage },
      { path: 'configuracion', component: ConfiguracionPage },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
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
    ConfiguracionPage,
    TabsPage,
    RecuperarClavePage
  ],
  imports: [
    BrowserModule,
    FormsModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    RouterModule.forRoot(routes, { useHash: true })
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}

