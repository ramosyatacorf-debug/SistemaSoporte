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

CREATE TABLE tickets (
  id INT IDENTITY(1,1) PRIMARY KEY,
  titulo NVARCHAR(150) NOT NULL,
  descripcion NVARCHAR(MAX) NOT NULL,
  estado NVARCHAR(20) NOT NULL DEFAULT 'abierto',
  prioridad NVARCHAR(20) NOT NULL DEFAULT 'media',
  creado_por INT NOT NULL,
  creado_en DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
  FOREIGN KEY (creado_por) REFERENCES usuarios(id)
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
