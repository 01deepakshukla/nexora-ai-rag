import { useState } from 'react';
import ChatWindow from '../components/ChatWindow';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import useChat from '../hooks/useChat';

export default function Chat({ user, onLogout }) {
  const [activeConversation, setActiveConversation] = useState(0);
  const { messages, isTyping, sendMessage, newConversation } = useChat();

  const resetConversation = () => {
    newConversation();
    setActiveConversation(0);
  };

  return (
    <div className="app-shell">
      <Sidebar activeConversation={activeConversation} onNewConversation={resetConversation} />
      <section className="workspace">
        <Header user={user} onLogout={onLogout} />
        <ChatWindow
          messages={messages}
          isTyping={isTyping}
          onSend={sendMessage}
          onNewConversation={resetConversation}
        />
      </section>
    </div>
  );
}

