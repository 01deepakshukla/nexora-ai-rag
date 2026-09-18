import { Archive, ChevronDown, Compass, FileText, MessageCircle, Plus, Star } from 'lucide-react';

const conversations = ['Launch narrative', 'Research synthesis', 'Weekly reflection'];

export default function Sidebar({ onNewConversation, activeConversation }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-symbol">N</div>
        <span>Nexora</span>
      </div>

      <button className="new-chat" onClick={onNewConversation}>
        <Plus size={17} /> New conversation
      </button>

      <nav className="side-nav">
        <a className="nav-item active" href="#chat">
          <MessageCircle size={17} /> Conversations <span className="nav-count">3</span>
        </a>
        <a className="nav-item" href="#explore">
          <Compass size={17} /> Explore
        </a>
        <a className="nav-item" href="#saved">
          <Star size={17} /> Saved
        </a>
        <a className="nav-item" href="#files">
          <FileText size={17} /> Knowledge base
        </a>
      </nav>

      <div className="conversation-list">
        <div className="list-heading">
          <span>Recent</span>
          <ChevronDown size={14} />
        </div>

        {conversations.map((conversation, index) => (
          <button key={conversation} className={`conversation ${index === activeConversation ? 'selected' : ''}`}>
            {conversation}
            <span>{index === 0 ? 'Now' : `${index + 1}d`}</span>
          </button>
        ))}
      </div>

      <div className="sidebar-footer">
        <Archive size={16} />
        <span>Archive</span>
      </div>
    </aside>
  );
}

