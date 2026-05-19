import React, { useEffect, useState } from 'react';
import { api } from '../lib/api';

export default function DashboardPage({ user, onLogout }) {
  const [tickets, setTickets] = useState([]);
  const [form, setForm] = useState({ titulo: '', descripcion: '', prioridad: 'media' });

  const load = () => api.get('/tickets').then(({ data }) => setTickets(data.tickets));
  useEffect(() => { load(); }, []);

  const createTicket = async (e) => {
    e.preventDefault();
    await api.post('/tickets', form);
    setForm({ titulo: '', descripcion: '', prioridad: 'media' });
    load();
  };

  const updateEstado = async (id, estado) => {
    await api.patch(`/tickets/${id}/estado`, { estado });
    load();
  };

  const logout = async () => { await api.post('/auth/logout'); onLogout(); };

  return <div className="layout"><header><h1>Mesa de Soporte</h1><p>{user.nombre} · {user.rol}</p><button onClick={logout}>Cerrar sesión</button></header><section className="grid"><form onSubmit={createTicket} className="card"><h2>Nuevo ticket</h2><input placeholder="Título" value={form.titulo} onChange={(e)=>setForm({...form,titulo:e.target.value})} required/><textarea placeholder="Descripción" value={form.descripcion} onChange={(e)=>setForm({...form,descripcion:e.target.value})} required/><select value={form.prioridad} onChange={(e)=>setForm({...form,prioridad:e.target.value})}><option value="baja">Baja</option><option value="media">Media</option><option value="alta">Alta</option><option value="critica">Crítica</option></select><button>Crear</button></form><div className="card"><h2>Tickets</h2>{tickets.map(t=><div key={t.id} className="ticket"><strong>#{t.id} {t.titulo}</strong><p>{t.descripcion}</p><select value={t.estado} onChange={(e)=>updateEstado(t.id,e.target.value)}><option value="abierto">abierto</option><option value="en_proceso">en_proceso</option><option value="resuelto">resuelto</option><option value="cerrado">cerrado</option></select></div>)}</div></section></div>;
}
