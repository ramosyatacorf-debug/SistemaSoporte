# SistemaSoporte

Sistema base de soporte técnico con **inicio de sesión** conectado a **SQL Server**.

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

## Estructura

- `src/server.js`: servidor Express.
- `src/config/db.js`: conexión a SQL Server con `mssql`.
- `src/routes/auth.routes.js`: login/logout.
- `src/middleware/auth.js`: protección de rutas.
- `src/views/`: vistas EJS.
- `public/styles.css`: estilos.
