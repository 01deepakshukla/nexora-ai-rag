import { useState } from 'react';
import { authApi } from './services/api';
import Chat from './pages/Chat';
import Login from './pages/Login';
import Register from './pages/Register';

export default function App() {
  const savedUser = JSON.parse(localStorage.getItem('nexora_user') || 'null');
  const [view, setView] = useState(savedUser ? 'chat' : 'login');
  const [user, setUser] = useState(savedUser);

  if (view === 'login') return <Login onLogin={(nextUser) => { setUser(nextUser); setView('chat'); }} onRegister={() => setView('register')} />;
  if (view === 'register') return <Register onRegister={(nextUser) => { setUser(nextUser); setView('chat'); }} onLogin={() => setView('login')} />;

  return <Chat user={user} onLogout={() => { authApi.logout(); setUser(null); setView('login'); }} />;
}
