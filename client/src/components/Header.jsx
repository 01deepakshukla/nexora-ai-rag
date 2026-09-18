import { Bell, Search, Settings } from 'lucide-react';

export default function Header({ user, onLogout }) {
  return (
    <header className="topbar">
      <div className="topbar-context"><span className="eyebrow">Workspace</span><span className="context-name">Personal studio</span></div>
      <div className="topbar-actions">
        <button className="icon-button" aria-label="Search"><Search size={18} /></button>
        <button className="icon-button" aria-label="Notifications"><Bell size={18} /></button>
        <button className="profile-button" onClick={onLogout} title="Sign out"><span>{user.name.slice(0, 1)}</span><strong>{user.name}</strong></button>
        <button className="icon-button" aria-label="Settings"><Settings size={18} /></button>
      </div>
    </header>
  );
}
