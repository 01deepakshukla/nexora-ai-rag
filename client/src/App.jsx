import { useState } from 'react';
import { authApi } from './services/api';
import Chat from './pages/Chat';
import Login from './pages/Login';
import Register from './pages/Register';

export default function App() {
const savedUser = (() => {
  try {
    const data = localStorage.getItem('nexora_user');
    return data && data !== 'undefined' ? JSON.parse(data) : null;
  } catch {
    return null;
  }
})();
  const [view, setView] = useState(savedUser ? 'chat' : 'login');
  const [user, setUser] = useState(savedUser);

  const handleLogin = (nextUser) => {
    setUser(nextUser);
    setView('chat');
  };

  const handleRegister = (nextUser) => {
    setUser(nextUser);
    setView('chat');
  };

  const handleLogout = () => {
    authApi.logout();
    setUser(null);
    setView('login');
  };

  if (view === 'login') {
    return <Login onLogin={handleLogin} onRegister={() => setView('register')} />;
  }

  if (view === 'register') {
    return <Register onRegister={handleRegister} onLogin={() => setView('login')} />;
  }

  return <Chat user={user} onLogout={handleLogout} />;
}

