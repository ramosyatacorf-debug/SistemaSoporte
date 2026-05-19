import React, { useState } from 'react';
import { api } from '../lib/api';

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('admin@soporte.local');
  const [password, setPassword] = useState('Admin123*');
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { data } = await api.post('/auth/login', { email, password });
      onLogin(data.user);
    } catch {
      setError('Credenciales inválidas o sin conexión al backend.');
    }
  };

  return <div className="auth"><form onSubmit={submit} className="card"><h1>Soporte Técnico</h1>{error && <p className="error">{error}</p>}<input value={email} onChange={(e) => setEmail(e.target.value)} /><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /><button>Iniciar sesión</button></form></div>;
}
