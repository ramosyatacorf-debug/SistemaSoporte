# SistemaSoporte Pro (React + Express + SQL Server)

Plataforma profesional de soporte técnico con frontend en **React** y backend API en **Express**, autenticación por sesión y módulo de tickets.

## Arquitectura

- `frontend/`: SPA React (Vite).
- `src/`: API Express + sesiones + SQL Server.
- `sql/init.sql`: esquema y datos iniciales.

## Funcionalidades

- Login seguro contra SQL Server (`usuarios`).
- Persistencia de sesión con cookies HTTP-only.
- CRUD operativo base de tickets:
  - crear ticket
  - listar tickets
  - cambiar estado
- UI moderna en React para mesa de soporte.

## Ejecutar proyecto

### 1) Base de datos
Ejecuta `sql/init.sql` en SQL Server.

### 2) Backend
```bash
cp .env.example .env
npm install
npm start
```

### 3) Frontend React
```bash
cd frontend
npm install
npm run dev
```

## Usuario inicial
- Email: `admin@soporte.local`
- Password: `Admin123*`
