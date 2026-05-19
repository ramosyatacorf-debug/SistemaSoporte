import React, { useEffect, useState } from 'react';
import { api, setUnauthorizedHandler } from './lib/api';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUnauthorizedHandler(() => setUser(null));
    api.get('/auth/me').then(({ data }) => setUser(data.user)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="center">Cargando...</div>;
  return user ? <DashboardPage user={user} onLogout={() => setUser(null)} /> : <LoginPage onLogin={setUser} />;
}
