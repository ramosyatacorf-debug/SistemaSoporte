# SistemaSoporte

Sistema base de soporte técnico con **inicio de sesión** y **módulo inicial de tickets** conectado a **SQL Server**.

## Funcionalidades actuales

- Login seguro por correo y contraseña.
- Control de sesión con rutas protegidas.
- Gestión de tickets:
  - Crear ticket.
  - Listar tickets.
  - Cambiar estado (abierto, en proceso, resuelto, cerrado).

## Requisitos

- Node.js 20+
- SQL Server (local o remoto)

## Configuración

1. Instala dependencias:

   ```bash
   npm install
   ```

2. Crea tu archivo de entorno:

   ```bash
   cp .env.example .env
   ```

3. Ajusta credenciales de SQL Server en `.env`.

4. Ejecuta el script SQL en SQL Server:

   - Archivo: `sql/init.sql`

5. Inicia en modo desarrollo:

   ```bash
   npm run dev
   ```

6. Abre `http://localhost:3000/login`

## Acceso inicial

- Usuario: `admin@soporte.local`
- Contraseña: `Admin123*`
