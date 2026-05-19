CREATE DATABASE SistemaSoporte;
GO

USE SistemaSoporte;
GO

CREATE TABLE usuarios (
  id INT IDENTITY(1,1) PRIMARY KEY,
  nombre NVARCHAR(100) NOT NULL,
  email NVARCHAR(150) NOT NULL UNIQUE,
  password_hash NVARCHAR(255) NOT NULL,
  rol NVARCHAR(50) NOT NULL DEFAULT 'tecnico',
  creado_en DATETIME2 NOT NULL DEFAULT SYSDATETIME()
);
GO

-- contraseña de ejemplo: Admin123* (hash generado con bcrypt)
INSERT INTO usuarios (nombre, email, password_hash, rol)
VALUES (
  'Administrador',
  'admin@soporte.local',
  '$2a$10$dVx2OWsS9M6BfAV54n6kWODPNgm6kKiC9JIhbSAVnX1nvUsOFf7oG',
  'admin'
);
GO
