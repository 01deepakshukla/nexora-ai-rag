import { ArrowUp, Paperclip } from 'lucide-react';
import { useState } from 'react';

export default function InputBox({ onSend, isTyping }) {
  const [value, setValue] = useState('');
  const submit = (event) => { event.preventDefault(); onSend(value); setValue(''); };
  return (
    <form className="input-wrap" onSubmit={submit}>
      <textarea value={value} onChange={(event) => setValue(event.target.value)} placeholder="Ask Nexora anything..." rows="1" onKeyDown={(event) => { if (event.key === 'Enter' && !event.shiftKey) submit(event); }} />
      <div className="input-toolbar"><button type="button" className="input-action" aria-label="Attach file"><Paperclip size={17} /></button><span>{isTyping ? 'Nexora is thinking...' : 'Shift + Enter for a new line'}</span><button className="send-button" type="submit" aria-label="Send message" disabled={!value.trim() || isTyping}><ArrowUp size={18} /></button></div>
    </form>
  );
}
