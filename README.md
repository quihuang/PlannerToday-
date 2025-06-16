# PlannerToday (Ionic + Angular)

PlannerToday es una aplicación desarrollada con Ionic y Angular que permite la gestión de tareas personales. Cuenta con autenticación local y funcionalidades básicas como registro, inicio de sesión y dashboard principal.

---

## 🚀 Requisitos previos

- Node.js (recomendado v16+)
- npm
- Ionic CLI global (si se desea usar directamente):  
  ```bash
  npm install -g @ionic/cli
  ```

---

## ▶️ Instalación y ejecución

1. Clonar el repositorio:
   ```bash
   git clone <url-del-repo>
   cd PlannerToday
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Ejecutar la aplicación:
   ```bash
   npm start
   ```

   Esto iniciará el servidor en:  
   `http://localhost:8100/#/`

---

## 📂 Estructura principal

- `/src/app/pages` → vistas (`login`, `dashboard`, `planificador`, etc.)
- `/src/app/services` → lógica de autenticación (`AuthService`)
- `/src/app/models` → interfaces (`Usuario`, `Tarea`)
- `/src/global.scss` → estilos globales y temas

---

## 🔐 Autenticación

- El formulario de **inicio de sesión** y **registro** están unificados en una sola página (`login.page`).
- Se almacena localmente el usuario registrado usando `@ionic/storage-angular`.
- Validaciones:
  - Todos los campos son obligatorios.
  - En modo registro se requiere confirmación de contraseña.
  - Las contraseñas pueden visualizarse mediante íconos (`eye / eye-off`).

---

## 📌 Notas adicionales

- La sesión no es persistente al recargar por ahora (puede extenderse con lógica en `AppComponent`).
- No requiere backend: es un prototipo completamente funcional en frontend.

---

¡Listo para empezar a organizar tus tareas! ✅