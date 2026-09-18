import { MessageSquarePlus, MoreHorizontal } from 'lucide-react';
import InputBox from './InputBox';
import Message from './Message';

export default function ChatWindow({ messages, isTyping, onSend, onNewConversation }) {
  return (
    <main className="chat-window">
      <div className="chat-heading"><div><span className="eyebrow">Conversation 01</span><h1>Launch narrative</h1></div><div className="heading-actions"><button className="icon-button" aria-label="New conversation" onClick={onNewConversation}><MessageSquarePlus size={18} /></button><button className="icon-button" aria-label="More options"><MoreHorizontal size={18} /></button></div></div>
      <div className="messages">{messages.map((message) => <Message key={message.id} {...message} />)}{isTyping && <div className="typing"><span /><span /><span /></div>}</div>
      <InputBox onSend={onSend} isTyping={isTyping} />
    </main>
  );
}
